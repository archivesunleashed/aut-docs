# Image Analysis

- [Most Frequent Image URLs](#Most-Frequent-Image-URLs)
- [Most Frequent Images MD5 Hash](#Most-Frequent-Images-MD5-Hash)

The Archives Unleashed Toolkit supports image analysis, a growing area of interest within web archives.

## Most Frequent Image URLs

### Scala RDD

The following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

val links = RecordLoader.loadArchives("example.arc.gz", sc)
  .keepValidPages()
  .flatMap(r => ExtractImageLinks(r.getUrl, r.getContentString))
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

TODO

### Python DF

TODO

## Most Frequent Images MD5 Hash

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
