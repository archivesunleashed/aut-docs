# Link Analysis

- [Extract Simple Site Link Structure](#Extract-Simple-Site-Link-Structure)
- [Extract Raw URL Link Structure](#Extract-Raw-URL-Link-Structure)
- [Organize Links by URL Pattern](#Organize-Links-by-URL-Pattern)
- [Organize Links by Crawl Date](#Organize-Links-by-Crawl-Date)
- [Export as TSV](#Export-as-TSV)
- [Filter by URL](#Filter-by-URL)
- [Export to Gephi](#Export-to-Gephi)

Site link structures can be very useful, allowing you to learn such things as:

- what websites were the most linked to;
- what websites had the most outbound links;
- what paths could be taken through the network to connect pages;
- what communities existed within the link structure?

Most of the following examples show the **domain** to **domain** links. For example, you discover how many times that `liberal.ca` linked to `twitter.com`, rather than learning that `http://liberal.ca/contact` linked to `http://twitter.com/liberal_party`. The reason we do that is that in general, if you are working with any data at scale, the sheer number of raw URLs can become overwhelming.

We do provide one example below that provides raw data, however.

## Extract Simple Site Link Structure

### Scala RDD

If your web archive does not have a temporal component, the following Spark script will generate the site-level link structure.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._
import io.archivesunleashed.util._

val links = RecordLoader.loadArchives("example.arc.gz", sc)
  .keepValidPages()
  .flatMap(r => ExtractLinks(r.getUrl, r.getContentString))
  .map(r => (ExtractDomain(r._1).removePrefixWWW(), ExtractDomain(r._2).removePrefixWWW()))
  .filter(r => r._1 != "" && r._2 != "")
  .countItems()
  .filter(r => r._2 > 5)

links.saveAsTextFile("links-all/")
```

Note how you can add filters are added. In this case, we add a filter which will result in a network graph of pages containing the phrase "apple." Filters can be applied immediately after `.keepValidPages()`.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._
import io.archivesunleashed.util._

val links = RecordLoader.loadArchives("example.arc.gz", sc)
  .keepValidPages()
  .keepContent(Set("apple".r))
  .flatMap(r => ExtractLinks(r.getUrl, r.getContentString))
  .map(r => (ExtractDomain(r._1).removePrefixWWW(), ExtractDomain(r._2).removePrefixWWW()))
  .filter(r => r._1 != "" && r._2 != "")
  .countItems()
  .filter(r => r._2 > 5)

links.saveAsTextFile("links-all-apple/")
```

### Scala DF

TODO

### Python DF

TODO

## Extract Raw URL Link Structure

### Scala RDD

This following script extracts all of the hyperlink relationships between sites, using the full URL pattern.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

val links = RecordLoader.loadArchives("example.arc.gz", sc)
  .keepValidPages()
  .flatMap(r => ExtractLinks(r.getUrl, r.getContentString))
  .filter(r => r._1 != "" && r._2 != "")
  .countItems()

links.saveAsTextFile("full-links-all/")
```

You can see that the above was achieved by removing the following line:

```scala
  .map(r => (ExtractDomain(r._1).removePrefixWWW(), ExtractDomain(r._2).removePrefixWWW()))
```

In a larger collection, you might want to add the following line:

```
.filter(r => r._2 > 5)
```

before `.countItems()` to find just the documents that are linked to more than five times. As you can imagine, raw URLs are very numerous!

### Scala DF

TODO

### Python DF

TODO

## Organize Links by URL Pattern

### Scala RDD

In this following example, we run the same script but only extract links coming from URLs matching the pattern `http://www.archive.org/details/*`. We do so by using the `keepUrlPatterns` command.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._
import io.archivesunleashed.util._

val links = RecordLoader.loadArchives("example.arc.gz", sc)
  .keepValidPages()
  .keepUrlPatterns(Set("(?i)http://www.archive.org/details/.*".r))
  .flatMap(r => ExtractLinks(r.getUrl, r.getContentString))
  .map(r => (ExtractDomain(r._1).removePrefixWWW(), ExtractDomain(r._2).removePrefixWWW()))
  .filter(r => r._1 != "" && r._2 != "")
  .countItems()
  .filter(r => r._2 > 5)

links.saveAsTextFile("details-links-all/")
```

### Scala DF

TODO

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

RecordLoader.loadArchives("example.arc.gz", sc).keepValidPages()
  .map(r => (r.getCrawlDate, ExtractLinks(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1, ExtractDomain(f._1).replaceAll("^\\s*www\\.", ""), ExtractDomain(f._2).replaceAll("^\\s*www\\.", ""))))
  .filter(r => r._2 != "" && r._3 != "")
  .countItems()
  .filter(r => r._2 > 5)
  .saveAsTextFile("sitelinks-by-date/")
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

Note also that `ExtractLinks` takes an optional third parameter of a base URL. If you set this – typically to the source URL –
ExtractLinks will resolve a relative path to its absolute location. For example, if
`val url = "http://mysite.com/some/dirs/here/index.html"` and `val html = "... <a href='../contact/'>Contact</a> ..."`, and we call `ExtractLinks(url, html, url)`, the list it returns will include the
item `(http://mysite.com/a/b/c/index.html, http://mysite.com/a/b/contact/, Contact)`. It may
be useful to have this absolute URL if you intend to call `ExtractDomain` on the link
and wish it to be counted.

### Scala DF

TODO

### Python DF

```python
from aut import *

archive = WebArchive(sc, sqlContext, "example.arc.gz")

df = archive.pages()
df.select(extract_domain("crawl_date").alias("Crawl Date")).groupBy("Crawl Date").count().show()
```

## Export as TSV

### Scala RDD

Archive records are represented in Spark as [tuples](https://en.wikipedia.org/wiki/Tuple),
and this is the standard format of results produced by most of the scripts presented here
(e.g., see above). It may be useful, however, to have this data in TSV (tab-separated value)
format, for further processing outside AUT. The following script uses `tabDelimit` (from
`TupleFormatter`) to transform tuples to tab-delimited strings; it also flattens any
nested tuples. (This is the same script as at the top of the page, with the addition of the
third and the second-last lines.)

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._
import io.archivesunleashed.matchbox.TupleFormatter._

RecordLoader.loadArchives("/path/to/arc", sc)
  .keepValidPages()
  .map(r => (r.getCrawlDate, ExtractLinks(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1, ExtractDomain(f._1).replaceAll("^\\s*www\\.", ""), ExtractDomain(f._2).replaceAll("^\\s*www\\.", ""))))
  .filter(r => r._2 != "" && r._3 != "")
  .countItems()
  .filter(r => r._2 > 5)
  .map(tabDelimit(_))
  .saveAsTextFile("sitelinks-tsv/")
```

Its output looks like:
```
20151107        liberal.ca      youtube.com     16334
20151108        socialist.ca    youtube.com     11690
20151108        socialist.ca    ustream.tv      11584
20151107        canadians.org   canadians.org   11426
20151108        canadians.org   canadians.org   11403
```

### Scala DF

TODO

### Python DF

TODO

## Filter by URL

### Scala RDD

In this case, you would only receive links coming from websites in matching the URL pattern listed under `keepUrlPatterns`.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

val links = RecordLoader.loadArchives("example.arc.gz", sc)
  .keepValidPages()
  .keepUrlPatterns(Set("http://www.archive.org/details/.*".r))
  .map(r => (r.getCrawlDate, ExtractLinks(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1, ExtractDomain(f._1).replaceAll("^\\s*www\\.", ""), ExtractDomain(f._2).replaceAll("^\\s*www\\.", ""))))
  .filter(r => r._2 != "" && r._3 != "")
  .countItems()
  .filter(r => r._2 > 5)
  .saveAsTextFile("sitelinks-details/")
```

### Scala DF

TODO

### Python DF

TODO

## Export to Gephi

### Scala RDD

You may want to export your data directly to the [Gephi software suite](http://gephi.github.io/), an open-soure network analysis project. The following code writes to the GEXF format:

```scala
import io.archivesunleashed._
import io.archivesunleashed.app._
import io.archivesunleashed.matchbox._

val links = RecordLoader.loadArchives("example.arc.gz", sc)
  .keepValidPages()
  .map(r => (r.getCrawlDate, ExtractLinks(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1, ExtractDomain(f._1).replaceAll("^\\s*www\\.", ""), ExtractDomain(f._2).replaceAll("^\\s*www\\.", ""))))
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

TODO

### Python DF

TODO
