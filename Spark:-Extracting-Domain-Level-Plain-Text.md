The following Spark script generates plain text renderings for all the web pages in a collection with a URL matching a filter string. 

This script uses a fluent API over RDDs, which can be accessed from the warcbase/matchbox branch (see [this page](https://github.com/lintool/warcbase/wiki/Building-and-Running-Warcbase-Under-OS-X#spark-integration) for more detailed instructions.

```
import org.warcbase.spark.matchbox.ArcRecords
import org.warcbase.spark.matchbox.ArcRecords._

val r = ArcRecords.load("/path/to/input", sc)
  .keepMimeTypes(Set("text/html"))
  .discardDate(null)
  .keepDomains(Set("greenparty.ca"))
  .extractUrlAndBody()
r.saveAsTextFile("/path/to/output/")
```