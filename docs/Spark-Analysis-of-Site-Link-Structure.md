# Analysis of Site Link Structure

Site link structures can be very useful, allowing you to learn such things as:

- what websites were the most linked to;  
- what websites had the most outbound links;  
- what paths could be taken through the network to connect pages;  
- what communities existed within the link structure?  

Many of the [filtering commands listed here](http://lintool.github.io/warcbase-docs/Spark-Several-Basic-Commands/) will work as well.

## Extraction of Simple Site Link Structure

If your web archive does not have a temporal component, the following Spark script will generate the site-level link structure. In this case, it is loading all WARCs stored in an example collection of GeoCities files.

```scala
import org.warcbase.spark.matchbox._
import org.warcbase.spark.rdd.RecordRDD._
import StringUtils._

val links = RecordLoader.loadArchives("/collections/webarchives/geocities/warcs/", sc)
  .keepValidPages()
  .flatMap(r => ExtractLinks(r.getUrl, r.getContentString))
  .map(r => (ExtractDomain(r._1).removePrefixWWW(), ExtractDomain(r._2).removePrefixWWW()))
  .filter(r => r._1 != "" && r._2 != "")
  .countItems()
  .filter(r => r._2 > 5)

links.saveAsTextFile("geocities-links-all/")
```

Note how you can add filters. In this case, we add a filter so you are looking at a network graph of pages containing the phrase "apple." Filters can go immediately after `.keepValidPages()`.

```scala
import org.warcbase.spark.matchbox._
import org.warcbase.spark.rdd.RecordRDD._
import StringUtils._

val links = RecordLoader.loadArchives("/collections/webarchives/geocities/warcs/", sc)
  .keepValidPages()
  .keepContent(Set("apple".r))
  .flatMap(r => ExtractLinks(r.getUrl, r.getContentString))
  .map(r => (ExtractDomain(r._1).removePrefixWWW(), ExtractDomain(r._2).removePrefixWWW()))
  .filter(r => r._1 != "" && r._2 != "")
  .countItems()
  .filter(r => r._2 > 5)

links.saveAsTextFile("geocities-links-all/")
```

## Extraction of a Site Link Structure, organized by URL pattern

In this following example, we run the same script but only extract links coming from URLs matching the pattern `http://geocities.com/EnchantedForest/.*`. We do so by using the `keepUrlPatterns` command.

```scala
import org.warcbase.spark.matchbox._
import org.warcbase.spark.rdd.RecordRDD._
import StringUtils._

val links = RecordLoader.loadArchives("/collections/webarchives/geocities/warcs/", sc)
  .keepValidPages()
  .keepUrlPatterns(Set("http://geocities.com/EnchantedForest/.*".r))
  .flatMap(r => ExtractLinks(r.getUrl, r.getContentString))
  .map(r => (ExtractDomain(r._1).removePrefixWWW(), ExtractDomain(r._2).removePrefixWWW()))
  .filter(r => r._1 != "" && r._2 != "")
  .countItems()
  .filter(r => r._2 > 5)

links.saveAsTextFile("geocities-links-all/")
```

## Grouping by Crawl Date

The following Spark script generates the aggregated site-level link structure, grouped by crawl date (YYYYMMDD). It
makes use of the `ExtractLinks` and `ExtractToLevelDomain` functions.

If you prefer to group by crawl month (YYYMM), replace `getCrawlDate` with `getCrawlMonth` below.

```scala
import org.warcbase.spark.matchbox.{ExtractDomain, ExtractLinks, RecordLoader}
import org.warcbase.spark.rdd.RecordRDD._

RecordLoader.loadArchives("/path/to/arc", sc)
  .keepValidPages()
  .map(r => (r.getCrawlDate, ExtractLinks(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1, ExtractDomain(f._1).replaceAll("^\\s*www\\.", ""), ExtractDomain(f._2).replaceAll("^\\s*www\\.", ""))))
  .filter(r => r._2 != "" && r._3 != "")
  .countItems()
  .filter(r => r._2 > 5)
  .saveAsTextFile("cpp.sitelinks")
```

The format of this output is:
- Field one: Crawldate, yyyyMMdd
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


## Exporting as TSV
Archive records are represented in Spark as [tuples](https://en.wikipedia.org/wiki/Tuple), 
and this is the standard format of results produced by most of the scripts presented here
(e.g., see above). It may be useful, however, to have this data in TSV (tab-separated value)
format, for further processing outside Warcbase. The following script uses `tabDelimit` (from
`TupleFormatter`) to transform tuples to tab-delimited strings; it also flattens any 
nested tuples. (This is the same script as at the top of the page, with the addition of the 
third and the second-last lines.)

```scala
import org.warcbase.spark.matchbox.{ExtractDomain, ExtractLinks, RecordLoader}
import org.warcbase.spark.rdd.RecordRDD._
import org.warcbase.spark.matchbox.TupleFormatter._

RecordLoader.loadArchives("/path/to/arc", sc)
  .keepValidPages()
  .map(r => (r.getCrawldate, ExtractLinks(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1, ExtractDomain(f._1).replaceAll("^\\s*www\\.", ""), ExtractDomain(f._2).replaceAll("^\\s*www\\.", ""))))
  .filter(r => r._2 != "" && r._3 != "")
  .countItems()
  .filter(r => r._2 > 5)
  .map(tabDelimit(_))
  .saveAsTextFile("cpp.sitelinks2")
```

Its output looks like:
```
20151107        liberal.ca      youtube.com     16334
20151108        socialist.ca    youtube.com     11690
20151108        socialist.ca    ustream.tv      11584
20151107        canadians.org   canadians.org   11426
20151108        canadians.org   canadians.org   11403
```

## Filtering by URL
You may also wish to only extract links from a subset of pages, in which case you can also add in the [filters found here](./Spark-Several-Basic-Commands/). In this case, you would only receive links coming from websites in matching the URL pattern listed under `keepUrlPatterns`.

```scala
import org.warcbase.spark.matchbox.{ExtractDomain, ExtractLinks, RecordLoader, WriteGDF}
import org.warcbase.spark.rdd.RecordRDD._

val links = RecordLoader.loadArchives("/collections/webarchives/CanadianPoliticalParties/arc/", sc)
  .keepValidPages()
  .keepUrlPatterns(Set("http://liberal.ca/Canada/.*".r))
  .map(r => (r.getCrawldate, ExtractLinks(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1, ExtractDomain(f._1).replaceAll("^\\s*www\\.", ""), ExtractDomain(f._2).replaceAll("^\\s*www\\.", ""))))
  .filter(r => r._2 != "" && r._3 != "")
  .countItems()
  .filter(r => r._2 > 5)

WriteGDF(links, "all-links-EnchantedForest.gdf")
```

## Exporting to Gephi Directly

You may want to export your data directly to the [Gephi software suite](http://gephi.github.io/), an open-soure network analysis project. The following code writes to a GDF format:

```scala
import org.warcbase.spark.matchbox.{ExtractDomain, ExtractLinks, RecordLoader, WriteGDF}
import org.warcbase.spark.rdd.RecordRDD._

val links = RecordLoader.loadArchives("/collections/webarchives/CanadianPoliticalParties/arc/", sc)
  .keepValidPages()
  .map(r => (r.getCrawldate, ExtractLinks(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1, ExtractDomain(f._1).replaceAll("^\\s*www\\.", ""), ExtractDomain(f._2).replaceAll("^\\s*www\\.", ""))))
  .filter(r => r._2 != "" && r._3 != "")
  .countItems()
  .filter(r => r._2 > 5)

WriteGDF(links, "all-links.gdf")
```

This file can then be directly opened by Gephi.

We have a separate lesson on this: [Gephi: Converting the Site Link Structure into a Dynamic Visualization](./Gephi-Converting-Site-Link-Structure-into-Dynamic-Visualization/).

## Visualizing In Browser

Interested in playing with your link structures in browser like so?

![Example of the D3.js visualizer](https://raw.githubusercontent.com/web-archive-group/WAHR/master/images/d3js-example.png)

Then read on to [Visualizing Site-Link Structure with D3.js](http://lintool.github.io/warcbase-docs/Visualizing-Site-Link-Structure/)