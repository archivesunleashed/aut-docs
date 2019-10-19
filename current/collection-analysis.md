# Collection Analysis

**How do I...**

- [List URLs](#List-URLs)
- [List Top-Level Domains](#List-Top-Level-Domains)
- [List Different Subdomains](#List-Different-Subdomains)
- [List HTTP Status Codes](#List-HTTP-Status-Codes)
- [Get the Location of the Resource in ARCs and WARCs](#Get-the-Location-of-the-Resource-in-ARCs-and-WARCs)

For all the scripts below, you can type `:p` into Spark Shell, paste the script, and then run it with <kbd>CTRL</kbd>+<kbd>d</kbd>:

### To Take or To Save?

All of the scripts below end in:

```
  .take(10)
```

This "takes" the first 10 results in the console.
If you want more or fewer results, just change the number.
Alternative, if you want to save the results to disk, replace the line above with:

```
  .saveAsTextFile("/path/to/export/directory/")
```

Replace `/path/to/export/directory/` with your desired location.

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

Want to save all the results? See [To Take or To Save?](#To-Take-or-To-Save?)

### Scala DF

TODO

### Python DF

TODO

## List Top-Level Domains

### Scala RDD

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

### Scala DF

TODO

### Python DF

TODO

## List Different Subdomains

### Scala RDD

Regular expressions can be used to extract more fine-tuned information. For example, if you wanted to know all sitenames - i.e. the first-level directories of a given collection.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc) .keepValidPages()
  .flatMap(r => """http://[^/]+/[^/]+/""".r.findAllIn(r.getUrl).toList)
  .take(10)
```

In the above example, `"""...."""` declares that we are working with a regular expression, `.r` says turn it into a regular expression, `.findAllIn` says look for all matches in the URL. This will only return the first but that is generally good for our use cases. Finally, `.toList` turns it into a list so you can `flatMap`.

### Scala DF

TODO

### Python DF

TODO

## List HTTP Status Codes

### Scala RDD

You may be interested in the [HTTP Status Codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) of each of the resources. The following script will list the status codes amongst the URLs.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc)
  .map(r => (r.getUrl, r.getHttpStatus))
  .take(10)
```

### Scala DF

TODO

### Python DF

TODO

## Get the Location of the Resource in ARCs and WARCs

### Scala RDD

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

### Scala DF

TODO

### Python DF

TODO
