---
id: version-1.2.0-filters-df
title: DataFrame Filters
original_id: filters-df
---

Each filter below keeps the records that match. To remove the matching records
instead, negate the filter with `!` in Scala or `~` in Python, as several of
the examples do.

## Has Content

Keeps or removes records whose content matches the specified regular
expression(s).

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val content = Array("Content-Length: [0-9]{4}")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .all()
  .select("url", "raw_content")
  .filter(!hasContent($"raw_content", lit(content)))
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

content = "Content-Length: [0-9]{4}"

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .all() \
  .select("url", "raw_content") \
  .filter(~col("raw_content").rlike(content))
```

## Has Dates

Keeps or removes records whose crawl date matches the specified timestamps or
date patterns.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val dates = Array("2008.*", "200908.*", "20070502231159")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .all()
  .select($"url", $"crawl_date")
  .filter(!hasDate($"crawl_date", lit(dates)))
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

dates = "^(2008|200908|20070502231159)"

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .all() \
  .select("url", "crawl_date") \
  .filter(~col("crawl_date").rlike(dates))
```

## Has Domain(s)

Keeps or removes records whose source domain matches the specified domain(s).

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val domains = Array("archive.org", "sloan.org")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .select($"url")
  .filter(!hasDomains(extractDomain($"url"), lit(domains)))
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

domains = ["archive.org", "sloan.org"]

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .webpages() \
  .select("url") \
  .filter(~(extract_domain("url").isin(domains)))
```

## Has HTTP Status

Keeps or removes records whose HTTP status code matches the specified status code(s).

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val statusCodes = Array("200", "000")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .all()
  .select($"url", $"http_status_code")
  .filter(!hasHTTPStatus($"http_status_code", lit(statusCodes)))
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

status_codes = ["200", "000"]

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .all() \
  .select("url", "http_status_code") \
  .filter(~col("http_status_code").isin(status_codes))
```

## Has Images

Keeps only images.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .all()
  .filter(hasImages($"crawl_date", $"mime_type_tika"))
  .select($"mime_type_tika", $"mime_type_web_server", $"url")
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .all() \
  .select("mime_type_tika", "mime_type_web_server", "url") \
  .filter(col("mime_type_tika").like("image/%") | col("mime_type_web_server").like("image/%"))
```

## Has Languages

Keeps or removes records whose detected language matches the specified
language(s) ([ISO 639-1
codes](https://www.loc.gov/standards/iso639-2/php/code_list.php)).

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val languages = Array("th", "de", "ht")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .webpages()
  .select($"language", $"url", $"content")
  .filter(!hasLanguages($"language", lit(languages)))
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

languages = ["th", "de", "ht"]

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .webpages() \
  .select("language", "url", "content") \
  .filter(~col("language").isin(languages))
```

## Has MIME Types (Apache Tika)

Keeps or removes records whose MIME type (identified by [Apache
Tika](https://tika.apache.org/)) matches the specified MIME type(s).

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val mimeTypes = Array("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .all()
  .select($"url", $"mime_type_tika")
  .filter(!hasMIMETypesTika($"mime_type_tika", lit(mimeTypes)))
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

mime_types = ["text/html", "text/plain"]

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .all() \
  .select("url", "mime_type_tika") \
  .filter(~col("mime_type_tika").isin(mime_types))
```

## Has MIME Types (Web Server)

Keeps or removes records whose MIME type (identified by the web server)
matches the specified MIME type(s).

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val mimeTypes = Array("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .all()
  .select($"url", $"mime_type_web_server")
  .filter(!hasMIMETypes($"mime_type_web_server", lit(mimeTypes)))
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

mime_types = ["text/html", "text/plain"]

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .all() \
  .select("url", "mime_type_web_server") \
  .filter(~col("mime_type_web_server").isin(mime_types))
```

## Has URL Patterns

Keeps or removes records whose URL matches the specified regular expression
pattern(s).

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val urlPatterns = Array(".*images.*")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .all()
  .select($"url", $"raw_content")
  .filter(hasUrlPatterns($"url", lit(urlPatterns)))
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

url_pattern = ".*images.*"

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .all() \
  .select("url", "raw_content") \
  .filter(col("url").rlike(url_pattern))
```

## Has URLs

Keeps or removes records whose URL exactly matches the specified URL(s).

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val urls = Array("archive.org")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .all()
  .select($"url", $"raw_content")
  .filter(hasUrls($"url", lit(urls)))
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

urls = ["archive.org"]

WebArchive(sc, sqlContext, "/path/to/warcs") \
  .all() \
  .select("url", "raw_content") \
  .filter(col("url").isin(urls))
```
