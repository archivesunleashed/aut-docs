The following Spark script generates the aggregated site-level link structure, grouped by crawl date (YYYYMMDD):

```
import org.warcbase.spark.matchbox.RecordTransformers._
import org.warcbase.spark.matchbox.{ExtractTopLevelDomain, ExtractLinks, RecordLoader}
import org.warcbase.spark.rdd.RecordRDD._

RecordLoader.loadArc("/path/to/arc", sc)
  .discardDate(null)
  .keepMimeTypes(Set("text/html"))
  .map(r => (r.getCrawldate, ExtractLinks(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1, ExtractTopLevelDomain(f._1).replaceAll("^\\s*www\\.", ""), ExtractTopLevelDomain(f._2).replaceAll("^\\s*www\\.", ""))))
  .filter(r => r._2 != null && r._3 != null)
  .countItems()
  .filter(r => r._2 > 5)
  .saveAsTextFile("cpp.sitelinks")
```

The ensuing format will look like this. **We are currently developing an output to GEXF (Gephi) and CSV output, as well as options to aggregate by year or year-month (yyyy-mm). Stay tuned.**

The format of this visualization is:

Column one: Crawldate, yyyyMMdd
Column two: Source domain (i.e. liberal.ca)
Column three: Target domain of link (i.e. ndp.ca)
Column four: number of links.

```
((20080612,liberal.ca,liberal.ca),1832983)
((20060326,ndp.ca,ndp.ca),1801775)
((20060426,ndp.ca,ndp.ca),1771993)
((20060325,policyalternatives.ca,policyalternatives.ca),1735154)
```

In the above example, you are seeing INTERNAL links - thsoe within domains.