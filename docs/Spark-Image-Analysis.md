# Image Analysis

Warcbase supports image analysis, a growing area of interest within web archives.  

### Most frequent image URLs in a collection

The following script:

```scala
import io.archivesunleashed.spark.matchbox._
import io.archivesunleashed.spark.rdd.RecordRDD._

val links = RecordLoader.loadArchives("/home/i2millig/warcbase/src/test/resources/warc/example.warc.gz", sc)
  .keepValidPages()
  .flatMap(r => ExtractImageLinks(r.getUrl, r.getContentString))
  .countItems()
  .take(10) 
```
Will extract the top ten URLs of images found within a collection, in an array like so:

>links: Array[(String, Int)] = Array((http://www.archive.org/images/star.png,408), (http://www.archive.org/images/no_star.png,122), (http://www.archive.org/images/logo.jpg,118), (http://www.archive.org/images/main-header.jpg,84), (http://www.archive.org/images/rss.png,20), (http://www.archive.org/images/mail.gif,13), (http://www.archive.org/images/half_star.png,10), (http://www.archive.org/images/arrow.gif,7), (http://ia300142.us.archive.org/3/items/americana/am_libraries.gif?cnt=0,3), (http://ia310121.us.archive.org/2/items/GratefulDead/gratefuldead.gif?cnt=0,3), (http://www.archive.org/images/wayback.gif,2), (http://www.archive.org/images/wayback-election2000.gif,2), (http://www.archive.org/images/wayback-wt...

If you wanted to work with the images, you could download them from the Internet Archive. 

Let's use the top-ranked example. [This link](http://web.archive.org/web/*/http://archive.org/images/star.png), for example, will show you the temporal distribution of the image. For a snapshot from September 2007, this URL would work:

<http://web.archive.org/web/20070913051458/http://www.archive.org/images/star.png>

To do analysis on all images, you could thus prepend `http://web.archive.org/web/20070913051458/` to each URL and `wget` them en masse.

For more information on `wget`, please consult [this lesson available on the Programming Historian website](http://programminghistorian.org/lessons/automated-downloading-with-wget). 

### Most frequent images in a collection, based on MD5 hash

Some images may be the same, but have different URLs. This UDF finds the popular images by calculating the MD5 hash of each and presenting the most frequent images based on that metric. This script:

```scala
import io.archivesunleashed.spark.matchbox._
import io.archivesunleashed.spark.rdd.RecordRDD._
import io.archivesunleashed.spark.matchbox.RecordLoader

val r = RecordLoader.loadArchives("/collections/webarchives/geocities/warcs/*.warc.gz",sc).persist()
ExtractPopularImages(r, 2000, sc).saveAsTextFile("2000-Popular-Images-Geocities14")
```

Will save the 2000 most popular URLs to an output directory.
