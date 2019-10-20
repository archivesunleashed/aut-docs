## Table of contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Quick Start](#quick-start)
    - [Want a quick walkthrough?](#want-a-quick-walkthrough)
  - [Dependencies](#dependencies)
  - [Installing and Running Spark Shell](#installing-and-running-spark-shell)
  - [Test the Archives Unleashed Toolkit](#test-the-archives-unleashed-toolkit)
  - [A Note on Memory](#a-note-on-memory)
- [Collection Analysis](collection-analysis.md)
- [Text Analysis](text-analysis.md)
- [Link Analysis](link-analysis.md)
- [Image Analysis](image-analysis.md)
- [Filters](#filters)
  - [Keep Images](#keep-images)
  - [Keep MIME Types (web server)](#keep-mime-types-web-server)
  - [Keep MIME Types (Apache Tika)](#keep-mime-types-apache-tika)
  - [Keep HTTP Status](#keep-http-status)
  - [Keep Dates](#keep-dates)
  - [Keep URLs](#keep-urls)
  - [Keep URL Patterns](#keep-url-patterns)
  - [Keep Domains](#keep-domains)
  - [Keep Languages](#keep-languages)
  - [Keep Content](#keep-content)
  - [Discard MIME Types (web server)](#discard-mime-types-web-server)
  - [Discard MIME Types (Apache Tika)](#discard-mime-types-apache-tika)
  - [Discard HTTP Status](#discard-http-status)
  - [Discard Dates](#discard-dates)
  - [Discard URLs](#discard-urls)
  - [Discard URL Patterns](#discard-url-patterns)
  - [Discard Domains](#discard-domains)
  - [Discard Languages](#discard-languages)
  - [Discard Content](#discard-content)
- [DataFrames](#dataframes)
  - [List of Domains](#list-of-domains)
  - [Hyperlink Network](#hyperlink-network)
  - [Image Analysis](#image-analysis-1)
  - [Binary Analysis and Extraction](#binary-analysis-and-extraction)
    - [Binary Analysis](#binary-analysis)
    - [Binary Extraction](#binary-extraction)
- [Loading Data from Amazon S3](#loading-data-from-amazon-s3)

## Introduction

The Archives Unleashed Toolkit is an open-source platform for analyzing web archives built on [Hadoop](https://hadoop.apache.org/). Tight integration with Hadoop provides powerful tools for analytics and data processing via [Spark](http://spark.apache.org/).

Most of this documentation is built on [resilient distributed datasets (RDD)](https://spark.apache.org/docs/latest/rdd-programming-guide.html). We are working on adding support for [DataFrames](https://spark.apache.org/docs/latest/sql-programming-guide.html#datasets-and-dataframes). You can read more about this in our experimental [DataFrames section](#dataframes), and at our [[Using the Archives Unleashed Toolkit with PySpark]] tutorial.

The Archives Unleashed Toolkit can also be used in conjunction with [Spark Notebooks](http://spark-notebook.io/), and [Apache Zepplin](https://zeppelin.apache.org/).

If you want to learn more about [Apache Spark](https://spark.apache.org/), we highly recommend [Spark: The Definitive Guide](http://shop.oreilly.com/product/0636920034957.do) 

## Getting Started

### Quick Start

This guide assumes you are running the bleeding edge of AUT; HEAD on the `master` branch. To have a clean environment, clone AUT somewhere of your choice (`git clone git@github.com:archivesunleashed/aut.git)`, and build it (`mvn clean install).

You may want to consider having a clean environment by clearning out your Maven and Ivy dependency caches (`rm -rf ~/.m2/repository/* && rm -rf ~/.ivy2/*`). Please do this at your own risk, and create a backup of those directories if you are not sure you want to remove the dependency caches.

#### Want a quick walkthrough?
We have a walkthrough for using AUT on sample data with Docker [here](https://github.com/archivesunleashed/aut/wiki/Toolkit-Lesson).

### Dependencies

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

### Installing and Running Spark shell

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

> If you recently upgraded your MacOS, your java version may not be correct in terminal.  You will
> have to [change the path to the latest version in your `.bash_profile` file.](https://stackoverflow.com/questions/21964709/how-to-set-or-change-the-default-java-jdk-version-on-os-x).

### Test the Archives Unleashed Toolkit

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

### A Note on Memory

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

## Filters

The following filters can be used on any `RecordLoader` DataFrames (described below) or RDDs.

### Keep Images

Removes all data except images. 

```scala
import io.archivesunleashed._

val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepImages()
```

### Keep MIME Types (web server)

Removes all data but selected MIME Types (identified by the web server).

```scala
import io.archivesunleashed._

val mimetypes = Set("text/html", "text/plain")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepMimeTypes(mimetypes)
```

### Keep MIME Types (Apache Tika)

Removes all data but selected MIME Types (identified by [Apache Tika](https://tika.apache.org/)).

```scala
import io.archivesunleashed._

val mimetypes = Set("text/html", "text/plain")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepMimeTypesTika(mimetypes)
```

### Keep HTTP Status

Removes all data that does not have selected status codes specified.

```scala
import io.archivesunleashed._

val statusCodes = Set("200", "404)
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepHttpStatus(statusCodes)
```

### Keep Dates

Removes all data that does not have selected date.

```scala
import io.archivesunleashed._

val val dates = List("2008", "200908", "20070502")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepDate(dates)
```

### Keep URLs

Removes all data but selected exact URLs.

```scala
import io.archivesunleashed._

val val urls = Set("archive.org", "uwaterloo.ca", "yorku.ca")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepUrls(urls)
```

### Keep URL Patterns

Removes all data but selected URL patterns (regex).

```scala
import io.archivesunleashed._

val val urls = Set(archive.r, sloan.r, "".r)
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepUrlPatterns(urls)
```

### Keep Domains

Removes all data but selected source domains.

```scala
import io.archivesunleashed._

val val doamins = Set("www.archive.org", "www.sloan.org")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepDomains(domains)
```

### Keep Languages

Removes all data not in selected language ([ISO 639-2 codes](https://www.loc.gov/standards/iso639-2/php/code_list.php)).

```scala
import io.archivesunleashed._

val val languages = Set("en", "fr")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepLanguages(languages)
```

### Keep Content

Removes all content that does not pass Regular Expression test.

```scala
import io.archivesunleashed._

val val content = Set(regex, raw"UNINTELLIBLEDFSJKLS".r)
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepContent(content)
```

### Discard MIME Types (web server)

Filters out detected MIME Types (identified by the web server).

```scala
import io.archivesunleashed._

val mimetypes = Set("text/html", "text/plain")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardMimeTypes(mimetypes)
```

### Discard MIME Types (Apache Tika)

Filters out detected MIME Types (identified by [Apache Tika](https://tika.apache.org/)).

```scala
import io.archivesunleashed._

val mimetypes = Set("text/html", "text/plain")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardMimeTypesTika(mimetypes)
```

### Discard HTTP Status

Filters out detected HTTP status codes.

```scala
import io.archivesunleashed._

val statusCodes = Set("200", "404)
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardHttpStatus(statusCodes)
```

### Discard Dates

Filters out detected dates.

```scala
import io.archivesunleashed._

val val dates = List("2008", "200908", "20070502")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardDate(dates)
```

### Discard URLs

Filters out detected URLs.

```scala
import io.archivesunleashed._

val val urls = Set("archive.org", "uwaterloo.ca", "yorku.ca")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardUrls(urls)
```

### Discard URL Patterns

Filters out detected URL patterns (regex).

```scala
import io.archivesunleashed._

val val urls = Set(archive.r, sloan.r, "".r)
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardUrlPatterns(urls)
```

### Discard Domains

Filters out detected source domains.

```scala
import io.archivesunleashed._

val val doamins = Set("www.archive.org", "www.sloan.org")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardDomains(domains)
```
### Discard Languages

Filters out detected languages ([ISO 639-2 codes](https://www.loc.gov/standards/iso639-2/php/code_list.php)).

```scala
import io.archivesunleashed._

val val languages = Set("en", "fr")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepLanguages(languages)
```

### Discard Content

Filters out detected content that does pass Regular Expression test.

```scala
import io.archivesunleashed._

val val content = Set(regex, raw"UNINTELLIBLEDFSJKLS".r)
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardContent(content)
```

## DataFrames

There are two main ways to use the Archives Unleashed Toolkit. The above instructions used [resilient distributed datasets (RDD)](https://spark.apache.org/docs/latest/rdd-programming-guide.html).

We are currently developing support for [DataFrames](spark dataframes tutorial). This is still under active development, so syntax may change. We have an [open thread](https://github.com/archivesunleashed/aut/issues/190) in our GitHub repository if you would like to add any suggestions, thoughts, or requests for this functionality.

You will note that right now we do not support everything in DataFrames: we do not support plain text extraction or named entity recognition.

Here we provide some documentation on how to use DataFrames in AUT.

### List of Domains

As with the RDD implementation, the first stop is often to work with the frequency of domains appearing within a web archive. You can see the schema that you can use when working with domains by running the following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val df = RecordLoader.loadArchives("example.arc.gz", sc)
  .extractValidPagesDF()

df.printSchema()
```

The script below will show you the top domains within the collection.

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val df = RecordLoader.loadArchives("example.arc.gz", sc)
  .extractValidPagesDF()

df.select(ExtractBaseDomain($"Url").as("Domain"))
  .groupBy("Domain").count().orderBy(desc("count")).show()
```

Results will look like:

```
+------------------+-----+
|            Domain|count|
+------------------+-----+
|   www.archive.org|  132|
|     deadlists.com|    2|
|www.hideout.com.br|    1|
+------------------+-----+
```

### Hyperlink Network

You may want to work with DataFrames to extract hyperlink networks. You can see the schema with the following commands: 

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val df = RecordLoader.loadArchives("example.arc.gz", sc)
  .extractHyperlinksDF()

df.printSchema()
```

The below script will give you the source and destination for hyperlinks found within the archive.

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val df = RecordLoader.loadArchives("example.arc.gz", sc)
  .extractHyperlinksDF()

df.select(RemovePrefixWWW(ExtractBaseDomain($"Src")).as("SrcDomain"),
    RemovePrefixWWW(ExtractBaseDomain($"Dest")).as("DestDomain"))
  .groupBy("SrcDomain", "DestDomain").count().orderBy(desc("SrcDomain")).show()
```

Results will look like:

```
+-------------+--------------------+-----+
|    SrcDomain|          DestDomain|count|
+-------------+--------------------+-----+
|deadlists.com|       deadlists.com|    2|
|deadlists.com|           psilo.com|    2|
|deadlists.com|                    |    2|
|deadlists.com|         archive.org|    2|
|  archive.org|        cyberduck.ch|    1|
|  archive.org|        balnaves.com|    1|
|  archive.org|         avgeeks.com|    1|
|  archive.org|          cygwin.com|    1|
|  archive.org|      onthemedia.org|    1|
|  archive.org|ia311502.us.archi...|    2|
|  archive.org|dvdauthor.sourcef...|    1|
|  archive.org|              nw.com|    1|
|  archive.org|             gnu.org|    1|
|  archive.org|          hornig.net|    2|
|  archive.org|    webreference.com|    1|
|  archive.org|    bookmarklets.com|    2|
|  archive.org|ia340929.us.archi...|    2|
|  archive.org|            mids.org|    1|
|  archive.org|       gutenberg.org|    1|
|  archive.org|ia360602.us.archi...|    2|
+-------------+--------------------+-----+
only showing top 20 rows
```

### Image Analysis

You can also use DataFrames to analyze images. You can see the schema for images by running the following command:

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

val df = RecordLoader.loadArchives("example.arc.gz", sc).extractImageDetailsDF();
df.printSchema()
```

The results will look like:

```
root
 |-- url: string (nullable = true)
 |-- filename: string (nullable = true)
 |-- extension: string (nullable = true)
 |-- mime_type_web_server: string (nullable = true)
 |-- mime_type_tika: string (nullable = true)
 |-- width: integer (nullable = true)
 |-- height: integer (nullable = true)
 |-- md5: string (nullable = true)
 |-- bytes: string (nullable = true)
```

The following script will extract all the images, give you their dimensions, as well as unique hashes.

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val df = RecordLoader.loadArchives("example.arc.gz", sc).extractImageDetailsDF();
df.select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"width", $"height", $"md5", $"sha1", $"bytes").orderBy(desc("md5")).show()
```

The results will look like this:

```
+--------------------+--------------------+---------+--------------------+--------------+-----+------+--------------------+--------------------+--------------------+
|                 url|            filename|extension|mime_type_web_server|mime_type_tika|width|height|                 md5|                sha1|               bytes|
+--------------------+--------------------+---------+--------------------+--------------+-----+------+--------------------+--------------------+--------------------+
|http://www.archiv...|mediatype_movies.gif|      gif|           image/gif|     image/gif|   21|    21|ff05f9b408519079c...|194800d702aab9b87...|R0lGODlhFQAVAKUpA...|
|http://www.archiv...|    LOCLogoSmall.jpg|      jpg|          image/jpeg|    image/jpeg|  275|   300|fbf1aec668101b960...|564c1a07152c12cea...|/9j/4AAQSkZJRgABA...|
|http://www.archiv...|   archive.small.jpg|      jpg|          image/jpeg|    image/jpeg|  300|   225|f611b554b9a44757d...|e9bf7ef0ae3fc50f5...|/9j/4RpBRXhpZgAAT...|
|http://tsunami.ar...|  tsunamiweb1_02.jpg|      jpg|          image/jpeg|    image/jpeg|  384|   229|f02005e29ffb485ca...|9eeb9c3c67d7efc51...|/9j/4AAQSkZJRgABA...|
|http://www.archiv...|alexa_websearch_l...|      gif|           image/gif|     image/gif|  301|    47|eecc909992272ce0d...|ea18e226f3cf40005...|R0lGODlhLQEvAPcAA...|
|http://www.archiv...|      lizardtech.gif|      gif|           image/gif|     image/gif|  140|    37|e7166743861126e51...|cf26e9ffc27be133f...|R0lGODlhjAAlANUwA...|
|http://www.archiv...|       half_star.png|      png|           image/png|     image/png|   14|    12|e1e101f116d9f8251...|736abd06a978e2fd2...|iVBORw0KGgoAAAANS...|
|http://www.archiv...|         hewlett.jpg|      jpg|          image/jpeg|    image/jpeg|  300|   116|e1da27028b81db60e...|eb418c17901b1b313...|/9j/4AAQSkZJRgABA...|
|http://www.archiv...|prelinger-header-...|      jpg|          image/jpeg|    image/jpeg|   84|    72|d39cce8b2f3aaa783...|1c41a644123e8f861...|/9j/4AAQSkZJRgABA...|
|http://www.archiv...|           arrow.gif|      gif|           image/gif|     image/gif|   13|    11|c7ee6d7c17045495e...|7013764e619066e60...|R0lGODlhDQALALMAA...|
|http://www.archiv...|          folder.png|      png|           image/png|     image/png|   20|    15|c1905fb5f16232525...|ff7b8c60e8397cb5d...|iVBORw0KGgoAAAANS...|
|http://www.archiv...|     wayback-wtc.gif|      gif|           image/gif|     image/gif|   35|    35|c15ec074d95fe7e1e...|f45425406600b136d...|R0lGODlhIwAjANUAA...|
|http://www.archiv...|     clicktoplay.png|      png|           image/png|     image/png|  320|   240|b148d9544a1a65ae4...|477105e3a93b60dd8...|iVBORw0KGgoAAAANS...|
|http://www.archiv...|    orange_arrow.gif|      gif|           image/gif|     image/gif|    8|    11|a820ac93e2a000c9d...|850b9daeef06bee6e...|R0lGODlhCAALAJECA...|
|http://www.archiv...|  arc-it-tagline.gif|      gif|           image/gif|     image/gif|  385|    30|9f70e6cc21ac55878...|4601e2f642d8e55ac...|R0lGODlhgQEeALMPA...|
|http://www.archiv...|          guitar.jpg|      jpg|          image/jpeg|    image/jpeg|  140|   171|9ed163df5065418db...|f6c9475009ae2416c...|/9j/4AAQSkZJRgABA...|
|http://www.archiv...|        blendbar.jpg|      jpg|          image/jpeg|    image/jpeg| 1800|    89|9e41e4d6bdd53cd9d...|dc780bf80720c87c9...|/9j/4AAQSkZJRgABA...|
|http://www.archiv...|alexalogo-archive...|      gif|           image/gif|     image/gif|  304|    36|9da73cf504be0eb70...|03e530ef04e4b68f7...|R0lGODlhMAEkAOYAA...|
|http://www.archiv...|             lma.jpg|      jpg|          image/jpeg|    image/jpeg|  215|    71|97ebd3441323f9b5d...|ff9485b26300721b2...|/9j/4AAQSkZJRgABA...|
|http://i.creative...|           88x31.png|      png|           image/png|     image/png|   88|    31|9772d34b683f8af83...|689bef4ffb8918612...|iVBORw0KGgoAAAANS...|
+--------------------+--------------------+---------+--------------------+--------------+-----+------+--------------------+--------------------+--------------------+

only showing top 20 rows

import io.archivesunleashed._
import io.archivesunleashed.df._
df: org.apache.spark.sql.DataFrame = [url: string, filename: string ... 7 more fields]
```

### Binary Analysis and Extraction

You may want to save certain binaries to work with them on your own file system. We have created support for the following types of binary analysis and extraction from an ARC or WARC:

- Audio: `extractAudioDetailsDF()`
- Images: `extractImageDetailsDF()`
- PDFs: `extractPDFDetailsDF()`
- Presentation program files: `extractPresentationProgramDetailsDF()`
- Spreadsheets: `extractSpreadsheetDetailsDF()`
- Text files: `extractTextFilesDetailsDF()`
- Videos: `extractVideoDetailsDF()`
- Word processor files: `extractWordProcessorDetailsDF()`

#### Binary Analysis

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val df = RecordLoader.loadArchives("example.media.warc.gz", sc).extractVideoDetailsDF();
df.select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5", $"sha1", $"bytes").orderBy(desc("md5")).show()
```

The results will look like:

```
+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|                 url|            filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|               bytes|
+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|https://ruebot.ne...|2018-11-12%2016.1...|      mp4|           video/mp4|     video/mp4|2cde7de3213a87269...|f28c72fa4c0464a1a...|AAAAGGZ0eXBtcDQyA...|
+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+

import io.archivesunleashed._
import io.archivesunleashed.df._
df: org.apache.spark.sql.DataFrame = [url: string, filename: string ... 5 more fields]
```

#### Binary Extraction

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._
val df = RecordLoader.loadArchives("example.arc.gz", sc).extractPDFDetailsDF();
val res = df.select($"bytes", $"extension").saveToDisk("bytes", "/path/to/export/directory/your-preferred-filename-prefix", $"extension")
```

## Loading Data from Amazon S3

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
