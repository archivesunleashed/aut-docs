---
id: version-1.0.0-text-analysis
title: Text Analysis
original_id: text-analysis
---

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
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(r.getContentString)))
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
  .select($"crawl_date", $"domain", $"url", removeHTML($"content"))
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
  .select("crawl_date", "domain", "url", remove_html("content")) \
  .write \
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ") \
  .format("csv") \
  .option("escape", "\"") \
  .option("encoding", "utf-8") \
  .save("plain-text-df/")
```

## Extract Plain Text Without HTTP Headers

### Scala RDD

If you want to remove HTTP headers, you can add one more command:
`RemoveHTTPHeader`. The script would then look like:

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader(r.getContentString))))
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
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save("plain-text-noheaders-df/")
```

### Python DF

```python
from aut import *

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .webpages() \
  .select(remove_html(remove_http_header("content"))) \
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")\
  .format("csv")\
  .option("escape", "\"")\
  .option("encoding", "utf-8")\
  .save("plain-text-noheaders-df/")
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
  .select($"crawl_date", $"domain", $"url", removeHTML(removeHTTPHeader($"content")))
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
  .select("crawl_date", "domain", "url", remove_html(remove_http_header("content"))) \
  .filter(col("domain").isin(domains)) \
  .write \
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ") \
  .format("csv") \
  .option("escape", "\"") \
  .option("encoding", "utf-8") \
  .save("plain-text-domain-df/")
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
  .select($"crawl_date", $"domain", $"url", removeHTML(removeHTTPHeader($"content")))
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
  .select("crawl_date", "domain", "url", remove_html(remove_http_header("content"))) \
  .filter(col("url").like(url_pattern)) \
  .write \
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ") \
  .format("csv") \
  .option("escape", "\"") \
  .option("encoding", "utf-8") \
  .save("details-df/")
```

## Extract Plain Text Minus Boilerplate

### Scala RDD

The following Spark script generates plain text renderings for all the web
pages in a collection, minus "boilerplate" content: advertisements,
navigational elements, and elements of the website template. Boilerplate requires
HTML, so it needs to run on `.all()` raw content. Not `.webpages()` content. For
more information on the boilerplate removal library we are using, [please see
this website and paper](http://www.l3s.de/~kohlschuetter/boilerplate/).

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
  .keepDate(List("200804"), ExtractDate.DateComponent.YYYYMM)
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader(r.getContentString))))
  .saveAsTextFile("plain-text-date-filtered-200804/")
```

The following script extracts plain text for a given collection by year (in
this case, 2008).

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepDate(List("2008"), ExtractDate.DateComponent.YYYY)
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader(r.getContentString))))
  .saveAsTextFile("plain-text-date-filtered-2008/")
```

Finally, you can also extract multiple dates or years. In this case, we would
extract pages from both 2008 and 2015.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepDate(List("2008","2015"), ExtractDate.DateComponent.YYYY)
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader(r.getContentString))))
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
  .save("plain-text-date-filtered-2008-2015-df/")
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
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHTTPHeader(r.getContentString))))
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
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTTPHeader(r.getContentString)))
  .saveAsTextFile("plain-html-rdd/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

RecordLoader.loadArchives("example.warc.gz", sc)
  .webpages()
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
  .webpages() \
  .select("crawl_date", "domain", "url", remove_http_header("content")) \
  .write \
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ") \
  .format("csv") \
  .option("escape", "\"") \
  .option("encoding", "utf-8") \
  .save("plain-html-df/")
```
