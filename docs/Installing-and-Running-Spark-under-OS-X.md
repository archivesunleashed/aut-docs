# Installing and Running Spark under OS X

### Spark integration

Warcbase comes with Spark integration for manipulating web archive data. 

#### Prerequisites

Install these the same ways you did in the last lesson.

* Scala (`brew install scala`)
* Spark (`brew install apache-spark`)

#### Fluent API
A fluent API is being developed for RDDs, and is now available on master.

To use the API, two imports are required (run within Spark shell):    

```scala
import org.warcbase.spark.rdd.RecordRDD._
import org.warcbase.spark.matchbox.RecordLoader
```

### Running in the Spark Shell
To run the spark shell, cd into the warcbase directory and run:   
`spark-shell --jars ~/warcbase/target/warcbase-0.1.0-SNAPSHOT-fatjar.jar`. You'll need to change the path to the `jar` accordingly. You may also need to provide the path to your spark-shell.

For example, on one system we have:

`/home/i2millig/spark-1.5.1/bin/spark-shell --jars ~/warcbase/target/warcbase-0.1.0-SNAPSHOT-fatjar.jar`

You might want to pass it additional commands. For example, if you want to add more memory, you could pass it as `spark-shell --driver-memory 8G --jars ~/warcbase/target/warcbase-0.1.0-SNAPSHOT-fatjar.jar` This would give it 8GB of RAM. So in the example, it would be:

`/home/i2millig/spark-1.5.1/bin/spark-shell --drivermemory 8G --jars ~/warcbase/target/warcbase-0.1.0-SNAPSHOT-fatjar.jar`

### Pasting Commands

By default, command in spark-shell must be one-line.  
To run multi-line commands, type `:paste` in Spark shell to start a multi-line command, and Ctrl-D to finish the command.

For example, the following script counts web pages by time:  

````scala
import org.warcbase.spark.rdd.RecordRDD._
import org.warcbase.spark.matchbox.RecordLoader

val counts = RecordLoader.loadArchives("/shared/collections/CanadianPoliticalParties/arc/")
  .keepValidPages
  .map(r => r.getCrawlDate)
  .countItems()
  .saveAsTextFile("path/to/output")
````
In the output directory you should find data output files with date and count.

### Running with Spark Notebook

Spark Notebook is an interactive web-based editor that can run Scala and Spark. 

To use Spark Notebook with Warcbase, download the [notebook](http://spark-notebook.io/) with Scala 2.10, Spark 1.3.0, and Hadoop 2.6.0-cdh5.4.2. 
Also [build](https://github.com/lintool/warcbase/wiki/Building-and-Running-Warcbase-Under-OS-X#building-warcbase) Warcbase if you have not already done so.

Then unzip the downloaded Spark Notebook file, cd into the directory, and run `./bin/spark-notebook`.

The terminal should say: `Listening for HTTP on /0:0:0:0:0:0:0:0:9000`

Then navigate to `http://localhost:9000/` in your browser.

To make a new notebook, click the '+' button on the top right-hand corner.

In that notebook, enter `:cp /path/to/warcbase/jar` as the first command to load Warcbase. Now you have an interactive Spark shell running Warcbase! A good starting script [can be found here](./Spark-Collection-Analytics/).

### Ready to go!

Now you can run some analytics. Feel free to skip ahead to the [Analyzing Web Archives with Spark Landing Page](./Analyzing-Web-Archives-with-Spark/). We recommend beginning with running [analytics on your collections](./Spark-Collection-Analytics/).
