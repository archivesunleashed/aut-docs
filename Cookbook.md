# Archives Unleashed Toolkit Cookbook

## Archives Unleashed Cloud Scholarly Derivatives

This is an example of the [Archives Unleashed Cloud](https://cloud.archivesunleashed.org/) script that generates the foundation of [the scholarly derivatives](https://cloud.archivesunleashed.org/derivatives) the Cloud produces.

```scala
import io.archivesunleashed._
import io.archivesunleashed.app._
import io.archivesunleashed.matchbox._

sc.setLogLevel("INFO")

val statusCodes = Set("200")

val validPages = RecordLoader
  .loadArchives("/path/to/data", sc)
  .keepValidPages()
  .keepHttpStatus(statusCodes)

validPages
  .map(r => ExtractDomain(r.getUrl))
  .countItems()
  .saveAsTextFile("/path/to/alldomains/output")

validPages
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHttpHeader(r.getContentString))))
  .saveAsTextFile("/path/to/fulltext/output")

val links = validPages
  .map(r => (r.getCrawlDate, ExtractLinks(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1, ExtractDomain(f._1).replaceAll("^\\\\s*www\\\\.", ""), ExtractDomain(f._2).replaceAll("^\\\\s*www\\\\.", ""))))
  .filter(r => r._2 != "" && r._3 != "")
  .countItems()
  .filter(r => r._2 > 5)

WriteGraph.asGraphml(links, "//path/to/graph/output/example-gephi.graphml")

sys.exit
```