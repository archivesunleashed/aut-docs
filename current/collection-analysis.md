# Collection Analysis

**How do I...**

- [Extract All URLs](#Extract-All-URLs)
- [Extract Top-Level Domains](#Extract-Top-Level-Domains)
- [Extract Different Subdomains](#Extract-Different-Subdomains)
- [Extract HTTP Status Codes](#Extract-HTTP-Status-Codes)
- [Extract the Location of the Resource in ARCs and WARCs](#Extract-the-Location-of-the-Resource-in-ARCs-and-WARCs)

For all the scripts below, you can type `:paste` into Spark Shell, paste the script, and then run it with <kbd>CTRL</kbd>+<kbd>d</kbd>:

## Extract All URLs

How do I get a list of all URLs in the collection?

### Scala RDD

```scala
import io.archivesunleashed._

RecordLoader.loadArchives("src/test/resources/warc/example.warc.gz", sc).keepValidPages()
  .map(r => r.getUrl)
  .take(10)
```

What do I do with the results? See [this guide](rdd-results.md)!

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

RecordLoader.loadArchives("src/test/resources/warc/example.warc.gz", sc).extractValidPagesDF()
  .select($"Url")
  .show(20, false)
```

What do I do with the results? See [this guide](df-results.md)!

### Python DF

```python
from aut import *

WebArchive(sc, sqlContext, "src/test/resources/warc/example.warc.gz").pages() \
    .select("url") \
    .show(20, False)
```

What do I do with the results? See [this guide](df-results.md)!

## Extract Top-Level Domains

How do I extract a list of the top-level domains (and count how many pages belong in each top-level domain)?

### Scala RDD

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("src/test/resources/warc/example.warc.gz", sc).keepValidPages()
  .map(r => ExtractDomainRDD(r.getUrl))
  .countItems()
  .take(10)
```

What do I do with the results? See [this guide](rdd-results.md)!

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

RecordLoader.loadArchives("src/test/resources/warc/example.warc.gz", sc).extractValidPagesDF()
  .select(ExtractDomainDF($"Url").as("Domain"))
  .groupBy("Domain").count().orderBy(desc("count"))
  .show(20, false)
```

What do I do with the results? See [this guide](df-results.md)!

### Python DF

```python
from aut import *
from pyspark.sql.functions import desc

archive = WebArchive(sc, sqlContext, "src/test/resources/warc/example.warc.gz")

df = archive.pages()
df.select(extract_domain("url").alias("Domain")).groupBy("Domain").count().sort(desc("count")).show(n=10)
```

What do I do with the results? See [this guide](df-results.md)!

## Extract Different Subdomains

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

What do I do with the results? See [this guide](rdd-results.md)!

### Scala DF

TODO

### Python DF

TODO

## Extract HTTP Status Codes

How do I get the [HTTP Status Code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) associated with each resource in the collection?

### Scala RDD

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("example.arc.gz", sc)
  .map(r => (r.getUrl, r.getHttpStatus))
  .take(10)
```

What do I do with the results? See [this guide](rdd-results.md)!

### Scala DF

TODO

### Python DF

TODO

## Extract the Location of the Resource in ARCs and WARCs

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

What do I do with the results? See [this guide](rdd-results.md)!

### Scala DF

TODO

### Python DF

TODO
