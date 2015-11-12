### Spark integration

Warcbase comes with Spark integration for manipulating web archive data. 

#### Prerequisites
* Scala (`brew install scala`)
* Spark (`brew install apache-spark`)

#### Fluent API
A fluent API is being developed for RDDs, and the current API can be accessed from the warcbase/matchbox branch.  
To get it, cd into the warcbase directory and run:  
`git checkout matchbox`  

Then package the project:  
`export _JAVA_OPTIONS="-Xms1024m -Xmx8G -Xss256m -XX:MaxPermSize=4G"` (to allow memory for the build)  
`mvn package -DskipTests`

To use the API, two imports are required (run within Spark shell):    
```
import org.warcbase.spark.rdd.RecordRDD._
import org.warcbase.spark.matchbox.RecordLoader
```

To run the spark shell, cd into the warcbase directory and run:   
`spark-shell --jars target/warcbase-0.1.0-SNAPSHOT-fatjar.jar`

By default, command in spark-shell must be one-line.  
To run multi-line commands, type `:paste` in Spark shell to start a multi-line command, and Ctrl-D to finish the command.

The following script counts web pages by time:  
````
import org.warcbase.spark.matchbox.ArcRecords
import org.warcbase.spark.matchbox.ArcRecords._

val counts = ArcRecords.load("/shared/collections/CanadianPoliticalParties/arc/")
  .keepMimeTypes(Set("text/html"))
  .map(r => (r.getMetaData.getDate.substring(0,6), 1))
  .reduceByKey(_ + _)
  .sortByKey()
  .collect()

sc.parallelize(counts).writeAsTextFile("/path/to/output")
````
In the output directory you should find data output files with date and count.