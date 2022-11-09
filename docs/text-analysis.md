---
id: text-analysis
title: Text Extraction
---

## Extract Web Page Text

This set of examples extracts the text for all the web pages in a collection,
and writes the output to a specified directory. Note that this will create a
new directory to store the output, which cannot already exist.

### Scala RDD

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader((r.getContentString))))
  .saveAsTextFile("plain-text-rdd/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .select($"crawl_date", $"domain", $"url", $"content")
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save("plain-text-df/")
```

### Python DF

```python
from aut import *

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .webpages() \
  .select("crawl_date", "domain", "url", "content") \
  .write \
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ") \
  .format("csv") \
  .option("escape", "\"") \
  .option("encoding", "utf-8") \
  .save("plain-text-df/")
```

## Extract Web Page Text By Domain

This set of examples extracts the text for all the web pages in a collection
matching a list of domains. Specifically in this example, it will go through
a collection of W/ARCs and extract the text of web pages matching the domain
`archive.org`.

### Scala RDD

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepDomains(Set("archive.org"))
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader(r.getContentString))))
  .saveAsTextFile("plain-text-domain-rdd/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val domains = Array("archive.org", "geocities.org")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .select($"crawl_date", $"domain", $"url", $"content")
  .filter(hasDomains($"domain", lit(domains)))
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save("plain-text-domain-df/")
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

domains = ["archive.org"]

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .webpages() \
  .select("crawl_date", "domain", "url", "content") \
  .filter(col("domain").isin(domains)) \
  .write \
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ") \
  .format("csv") \
  .option("escape", "\"") \
  .option("encoding", "utf-8") \
  .save("plain-text-domain-df/")
```

## Extract Web Page Text by URL Pattern

This set of examples extracts the text for all the web pages in a collection
with a URL matching a regular expression pattern. Specifically in this example
, it will go through a collection of W/ARCs and extract the text of web pages
matching the URLs beginning with `http://archive.org/details/`.

`(?i)` makes the query case insensitive.

### Scala RDD

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepUrlPatterns(Set("(?i)http://www.archive.org/details/.*".r))
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader(r.getContentString))))
  .saveAsTextFile("details-rdd/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val urlPattern = Array("(?i)http://www.archive.org/details/.*")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .select($"crawl_date", $"domain", $"url", $"content")
  .filter(hasUrlPatterns($"url", lit(urlPattern)))
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save("details-df/")
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

url_pattern = "%http://www.archive.org/details/%"

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .webpages() \
  .select("crawl_date", "domain", "url", "content") \
  .filter(col("url").like(url_pattern)) \
  .write \
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ") \
  .format("csv") \
  .option("escape", "\"") \
  .option("encoding", "utf-8") \
  .save("details-df/")
```

## Extract Web Page Text Minus Boilerplate

This set of examples extracts the text for all the web pages in a collection
minus "boilerplate" content: advertisements, navigational elements, and
elements of the website template. Boilerplate requires HTML, so it needs to
used with `.all()`, not `.webpages()`.  For more information on the boilerplate
removal library we are using, [please see this website and paper](http://www.l3s.de/~kohlschuetter/boilerplate/).

### Scala RDD

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepDomains(Set("archive.org"))
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, ExtractBoilerpipeText(RemoveHTTPHeader(r.getContentString))))
  .saveAsTextFile("plain-text-no-boilerplate-rdd/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val domains = Array("archive.org")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .all()
  .select($"crawl_date", $"domain", $"url", extractBoilerpipeText(removeHTTPHeader($"content")))
  .filter(hasDomains($"domain", lit(domains)))
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save("plain-text-no-boilerplate-df/")
```

### Python DF

```python
from aut import *

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .webpages() \
  .select("crawl_date", "domain", "url", extract_boilerplate(remove_http_header("content")).alias("content")) \
  .write \
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ") \
  .format("csv") \
  .option("escape", "\"") \
  .option("encoding", "utf-8") \
  .save("plain-text-no-boilerplate-df/")
```

## Extract Web Page Text Filtered by Date

This set of examples extracts the text for all the web pages in a collection 
filtered by a given crawl date or last modified date. AUT allows filtering
records by a list of full or partial date strings. It conceives of the date
string as a `DateComponent`. Use `keepDate` to specify the year (`YYYY`),
month (`MM`), day (`DD`), year and month (`YYYYMM`), or a particular
year-month-day (`YYYYMMDD`). Specifically in this example, it will go through
a collection of W/ARCs and extract the text of web pages matching with a
`crawl_date` of April 2008, or from the year 2008 or 2015.

### Scala RDD

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepDate(List("200804"), ExtractDate.DateComponent.YYYYMM)
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader(r.getContentString))))
  .saveAsTextFile("plain-text-date-filtered-200804/")
```

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepDate(List("2008"), ExtractDate.DateComponent.YYYY)
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader(r.getContentString))))
  .saveAsTextFile("plain-text-date-filtered-2008/")
```

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepDate(List("2008","2015"), ExtractDate.DateComponent.YYYY)
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader(r.getContentString))))
  .saveAsTextFile("plain-text-date-filtered-2008-2015-rdd/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val dates = Array("2008", "2015")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .select($"crawl_date", $"domain", $"url", removeHTML(removeHTTPHeader($"content")))
  .filter(hasDate($"crawl_date", lit(dates)))
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save("plain-text-date-filtered-2008-2015-df/")
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

dates = "2009[10][09]\d\d"

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .webpages() \
  .select("crawl_date", "domain", "url", remove_html(remove_http_header("content"))) \
  .filter(col("crawl_date").rlike(dates)) \
  .write \
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ") \
  .format("csv") \
  .option("escape", "\"") \
  .option("encoding", "utf-8") \
  .save("plain-text-date-filtered-df/")
```

## Extract Web Page Text Filtered by Language

This set of examples extracts the text for all the web pages in a collection
with a given [ISO 639.2 language code](https://www.loc.gov/standards/iso639-2/php/code_list.php)
. Specifically in this example, it will go through a collection of W/ARCs and
extract the text of web pages identified as being French, as well as matching
the domain `archive.org`

### Scala RDD

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepDomains(Set("archive.org"))
  .keepLanguages(Set("fr"))
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader(r.getContentString))))
  .saveAsTextFile("plain-text-fr-rdd/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val domains = Array("archive.org")
val languages = Array("fr")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .select($"crawl_date", $"domain", $"url", $"language", removeHTML(removeHTTPHeader($"content")))
  .filter(hasDomains($"domain", lit(domains)))
  .filter(hasLanguages($"language", lit(languages)))
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save("plain-text-fr-df/")
```

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val domains = Array("archive.org")
val languages = Array("fr")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .filter(hasDomains($"domain", lit(domains)))
  .filter(hasLanguages($"language", lit(languages)))
  .select($"crawl_date", $"domain", $"url", $"language", removeHTML(removeHTTPHeader($"content")))
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save("plain-text-fr-df/")
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

domains = ["geocities.com"]
languages = ["fr"]

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .webpages() \
  .select("crawl_date", "domain", "url", remove_html(remove_http_header("content"))) \
  .filter(col("domain").isin(domains)) \
  .filter(col("language").isin(languages)) \
  .write \
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ") \
  .format("csv") \
  .option("escape", "\"") \
  .option("encoding", "utf-8") \
  .save("plain-text-fr-df/")
```

## Extract Web Page Text Filtered by Keyword

This set of examples extracts the text for all the web pages in a collection
with `content` matching a given string or list of string. Specifically in this
example, it will go through a collection of W/ARCs and extract the text of web
pages containing the string `radio`.

There is also `discardContent` which does the opposite, and can be used in
cases where, for example, you have a frequent keyword you are not interested
in.

### Scala RDD

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs",sc)
  .keepValidPages()
  .keepContent(Set("radio".r))
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader(r.getContentString))))
  .saveAsTextFile("plain-text-radio-rdd/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val content = Array("radio")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .select($"crawl_date", $"domain", $"url", removeHTML(removeHTTPHeader($"content")))
  .filter(hasContent($"content", lit(content)))
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save("plain-text-radio-df/")
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

content = "%radio%"

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .webpages() \
  .select("crawl_date", "domain", "url", remove_html(remove_http_header("content"))) \
  .filter(col("content").like(content)) \
  .write \
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ") \
  .format("csv") \
  .option("escape", "\"") \
  .option("encoding", "utf-8") \
  .save("plain-text-radio-df/")
```

## Extract Raw HTML and Content of Web Pages

This set of examples extracts the HTML and text for all the web pages in a
collection.

### Scala RDD

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTTPHeader(r.getContentString)))
  .saveAsTextFile("plain-html-rdd/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

RecordLoader.loadArchives("example.warc.gz", sc)
  .all()
  .select($"crawl_date", extractDomain($"url"), $"url", removeHTTPHeader($"content"))
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save("plain-html-df/")
```

### Python DF

```python
from aut import *

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .all() \
  .select("crawl_date", "domain", "url", remove_http_header("content")) \
  .write \
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ") \
  .format("csv") \
  .option("escape", "\"") \
  .option("encoding", "utf-8") \
  .save("plain-html-df/")
```
