# Extracting Domain Level Plain Text

### All plain text

This script extracts the crawl date, domain, URL, and plain text from HTML files in the sample ARC data (and saves the output to out/). 

```scala
import org.warcbase.spark.rdd.RecordRDD._
import org.warcbase.spark.matchbox.{RemoveHTML, RecordLoader}

RecordLoader.loadArchives("src/test/resources/arc/example.arc.gz", sc)
  .keepValidPages()
  .map(r => (r.getCrawldate, r.getDomain, r.getUrl, RemoveHTML(r.getContentString)))
  .saveAsTextFile("out/")
```

If you wanted to use it on your own collection, you would change "src/test/resources/arc/example.arc.gz" to the directory with your own ARC or WARC files, and change "out/" on the last line to where you want to save your output data.

Note that this will create a new directory to store the output, which cannot already exist.

If you want to run it in your Spark Notebook, the following script will show in-notebook plain text:

```scala
val r = RecordLoader.loadArchives("/path/to/warcs", sc) 
.keepValidPages()
.map(r => { 
val t = RemoveHTML(r.getContentString) 
val len = 1000 
(r.getCrawldate, r.getUrl, if ( t.length > len ) t.substring(0, 
len) else t)}) 
.collect() 
```

### Plain text by domain

The following Spark script generates plain text renderings for all the web pages in a collection with a URL matching a filter string. In the example case, it will go through the collection and find all of the URLs within the "greenparty.ca" domain.

```scala
import org.warcbase.spark.matchbox.{RemoveHTML, RecordLoader}
import org.warcbase.spark.rdd.RecordRDD._

RecordLoader.loadArchives("src/test/resources/arc/example.arc.gz", sc)
  .keepValidPages()
  .keepDomains(Set("greenparty.ca"))
  .map(r => (r.getCrawldate, r.getDomain, r.getUrl, RemoveHTML(r.getContentString)))
  .saveAsTextFile("out/")
```

### Plain text by URL pattern

The following Spark script generates plain text renderings for all the web pages in a collection with a URL matching a regular expression pattern. In the example case, it will go through the collection and find all of the URLs beginning with `http://geocities.com/EnchantedForest/`. The `(?i)` makes this query case insensitive.

```scala
import org.warcbase.spark.matchbox.{RemoveHTML, RecordLoader}
import org.warcbase.spark.rdd.RecordRDD._

RecordLoader.loadArchives("geocitities-example.warc.gz", sc)
  .keepValidPages()
  .keepUrlPatterns(Set("(?i)http://geocities.com/EnchantedForest/.*".r))
  .map(r => (r.getCrawldate, r.getDomain, r.getUrl, RemoveHTML(r.getContentString)))
  .saveAsTextFile("EnchantedForest/")
```

### Plain text minus boilerplate

The following Spark script generates plain text renderings for all the web pages in a collection, minus "boilerplate" content: advertisements, navigational elements, and elements of the website template. For more on the boilerplate removal library we are using, [please see this website and paper](http://www.l3s.de/~kohlschuetter/boilerplate/).

```scala
import org.warcbase.spark.matchbox.{RemoveHTML, RecordLoader, ExtractBoilerpipeText}
import org.warcbase.spark.rdd.RecordRDD._

RecordLoader.loadArchives("src/test/resources/arc/example.arc.gz", sc)
  .keepValidPages()
  .keepDomains(Set("greenparty.ca"))
  .map(r => (r.getCrawldate, r.getDomain, r.getUrl, ExtractBoilerpipeText(r.getContentString)))
  .saveAsTextFile("out/")
```

### Plain text filtered by date

Warcbase permits you to filter records by a full or partial date string. It conceives
of the date string as a `DateComponent`. Use `keepDate` to specify the year (`YYYY`), month (`MM`),
day (`DD`), year and month (`YYYYMM`), or a particular year-month-day (`YYYYMMDD`).

The following Spark script extracts plain text for a given collection by date (in this case, 4 October 2008). 

```scala
import org.warcbase.spark.matchbox.RecordLoader
import org.warcbase.spark.rdd.RecordRDD._
import org.warcbase.spark.matchbox.{RemoveHTML, RecordLoader}
import org.warcbase.spark.matchbox.ExtractDate.DateComponent._

RecordLoader.loadArchives("path/to/example.arc.gz", sc)
  .keepValidPages()
  .keepDate("20081004", YYYYMM)
  .map(r => (r.getCrawldate, r.getDomain, r.getUrl, RemoveHTML(r.getContentString)))
  .saveAsTextFile("out/")
```

The following script extracts plain text for a given collection by year (in this case, 2016).

```scala
import org.warcbase.spark.matchbox.RecordLoader
import org.warcbase.spark.rdd.RecordRDD._
import org.warcbase.spark.matchbox.{RemoveHTML, RecordLoader}
import org.warcbase.spark.matchbox.ExtractDate.DateComponent._

RecordLoader.loadArchives("path/to/example.warc.gz", sc)
  .keepValidPages()
  .keepDate("2015", YYYY)
  .map(r => (r.getCrawldate, r.getDomain, r.getUrl, RemoveHTML(r.getContentString)))
  .saveAsTextFile("out2/")
```

### Plain text filtered by language

The following Spark script keeps only French language pages from a certain top-level domain. It uses the [ISO 639.2 language codes](https://www.loc.gov/standards/iso639-2/php/code_list.php).

```scala
import org.warcbase.spark.matchbox.{RecordLoader, RemoveHTML}
import org.warcbase.spark.rdd.RecordRDD._

RecordLoader.loadArchives("/path/to/warc", sc)
.keepValidPages()
.keepDomains(Set("greenparty.ca"))
.keepLanguages(Set("fr"))
.map(r => (r.getCrawldate, r.getDomain, r.getUrl, RemoveHTML(r.getContentString)))
.saveAsTextFile("out-fr/")
```
