# Hands on With the Archives Unleashed Toolkit

This is a quick walkthrough, based on an earlier workshop we ran at IIPC 2016. It takes a user through the installation of the Archives Unleashed Toolkit (AUT) with Docker, and then running some sample scripts on WARCs. A user could then try running the same scripts on their own data, to get a sense of how AUT works.

If you have any questions, please let us know!

- [Nick Ruest](https://github.com/ruebot)
- [Ian Milligan](https://github.com/ianmilligan1)

## Docker Installation

First, you need to [download and install Docker for your system](https://www.docker.com). Here's are direct desktop client links for [Mac](https://www.docker.com/docker-mac) and [Windows](https://www.docker.com/docker-windows).

Once Docker is installed, clone this repository (using [git](https://git-scm.com/book/id/v2/Getting-Started-Installing-Git)) and launch using the following commands:

1. `git clone https://github.com/archivesunleashed/docker-aut.git`
2. `cd docker-aut`
3. `docker build -t aut .`
4. `docker run --rm -it -p 9000:9000 -p 4040:4040 aut`

Once the build finishes, you should see:

```
$ docker run --rm -it -p 9000:9000 -p 4040:4040 aut
Play server process ID is 6
SLF4J: Class path contains multiple SLF4J bindings.
SLF4J: Found binding in [jar:file:/notebook/lib/ch.qos.logback.logback-classic-1.1.1.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: Found binding in [jar:file:/notebook/lib/org.slf4j.slf4j-log4j12-1.7.10.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: See http://www.slf4j.org/codes.html#multiple_bindings for an explanation.
SLF4J: Actual binding is of type [ch.qos.logback.classic.util.ContextSelectorStaticBinder]
[info] play - Application started (Prod)
[info] play - Listening for HTTP on /0.0.0.0:9000
```

Let's start by using the Spark Notebook.

## Spark Notebook

In our AUT workflow, we use the notebook to often prototype on one ARC or WARC file, before running production on a directory. 

### Step One: Getting Started

Let's start a new notebook. Click the "new" button in the upper right, and then select the line beginning with `Scala [2.10.4]...`. Give it a fun name like "AUT Workshop."

First, you need to load the AUT jar. **TODO**

Second, you need to import the classes.

```scala
import io.archivesunleashed.spark.matchbox._
import io.archivesunleashed.spark.rdd.RecordRDD._
```

Third, let's run a test script. The following will load one of the ARC files from the sample data directory and count the various top-level domains that you can find in it.

```scala
val r = 
  RecordLoader.loadArchives("/aut-resources/ARCHIVEIT-227-UOFTORONTO-CANPOLPINT-20060622205612-00009-crawling025.archive.org.arc.gz", 
sc) 
  .keepValidPages()
  .map(r => ExtractDomain(r.getUrl))
  .countItems()
  .take(10)
```

Click on the pie chart tab at bottom, and you'll see the breakdown of domains in all of its glory.

To see why notebooks are fun, change the `10` above to `20`. Press play again.

### Step Two: Prototyping Scripts: Text Analysis

As noted, we generally recommend that people use the Spark Notebook to prototype scripts that they'll later adapt and run in their Spark Shell. 

Let's give it a try by adapting some of the scripts that we might run in the Shell. For example, extracting text:

```scala
val r = RecordLoader.loadArchives("/aut-resources/ARCHIVEIT-227-UOFTORONTO-CANPOLPINT-20060622205612-00009-crawling025.archive.org.arc.gz", sc) 
  .keepValidPages()
  .map(r => { 
  val t = RemoveHTML(r.getContentString) 
  val len = 1000 
  (r.getCrawlDate, r.getUrl, if ( t.length > len ) t.substring(0, len) else t)}) 
  .collect() 
```

Again, change a variable. Right now, we see 100 characters of each webpage. Let's change that to 200. Change `val len = 100` to `val len = 200`.

### Step Three: More Advanced Analysis

Sometimes it can get boring typing out the same thing over and over again. We can set variables to make our life easier, such as:

```scala
val arc="/aut-resources/ARCHIVEIT-227-UOFTORONTO-CANPOLPINT-20060622205612-00009-crawling025.archive.org.arc.gz"
```

Now instead of typing the path, we can just use `arc`. Try running that cell and replacing it in the script above. For the lazy, it looks like:

```scala
val r = RecordLoader.loadArchives(warc, sc) 
  .keepValidPages()
  .map(r => { 
  val t = RemoveHTML(r.getContentString) 
  val len = 1000 
  (r.getCrawlDate, r.getUrl, if ( t.length > len ) t.substring(0, len) else t)}) 
  .collect() 
```

Finally, we can do some neat tricks with browser injection. Run the following cell:

```scala
def createClickableLink(url: String, date: String): String = { 
"<a href='http://web.archive.org/web/" + date + "/" + url + "'>" + 
url + "</a>" 
} 
```

Now let's re-run a familiar command from before but with this `createClickableLink` command and our `warc` variable.

```scala
val r = 
  RecordLoader.loadArchives(warc, sc) 
  .keepValidPages() 
  .map(r => { 
    val t = RemoveHTML(r.getContentString) 
    val len = 100 
    (r.getCrawlDate, createClickableLink(r.getUrl, 
    r.getCrawlDate), if ( t.length > len ) t.substring(0, len) else t)}) 
.collect()
```

Now you should have beautiful clickable links to explore. Open in a few in a new tab!

#### Step Four: More sophisticated commands

We would normally switch to Spark Shell at this point, but given the amount of Windows machines let's learn new commands in notebook.

For example, to grab the plain text from the collection and **save it to a file**, we could use:

```scala
import io.archivesunleashed.spark.rdd.RecordRDD._
import io.archivesunleashed.spark.matchbox.{RemoveHTML, RecordLoader}

RecordLoader.loadArchives(arc, sc)
  .keepValidPages()
  .map(r => (r.getCrawldate, r.getDomain, r.getUrl, RemoveHTML(r.getContentString)))
  .saveAsTextFile("/WARC-plain-text")
```

You should now have a directory in your home directory with the plain text. 

##### Text by Domain

Above, we saw that there were pages belonging to `greenparty.ca`. Imagine we just want them. The following script adds a new command: `keepDomains`.

```scala
import io.archivesunleashed.spark.matchbox.{RemoveHTML, RecordLoader}
import io.archivesunleashed.spark.rdd.RecordRDD._

RecordLoader.loadArchives(arc, sc)
  .keepValidPages()
  .keepDomains(Set("greenparty.ca"))
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(r.getContentString)))
  .saveAsTextFile("green-party/")
```

It should work as well. Note that your command `keepDomains(Set("greenparty.ca"))` needs to match the string you found above. 

##### Other filters

There are other filters at play here. You can filter by language, year, patterns in URLs, and beyond. Let's play for a bit.

[Consult the documentation here](http://docs.archivesunleashed.io/Spark-Several-Basic-Commands/). Try a few different filters. 

#### Step Five: Network Analysis

Let's run a basic network analysis.

```scala
import io.archivesunleashed.spark.matchbox._
import io.archivesunleashed.spark.rdd.RecordRDD._
import StringUtils._

val links = RecordLoader.loadArchives(arc, sc)
  .keepValidPages()
  .flatMap(r => ExtractLinks(r.getUrl, r.getContentString))
  .map(r => (ExtractDomain(r._1).removePrefixWWW(), ExtractDomain(r._2).removePrefixWWW()))
  .filter(r => r._1 != "" && r._2 != "")
  .countItems()
  .filter(r => r._2 > 5)

links.saveAsTextFile("links-all/")
```

By now this should be seeming pretty straightforward. In your other window, visit the resulting file (the `part-00000` file in your `links-all` directory) and type:

```
head part-00000
```

You should see a list of links.

### Step Six: Spark Shell TODO

We won't have much time for Spark Shell today, but we wanted to briefly show it. In our AUT workflow, we often prototype new scripts with the Spark Notebook, before running our jobs directly with Shell.

To run, navigate to the spark-shell directory by

```
cd /home/ubuntu/project/spark-1.6.1-bin-hadoop2.6/bin
```

Then run with:

```
./spark-shell --jars /home/ubuntu/project/warcbase/warcbase-core/target/warcbase-core-0.1.0-SNAPSHOT-fatjar.jar
``` 

>On your own system, you might want to pass different variables to allocate more memory and the such (i.e. on our server, we often use `/home/i2millig/spark-1.5.1/bin/spark-shell --driver-memory 60G --jars ~/warcbase/target/warcbase-0.1.0-SNAPSHOT-fatjar.jar` to give it 60GB of memory; or on the cluster, we use `spark-shell --jars ~/warcbase/target/warcbase-0.1.0-SNAPSHOT-fatjar.jar --num-executors 75 --executor-cores 5 --executor-memory 20G --driver-memory 26G`).

Now we are ready for our first test script. To get this working, you need to first type:

```
:paste
```

Then you can paste the following script. When it's looking right, press `Ctrl` and `D` at the same time to get it running.

```scala
import io.archivesunleashed.spark.matchbox._
import io.archivesunleashed.spark.rdd.RecordRDD._

val r = RecordLoader.loadArchives("/aut-resources/ARCHIVEIT-227-UOFTORONTO-CANPOLPINT-20060622205612-00009-crawling025.archive.org.arc.gz", sc)
.keepValidPages()
.map(r => ExtractDomain(r.getUrl))
.countItems()
.take(10)
```

This counts the number of domains found in the collection and displays them. 