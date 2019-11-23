# Image Analysis

- [Extract Image Information](#Extract-Image-information)
- [Extract Most Frequent Image URLs](#Extract-Most-Frequent-Image-URLs)
- [Extract Most Frequent Images MD5 Hash](#Extract-Most-Frequent-Images-MD5-Hash)
- [Find Images Shared Between Domains](#Find-Images-Shared-Between-Domains)

The Archives Unleashed Toolkit supports image analysis, a growing area of interest within web archives.

## Extract Image Information

### Scala RDD

TODO

### Scala DF

The following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val df = RecordLoader
  .loadArchives("example.arc.gz", sc)
  .extractImageDetailsDF();

df.select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"width", $"height", $"md5", $"sha1", $"bytes")
  .orderBy(desc("md5"))
  .show()
```

Will extract all following information from images in a web colllection:
  - image url
  - filename
  - extension
  - MimeType as identified by the hosting web server
  - MimeType as identified by [Apache Tika](https://tika.apache.org)
  - Width
  - Height
  - md5 hash
  - sha1 hash
  - bytes

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

If you wanted to work with all the images in a collection, you could extract them with the following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

val df = RecordLoader
  .loadArchives("example.arc.gz", sc)
  .extractImageDetailsDF();

df.select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/export/directory/your-preferred-filename-prefix", $"extension")
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/aut-resources-master/Sample-Data/*gz")

df = archive.images()
df.show()
```

Will extract all following information from images in a web colllection:
  - image url
  - filename
  - extension
  - MimeType as identified by the hosting web server
  - MimeType as identified by [Apache Tika](https://tika.apache.org)
  - Width
  - Height
  - md5 hash
  - sha1 hash
  - bytes

```
+--------------------+--------------------+---------+--------------------+--------------+-----+------+--------------------+--------------------+--------------------+
|                 url|            filename|extension|mime_type_web_server|mime_type_tika|width|height|                 md5|                sha1|               bytes|
+--------------------+--------------------+---------+--------------------+--------------+-----+------+--------------------+--------------------+--------------------+
|http://farm3.stat...|4047878934_ef12ba...|      jpg|          image/jpeg|    image/jpeg|  100|    75|e1a376f170b815f49...|2165fd2908950e9f6...|/9j/4AAQSkZJRgABA...|
|http://farm3.stat...|4047881126_fc6777...|      jpg|          image/jpeg|    image/jpeg|   75|   100|371a2a5142c611405...|933f937c949826696...|/9j/4AAQSkZJRgABA...|
|http://farm3.stat...|4047879492_a72dd8...|      jpg|          image/jpeg|    image/jpeg|  100|    75|8877679361cde970d...|31dbaaed2f7194c95...|/9j/4AAQSkZJRgABA...|
|http://farm3.stat...|4047877728_c6c118...|      jpg|          image/jpeg|    image/jpeg|   75|   100|8f009a568d47e1888...|7b83e7d6c78ed65cf...|/9j/4AAQSkZJRgABA...|
|http://img.youtub...|               0.jpg|      jpg|          image/jpeg|    image/jpeg|  480|   360|96d9290d060547781...|2d3005bd6e09ca064...|/9j/4AAQSkZJRgABA...|
|http://img.youtub...|               0.jpg|      jpg|          image/jpeg|    image/jpeg|  480|   360|c69d65d4880445b31...|abe40cb96bfc79095...|/9j/4AAQSkZJRgABA...|
|http://img.youtub...|               0.jpg|      jpg|          image/jpeg|    image/jpeg|  480|   360|cb11c08d43e25ec3b...|2060857d6cf41b141...|/9j/4AAQSkZJRgABA...|
|http://img.youtub...|               0.jpg|      jpg|          image/jpeg|    image/jpeg|  480|   360|756b5a0a83a621eb7...|d4625efc80efb985e...|/9j/4AAQSkZJRgABA...|
|http://img.youtub...|               0.jpg|      jpg|          image/jpeg|    image/jpeg|  480|   360|0b60007c3e3d9d63f...|a154035590a01efb4...|/9j/4AAQSkZJRgABA...|
|http://img.youtub...|               0.jpg|      jpg|          image/jpeg|    image/jpeg|  480|   360|97fdea388e1245691...|e415a77a4369ecef8...|/9j/4AAQSkZJRgABA...|
|http://img.youtub...|               0.jpg|      jpg|          image/jpeg|    image/jpeg|  480|   360|05c2d43f687f40b60...|ed3f6ca2f3d7e9569...|/9j/4AAQSkZJRgABA...|
|http://www.canadi...|     WebResource.axd|      gif|           image/gif|     image/gif|    1|     1|325472601571f31e1...|2daeaa8b5f19f0bc2...|R0lGODlhAQABAIAAA...|
|http://www.davids...|footprint-carbon.jpg|      jpg|          image/jpeg|    image/jpeg|  200|   200|51f57de92e76f3edc...|c970137cd3bfdbbba...|/9j/4AAQSkZJRgABA...|
|http://www.gca.ca...|              15.jpg|      jpg|          image/jpeg|    image/jpeg|  300|   230|8b3c192b9a0cc82d6...|851377ed11c9cd153...|/9j/4AAQSkZJRgABA...|
|http://www.equalv...|loadingAnimation.gif|      gif|           image/gif|     image/gif|  208|    13|c33734a1bf58bec32...|2bb50e01775289c24...|R0lGODlh0AANAMQAA...|
|http://www.davids...|Keep-greening-gre...|      jpg|          image/jpeg|    image/jpeg|  166|   252|4763383a8be13c735...|a42b963e18dc1e7d4...|/9j/4AAQSkZJRgABA...|
|http://www.davids...|Keep-greening-don...|      jpg|          image/jpeg|    image/jpeg|  146|   252|515bd44bea759e169...|75abeb65cc4f54c7d...|/9j/4AAQSkZJRgABA...|
|http://www.davids...|Keep-greening-eca...|      jpg|          image/jpeg|    image/jpeg|  158|   252|345f71df9702e99a0...|b6637ac654f6e2073...|/9j/4AAQSkZJRgABA...|
|http://www.davids...|Keep-greening-tit...|      jpg|          image/jpeg|    image/jpeg|  470|    45|385522fde90ac7e96...|b42151cf8c3ce14e0...|/9j/4AAQSkZJRgABA...|
|http://www.davids...|    last_minute2.jpg|      jpg|          image/jpeg|    image/jpeg|  265|    33|3defee897d4c553fc...|37c790bbc23c369d8...|/9j/4AAQSkZJRgABA...|
+--------------------+--------------------+---------+--------------------+--------------+-----+------+--------------------+--------------------+--------------------+
only showing top 20 rows
```

## Extract Most Frequent Image URLs

### Scala RDD

The following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

val links = RecordLoader.loadArchives("example.arc.gz", sc)
  .keepValidPages()
  .flatMap(r => ExtractImageLinksRDD(r.getUrl, r.getContentString))
  .countItems()
  .take(10)
```
Will extract the top ten URLs of images found within a collection, in an array like so:

```
links: Array[(String, Int)] = Array((http://www.archive.org/images/star.png,408), (http://www.archive.org/images/no_star.png,122), (http://www.archive.org/images/logo.jpg,118), (http://www.archive.org/images/main-header.jpg,84), (http://www.archive.org/images/rss.png,20), (http://www.archive.org/images/mail.gif,13), (http://www.archive.org/images/half_star.png,10), (http://www.archive.org/images/arrow.gif,7), (http://ia300142.us.archive.org/3/items/americana/am_libraries.gif?cnt=0,3), (http://ia310121.us.archive.org/2/items/GratefulDead/gratefuldead.gif?cnt=0,3), (http://www.archive.org/images/wayback.gif,2), (http://www.archive.org/images/wayback-election2000.gif,2), (http://www.archive.org/images/wayback-wt...
```

If you wanted to work with the images, you could download them from the Internet Archive.

Let's use the top-ranked example. [This link](http://web.archive.org/web/*/http://archive.org/images/star.png), for example, will show you the temporal distribution of the image. For a snapshot from September 2007, this URL would work:

<http://web.archive.org/web/20070913051458/http://www.archive.org/images/star.png>

To do analysis on all images, you could thus prepend `http://web.archive.org/web/20070913051458/` to each URL and `wget` them en masse.

For more information on `wget`, please consult [this lesson available on the Programming Historian website](http://programminghistorian.org/lessons/automated-downloading-with-wget).

### Scala DF

The following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val df = RecordLoader
  .loadArchives("example.arc.gz", sc)
  .extractImageLinksDF();

df.groupBy($"image_url")
  .count()
  .orderBy($"count".desc)
  .show(10)
```

Will extract the top ten URLs of images found within a collection, in a DataFrame like so:

```
+--------------------+-----+
|           image_url|count|
+--------------------+-----+
|http://www.archiv...|  408|
|http://www.archiv...|  122|
|http://www.archiv...|   83|
|http://www.archiv...|   49|
|http://www.archiv...|   20|
|http://www.archiv...|   13|
|http://www.archiv...|   10|
|http://www.archiv...|    7|
|http://ia300142.u...|    3|
|http://ia310121.u...|    3|
+--------------------+-----+
only showing top 10 rows

import io.archivesunleashed._
import io.archivesunleashed.df._
df: org.apache.spark.sql.DataFrame = [src: string, image_url: string]
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "example.arc.gz")

df = archive.image_links()

df.groupBy("image_url")
  .count()
  .orderBy("count", ascending=False)
  .show(10)
```

Will extract the top ten URLs of images found within a collection, in a DataFrame like so:

```
+--------------------+-----+
|           image_url|count|
+--------------------+-----+
|http://www.archiv...|  408|
|http://www.archiv...|  122|
|http://www.archiv...|   83|
|http://www.archiv...|   49|
|http://www.archiv...|   20|
|http://www.archiv...|   13|
|http://www.archiv...|   10|
|http://www.archiv...|    7|
|http://ia300142.u...|    3|
|http://ia310121.u...|    3|
+--------------------+-----+
```

## Extract Most Frequent Images MD5 Hash

Some images may be the same, but have different URLs. This UDF finds the popular images by calculating the MD5 hash of each and presenting the most frequent images based on that metric. This script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.app._
import io.archivesunleashed.matchbox._

val r = RecordLoader.loadArchives("example.arc.gz",sc).persist()
ExtractPopularImages(r, 500, sc).saveAsTextFile("500-Popular-Images")
```

Will save the 500 most popular URLs to an output directory.

### Scala DF

TODO

### Python DF

TODO

## Find Images Shared Between Domains

How to find images shared between domains that appear more than once _in more than one domain_.

### Scala DF

```scala
import io.archivesunleashed.matchbox._
import io.archivesunleashed._

val imgDetails = udf((url: String, MimeTypeTika: String, content: String) => ExtractImageDetails(url,MimeTypeTika,content.getBytes()).md5Hash)
val imgLinks = udf((url: String, content: String) => ExtractImageLinksRDD(url, content))
val domain = udf((url: String) => ExtractDomainRDD(url))

val total = RecordLoader
              .loadArchives("/path/to/warcs", sc)
              .webpages()
              .select(
                $"crawl_date".as("crawl_date"),
                domain($"url").as("Domain"),
                explode_outer(imgLinks(($"url"),
                ($"content"))).as("ImageUrl"),
                imgDetails(($"url"),
                ($"mime_type_tika"),
                ($"content")).as("MD5")
              )
              .filter($"crawl_date" rlike "200910[0-9]{2}")

val links = total
              .groupBy("MD5")
              .count()
              .where(countDistinct("Domain")>=2)

val result = total
               .join(links, "MD5")
               .groupBy("Domain","MD5")
               .agg(first("ImageUrl")
               .as("ImageUrl"))
               .orderBy(asc("MD5"))
               .write
               .format("csv")
               .option("header","true")
               .mode("Overwrite")
               .save("/path/to/output")
```

### PythonDF

TODO
