### All Plain text

This script extracts the crawl date, domain, URL, and plain text from HTML files in the sample ARC data (and saves the output to out/). If you are using WARC files, change `loadArc` to `loadWarc`.

```
import org.warcbase.spark.matchbox.RecordLoader
import org.warcbase.spark.rdd.RecordRDD._
import org.warcbase.spark.matchbox.{RemoveHTML, RecordLoader}

RecordLoader.loadArc("src/test/resources/arc/example.arc.gz", sc)
  .keepValidPages()
  .map(r => (r.getCrawldate, r.getDomain, r.getUrl, RemoveHTML(r.getContentString)))
  .saveAsTextFile("out/")
```

If you wanted to use it on your own collection, you would change "src/test/resources/arc/example.arc.gz" to the directory with your own ARC or WARC files, and change "out/" on the last line to where you want to save your output data.

Note that this will create a new directory to store the output, which cannot already exist.

If you want to run it in your Spark Notebook, the following script will show in-notebook plain text:

```
val r = 
RecordLoader.loadWarc("/path/to/warcs",
sc) 
.keepValidPages()
.map(r => { 
val t = RemoveHTML(r.getContentString) 
val len = 1000 
(r.getCrawldate, r.getUrl, if ( t.length > len ) t.substring(0, 
len) else t)}) 
.collect() 
```

### Plain text by URL Pattern

The following Spark script generates plain text renderings for all the web pages in a collection with a URL matching a filter string. In the example case, it will go through the collection and find all of the URLs within the "greenparty.ca" domain.

```
import org.warcbase.spark.matchbox.{RemoveHTML, RecordLoader}
import org.warcbase.spark.rdd.RecordRDD._

RecordLoader.loadArc("src/test/resources/arc/example.arc.gz", sc)
  .keepValidPages()
  .keepDomains(Set("greenparty.ca"))
  .map(r => (r.getCrawldate, r.getDomain, r.getUrl, RemoveHTML(r.getContentString)))
  .saveAsTextFile("out/")
```