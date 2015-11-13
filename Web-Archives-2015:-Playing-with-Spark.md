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
.keepMimeTypes(Set("text/html")) 
.discardDate(null) 
.map(r => { 
val t = ExtractRawText(r.getBodyContent) 
val len = 1000 
(r.getCrawldate, r.getUrl, if ( t.length > len ) t.substring(0, 
len) else t)}) 
.collect() 
```