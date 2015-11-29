The following Spark script generates the aggregated site-level link structure, grouped by crawl date (YYYYMMDD):

```
import org.warcbase.spark.matchbox.{ExtractLinks, RecordLoader}
import org.warcbase.spark.rdd.RecordRDD._

RecordLoader.loadArc("/path/to/arc", sc)
  .keepValidPages()
  .map(r => (r.getCrawldate, ExtractLinks(r.getUrl, r.getBodyContent)))
  .flatMap(r => r._2.map(f => (r._1, f._1.replaceAll("^.*www\\.", ""), f._2.replaceAll("^.*www\\.", ""))))
  .filter(r => r._2 != null && r._3 != null)
  .countItems()
  .filter(r => r._2 > 10)
  .saveAsTextFile("cpp.sitelinks/")
```