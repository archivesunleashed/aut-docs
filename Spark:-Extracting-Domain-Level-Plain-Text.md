The following Spark script generates plain text renderings for all the web pages in a collection with a URL matching a filter string.

```
import java.io.IOException
import java.net.URL
import org.apache.spark.SparkContext
import org.jsoup.Jsoup
import org.warcbase.data.ArcRecordUtils
import org.apache.hadoop.io._
import org.warcbase.mapreduce._
import org.warcbase.io._

def extractTopLevelDomain(url: String, source: String = ""): String = {
  if (url == null) return null
  try {
    val u = new URL(url)
    if (u.getHost == null) {
      val s = new URL(source)
      s.getHost
    } else {
      u.getHost
    }
  }
}

def extractRawText(a: Array[Byte]) = {
  val s = new String(a)
  try {
    Jsoup.parse(s).text().replaceAll("[\\r\\n]+", " ")
  }
  catch {
    case e: Exception => throw new IOException("Caught exception processing input row ", e)
  }
}

def filter(sc: SparkContext) = {
  val records =
    sc.newAPIHadoopFile("collections/ARCHIVEIT-227-UOFTORONTO-CANPOLPINT-20090201174320-00056-crawling04.us.archive.org.arc.gz",
      classOf[WacArcInputFormat], classOf[LongWritable], classOf[ArcRecordWritable])

  val filtered = records.map(t => t._2.getRecord)
    .filter(r => r.getMetaData.getMimetype == "text/html" && r.getMetaData.getDate != null)
    .map(r => (
      r.getMetaData.getDate.substring(0, 6),
      extractTopLevelDomain(r.getMetaData.getUrl).replace("^\\s*www\\.", ""),
      ArcRecordUtils.getBodyContent(r)
      ))
    .filter(r => r._2 == "greenparty.ca")
    .map(r => (r._1, r._2, extractRawText(r._3)))

  filtered.saveAsTextFile("filtered")
}
```