# Collection Analytics
You may want to learn what top-level domains you have in a given ARC, WARC, or directory of them. In the Spark Notebook, the following command will generate an interactive visualization. Remember that your first command in any Spark Notebook needs to point to warcbase like so:

```
:cp /Users/ianmilligan1/dropbox/warcbase/target/warcbase-0.1.0-SNAPSHOT-fatjar.jar
```

You'll be ready to run this then.

```
import org.warcbase.spark.matchbox._ 
import org.warcbase.spark.rdd.RecordRDD._ 

val r = 
RecordLoader.loadArchives("/directory/to/arc/file.arc.gz", sc) 
.keepValidPages() 
.map(r => ExtractTopLevelDomain(r.getUrl)) 
.countItems() 
.take(10) 
```

If you want to see more than ten results, change the variable in the last line. 

Here is a sample output from a 5GB collection of Canadian political party ARCs:

![Spark notebook showing pie chart output](https://raw.githubusercontent.com/ianmilligan1/WAHR/master/images/Spark-Notebook.png)

If you just want a list of URLs, you can run this:

```
import org.warcbase.spark.matchbox._ 
import org.warcbase.spark.rdd.RecordRDD._ 

val r = RecordLoader.loadArchives("/directory/to/arc/file.arc.gz", sc) 
.keepValidPages()
.map(r => r.getUrl)
.take(10)
```

This will give you a list of the top ten URLs. If you want all the URLs, exported to a file, you could run this instead. Note that your export directory cannot already exist.

```
import org.warcbase.spark.matchbox._
import org.warcbase.spark.rdd.RecordRDD._

val r = RecordLoader.loadArchives("/directory/to/arc/file.arc.gz", sc) 
.keepValidPages()
.map(r => r.getUrl)
.saveAsTextFile("/path/to/export/directory/")
```
