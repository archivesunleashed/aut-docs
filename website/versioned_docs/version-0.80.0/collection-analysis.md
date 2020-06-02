---
id: version-0.80.0-collection-analysis
title: Collection Analysis
original_id: collection-analysis
---

## Extract All URLs

How do I get a list of all URLs in the collection?

### Scala RDD

```scala
import io.archivesunleashed._

RecordLoader.loadArchives("/path/to/warcs", sc).keepValidPages()
  .map(r => r.getUrl)
  .take(10)
```

What do I do with the results? See [this guide](rdd-results.md)!

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

RecordLoader.loadArchives("/path/to/warcs", sc).webpages()
  .select($"url")
  .show(20, false)
```

What do I do with the results? See [this guide](df-results.md)!

### Python DF

```python
from aut import *

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .webpages() \
  .select("url") \
  .show(20, False)
```

What do I do with the results? See [this guide](df-results.md)!

## Extract Top-Level Domains

How do I extract a list of the top-level domains (and count how many pages
belong in each top-level domain)?

### Scala RDD

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc).keepValidPages()
  .map(r => ExtractDomain(r.getUrl))
  .countItems()
  .take(10)
```

What do I do with the results? See [this guide](rdd-results.md)!

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

RecordLoader.loadArchives("/path/to/warcs", sc).webpages()
  .select(extractDomain($"url").as("domain"))
  .groupBy("domain").count().orderBy(desc("count"))
  .show(20, false)
```

What do I do with the results? See [this guide](df-results.md)!

### Python DF

```python
from aut import *
from pyspark.sql.functions import desc

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .webpages() \
  .select(extract_domain("url").alias("domain")) \
  .groupBy("domain") \
  .count() \
  .sort(desc("count")) \
  .show(10, False)
```

What do I do with the results? See [this guide](df-results.md)!

## Extract Different Subdomains

How do I use regular expressions to extract for fine-grained URL information?
For example, supposed I wanted to extract the first-level directories?

### Scala RDD

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc).keepValidPages()
  .flatMap(r => """http://[^/]+/[^/]+/""".r.findAllIn(r.getUrl).toList)
  .take(10)
```

In the above example, `"""...."""` declares that we are working with a regular
expression, `.r` says turn it into a regular expression, `.findAllIn` says look
for all matches in the URL. This will only return the first but that is
generally good for our use cases. Finally, `.toList` turns it into a list so
you can `flatMap`.

What do I do with the results? See [this guide](rdd-results.md)!

### Scala DF

```scala

import io.archivesunleashed._
import io.archivesunleashed.udfs._

val urlPattern = Array("""http://[^/]+/[^/]+/""".r)

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .select($"url")
  .filter(hasUrlPattern($"url", lit(urlPattern)))
  .show(10, false)
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

url_pattern = "http://[^/]+/[^/]+/"

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .webpages() \
  .select("url") \
  .filter(col("url").rlike(url_pattern)) \
  .show(10, False)
```

## Extract HTTP Status Codes

How do I get the [HTTP Status
Code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) associated with
each resource in the collection?

### Scala RDD

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .map(r => (r.getUrl, r.getHttpStatus))
  .take(10)
```

What do I do with the results? See [this guide](rdd-results.md)!

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .all()
  .select($"url", $"http_status_code")
  .show(10, false)
```

### Python DF

```python
from aut import *

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .all() \
  .select("url", "http_status_code") \
  .show(10, False)
```

## Extract the Location of the Resource in ARCs and WARCs

How do I find out the WARC or ARC that each page is contained in?

### Scala RDD

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc).keepValidPages()
  .map(r => (r.getUrl, r.getArchiveFilename))
  .take(10)
```

Or, if you just want to know the filename, without the full path and filename,
the following script will do that.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._
import org.apache.commons.io.FilenameUtils

RecordLoader.loadArchives("/path/to/warcs", sc).keepValidPages()
  .map(r => (r.getUrl, FilenameUtils.getName(r.getArchiveFilename)))
  .take(10)
```

TODO: Add script for the case where I only want to know the location of _one_ resource.

What do I do with the results? See [this guide](rdd-results.md)!

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .all()
  .select($"url", $"archive_filename")
  .show(10, false)
```

### Python DF

```python
from aut import *

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .all() \
  .select("url", "archive_filename") \
  .show(10, False)
```
