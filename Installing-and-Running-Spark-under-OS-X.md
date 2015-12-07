### Spark integration

Warcbase comes with Spark integration for manipulating web archive data. 

#### Prerequisites
* Scala (`brew install scala`)
* Spark (`brew install apache-spark`)

#### Fluent API
A fluent API is being developed for RDDs, and is now available on master.

To use the API, two imports are required (run within Spark shell):    
```
import org.warcbase.spark.rdd.RecordRDD._
import org.warcbase.spark.matchbox.RecordLoader
```

### Running in the Spark Shell
To run the spark shell, cd into the warcbase directory and run:   
`spark-shell --jars target/warcbase-0.1.0-SNAPSHOT-fatjar.jar`

By default, command in spark-shell must be one-line.  
To run multi-line commands, type `:paste` in Spark shell to start a multi-line command, and Ctrl-D to finish the command.

For example, the following script counts web pages by time:  
````
import org.warcbase.spark.rdd.RecordRDD._
import org.warcbase.spark.matchbox.RecordLoader

val counts = RecordLoader.loadArc("/shared/collections/CanadianPoliticalParties/arc/")
  .keepValidPages
  .map(r => r.getDate)
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

In that notebook, enter `:cp /path/to/warcbase/jar` as the first command to load Warcbase. Now you have an interactive Spark shell running Warcbase! A good starting script [can be found here](http://lintool.github.io/warcbase-docs/Spark-Collection-Analytics/).

### Ready to go!

Now you can run some analytics. Feel free to skip ahead to the [Analyzing Web Archives with Spark Landing Page](http://lintool.github.io/warcbase-docs/Analyzing-Web-Archives-with-Spark/). We recommend beginning with running [analytics on your collections](http://lintool.github.io/warcbase-docs/Spark-Collection-Analytics/).
