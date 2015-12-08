[Sample data available here](https://github.com/ianmilligan1/WAHR/tree/master/sample-data/arc-warc)

See also this walkthrough for [extracting plain text](https://github.com/lintool/warcbase/wiki/Spark:-Extracting-Domain-Level-Plain-Text) - written for the Spark shell.

Initial command:

```
:cp /Users/ianmilligan1/dropbox/warcbase/target/warcbase-0.1.0-SNAPSHOT-fatjar.jar
```

Command one:

```
import org.warcbase.spark.matchbox._ 
import org.warcbase.spark.rdd.RecordRDD._ 
```

Command two:

```
val r = 
RecordLoader.loadArc("/Users/ianmilligan1/Dropbox/warcs-workshop/227-20051004191331-00000-crawling015.archive.org.arc.gz", 
sc) 
.keepValidPages() 
.map(r => ExtractTopLevelDomain(r.getUrl)) 
.countItems() 
.take(10) 
```

Command three:

```
val r = 
RecordLoader.loadArc("/Users/ianmilligan1/Dropbox/warcs-workshop/227-20051007202637-00000-crawling018.arc.gz",
sc) 
.keepValidPages()
.map(r => { 
val t = ExtractRawText(r.getBodyContent) 
val len = 1000 
(r.getCrawldate, r.getUrl, if ( t.length > len ) t.substring(0, 
len) else t)}) 
.collect() 
```

Command four:

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