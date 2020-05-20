# Text Analysis

**How do I...**

- [Extract All Plain Text](#Extract-All-Plain-Text)
- [Extract Plain Text Without HTTP Headers](#Extract-Plain-Text-Without-HTTP-Headers)
- [Extract Plain Text By Domain](#Extract-Plain-Text-By-Domain)
- [Extract Plain Text by URL Pattern](#Extract-Plain-Text-by-URL-Pattern)
- [Extract Plain Text Minus Boilerplate](#Extract-Plain-Text-Minus-Boilerplate)
- [Extract Plain Text Filtered by Date](#Extract-Plain-Text-Filtered-by-Date)
- [Extract Plain Text Filtered by Language](#Extract-Plain-Text-Filtered-by-Language)
- [Extract Plain Text Filtered by Keyword](#Extract-Plain-Text-Filtered-by-Keyword)
- [Extract Raw HTML](#Extract-Raw-HTML)
- [Extract Named Entities](#Extract-Named-Entities)

For all the scripts below, you can type `:paste` into Spark Shell, paste the
script, and then run it with <kbd>CTRL</kbd>+<kbd>d</kbd>:

## Extract All Plain Text

### Scala RDD

This script extracts the crawl date, domain, URL, and plain text from HTML
files in the sample ARC data (and saves the output to out/). By default, HTTP
headers are included in the plain text that is extracted.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTMLRDD(r.getContentString)))
  .saveAsTextFile("plain-text-rdd/")
```

Note that this will create a new directory to store the output, which cannot
already exist.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .select($"crawl_date", extractDomain($"url"), $"url", removeHTML($"content"))
  .write.csv("plain-text-df/")
```

### Python DF

```python
from aut import *

WebArchive(sc, sqlContext, "/path/to/warcs")\
  .webpages()\
  .select("crawl_date", Udf.extract_domain("url").alias("domain"), "url", Udf.remove_html("content").alias("content"))
  .write.csv("plain-text-df/")
```

## Extract Plain Text Without HTTP Headers

### Scala RDD

If you want to remove HTTP headers, you can add one more command:
`RemoveHttpHeader`. The script would then look like:

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTMLRDD(RemoveHTTPHeaderRDD(r.getContentString))))
  .saveAsTextFile("plain-text-noheaders-rdd/")
```

As most plain text use cases do not require HTTP headers to be in the output,
we are removing headers in the following examples.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .select(removeHTML(removeHTTPHeader($"content")))
  .write.csv("plain-text-noheaders-df/")
```

### Python DF

```python
from aut import *

WebArchive(sc, sqlContext, "/path/to/warcs")\
  .webpages()\
  .select(Udf.remove_html(Udf.remove_http_header("content")).alias("content"))\
  .write.csv("plain-text-noheaders-df/")
```

## Extract Plain Text By Domain

### Scala RDD

The following Spark script generates plain text renderings for all the web
pages in a collection with a URL matching a filter string. In the example case,
it will go through the collection and find all of the URLs within the
"archive.org" domain.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepDomains(Set("www.archive.org"))
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTMLRDD(RemoveHTTPHeaderRDD(r.getContentString))))
  .saveAsTextFile("plain-text-domain-rdd/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val domains = Array("www.archive.org")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .select($"crawl_date", extractDomain($"url").alias("domains"), $"url", removeHTML(removeHTTPHeader($"content").alias("content")))
  .filter(hasDomains($"domain", lit(domains)))
  .write.csv("plain-text-domain-df/")
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

domains = ["www.archive.org"]

WebArchive(sc, sqlContext, "/path/to/warcs")\
  .webpages()\
  .select("crawl_date", Udf.extract_domain("url").alias("domain"), "url", Udf.remove_html(Udf.remove_http_header("content")).alias("content"))\
  .filter(col("domain").isin(domains))\
  .write.csv("plain-text-domain-df/")
```

## Extract Plain Text by URL Pattern

### Scala RDD

The following Spark script generates plain text renderings for all the web
pages in a collection with a URL matching a regular expression pattern. In the
example case, it will go through a WARC file and find all of the URLs beginning
with `http://archive.org/details/`, and save the text of those URLs.

The `(?i)` makes this query case insensitive.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepUrlPatterns(Set("(?i)http://www.archive.org/details/.*".r))
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTMLRDD(RemoveHTTPHeaderRDD(r.getContentString))))
  .saveAsTextFile("details-rdd/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val urlPattern = Array("(?i)http://www.archive.org/details/.*")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .select($"crawl_date", extractDomain($"url").alias("domain"), $"url", removeHTML(removeHTTPHeader($"content").alias("content")))
  .filter(hasUrlPatterns($"url", lit(urlsPattern)))
  .write.csv("details-df/")
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

url_pattern = "%http://www.archive.org/details/%"

WebArchive(sc, sqlContext, "/path/to/warcs")\
  .webpages()\
  .select("crawl_date", Udf.extract_domain("url").alias("domain"), "url", Udf.remove_html(Udf.remove_http_header("content")).alias("content"))\
  .filter(col("url").like(url_pattern))\
  .write.csv("details-df/")
```

## Extract Plain Text Minus Boilerplate

### Scala RDD

The following Spark script generates plain text renderings for all the web
pages in a collection, minus "boilerplate" content: advertisements,
navigational elements, and elements of the website template. For more
information on the boilerplate removal library we are using, [please see this
website and paper](http://www.l3s.de/~kohlschuetter/boilerplate/).

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepDomains(Set("www.archive.org"))
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, ExtractBoilerpipeTextRDD(RemoveHTTPHeaderRDD(r.getContentString))))
  .saveAsTextFile("plain-text-no-boilerplate-rdd/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val domains = Array("www.archive.org")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .select($"crawl_date", extractDomain($"url"), $"url", extractBoilerpipeText(removeHTTPHeader($"content")))
  .filter(hasDomains($"domain", lit(domains)))
  .write.csv("plain-text-no-boilerplate-df/")
```

### Python DF

```python
from aut import *

WebArchive(sc, sqlContext, "/path/to/warcs")\
  .webpages()\
  .select("crawl_date", Udf.extract_domain("url").alias("domain"), "url", Udf.extract_boilerplate(Udf.remove_http_header("content")).alias("content"))\
  .write.csv("plain-text-no-boilerplate-df/")
```

## Extract Plain Text Filtered by Date

### Scala RDD

AUT permits you to filter records by a list of full or partial date strings. It
conceives of the date string as a `DateComponent`. Use `keepDate` to specify
the year (`YYYY`), month (`MM`), day (`DD`), year and month (`YYYYMM`), or a
particular year-month-day (`YYYYMMDD`).

The following Spark script extracts plain text for a given collection by date
(in this case, April 2008).

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepDate(List("200804"), ExtractDateRDD.DateComponent.YYYYMM)
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTMLRDD(RemoveHTTPHeaderRDD(r.getContentString))))
  .saveAsTextFile("plain-text-date-filtered-200804/")
```

The following script extracts plain text for a given collection by year (in
this case, 2008).

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepDate(List("2008"), ExtractDateRDD.DateComponent.YYYY)
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTMLRDD(RemoveHTTPHeaderRDD(r.getContentString))))
  .saveAsTextFile("plain-text-date-filtered-2008/")
```

Finally, you can also extract multiple dates or years. In this case, we would
extract pages from both 2008 and 2015.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepDate(List("2008","2015"), ExtractDateRDD.DateComponent.YYYY)
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTMLRDD(RemoveHTTPHeaderRDD(r.getContentString))))
  .saveAsTextFile("plain-text-date-filtered-2008-2015-rdd/")
```

Note: if you created a dump of plain text using another one of the earlier
commands, you do not need to go back and run this. You can instead use bash to
extract a sample of text. For example, running this command on a dump of all
plain text stored in `alberta_education_curriculum.txt`:

```bash
sed -n -e '/^(201204/p' alberta_education_curriculum.txt > alberta_education_curriculum-201204.txt
```

would select just the lines beginning with `(201204`, or April 2012.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val dates = Array("2008", "2015")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .select($"crawl_date", extractDomain($"url").as("domain"), $"url", removeHTML(removeHTTPHeader($"content")).as("content"))
  .filter(hasDate($"crawl_date", lit(dates)))
  .write.csv("plain-text-date-filtered-2008-2015-df/")
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

dates = "2009[10][09]\d\d"

WebArchive(sc, sqlContext, "/path/to/warcs")\
  .webpages()\
  .select("crawl_date", Udf.extract_domain("url").alias("domain"), "url", Udf.remove_html(Udf.remove_http_header("content")).alias("content"))\
  .filter(col("crawl_date").rlike(dates))\
  .write.csv("plain-text-date-filtered-2008-2015-df/")
```

## Extract Plain Text Filtered by Language

### Scala RDD

The following Spark script keeps only French language pages from a certain
top-level domain. It uses the [ISO 639.2 language
codes](https://www.loc.gov/standards/iso639-2/php/code_list.php).

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepDomains(Set("www.archive.org"))
  .keepLanguages(Set("fr"))
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTMLRDD(RemoveHTTPHeaderRDD(r.getContentString))))
  .saveAsTextFile("plain-text-fr-rdd/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val domains = Array("www.archive.org")
val languages = Array("fr")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .select($"crawl_date", extractDomain($"url").alias("domain"), $"url", $"language", removeHTML(removeHTTPHeader($"content").alias("content")))
  .filter(hasDomains($"domain", lit(domains)))
  .filter(hasLanguages($"language", lit(languages)))
  .write.csv("plain-text-fr-df/")
```

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val domains = Array("www.archive.org")
val languages = Array("fr")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .filter(hasDomains(extractDomain($"url"), lit(domains)))
  .filter(hasLanguages($"language", lit(languages)))
  .select($"crawl_date", extractDomain($"url").alias("domain"), $"url", $"language", removeHTML(removeHTTPHeader($"content").alias("content")))
  .write.csv("plain-text-fr-df/")
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

domains = ["www.geocities.com"]
languages = ["fr"]

WebArchive(sc, sqlContext, "/path/to/warcs")\
  .webpages()\
  .select("crawl_date", Udf.extract_domain("url").alias("domain"), "url", Udf.remove_html(Udf.remove_http_header("content")).alias("content"))\
  .filter(col("domain").isin(domains))\
  .filter(col("language").isin(languages))\
  .write.csv("plain-text-fr-df/")
```

## Extract Plain text Filtered by Keyword

### Scala RDD

The following Spark script keeps only pages containing a certain keyword, which
also stacks on the other scripts.

For example, the following script takes all pages containing the keyword
"radio" in a collection.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs",sc)
  .keepValidPages()
  .keepContent(Set("radio".r))
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTMLRDD(RemoveHTTPHeaderRDD(r.getContentString))))
  .saveAsTextFile("plain-text-radio-rdd/")
```

There is also `discardContent` which does the opposite, and can be used in
cases where, for example, you have a frequent keyword you are not interested
in.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val content = Array("radio")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .select($"crawl_date", extractDomain($"url").alias("domain"), $"url", removeHTML(removeHTTPHeader($"content").alias("content")))
  .filter(hasContent($"content", lit(content)))
  .write.csv("plain-text-radio-df/")
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

content = "%radio%"

WebArchive(sc, sqlContext, "/path/to/warcs")\
  .webpages()\
  .select("crawl_date", Udf.extract_domain("url").alias("domain"), "url", Udf.remove_html(Udf.remove_http_header("content")).alias("content"))\
  .filter(col("content").like(content))
  .write.csv("plain-text-radio-df/")
```

## Extract Raw HTML

### Scala RDD

In most cases, users will be interested in working with plain text. In some
cases, however, you may want to work with the actual HTML of the pages
themselves (for example, looking for specific tags or HTML content).

The following script will produce the raw HTML of a WARC file. You can use the
filters from above to filter it down accordingly by domain, language, etc.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTTPHeaderRDD(r.getContentString)))
  .saveAsTextFile("plain-html-rdd/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

RecordLoader.loadArchives("example.warc.gz", sc)
  .webpages()
  .select($"crawl_date", extractDomain($"url"), $"url", removeHTTPHeader($"content"))
  .write.csv("plain-html-df/")
```

### Python DF

```python
from aut import *

WebArchive(sc, sqlContext, "/path/to/warcs")\
  .webpages()\
  .select("crawl_date", Udf.extract_domain("url").alias("domain"), "url", Udf.remove_http_header("content").alias("content"))\
  .write.csv("plain-html-df/")
```

## Extract Named Entities

### Scala RDD

**NER is Extremely Resource Intensive and Time Consuming!**

Named Entity Recognition is extremely resource intensive, and will take a very
long time. Our recommendation is to begin testing NER on one or two WARC files,
before trying it on a larger body of information. Depending on the speed of
your system, it can take a day or two to process information that you are used
to working with in under an hour.

The following script uses the [Stanford Named Entity
Recognizer](http://nlp.stanford.edu/software/CRF-NER.shtml) to extract names of
entities – persons, organizations, and locations – from collections of ARC/WARC
files or extracted texts. You can find a version of Stanford NER in our
aut-resources repo located
[here](https://github.com/archivesunleashed/aut-resources).

The script requires a NER classifier model. There is one provided in the
Stanford NER package (in the `classifiers` folder) called
`english.all.3class.distsim.crf.ser.gz`, but you can also use your own.

```scala
import io.archivesunleashed._
import io.archivesunleashed.app._
import io.archivesunleashed.matchbox._

sc.addFile("/path/to/classifier")

ExtractEntities.extractFromRecords("/path/to/classifier/english.all.3class.distsim.crf.ser.gz", "/path/to/warcs", "output-ner/", sc)
```

Note the call to `addFile()`. This is necessary if you are running this script
on a cluster; it puts a copy of the classifier on each worker node. The
classifier and input file paths may be local or on the cluster (e.g.,
`hdfs:///user/joe/collection/`).

The output of this script will be in the [WANE
format](https://webarchive.jira.com/wiki/spaces/ARS/pages/88309872/WANE+Overview+and+Technical+Details),
consisting of a JSON per line:

```json
{"timestamp":"20091218","url":"http://www.equalvoice.ca/images/images/french/js/images/sponsors/enbridge.jpg","named_entities":{"PERSON":["Sheila James Fund","Coyle","Sheila James","Regan"],"ORGANIZATION":["Equal Voice Equal Voice HOME","Mission Advisory Board Board of Directors & Staff Programs and Events EV Programs EV Events EV Speaks Out Research","NCR Ottawa British Columbia Alberta North Alberta South Youth Founders","Equal Voice","Equal Voice"],"LOCATION":["Toronto","Toronto Municipal Nova Scotia Newfoundland","Canada"]},"digest":"sha1:5U34IRCL74PEWGYHRGCXBCB3D2TDWHFE"}
{"timestamp":"20091218","url":"http://www.liberal.ca/share_e.aspx?link=http://www.liberal.ca/en/newsroom/liberal-tv/category/56E6B9156BA42F5F_events/4.36363636364/ZSj39F5L1rM~hommage-a-ceux-qui-ont-servi","named_entities":{"PERSON":["Edward Isand","Ignatieff","Harper","Flaherty","Stephen Harper","Ignatieff","Michael"],"ORGANIZATION":["Liberal Party of Canada","Liberal Party of Canada Home","Community Party Central History Board of directors Election Readiness Commissions En Famille","Quebec Saskatchewan Contact us Newsroom Blog Media Releases Official Graphics Media Contact Information RSS Newsfeeds Liberal TV","Party","Liberal Party of Canada","Liberal Party","Yarmouth","Federal Liberal Agency of Canada","Liberal Party of Canada"],"LOCATION":["Alberta British Columbia Manitoba New Brunswick Newfoundland","Labrador Nova Scotia Ontario","Copenhagen","Canada","Canada"]},"digest":"sha1:LQ45W44PR6MG6MZEGEVMZVQC3YHIWDRC"}
```

### Scala DF

**To be implemented.**

### Python DF

**To be implemented.**
