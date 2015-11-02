### All Plain text

This script extracts the crawl date, domain, URL, and plain text from HTML files in the sample ARC data (and saves the output to out/):

```
import org.warcbase.spark.matchbox.ArcRecords
import org.warcbase.spark.matchbox.ArcRecords._

val r = ArcRecords.load("src/test/resources/arc/example.arc.gz", sc)
  .keepMimeTypes(Set("text/html"))
  .discardDate(null)
  .extractCrawldateDomainUrlBody()

r.saveAsTextFile("out/")
```

If you wanted to use it on your own collection, you would change "src/test/resources/arc/example.arc.gz" to the directory with your own ARC or WARC files, and change "out/" on the last line to where you want to save your output data.

Note that this will create a new directory to store the output, which cannot already exist.

### Plain text by URL Pattern

The following Spark script generates plain text renderings for all the web pages in a collection with a URL matching a filter string. In the example case, it will go through the collection and find all of the URLs within the "greenparty.ca" domain.

```
import org.warcbase.spark.matchbox.ArcRecords
import org.warcbase.spark.matchbox.ArcRecords._

val r = ArcRecords.load("/path/to/input", sc)
  .keepMimeTypes(Set("text/html"))
  .discardDate(null)
  .keepDomains(Set("greenparty.ca"))
  .extractDomainUrlBody()
r.saveAsTextFile("/path/to/output/")
```