# Getting Started with Archives Unleashed Toolkit Tutorials

## Downloading AUT

The Archives Unleashed Toolkit can be [downloaded as a JAR file for easy use](https://github.com/archivesunleashed/aut/releases/download/aut-0.9.0/aut-0.9.0-fatjar.jar) 

The following bash commands will download the jar and an example ARC file. You can also [download the example ARC file here](https://raw.githubusercontent.com/archivesunleashed/aut/master/src/test/resources/arc/example.arc.gz).

```bash
mkdir aut
cd aut
curl -L "https://github.com/archivesunleashed/aut/releases/download/aut-0.9.0/aut-0.9.0-fatjar.jar" > aut-0.9.0-fatjar.jar
# example arc file for testing
curl -L "https://raw.githubusercontent.com/archivesunleashed/aut/master/src/test/resources/arc/example.arc.gz" > example.arc.gz
```

## Installing Spark shell

Download and unzip [The Spark Shell](wget http://d3kbcqa49mib13.cloudfront.net/spark-1.6.1-bin-hadoop2.6.tgz) from the [Apache Spark Website](http://spark.apache.org/downloads.html).

```bash
curl -L "http://d3kbcqa49mib13.cloudfront.net/spark-1.6.1-bin-hadoop2.6.tgz" > spark-1.6.1-bin-hadoop2.6.tgz
tar -xvf spark-1.6.1-bin-hadoop2.6.tgz
cd spark-1.6.1-bin-hadoop2.6
./bin/spark-shell --jars ../aut-0.9.0-fatjar.jar
```
> If for some reason you get `Failed to initialize compiler: 
> object scala.runtime in compiler mirror not found.` error, 
> this probably means the .jar file did not download properly.
> Try downloading it directly from our [releases page](https://github.com/archivesunleashed/aut/releases/)

You should have the spark shell ready and running.

```

Welcome to
  ____              __
 / __/__  ___ _____/ /__
 _\ \/ _ \/ _ `/ __/  '_/
/___/ .__/\_,_/_/ /_/\_\   version 1.6.1
   /_/

Using Scala version 2.10.5 (Java HotSpot(TM) 64-Bit Server VM, Java 1.8.0_72)
Type in expressions to have them evaluated.
Type :help for more information.
Spark context available as sc.
SQL context available as sqlContext.

scala> 

```

> If you recently upgraded your Mac OS X, your java version may not be correct in terminal.  You will 
> have to [change the path to the latest version in your ./bash_profile file.](https://stackoverflow.com/questions/21964709/how-to-set-or-change-the-default-java-jdk-version-on-os-x).

### Test the Archives Unleashed Toolkit

Type `:p` at the scala prompt and go into paste mode.

Type or paste the following:

```
import io.archivesunleashed.spark.matchbox._
import io.archivesunleashed.spark.rdd.RecordRDD._

val r = RecordLoader.loadArchives("../example.arc.gz", sc)
.keepValidPages()
.map(r => ExtractDomain(r.getUrl))
.countItems()
.take(10)

```

then `<ctrl> d` to exit paste mode and run the script.

If you see:

```
r: Array[(String, Int)] = Array((www.archive.org,132), (deadlists.com,2), (www.hideout.com.br,1))
```

That means you're up and running!

You should now be able to try out the toolkit's many tutorials. We suggest that for your starting point, [our Filter-Analyze-Aggregate-Visualize cycle provides an introductory walkthrough to how you can explore your data](./FAAV/).

## More Information

- Assistance with setting up Spark is in the [Getting Started Section of the Home Page](./index.html).

- Scripts are currently written in Scala with Python support coming soon. For a quick introduction to the language, [Programming in Scala](http://www.artima.com/pins1ed/index.html) by Martin Odersky, Lex Spoon, and Bill Venners is a good introduction. However, for the most part you should be able to adapt and extend the scripts that we provide in this guide.

- [Collection Level Analytics](./Spark-Collection-Analytics/): Use Spark Notebook to generate an interactive visualization of what's in your collections.

- [Extracting Domain Level Plain Text](./Spark-Extracting-Domain-Level-Plain-Text/): Extract plain text from a collection of ARC or WARC files, either by date, domain, or through other filters you might specify.

- [Network Analysis of Site Link Structure](./Spark-Analysis-of-Site-Link-Structure/): Generate aggregated site link structure from a collection of ARC or WARC files. 
