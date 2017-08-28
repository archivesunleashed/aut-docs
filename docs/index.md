# Archives Unleashed Toolkit (aut)

<p align="center">
  <img src="https://raw.githubusercontent.com/web-archive-group/WAHR/master/images/cpppig-visualization-small.png" alt="network of the Canadian Political Parties collection"/>
</p>

The Archives Unleashed Toolkit is an open-source platform for managing web archives built on [Hadoop](https://hadoop.apache.org/). The platform provides a flexible data model for storing and managing raw content as well as metadata and extracted knowledge. Tight integration with Hadoop provides powerful tools for analytics and data processing via [Spark](http://spark.apache.org/). For more information on the project and the team behind it, visit our [about page](./about/).

Our documentation can be accessed by using the drop-down menus above.

## Getting Started

The Archives Unleashed Toolkit can be [downloaded as a JAR file for easy use](https://github.com/archivesunleashed/aut/releases/download/aut-0.9.0/aut-0.9.0-fatjar.jar) 

```bash
mkdir aut
cd aut
curl -L "https://github.com/archivesunleashed/aut/releases/download/aut-0.9.0/aut-0.9.0-fatjar.jar" > aut-0.9.0-fatjar.jar
# example arc file for testing
curl -L "https://raw.githubusercontent.com/archivesunleashed/aut/master/src/test/resources/arc/example.arc.gz" > example.arc.gz
```

### Installing the Spark shell

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

```bash

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

If you run into any trouble, you may find the [Getting Started Tutorial](./Getting-Started.md) helpful.

You should now be able to try out the toolkit's many tutorials.

## Using the Archives Unleashed Toolkit

We have prepared a number of tutorials to show what the AUT can do:

* [**Spark to analyze your web archive collections**](./Analyzing-Web-Archives-with-Spark/) for gathering collection statistics, textual analysis, network analysis, etc.

* [This SHINE walkthrough](./Shine-Installing-Shine-Frontend-on-OS-X/) and this [building Lucene indexes](./Building-Lucene-Indexes-Using-Hadoop/) walkthrough shows how to use the SHINE front end on Solr indexes generated using aut. 


More information about AUT can be found on the [About AUT page](./about.md)
