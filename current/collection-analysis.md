# Collection Analysis

You may want to get a birds-eye view of your ARCs or WARCs: what top-level domains are included, and at what times were they crawled?

How do I...

- [list URLs](#list-urls)
- [List of Top-Level Domains](#list-of-top-level-domains)
- [List of Different Subdomains](#list-of-different-subdomains)
- [List of HTTP Status Codes](#list-of-http-status-codes)
- [Location of the Resource in ARCs and WARCs](#location-of-the-resource-in-arcs-and-warcs)

## List URLs

### Scala RDD

If you just want a list of URLs in the collection, you can type :p into Spark Shell, paste the script, and then run it with <kbd>CTRL</kbd>+<kbd>d</kbd>:

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc).keepValidPages()
  .map(r => r.getUrl)
  .take(10)
```

This will give you a list of the top ten URLs. If you want all the URLs, exported to a file, you could run this instead. Note that your export directory cannot already exist.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc).keepValidPages()
  .map(r => r.getUrl)
  .saveAsTextFile("/path/to/export/directory/")
```

### Scala DF

TODO

### Python DF

TODO


## List of Top-Level Domains

You may just want to see the domains within an item. The script below shows the top ten domains within a given file or set of files.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc).keepValidPages()
  .map(r => ExtractDomain(r.getUrl))
  .countItems()
  .take(10)
```

If you want to see more than ten results, change the variable in the last line.

## List of Different Subdomains

Regular expressions can be used to extract more fine-tuned information. For example, if you wanted to know all sitenames - i.e. the first-level directories of a given collection.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc) .keepValidPages()
  .flatMap(r => """http://[^/]+/[^/]+/""".r.findAllIn(r.getUrl).toList)
  .take(10)
```

In the above example, `"""...."""` declares that we are working with a regular expression, `.r` says turn it into a regular expression, `.findAllIn` says look for all matches in the URL. This will only return the first but that is generally good for our use cases. Finally, `.toList` turns it into a list so you can `flatMap`.

## List of HTTP Status Codes

You may be interested in the [HTTP Status Codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) of each of the resources. The following script will list the status codes amongst the URLs.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc)
  .map(r => (r.getUrl, r.getHttpStatus))
  .take(10)
```

## Location of the Resource in ARCs and WARCs

Finally, you may want to know what WARC file the different resources are located in! The following command will provide the full path and filename of the ARC/WARC that each url is found in.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc).keepValidPages()
  .map(r => (r.getUrl, r.getArchiveFilename))
  .take(10)
```

Or, if you just want to know the filename, without the full path and filename, the following script will do that.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._
import org.apache.commons.io.FilenameUtils

RecordLoader.loadArchives("example.arc.gz", sc).keepValidPages()
  .map(r => (r.getUrl, FilenameUtils.getName(r.getArchiveFilename)))
  .take(10)
```
