# Setting up the Archives Unleashed Toolkit

- [Introduction](#Introduction)
- [Dependencies](#Dependencies)
- [Installing and Running Apache Spark](#Installing-and-Running-Apache-Spark)
- [Archives Unleashed Toolkit with Spark Shell](#Archives Unleashed Toolkit with Spark Shell)
- [Archives Unleashed Toolkit with PySpark](#Archives-Unleashed-Toolkit-with-PySpark)
- [Archives Unleashed Toolkit with Jupyter](#Archives-Unleashed-Toolkit-with-Jupyter)
- [Test the Archives Unleashed Toolkit](#Test-the-Archives-Unleashed-Toolkit)

## Introduction

This guide assumes you are running the bleeding edge of AUT; HEAD on the `master` branch. To have a clean environment, clone AUT somewhere of your choice (`git clone git@github.com:archivesunleashed/aut.git`), and build it (`mvn clean install`).

You may want to consider having a clean environment by clearning out your Maven and Ivy dependency caches (`rm -rf ~/.m2/repository/* && rm -rf ~/.ivy2/*`). Please do this at your own risk, and create a backup of those directories if you are not sure you want to remove the dependency caches.

**Want a quick walkthrough?** We have a walkthrough for using AUT on sample data with Docker [here](toolkit-lesson.md).

## Dependencies

### Java

The Archives Unleashed Toolkit requires Java 8.

For macOS: You can find information on Java [here](https://java.com/en/download/help/mac_install.xml), or install with [homebrew](https://brew.sh) and then:

```bash
brew cask install java8
```

For Linux: You can install Java using apt:

```bash
apt install openjdk-8-jdk
```

Before `spark-shell` can launch, `JAVA_HOME` must be set. If you receive an error that `JAVA_HOME` is not set, you need to point it to where Java is installed. On Linux, this might be `export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64` or on macOS it might be `export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_74.jdk/Contents/Home`.

### Python

If you would like to use the Archives Unleashed Toolkit with PySpark and/or Jupyter Notebooks, you'll need to have a modern version of Python installed. We recommend using the [Anaconda Distribution](https://www.anaconda.com/distribution). This _should_ install Jupyter Notebook, as well as the PySpark bindings. If it doesn't, you can install either with `conda install` or `pip install`.

## Installing and Running Apache Spark

Download and unzip [Apache Spark](https://spark.apache.org) to a location of your choice.

```bash
curl -L "https://archive.apache.org/dist/spark/spark-2.4.4/spark-2.4.4-bin-hadoop2.7.tgz" > spark-2.4.4-bin-hadoop2.7.tgz
tar -xvf spark-2.4.4-bin-hadoop2.7.tgz
```

### Running Apache Spark Shell (Scala)

Many of our documentation examples take place in the Apache Spark Shell, which is in essence a [Scala REPL](https://docs.scala-lang.org/overviews/repl/overview.html).

To run Apache Spark Shell:

```
spark-2.4.4-bin-hadoop2.7/bin/spark-shell
```

You should see something like:

```
Spark context Web UI available at http://10.0.1.44:4041
Spark context available as 'sc' (master = local[10], app id = local-1572059365536).
Spark session available as 'spark'.
Welcome to
      ____              __
     / __/__  ___ _____/ /__
    _\ \/ _ \/ _ `/ __/  '_/
   /___/ .__/\_,_/_/ /_/\_\   version 2.4.4
      /_/
         
Using Scala version 2.11.12 (OpenJDK 64-Bit Server VM, Java 1.8.0_222)
Type in expressions to have them evaluated.
Type :help for more information.

scala> 
```

## Archives Unleashed Toolkit with Spark Shell

There are a two options for loading the Archives Unleashed Toolkit. The advantages and disadvantages of using either option are going to depend on your setup (single machine vs cluster):

```shell
$ spark-shell --help

  --jars JARS                 Comma-separated list of jars to include on the driver
                              and executor classpaths.
  --packages                  Comma-separated list of maven coordinates of jars to include
                              on the driver and executor classpaths. Will search the local
                              maven repo, then maven central and any additional remote
                              repositories given by --repositories. The format for the
                              coordinates should be groupId:artifactId:version.
```

### As a package

Release version:

```shell
$ spark-shell --packages "io.archivesunleashed:aut:0.18.0"
```

HEAD (built locally):

```shell
$ spark-shell --packages "io.archivesunleashed:aut:0.18.1-SNAPSHOT"
```

### With an UberJar

Release version:

```shell
$ spark-shell --jars /path/to/aut-0.18.0-fatjar.jar
```

HEAD (built locally):

```shell
$ spark-shell --jars /path/to/aut-0.18.1-SNAPSHOT-fatjar.jar
```

## Archives Unleashed Toolkit with PySpark

To run PySpark with the Archives Unleashed Toolkit loaded, you will need to provide PySpark with the Java/Scala package, and the Python bindings. The Java/Scala packages can be provided with `--packages` or `--jars` as described above. The Python bindings can be [downloaded](https://github.com/archivesunleashed/aut/releases/download/aut-0.18.0/aut-0.18.0.zip), or [built locally](#Introduction) (the zip file will be found in the `target` directory.

### As a package

Release version:

```shell
$ export PYSPARK_PYTHON=/path/to/python; export PYSPARK_DRIVER_PYTHON=/path/to/python; /path/to/spark/bin/pyspark --py-files aut-0.18.0.zip --packages "io.archivesunleashed:aut:0.18.0"
```

HEAD (built locally):

```shell
$ export PYSPARK_PYTHON=/path/to/python; export PYSPARK_DRIVER_PYTHON=/path/to/python; /path/to/spark/bin/pyspark --py-files /home/nruest/Projects/au/aut/target/aut.zip --packages "io.archivesunleashed:aut:0.18.1-SNAPSHOT"
```

### With an UberJar

Release version:

```shell
$ export PYSPARK_PYTHON=/path/to/python; export PYSPARK_DRIVER_PYTHON=/path/to/python; /path/to/spark/bin/pyspark --py-files aut-0.18.0.zip --jars /path/to/aut-0.18.0-fatjar.jar
```

HEAD (built locally):

```shell
$ export PYSPARK_PYTHON=/path/to/python; export PYSPARK_DRIVER_PYTHON=/path/to/python; /path/to/spark/bin/pyspark --py-files /home/nruest/Projects/au/aut/target/aut.zip --jars /path/to/aut-0.18.1-SNAPSHOT-fatjar.jar
```

## Archives Unleashed Toolkit with Jupyter

To run a Jupyter Notebook with the Archives Unleashed Toolkit loaded, you will need to provide PySpark the Java/Scala package, and the Python bindings. The Java/Scala packages can be provided with `--packages` or `--jars` as described above. The Python bindings can be [downloaded](https://github.com/archivesunleashed/aut/releases/download/aut-0.18.0/aut-0.18.0.zip), or [built locally](#Introduction) (the zip file will be found in the `target` directory.

### As a package

Release version:

```shell
$ export PYSPARK_DRIVER_PYTHON=jupyter; export PYSPARK_DRIVER_PYTHON_OPTS=notebook; /path/to/spark/bin/pyspark --py-files aut-0.18.0.zip --packages "io.archivesunleashed:aut:0.18.0"
```

HEAD (built locally):

```shell 
$ export PYSPARK_DRIVER_PYTHON=jupyter; export PYSPARK_DRIVER_PYTHON_OPTS=notebook; /path/to/spark/bin/pyspark --py-files /home/nruest/Projects/au/aut/target/aut.zip --packages "io.archivesunleashed:aut:0.18.1-SNAPSHOT"
```

### With an UberJar

Release version:

```shell
$ export PYSPARK_DRIVER_PYTHON=jupyter; export PYSPARK_DRIVER_PYTHON_OPTS=notebook; /path/to/spark/bin/pyspark --py-files aut-0.18.0.zip --jars /path/to/aut-0.18.0-fatjar.jar
```

HEAD (built locally):

```shell
$ export PYSPARK_DRIVER_PYTHON=jupyter; export PYSPARK_DRIVER_PYTHON_OPTS=notebook; /path/to/spark/bin/pyspark --py-files /home/nruest/Projects/au/aut/target/aut.zip --jars /path/to/aut-0.18.1-SNAPSHOT-fatjar.jar
```

A Jupyter Notebook _should_ automatically load in your browser at <http://localhost:8888>. You may be asked for a token upon first launch, which just offers a bit of security. The token is available in the load screen and will look something like this:

```
[I 19:18:30.893 NotebookApp] Writing notebook server cookie secret to /run/user/1001/jupyter/notebook_cookie_secret
[I 19:18:31.111 NotebookApp] JupyterLab extension loaded from /home/nruest/bin/anaconda3/lib/python3.7/site-packages/jupyterlab
[I 19:18:31.111 NotebookApp] JupyterLab application directory is /home/nruest/bin/anaconda3/share/jupyter/lab
[I 19:18:31.112 NotebookApp] Serving notebooks from local directory: /home/nruest/Projects/au/aut
[I 19:18:31.112 NotebookApp] The Jupyter Notebook is running at:
[I 19:18:31.112 NotebookApp] http://localhost:8888/?token=87e7a47c5a015cb2b846c368722ec05c1100988fd9dcfe04
[I 19:18:31.112 NotebookApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
[C 19:18:31.140 NotebookApp]

    To access the notebook, open this file in a browser:
        file:///run/user/1001/jupyter/nbserver-9702-open.html
    Or copy and paste one of these URLs:
        http://localhost:8888/?token=87e7a47c5a015cb2b846c368722ec05c1100988fd9dcfe04
```

Create a new notebook by clicking “New” (near the top right of the Jupyter homepage) and select “Python 3” from the drop down list.

The notebook will open in a new window. In the first cell enter:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "src/test/resources/warc/")

pages = archive.pages()
pages.printSchema()
```

Then hit <kbd>Shift</kbd>+<kbd>Enter</kbd>, or press the play button.

If you receive no errors, and see the following, you are ready to begin working with your web archives!

![](https://user-images.githubusercontent.com/218561/63203995-42684080-c061-11e9-9361-f5e6177705ff.png)

## Test the Archives Unleashed Toolkit

Type `:paste` at the `scala>` prompt and to go into paste mode.

Type or paste the following:

```
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/git/repo/of/aut/src/test/resources/arc/example.arc.gz", sc).keepValidPages()
  .map(r => ExtractDomainRDD(r.getUrl))
  .countItems()
  .take(10)
```

Then <kbd>CTRL</kbd>+<kbd>d</kbd> to exit paste mode and run the script.

If should then see:

```
r: Array[(String, Int)] = Array((www.archive.org,132), (deadlists.com,2), (www.hideout.com.br,1))
```

That means you're up and running!
