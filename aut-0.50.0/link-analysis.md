# Link Analysis

- [Extract Simple Site Link Structure](#Extract-Simple-Site-Link-Structure)
- [Extract Raw URL Link Structure](#Extract-Raw-URL-Link-Structure)
- [Organize Links by URL Pattern](#Organize-Links-by-URL-Pattern)
- [Organize Links by Crawl Date](#Organize-Links-by-Crawl-Date)
- [Filter by URL](#Filter-by-URL)
- [Export to Gephi](#Export-to-Gephi)

Site link structures can be very useful, allowing you to learn such things as:

- what websites were the most linked to;
- what websites had the most outbound links;
- what paths could be taken through the network to connect pages;
- what communities existed within the link structure?

Most of the following examples show the **domain** to **domain** links. For example, you discover how many times that `liberal.ca` linked to `twitter.com`, rather than learning that `http://liberal.ca/contact` linked to `http://twitter.com/liberal_party`. The reason we do that is that in general, if you are working with any data at scale, the sheer number of raw URLs can become overwhelming. Though, we do provide one example below that provides raw data.

## Extract Simple Site Link Structure

### Scala RDD

If your web archive does not have a temporal component, the following Spark script will generate the site-level link structure.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._
import io.archivesunleashed.util._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .flatMap(r => ExtractLinksRDD(r.getUrl, r.getContentString))
  .map(r => (ExtractDomainRDD(r._1).removePrefixWWW(), ExtractDomainRDD(r._2).removePrefixWWW()))
  .filter(r => r._1 != "" && r._2 != "")
  .countItems()
  .filter(r => r._2 > 5)
  .saveAsTextFile("links-all-rdd/")
```

Note how you can add filters are added. In this case, we add a filter which will result in a network graph of pages containing the phrase "apple." Filters can be applied immediately after `.keepValidPages()`.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._
import io.archivesunleashed.util._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepContent(Set("apple".r))
  .flatMap(r => ExtractLinksRDD(r.getUrl, r.getContentString))
  .map(r => (ExtractDomainRDD(r._1).removePrefixWWW(), ExtractDomainRDD(r._2).removePrefixWWW()))
  .filter(r => r._1 != "" && r._2 != "")
  .countItems()
  .filter(r => r._2 > 5)
  .saveAsTextFile("links-all-apple-rdd/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webgraph()
  .groupBy(RemovePrefixWWWDF(ExtractDomainDF($"src")).as("src"), RemovePrefixWWWDF(ExtractDomainDF($"dest")).as("dest"))
  .count()
  .filter($"count" > 5)
  .write.csv("links-all-df/")
```

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .keepContentDF(Set("apple".r))
  .select(explode(ExtractLinksDF($"url", $"content")).as("links"))
  .select(RemovePrefixWWWDF(ExtractDomainDF(col("links._1"))).as("src"), RemovePrefixWWWDF(ExtractDomainDF(col("links._2"))).as("dest"))
  .groupBy("src", "dest")
  .count()
  .filter($"count" > 5)
  .write.csv("links-all-apple-df/")
```

### Python DF

TODO

## Extract Raw URL Link Structure

### Scala RDD

This following script extracts all of the hyperlink relationships between sites, using the full URL pattern.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .flatMap(r => ExtractLinksRDD(r.getUrl, r.getContentString))
  .filter(r => r._1 != "" && r._2 != "")
  .countItems()
  .saveAsTextFile("full-links-all-rdd/")
```

You can see that the above was achieved by removing the following line:

```scala
  .map(r => (ExtractDomainRDD(r._1).removePrefixWWW(), ExtractDomainRDD(r._2).removePrefixWWW()))
```

In a larger collection, you might want to add the following line:

```
.filter(r => r._2 > 5)
```

before `.countItems()` to find just the documents that are linked to more than five times. As you can imagine, raw URLs are very numerous!

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webgraph()
  .groupBy(ExtractDomainDF($"src"), ExtractDomainDF($"dest"))
  .count()
  .filter($"count" > 5)
  .write.csv("full-links-all-df/")
```

### Python DF

TODO

## Organize Links by URL Pattern

### Scala RDD

In this following example, we run the same script but only extract links coming from URLs matching the pattern `http://www.archive.org/details/*`. We do so by using the `keepUrlPatterns` command.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._
import io.archivesunleashed.util._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepUrlPatterns(Set("(?i)http://www.archive.org/details/.*".r))
  .flatMap(r => ExtractLinksRDD(r.getUrl, r.getContentString))
  .map(r => (ExtractDomainRDD(r._1).removePrefixWWW(), ExtractDomainRDD(r._2).removePrefixWWW()))
  .filter(r => r._1 != "" && r._2 != "")
  .countItems()
  .filter(r => r._2 > 5)
  .saveAsTextFile("details-links-all-rdd/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .keepUrlPatternsDF(Set("(?i)http://www.archive.org/details/.*".r))
  .select(explode(ExtractLinksDF($"url", $"content")).as("links")
  .select(RemovePrefixWWWDF(ExtractDomainDF(col("links._1"))).as("src"), RemovePrefixWWWDF(ExtractDomainDF(col("links._2"))).as("dest"))
  .groupBy("src", "dest")
  .count()
  .filter($"count" > 5)
  .write.csv("details-links-all-df/")
```

### Python DF

TODO

## Organize Links by Crawl Date

### Scala RDD

The following Spark script generates the aggregated site-level link structure, grouped by crawl date (YYYYMMDD). It
makes use of the `ExtractLinks` and `ExtractToLevelDomain` functions.

If you prefer to group by crawl month (YYYMM), replace `getCrawlDate` with `getCrawlMonth` below. If you prefer to group by simply crawl year (YYYY), replace `getCrawlDate` with `getCrawlYear` below.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc).keepValidPages()
  .map(r => (r.getCrawlDate, ExtractLinksRDD(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1, ExtractDomainRDD(f._1).replaceAll("^\\s*www\\.", ""), ExtractDomainRDD(f._2).replaceAll("^\\s*www\\.", ""))))
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

```
((20080612,liberal.ca,liberal.ca),1832983)
((20060326,ndp.ca,ndp.ca),1801775)
((20060426,ndp.ca,ndp.ca),1771993)
((20060325,policyalternatives.ca,policyalternatives.ca),1735154)
```

In the above example, you are seeing links within the same domain.

Note also that `ExtractLinksRDD` takes an optional third parameter of a base URL. If you set this – typically to the source URL –
`ExtractLinksRDD` will resolve a relative path to its absolute location. For example, if
`val url = "http://mysite.com/some/dirs/here/index.html"` and `val html = "... <a href='../contact/'>Contact</a> ..."`, and we call `ExtractLinksRDD(url, html, url)`, the list it returns will include the
item `(http://mysite.com/a/b/c/index.html, http://mysite.com/a/b/contact/, Contact)`. It may
be useful to have this absolute URL if you intend to call `ExtractDomainRDD` on the link
and wish it to be counted.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webgraph()
  .groupBy($"crawl_date", RemovePrefixWWWDF(ExtractDomainDF($"src")), RemovePrefixWWWDF(ExtractDomainDF($"dest")))
  .count()
  .filter($"count" > 5)
  .write.csv("sitelinks-by-date-df/")
```

### Python DF

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.webpages()
df.select(extract_domain("crawl_date").alias("Crawl Date")).groupBy("Crawl Date").count().show()
```

## Filter by URL

### Scala RDD

In this case, you would only receive links coming from websites in matching the URL pattern listed under `keepUrlPatterns`.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

val links = RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .keepUrlPatterns(Set("http://www.archive.org/details/.*".r))
  .map(r => (r.getCrawlDate, ExtractLinksRDD(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1, ExtractDomainRDD(f._1).replaceAll("^\\s*www\\.", ""), ExtractDomainRDD(f._2).replaceAll("^\\s*www\\.", ""))))
  .filter(r => r._2 != "" && r._3 != "")
  .countItems()
  .filter(r => r._2 > 5)
  .saveAsTextFile("sitelinks-details-rdd/")
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .keepUrlPatternsDF(Set("http://www.archive.org/details/.*".r))
  .select(explode(ExtractLinksDF($"url", $"content")).as("links"))
  .select(RemovePrefixWWWDF(ExtractDomainDF(col("links._1"))).as("src"), RemovePrefixWWWDF(ExtractDomainDF(col("links._2"))).as("dest"))
  .groupBy("src", "dest")
  .count()
  .filter($"count" > 5)
  .write.csv("sitelinks-details-df/")
```

### Python DF

TODO

## Export to Gephi

### Scala RDD

You may want to export your data directly to the [Gephi software suite](http://gephi.github.io/), an open-source network analysis project. The following code writes to the GEXF format:

```scala
import io.archivesunleashed._
import io.archivesunleashed.app._
import io.archivesunleashed.matchbox._

val links = RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .map(r => (r.getCrawlDate, ExtractLinksRDD(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1,
                               ExtractDomainRDD(f._1).replaceAll("^\\s*www\\.", ""),
                               ExtractDomainRDD(f._2).replaceAll("^\\s*www\\.", ""))))
  .filter(r => r._2 != "" && r._3 != "")
  .countItems()
  .filter(r => r._2 > 5)

WriteGraph(links, "links-for-gephi.gexf")
```

This file can then be directly opened by Gephi.

We also support exporting to the [GraphML](https://en.wikipedia.org/wiki/GraphML) format. To do so, the following variation on `WriteGraph` will work:

```scala
WriteGraph.asGraphml(links, "links-for-gephi.graphml")
```

### Scala DF

**To be implemented.**

### Python DF

**To be implemented.**

## Finding Hyperlinks within Collection on Pages with Certain Keyword

The following script will extract a DataFrame with the following columns, `domain`, `URL`, `crawl date`, `origin page`, and `destination page`, given a search term `Keystone` of the content (full-text). The example uses the sample data in [`aut-resources`](https://github.com/archivesunleashed/aut-resources/tree/master/Sample-Data).

### Scala RDD

**Will not be implemented.**

### Scala DF
```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val result = udf((vs: Seq[Any]) => vs(0)
               .toString
               .split(",")(1))

val df = RecordLoader.loadArchives("Sample-Data/*gz", sc)
          .webpages()
          .select(RemovePrefixWWWDF(ExtractDomainDF($"url"))
            .as("Domain"), $"url"
            .as("url"),$"crawl_date", explode_outer(ExtractLinksDF($"url", $"content"))
            .as("link"))
          .filter($"content".contains("keystone"))

df.select($"url", $"Domain", $"crawl_date", result(array($"link"))
    .as("destination_page"))
  .show()

// Exiting paste mode, now interpreting.

+--------------------+---------------+----------+--------------------+          
|                 url|         Domain|crawl_date|    destination_page|
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
import io.archivesunleashed.df._
result: org.apache.spark.sql.expressions.UserDefinedFunction = UserDefinedFunction(<function1>,StringType,None)
df: org.apache.spark.sql.Dataset[org.apache.spark.sql.Row] = [Domain: string, url: string ... 2 more fields]
```

### Python DF

TODO
