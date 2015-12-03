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
