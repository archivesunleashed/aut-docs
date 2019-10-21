# Getting Started with the Archives Unleashed Toolkit

- [Introduction](#Introduction)
- [Dependencies](#Dependencies)
- [Installing and Running Spark Shell](#Installing-and-Running-Spark-Shell)
- [Test the Archives Unleashed Toolkit](#Test-the-Archives-Unleashed-Toolkit)
- [A Note on Memory](#A-Note-on-Memory)
- [Loading Data from AWS S3](#Loading-Data-from-AWS-S3)

## Introduction

This guide assumes you are running the bleeding edge of AUT; HEAD on the `master` branch. To have a clean environment, clone AUT somewhere of your choice (`git clone git@github.com:archivesunleashed/aut.git)`, and build it (`mvn clean install).

You may want to consider having a clean environment by clearning out your Maven and Ivy dependency caches (`rm -rf ~/.m2/repository/* && rm -rf ~/.ivy2/*`). Please do this at your own risk, and create a backup of those directories if you are not sure you want to remove the dependency caches.

**Want a quick walkthrough?** We have a walkthrough for using AUT on sample data with Docker [here](https://github.com/archivesunleashed/aut/wiki/Toolkit-Lesson).



## Dependencies

The Archives Unleashed Toolkit requires Java.

For Mac OS: You can find information on Java [here](https://java.com/en/download/help/mac_install.xml), or install with [homebrew](https://brew.sh) and then:

```bash
brew cask install java8
```

For Linux: You can install Java using apt:

```bash
apt install openjdk-8-jdk
```

Before `spark-shell` can launch, `JAVA_HOME` must be set. If you receive an error that JAVA_HOME is not set, you need to point it to where Java is installed. On Linux, this might be `export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64` or on Mac OS it might be `export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_74.jdk/Contents/Home`.



## Installing and Running Spark Shell

Remaining in the aut directory you created above, download and unzip [Spark](https://archive.apache.org/dist/spark/spark-2.4.3/spark-2.4.3-bin-hadoop2.7.tgz) from the [Apache Spark Website](http://spark.apache.org/downloads.html).

```bash
curl -L "https://archive.apache.org/dist/spark/spark-2.4.3/spark-2.4.3-bin-hadoop2.7.tgz" > spark-2.4.3-bin-hadoop2.7.tgz
tar -xvf spark-2.4.3-bin-hadoop2.7.tgz
spark-2.4.3-bin-hadoop2.7/bin/spark-shell --packages "io.archivesunleashed:aut:0.18.1-SNAPSHOT"
```

You should have the spark shell ready and running.

```
Welcome to
      ____              __
     / __/__  ___ _____/ /__
    _\ \/ _ \/ _ `/ __/  '_/
   /___/ .__/\_,_/_/ /_/\_\   version 2.4.3
      /_/
         
Using Scala version 2.11.12 (OpenJDK 64-Bit Server VM, Java 1.8.0_222)
Type in expressions to have them evaluated.
Type :help for more information.

scala> 
```

## Test the Archives Unleashed Toolkit

Type `:paste` at the `scala>` prompt and go into paste mode.

Type or paste the following:

```
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc).keepValidPages()
  .map(r => ExtractDomain(r.getUrl))
  .countItems()
  .take(10)
```

then <kbd>CTRL</kbd>+<kbd>d</kbd> to exit paste mode and run the script.

If you see:

```
r: Array[(String, Int)] = Array((www.archive.org,132), (deadlists.com,2), (www.hideout.com.br,1))
```

That means you're up and running!

## A Note on Memory

As your datasets grow, you may need to provide more memory to Spark shell. You'll know this if you get an error saying that you have run out of "Java Heap Space."

If you're running locally, you can pass it in your startup command like this:

```
spark-2.4.3-bin-hadoop2.7/bin/spark-shell --driver-memory 4G --packages "io.archivesunleashed:aut:0.18.1-SNAPSHOT"
```

In the above case, you give Spark 4GB of memory to execute the program.

In some other cases, despite giving AUT sufficient memory, you may still encounter Java Heap Space issues. In those cases, it is worth trying to lower the number of worker threads. When running locally (i.e. on a single laptop, desktop, or server), by default AUT runs a number of threads equivalent to the number of cores in your machine.

On a 16-core machine, you may want to drop to 12 cores if you are having memory issues. This will increase stability but decrease performance a bit.

You can do so like this (example is using 12 threads on a 16-core machine):

```
spark-2.4.3-bin-hadoop2.7/bin/spark-shell --master local[12] --driver-memory 4G --packages "io.archivesunleashed:aut:0.18.1-SNAPSHOT"
```

If you continue to have errors, you may also want to increase the network timeout value. Once in a while, AUT might get stuck on an odd record and take longer than normal to process it. The `--conf spark.network.timeout=10000000` will ensure that AUT continues to work on material, although it may take a while to process. This command then works:

```
spark-2.4.3-bin-hadoop2.7/bin/spark-shell --master local[12] --driver-memory 90G --conf spark.network.timeout=10000000 --packages "io.archivesunleashed:aut:0.18.1-SNAPSHOT"
```

## Loading Data from AWS S3

We also support loading data stored in [Amazon S3](https://aws.amazon.com/s3/). This advanced functionality requires that you provide Spark shell with your AWS Access Key and AWS Secret Key, which you will get when creating your AWS credentials ([read more here](https://aws.amazon.com/blogs/security/wheres-my-secret-access-key/)).

This script, for example, will find the top ten domains from a set of WARCs found in an s3 bucket.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

sc.hadoopConfiguration.set("fs.s3a.access.key", "<my-access-key>")
sc.hadoopConfiguration.set("fs.s3a.secret.key", "<my-secret-key>")

val r = RecordLoader.loadArchives("s3a://<my-bucket>/*.gz", sc)
.keepValidPages()
.map(r => ExtractDomain(r.getUrl))
.countItems()
.take(10)
```

You can modify any of the scripts in this documentation accordingly.

```