# Text Analysis

**How do I...**

- [Extract All Plain Text](#Extract-All-Plain-Text)
- [Extract Plain Text Without HTTP Headers](#Extract-Plain-Text-Without-HTTP-Headers)
- [Extract Plain Text By Domain](#Extract-Plain-Text-By-Domain)
- [Extract Plain Text by URL Pattern](#Extract-Plain-Text-by-URL-Pattern)
- [Extract Plain Text Minus Boilerplate](#Extract-Plain-Text-Minus-Boilerplate)
- [Extract Plain Text Filtered by Date](#Extract-Plain-Text-Filtered-by-Date)
- [Extract Plain Text Filtered by Language](#Extract-Plain-Text-Filtered-by-Language)
- [Extract Plain text Filtered by Keyword](#Extract-Plain-Text-Filtered-by-Keyword)
- [Extract Raw HTML](#Extract-Raw-HTML)
- [Extract Named Entities](#Extract-Named-Entities)

For all the scripts below, you can type `:paste` into Spark Shell, paste the script, and then run it with <kbd>CTRL</kbd>+<kbd>d</kbd>:

## Extract All Plain Text

### Scala RDD

This script extracts the crawl date, domain, URL, and plain text from HTML files in the sample ARC data (and saves the output to out/). By default, HTTP headers are included in the plain text that is extracted.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc).keepValidPages()
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(r.getContentString)))
  .saveAsTextFile("plain-text/")
```

If you wanted to use it on your own collection, you would change "src/test/resources/arc/example.arc.gz" to the directory with your own ARC or WARC files, and change "out/" on the last line to where you want to save your output data.

Note that this will create a new directory to store the output, which cannot already exist.

### Scala DF

TODO

### Python DF

TODO

## Extract Plain Text Without HTTP Headers

### Scala RDD

If you want to remove HTTP headers, you can add one more command: `RemoveHttpHeader`. The script would then look like:

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc).keepValidPages()
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader(r.getContentString))))
  .saveAsTextFile("plain-text-noheaders/")
```

As most plain text use cases do not require HTTP headers to be in the output, we are removing headers in the following examples.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

  val pages = RecordLoader.loadArchives("src/test/resources/warc/example.warc.gz", sc).extractValidPagesDF()
  .select(RemoveHTML($"content"))
  .head(10)

pages(1).getString(0)
```

### Python DF

TODO

## Extract Plain Text By Domain

### Scala RDD

The following Spark script generates plain text renderings for all the web pages in a collection with a URL matching a filter string. In the example case, it will go through the collection and find all of the URLs within the "archive.org" domain.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc).keepValidPages()
  .keepDomains(Set("www.archive.org"))
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader(r.getContentString))))
  .saveAsTextFile("plain-text-domain/")
```
### Scala DF

TODO

### Python DF

TODO

## Extract Plain Text by URL Pattern

### Scala RDD

The following Spark script generates plain text renderings for all the web pages in a collection with a URL matching a regular expression pattern. In the example case, it will go through a WARC file and find all of the URLs beginning with `http://archive.org/details/`, and save the text of those URLs.

The `(?i)` makes this query case insensitive.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc).keepValidPages()
  .keepUrlPatterns(Set("(?i)http://www.archive.org/details/.*".r))
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader(r.getContentString))))
  .saveAsTextFile("details/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

RecordLoader.loadArchives("src/test/resources/warc/example.warc.gz", sc).extractValidPagesDF()
  .select($"url")
  .show(20, false)
```

### Python DF

TODO

## Extract Plain Text Minus Boilerplate

### Scala RDD

The following Spark script generates plain text renderings for all the web pages in a collection, minus "boilerplate" content: advertisements, navigational elements, and elements of the website template. For more information on the boilerplate removal library we are using, [please see this website and paper](http://www.l3s.de/~kohlschuetter/boilerplate/).

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc).keepValidPages()
  .keepDomains(Set("www.archive.org"))
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, ExtractBoilerpipeText(RemoveHTTPHeader(r.getContentString))))
  .saveAsTextFile("plain-text-no-boilerplate/")
```

### Scala DF

TODO

### Python DF

TODO

## Extract Plain Text Filtered by Date

### Scala RDD

AUT permits you to filter records by a list of full or partial date strings. It conceives
of the date string as a `DateComponent`. Use `keepDate` to specify the year (`YYYY`), month (`MM`),
day (`DD`), year and month (`YYYYMM`), or a particular year-month-day (`YYYYMMDD`).

The following Spark script extracts plain text for a given collection by date (in this case, April 2008).

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc).keepValidPages()
  .keepDate(List("200804"), ExtractDate.DateComponent.YYYYMM)
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader(r.getContentString))))
  .saveAsTextFile("plain-text-date-filtered-200804/")
```

The following script extracts plain text for a given collection by year (in this case, 2008).

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc).keepValidPages()
  .keepDate(List("2008"), ExtractDate.DateComponent.YYYY)
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader(r.getContentString))))
  .saveAsTextFile("plain-text-date-filtered-2008/")
```

Finally, you can also extract multiple dates or years. In this case, we would extract pages from both 2008 and 2015.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc).keepValidPages()
  .keepDate(List("2008","2015"), ExtractDate.DateComponent.YYYY)
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader(r.getContentString))))
  .saveAsTextFile("plain-text-date-filtered-2008-2015/")
```

Note: if you created a dump of plain text using another one of the earlier commands, you do not need to go back and run this. You can instead use bash to extract a sample of text. For example, running this command on a dump of all plain text stored in `alberta_education_curriculum.txt`:

```bash
sed -n -e '/^(201204/p' alberta_education_curriculum.txt > alberta_education_curriculum-201204.txt
```

would select just the lines beginning with `(201204`, or April 2012.

### Scala DF

TODO

### Python DF

TODO

## Extract Plain Text Filtered by Language

### Scala RDD

The following Spark script keeps only French language pages from a certain top-level domain. It uses the [ISO 639.2 language codes](https://www.loc.gov/standards/iso639-2/php/code_list.php).

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc).keepValidPages()
  .keepDomains(Set("www.archive.org"))
  .keepLanguages(Set("fr"))
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader(r.getContentString))))
  .saveAsTextFile("plain-text-fr/")
```

### Scala DF

TODO

### Python DF

TODO

## Extract Plain text Filtered by Keyword

### Scala RDD

The following Spark script keeps only pages containing a certain keyword, which also stacks on the other scripts.

For example, the following script takes all pages containing the keyword "radio" in a collection.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz",sc).keepValidPages()
  .keepContent(Set("radio".r))
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader(r.getContentString))))
  .saveAsTextFile("plain-text-radio/")
```

There is also `discardContent` which does the opposite, and can be used in cases where, for example, you have a frequent keyword you are not interested in.

### Scala DF

TODO

### Python DF

TODO

## Extract Raw HTML

### Scala RDD

In most cases, users will be interested in working with plain text. In some cases, however, you may want to work with the acutal HTML of the pages themselves (for example, looking for specific tags or HTML content). 

The following script will produce the raw HTML of a WARC file. You can use the filters from above to filter it down accordingly by domain, language, etc.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc).keepValidPages()
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, r.getContentString))
  .saveAsTextFile("plain-html/")
```

### Scala DF

TODO

### Python DF

TODO

## Extract Named Entities

### Scala RDD

**NER is Extremely Resource Intensive and Time Consuming!**

Named Entity Recognition is extremely resource intensive, and will take a very long time. Our recommendation is to begin testing NER on one or two WARC files, before trying it on a larger body of information. Depending on the speed of your system, it can take a day or two to process information that you are used to working with in under an hour.

The following Spark scripts use the [Stanford Named Entity Recognizer](http://nlp.stanford.edu/software/CRF-NER.shtml) to extract names of entities – persons, organizations, and locations – from collections of ARC/WARC files or extracted texts. You can find a version of Stanford NER in our aut-resources repo located [here](https://github.com/archivesunleashed/aut-resources).

The scripts require a NER classifier model. There is one provided in the Stanford NER package (in the `classifiers` folder) called `english.all.3class.distsim.crf.ser.gz`, but you can also use your own.

```scala
import io.archivesunleashed._
import io.archivesunleashed.app._
import io.archivesunleashed.matchbox._

sc.addFile("/path/to/classifier")

ExtractEntities.extractFromRecords("/path/to/classifier/english.all.3class.distsim.crf.ser.gz", "example.arc.gz", "output-ner/", sc)
```

Note the call to `addFile()`. This is necessary if you are running this script on a cluster; it puts a copy of the classifier on each worker node. The classifier and input file paths may be local or on the cluster (e.g., `hdfs:///user/joe/collection/`).

The output of this script and the one below will consist of lines that look like this:

```
(20090204,http://greenparty.ca/fr/node/6852?size=display,{"PERSON":["Parti Vert","Paul Maillet","Adam Saab"],
"ORGANIZATION":["GPC Candidate Ottawa Orleans","Contact Cabinet","Accueil Paul Maillet GPC Candidate Ottawa Orleans Original","Circonscriptions Nouvelles Événements Blogues Politiques Contact Mon Compte"],
"LOCATION":["Canada","Canada","Canada","Canada"]})
```

This following script takes the plain text that you may have extracted earlier and extracts the entities.

```scala
import io.archivesunleashed._
import io.archivesunleashed.app._
import io.archivesunleashed.matchbox._

sc.addFile("/path/to/classifier")

ExtractEntities.extractFromScrapeText("english.all.3class.distsim.crf.ser.gz", "/path/to/extracted/text", "output-ner/", sc)
```

### Scala DF

TODO

### Python DF

TODO
