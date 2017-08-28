# Collection Analytics

You may want to get a birds-eye view of your ARCs or WARCs: what top-level domains are included, and at what times were they crawled? You can do this in Shell or generate beautiful in-browser visualizations in the Notebook interface.

### List of URLs 

If you just want a list of URLs in the collection, you can type :p into Spark Shell, paste the script, and then run it with ctrl-d:

```scala
import io.archivesunleashed.spark.matchbox._ 
import io.archivesunleashed.spark.rdd.RecordRDD._ 

val r = RecordLoader.loadArchives("/directory/to/arc/file.arc.gz", sc) 
.keepValidPages()
.map(r => r.getUrl)
.take(10)
```

This will give you a list of the top ten URLs. If you want all the URLs, exported to a file, you could run this instead. Note that your export directory cannot already exist.

```scala
import io.archivesunleashed.spark.matchbox._
import io.archivesunleashed.spark.rdd.RecordRDD._

val r = RecordLoader.loadArchives("/directory/to/arc/file.arc.gz", sc) 
.keepValidPages()
.map(r => r.getUrl)
.saveAsTextFile("/path/to/export/directory/")
```
### Using Spark Notebook to See Top-Level Domains

In the Spark Notebook, the following command will generate an interactive visualization. Remember that your first command in any Spark Notebook needs to point to warcbase like so:

```
:cp /Users/ianmilligan1/dropbox/warcbase/warcbase-core/target/warcbase-core-0.1.0-SNAPSHOT-fatjar.jar
```

You'll be ready to run this then.

```scala
import io.archivesunleashed.spark.matchbox._ 
import io.archivesunleashed.spark.rdd.RecordRDD._ 

val r = 
RecordLoader.loadArchives("/directory/to/arc/file.arc.gz", sc) 
.keepValidPages() 
.map(r => ExtractDomain(r.getUrl)) 
.countItems() 
.take(10) 
```

If you want to see more than ten results, change the variable in the last line. 

Here is a sample output from a 5GB collection of Canadian political party ARCs:

![Spark notebook showing pie chart output](https://raw.githubusercontent.com/ianmilligan1/WAHR/master/images/Spark-Notebook.png)

### List of Different Subdomains

Finally, you can use regular expressions to extract more fine-tuned information. For example, if you wanted to know all sitenames - i.e. the first-level directories of a given collection.

```scala
import io.archivesunleashed.spark.matchbox._
import io.archivesunleashed.spark.rdd.RecordRDD._

val r = RecordLoader.loadArchives("/path/to/warcs", sc)
 .keepValidPages()
 .flatMap(r => """http://[^/]+/[^/]+/""".r.findAllIn(r.getUrl).toList)
```

In the above example, `"""...."""` declares that we are working with a regular expression, `.r` says turn it into a regular expression, `.findAllIn` says look for all matches in the URL. This will only return the first but that is generally good for our use cases. Finally, `.toList` turns it into a list so you can `flatMap`.
