# Collection Analysis

**How do I...**

- [List URLs](#List-URLs)
- [List Top-Level Domains](#List-Top-Level-Domains)
- [List Different Subdomains](#List-Different-Subdomains)
- [List HTTP Status Codes](#List-HTTP-Status-Codes)
- [Get the Location of the Resource in ARCs and WARCs](#Get-the-Location-of-the-Resource-in-ARCs-and-WARCs)

For all the scripts below, you can type `:paste` into Spark Shell, paste the script, and then run it with <kbd>CTRL</kbd>+<kbd>d</kbd>:


## List URLs

How do I get a list of all URLs in the collection?

### Scala RDD

```scala
import io.archivesunleashed._

RecordLoader.loadArchives("src/test/resources/warc/example.warc.gz", sc).keepValidPages()
  .map(r => r.getUrl)
  .take(10)
```

Want to save all the results? See [To Take or To Save](#To-Take-or-To-Save).

### Scala DF

```scala
import io.archivesunleashed._

RecordLoader.loadArchives("src/test/resources/warc/example.warc.gz", sc).extractValidPagesDF()
  .select($"Url")
  .show(20, false)
```

### Python DF

```python
from aut import *

WebArchive(sc, sqlContext, "src/test/resources/warc/example.warc.gz").pages() \
    .select("url") \
    .show(20, False)
```

## List Top-Level Domains

How do I extract a list of the top-level domains (and count how many pages belong in each top-level domain)?

### Scala RDD

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("src/test/resources/warc/example.warc.gz", sc).keepValidPages()
  .map(r => ExtractDomain(r.getUrl))
  .countItems()
  .take(10)
```

Want to save all the results? See [To Take or To Save](#To-Take-or-To-Save).

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

RecordLoader.loadArchives("src/test/resources/warc/example.warc.gz", sc).extractValidPagesDF()
  .select(ExtractBaseDomain($"Url").as("Domain"))
  .groupBy("Domain").count().orderBy(desc("count"))
  .show(20, False)
```

### Python DF

TODO

## List Different Subdomains

How do I use regular expressions to extract for fine-grained URL information?
For example, supposed I wanted to extract the first-level directories?

### Scala RDD

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc) .keepValidPages()
  .flatMap(r => """http://[^/]+/[^/]+/""".r.findAllIn(r.getUrl).toList)
  .take(10)
```

In the above example, `"""...."""` declares that we are working with a regular expression, `.r` says turn it into a regular expression, `.findAllIn` says look for all matches in the URL. This will only return the first but that is generally good for our use cases. Finally, `.toList` turns it into a list so you can `flatMap`.

Want to save all the results? See [To Take or To Save](#To-Take-or-To-Save).

### Scala DF

TODO

### Python DF

TODO

## List HTTP Status Codes

How do I get the [HTTP Status Code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) associated with each resource in the collection?

### Scala RDD

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc)
  .map(r => (r.getUrl, r.getHttpStatus))
  .take(10)
```

Want to save all the results? See [To Take or To Save](#To-Take-or-To-Save).

### Scala DF

TODO

### Python DF

TODO

## Get the Location of the Resource in ARCs and WARCs

How do I find out the WARC or ARC that each page is contained in?

### Scala RDD

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

TODO: Add script for the case where I only want to know the location of _one_ resource.

### Scala DF

TODO

### Python DF

TODO
