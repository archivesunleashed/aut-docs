---
id: link-analysis
title: Link Analysis
---

Site link structures can be very useful, allowing you to learn such things as:

- what websites were the most linked to;
- what websites had the most outbound links;
- what paths could be taken through the network to connect pages;
- what communities existed within the link structure?

Most of the following examples show the **domain** to **domain** links. For
example, you discover how many times that `liberal.ca` linked to `twitter.com`,
rather than learning that `http://liberal.ca/contact` linked to
`http://twitter.com/liberal_party`. The reason we do that is that in general,
if you are working with any data at scale, the sheer number of raw URLs can
become overwhelming. That said,, we do provide one example below that provides
raw data.

## Extract Simple Site Link Structure

### Scala RDD

If your web archive does not have a temporal component, the following Spark
script will generate the site-level link structure.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .flatMap(r => ExtractLinks(r.getUrl, r.getContentString))
  .map(r => (ExtractDomain(r._1).removePrefixWWW(), ExtractDomain(r._2).removePrefixWWW()))
  .filter(r => r._1 != "" && r._2 != "")
  .countItems()
  .filter(r => r._2 > 5)
  .saveAsTextFile("links-all-rdd/")
```

Note how you can add filters are added. In this case, we add a filter which
will result in a network graph of pages containing the phrase "apple." Filters
can be applied immediately after `.keepValidPages()`.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepContent(Set("apple".r))
  .flatMap(r => ExtractLinks(r.getUrl, r.getContentString))
  .map(r => (ExtractDomain(r._1).removePrefixWWW(), ExtractDomain(r._2).removePrefixWWW()))
  .filter(r => r._1 != "" && r._2 != "")
  .countItems()
  .filter(r => r._2 > 5)
  .saveAsTextFile("links-all-apple-rdd/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webgraph()
  .groupBy(removePrefixWWW(extractDomain($"src")).as("src"), removePrefixWWW(extractDomain($"dest")).as("dest"))
  .count()
  .filter($"count" > 5)
  .write.csv("links-all-df/")
```

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val content = Array("radio")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .filter(hasContent($"content", lit(content)))
  .select(explode(extractLinks($"url", $"content")).as("links"))
  .select(removePrefixWWW(extractDomain(col("links._1"))).as("src"), removePrefixWWW(extractDomain(col("links._2"))).as("dest"))
  .groupBy("src", "dest")
  .count()
  .filter($"count" > 5)
  .write.csv("links-all-apple-df/")
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col, explode

content = "%radio%"

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .webpages() \
  .filter(col("content").like(content)) \
  .select(explode(extract_links("url", "content")).alias("links")) \
  .select(remove_prefix_www(extract_domain(col("links._1"))).alias("src"), remove_prefix_www(extract_domain(col("links._2"))).alias("dest")) \
  .groupBy("src", "dest") \
  .count() \
  .filter(col("count") > 5) \
  .write.csv("links-all-apple-df/")
```

## Extract Raw URL Link Structure

### Scala RDD

This following script extracts all of the hyperlink relationships between
sites, using the full URL pattern.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .flatMap(r => ExtractLinks(r.getUrl, r.getContentString))
  .filter(r => r._1 != "" && r._2 != "")
  .countItems()
  .saveAsTextFile("full-links-all-rdd/")
```

You can see that the above was achieved by removing the following line:

```scala
  .map(r => (ExtractDomain(r._1).removePrefixWWW(), ExtractDomain(r._2).removePrefixWWW()))
```

In a larger collection, you might want to add the following line:

```scala
.filter(r => r._2 > 5)
```

before `.countItems()` to find just the documents that are linked to more than
five times. As you can imagine, raw URLs are very numerous!

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webgraph()
  .groupBy(extractDomain($"src"), extractDomain($"dest"))
  .count()
  .filter($"count" > 5)
  .write.csv("full-links-all-df/")
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .webgraph() \
  .groupBy(extract_domain("src"), extract_domain("dest")) \
  .count() \
  .filter(col("count") > 5) \
  .write.csv("full-links-all-df/")
```

## Organize Links by URL Pattern

### Scala RDD

In this following example, we run the same script but only extract links coming
from URLs matching the pattern `http://www.archive.org/details/*`. We do so by
using the `keepUrlPatterns` command.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepUrlPatterns(Set("(?i)http://www.archive.org/details/.*".r))
  .flatMap(r => ExtractLinks(r.getUrl, r.getContentString))
  .map(r => (ExtractDomain(r._1).removePrefixWWW(), ExtractDomain(r._2).removePrefixWWW()))
  .filter(r => r._1 != "" && r._2 != "")
  .countItems()
  .filter(r => r._2 > 5)
  .saveAsTextFile("details-links-all-rdd/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val urlPattern = Array("(?i)http://www.archive.org/details/.*")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .filter($"url", lit(urlPattern))
  .select(explode(extractLinks($"url", $"content")).as("links")
  .select(removePrefixWWW(extractDomain(col("links._1"))).as("src"), removePrefixWWW(extractDomain(col("links._2"))).as("dest"))
  .groupBy("src", "dest")
  .count()
  .filter($"count" > 5)
  .write.csv("details-links-all-df/")
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col, explode

url_pattern = "%http://www.archive.org/details/%"

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .webpages() \
  .filter(col("url").like(url_pattern)) \
  .select(explode(extract_links("url", "content").alias("links"))) \
  .select(remove_prefix_www(extract_domain(col("links._1"))).alias("src"), remove_prefix_www(extract_domain("links._2")).alias("dest")) \
  .groupBy("src", "dest") \
  .count() \
  .filter(col("count") > 5) \
  .write.csv("details-links-all-df/")
```

## Organize Links by Crawl Date

### Scala RDD

The following Spark script generates the aggregated site-level link structure,
grouped by crawl date (YYYYMMDD). It
makes use of the `ExtractLinks` and `ExtractToLevelDomain` functions.

If you prefer to group by crawl month (YYYMM), replace `getCrawlDate` with
`getCrawlMonth` below. If you prefer to group by simply crawl year (YYYY),
replace `getCrawlDate` with `getCrawlYear` below.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc).keepValidPages()
  .map(r => (r.getCrawlDate, ExtractLinks(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1, ExtractDomain(f._1).replaceAll("^\\s*www\\.", ""), ExtractDomain(f._2).replaceAll("^\\s*www\\.", ""))))
  .filter(r => r._2 != "" && r._3 != "")
  .countItems()
  .filter(r => r._2 > 5)
  .saveAsTextFile("sitelinks-by-date-rdd/")
```

The format of this output is:

- Field one: Crawldate, `yyyyMMdd`
- Field two: Source domain (i.e. liberal.ca)
- Field three: Target domain of link (i.e. ndp.ca)
- Field four: number of links.

```scala
((20080612,liberal.ca,liberal.ca),1832983)
((20060326,ndp.ca,ndp.ca),1801775)
((20060426,ndp.ca,ndp.ca),1771993)
((20060325,policyalternatives.ca,policyalternatives.ca),1735154)
```

In the above example, you are seeing links within the same domain.

Note also that `ExtractLinksRDD` takes an optional third parameter of a base
URL. If you set this – typically to the source URL – `ExtractLinksRDD` will
resolve a relative path to its absolute location. For example, if `val url =
"http://mysite.com/some/dirs/here/index.html"` and `val html = "... <a
href='../contact/'>Contact</a> ..."`, and we call `ExtractLinks(url, html,
url)`, the list it returns will include the item
`(http://mysite.com/a/b/c/index.html, http://mysite.com/a/b/contact/,
Contact)`. It may be useful to have this absolute URL if you intend to call
`ExtractDomainRDD` on the link and wish it to be counted.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webgraph()
  .groupBy($"crawl_date", removePrefixWWW(extractDomain($"src")), removePrefixWWW(extractDomain($"dest")))
  .count()
  .filter($"count" > 5)
  .write.csv("sitelinks-by-date-df/")
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .webgraph() \
  .groupBy("crawl_date", remove_prefix_www(extract_domain("src")).alias("src"), remove_prefix_www(extract_domain("dest")).alias("dest")) \
  .count() \
  .filter(col("count") > 5) \
  .write.csv("sitelinks-by-date-df/")
```

## Filter by URL

### Scala RDD

In this case, you would only receive links coming from websites in matching the
URL pattern listed under `keepUrlPatterns`.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

val links = RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepUrlPatterns(Set("http://www.archive.org/details/.*".r))
  .map(r => (r.getCrawlDate, ExtractLinks(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1, ExtractDomain(f._1).replaceAll("^\\s*www\\.", ""), ExtractDomain(f._2).replaceAll("^\\s*www\\.", ""))))
  .filter(r => r._2 != "" && r._3 != "")
  .countItems()
  .filter(r => r._2 > 5)
  .saveAsTextFile("sitelinks-details-rdd/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val urlPattern = Array("http://www.archive.org/details/.*")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .filter($"url", lit(urlPattern))
  .select(explode(extractLinks($"url", $"content")).as("links"))
  .select(removePrefixWWW(extractDomain(col("links._1"))).as("src"), removePrefixWWW(extractDomain(col("links._2"))).as("dest"))
  .groupBy("src", "dest")
  .count()
  .filter($"count" > 5)
  .write.csv("sitelinks-details-df/")
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col, explode

url_pattern = "http://www.archive.org/details/.*"

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .webpages() \
  .filter(col("url").rlike(url_pattern)) \
  .select(explode(extract_links("url", "content")).alias("links")) \
  .select(remove_prefix_www(extract_domain(col("links._1"))).alias("src"), remove_prefix_www(extract_domain(col("links._2"))).alias("dest")) \
  .groupBy("src", "dest") \
  .count() \
  .filter(col("count") > 5) \
  .write.csv("sitelinks-details-df/")
```

## Export to Gephi

You may want to export your data directly to the [Gephi software
suite](http://gephi.github.io/), an open-source network analysis project. The
following code writes to the GEXF format:

### Scala RDD

**Will not be implemented.**

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._
import io.archivesunleashed.app._

val graph = webgraph.groupBy(
                       $"crawl_date",
                       removePrefixWWW(extractDomain($"src")).as("src_domain"),
                       removePrefixWWW(extractDomain($"dest")).as("dest_domain"))
              .count()
              .filter(!($"dest_domain"===""))
              .filter(!($"src_domain"===""))
              .filter($"count" > 5)
              .orderBy(desc("count"))
              .collect()

WriteGEXF(graph, "links-for-gephi.gexf")
```

We also support exporting to the
[GraphML](https://en.wikipedia.org/wiki/GraphML) format. To do so, use
the `WriteGraphml` method:

```scala
WriteGraphML(graph, "links-for-gephi.graphml")
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col, desc

graph = WebArchive(sc, sqlContext, "/path/to/data") \
          .webgraph() \
          .groupBy("crawl_date", remove_prefix_www(extract_domain("src")).alias("src_domain"), remove_prefix_www(extract_domain("dest")).alias("dest_domain")) \
          .count() \
          .filter((col("dest_domain").isNotNull()) & (col("dest_domain") !="")) \
          .filter((col("src_domain").isNotNull()) & (col("src_domain") !="")) \
          .filter(col("count") > 5) \
          .orderBy(desc("count")) \
          .collect()

WriteGEXF(graph, "links-for-gephi.gexf")
```

We also support exporting to the
[GraphML](https://en.wikipedia.org/wiki/GraphML) format. To do so, use
the `WriteGraphml` method:

```python
WriteGraphML(graph, "links-for-gephi.graphml")
```

## Finding Hyperlinks within Collection on Pages with Certain Keyword

The following script will extract a DataFrame with the following columns,
`domain`, `url`, `crawl date`, `origin page`, and `destination page`, given a
search term `Keystone` of the content (full-text). The example uses the sample
data in
[`aut-resources`](https://github.com/archivesunleashed/aut-resources/tree/master/Sample-Data).

### Scala RDD

**Will not be implemented.**

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val result = udf((vs: Seq[Any]) => vs(0)
               .toString
               .split(",")(1))

val df = RecordLoader.loadArchives("/path/to/warcs", sc)
          .webpages()
          .select(removePrefixWWW(extractDomain($"url"))
            .as("domain"), $"url"
            .as("url"), $"crawl_date", explode_outer(extractLinks($"url", $"content"))
            .as("link"))
          .filter($"content".contains("keystone"))

df.select($"url", $"domain", $"crawl_date", result(array($"link"))
    .as("destination_page"))
  .show()

// Exiting paste mode, now interpreting.

+--------------------+---------------+----------+--------------------+
|                 url|         domain|crawl_date|    destination_page|
+--------------------+---------------+----------+--------------------+
|http://www.davids...|davidsuzuki.org|  20091219|http://www.davids...|
|http://www.davids...|davidsuzuki.org|  20091219|http://www.davids...|
|http://www.davids...|davidsuzuki.org|  20091219|http://www.davids...|
|http://www.davids...|davidsuzuki.org|  20091219|http://www.davids...|
|http://www.davids...|davidsuzuki.org|  20091219|http://www.davids...|
|http://www.davids...|davidsuzuki.org|  20091219|http://www.davids...|
|http://www.davids...|davidsuzuki.org|  20091219|http://www.davids...|
|http://www.davids...|davidsuzuki.org|  20091219|http://www.davids...|
|http://www.davids...|davidsuzuki.org|  20091219|http://www.davids...|
|http://www.davids...|davidsuzuki.org|  20091219|http://www.davids...|
|http://www.davids...|davidsuzuki.org|  20091219|http://www.davids...|
|http://www.davids...|davidsuzuki.org|  20091219|http://www.davids...|
|http://www.davids...|davidsuzuki.org|  20091219|http://www.davids...|
|http://www.davids...|davidsuzuki.org|  20091219|http://www.davids...|
|http://www.davids...|davidsuzuki.org|  20091219|http://www.davids...|
|http://www.davids...|davidsuzuki.org|  20091219|http://www.davids...|
|http://www.davids...|davidsuzuki.org|  20091219|http://www.davids...|
|http://www.davids...|davidsuzuki.org|  20091219|http://www.davids...|
|http://www.davids...|davidsuzuki.org|  20091219|http://www.davids...|
|http://www.davids...|davidsuzuki.org|  20091219|http://www.davids...|
+--------------------+---------------+----------+--------------------+
only showing top 20 rows

import io.archivesunleashed._
import io.archivesunleashed.udfs._
result: org.apache.spark.sql.expressions.UserDefinedFunction = UserDefinedFunction(<function1>,StringType,None)
df: org.apache.spark.sql.Dataset[org.apache.spark.sql.Row] = [Domain: string, url: string ... 2 more fields]
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col, explode_outer

webpages = WebArchive(sc, sqlContext, "/path/to/warcs") \
  .webpages() \
  .select(remove_prefix_www(extract_domain("url")).alias("domain"), "url", "crawl_date", explode_outer(extract_links("url", "content")).alias("link")) \
  .filter(col("content").like("%food%")) \
  .select("url", "domain", "crawl_date", col("link._1").alias("destination_page")) \
  .show()
```
