THIS NEEDS TO MOVE

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
  .webpages()

df.printSchema()
```

The script below will show you the top domains within the collection.

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val df = RecordLoader.loadArchives("example.arc.gz", sc)
  .webpages()

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

df.select(RemovePrefixWWWDF(ExtractBaseDomain($"Src")).as("SrcDomain"),
    RemovePrefixWWWDF(ExtractBaseDomain($"Dest")).as("DestDomain"))
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
