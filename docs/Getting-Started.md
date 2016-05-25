# Installing Warcbase

Getting warcbase started is pretty easy! You have two dependencies: you need to have `git` installed, and you need to have Maven installed. On OS X, we recommend [installing homebrew](http://brew.sh/). 

Note: many of these tutorials currently assume a working knowledge of a Unix command line environment. For a conceptual and practical introduction, please see Ian Milligan and James Baker's "Introduction to the Bash Command Line" at the [*Programming Historian*](http://programminghistorian.org/lessons/intro-to-bash).

Once you get to the Spark Notebook stage, you can work in your web browser.

## Step One: Installing Dependencies

There are two main dependencies to install, [git](https://git-scm.com/) and [Apache Maven](https://maven.apache.org/). 

### OS X

In OS X, we recommend just using [homebrew](http://brew.sh/). This is a package manager that can simplify everything.

In your terminal, type:

```
brew install git
brew install maven
```

### Windows

Using [Git Bash](https://git-for-windows.github.io/), you will need to install git. It is [a straightforward installation](https://git-scm.com/). For Maven, [download a copy here](https://maven.apache.org/download.cgi) (we recommend the binary zip archive for Windows users). Then following the instructions for "Windows Tips" [here](https://maven.apache.org/install.html). 

### Linux

In Linux, you can install git using:

```
apt-get install git
```

For Maven, [download it from here](https://maven.apache.org/download.cgi). We have tested using the tar archive. All you should need to do is add it to your path, as in:

```
export PATH=/opt/apache-maven-3.3.9/bin:$PATH
```

## Step Two: Installing Warcbase

Then, in the directory where you want to install warcbase, run the following terminal commands.

First, clone the repo:

```bash
git clone http://github.com/lintool/warcbase.git
```

This will download the files that are necessary to build warcbase.

Second, you can now build Warcbase by typing the following command in the newly downloaded warcbase directory (navigate to it by typing `cd warcbase`):

```bash
mvn clean package appassembler:assemble
```

For the impatient, to skip tests:

```bash
mvn clean package appassembler:assemble -DskipTests
```

You only need to build warcbase once to use it.

## Step Three: Testing with Spark Shell

You will now need to install Spark Shell. You can [download it from here](http://spark.apache.org/downloads.html). [This pre-built version is ideal for all systems](http://www.apache.org/dyn/closer.lua/spark/spark-1.6.1/spark-1.6.1-bin-hadoop2.6.tgz).

Now to test, load up the Spark shell. To do so, you will need to run the following from the `spark-1.6.1-bin-hadoop2.6` directory (or whatever version you ended up downloading). The command looks like this on OS X and Linux:

```bash
./bin/spark-shell --jars ~/warcbase/target/warcbase-0.1.0-SNAPSHOT-fatjar.jar
```

On Windows, it is slightly different as you need to call `spark-shell.cmd` as per:

```bash
./bin/spark-shell.cmd --jars ~/warcbase/target/warcbase-0.1.0-SNAPSHOT-fatjar.jar
```

After `--jars` you need to provide the path to where that file in the warcbase directory is. For example, `/users/spark-1.6.1-bin-hadoop2.6/bin/spark-shell --jars target/warcbase-0.1.0-SNAPSHOT-fatjar.jar`.

This command accepts flags. As you get more advanced, you might want to pass it more memory, using the `--driver-memory` flag. For example, this following command will let your Spark Shell use up to 8GB of memory.

```bash
./bin/spark-shell --driver-memory 8G --jars target/warcbase-0.1.0-SNAPSHOT-fatjar.jar
```

Now run the following sample script to see if it works. To enter code blocks you will need to type `:paste` first. Paste the command, and then press `Ctrl+D`.

```scala
import org.warcbase.spark.matchbox._
import org.warcbase.spark.rdd.RecordRDD._

val r = RecordLoader.loadArchives("src/test/resources/arc/example.arc.gz", sc)
  .keepValidPages()
  .map(r => ExtractDomain(r.getUrl))
  .countItems()
  .take(10)
```

If you see results, you're up and running!

Above, you can see that if you find other scripts here, you could just change the line with `RecordLoader` to point it at your data, and the lines after `.keepValidPages()` to the analyses you want to run!

## Step Four: Setting up Spark Notebook

![Spark notebook showing pie chart output](https://raw.githubusercontent.com/ianmilligan1/WAHR/master/images/Spark-Notebook.png)

You might find the Spark Shell ungainly when prototyping. Luckily, Spark Notebook can come and help you.

Spark Notebook is an interactive web-based editor that can run Scala and Spark. 

To use Spark Notebook with Warcbase, download the [notebook](http://spark-notebook.io/) with the following options: Notebook 0.6.3, Scala 2.11, Spark 1.6.1, Hadoop 2.7.2 (no hive, no parquet).

Unzip the downloaded zip file, `cd` into the directory in your terminal, and run the following command:

```bash
./bin/spark-notebook
```

The terminal should read `Listening for HTTP on /0:0:0:0:0:0:0:0:9000`

Then navigate to `http://localhost:9000/` in your browser.

To make a new notebook, click the '+' button on the top right-hand corner.

The **first command** needs to load the warcbase jar. Make sure to change the path to the location of your own warcbase installation:

```scala
:cp /Users/ianmilligan1/dropbox/warcbase/target/warcbase-0.1.0-SNAPSHOT-fatjar.jar
```

You are now ready to run your first script. Try the following, making sure to provide a full path in lieu of `src/test/resources/arc/example.arc.gz`. 

```scala
import org.warcbase.spark.matchbox._ 
import org.warcbase.spark.rdd.RecordRDD._ 

val r = 
RecordLoader.loadArchives("/USER/warcbase/src/test/resources/arc/example.arc.gz", sc) 
.keepValidPages() 
.map(r => ExtractDomain(r.getUrl)) 
.countItems() 
.take(10) 
```

If you want to see more than ten results, change the variable in the last line. 

You are now ready to explore warcbase. 

## Step Five: Loading Sample WARCs

A very useful next step is trying the above scripts with some real WARC files. You can find these in our [warcbase-resources](https://github.com/lintool/warcbase-resources) repository.

In your command line, you can clone it using:

```bash
git clone https://github.com/lintool/warcbase-resources.git
```

Try it yourself! Load up Spark Shell, and run the first command above but point it at `ARCHIVEIT-227-UOFTORONTO-CANPOLPINT-20060622205612-00009-crawling025.archive.org.arc.gz` located in the `warcbase-resources/Sample-Data directory`.

Now try the Spark Shell.

## Step Six: Profit

Time to explore the other scripts in this documentation. Enjoy! [If you want to install it on a Cloud Computer, these documents will help you](http://lintool.github.io/warcbase-docs/Spark-Installing-Spark-Notebook-on-a-Cloud-Computer/).
