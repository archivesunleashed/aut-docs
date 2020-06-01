---
id: filters-df
title: DataFrame Filters
---

## Has Content

Filters or removes all data that does or does not pass a specified regular
expression test on content.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val content = Array("Content-Length: [0-9]{4}")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .all()
  .select("url", "content")
  .filter(!hasContent($"content", lit(content)))
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

content = "Content-Length: [0-9]{4}"

WebArchive(sc, sqlContext, "/path/to/warcs")\
  .all()\
  .select("url", "content")\
  .filter(col("content").rlike(content))
```

## Has Dates

Filters or keeps all data that does or does not match the date(s) specified.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val dates = Array("2008", "200908", "20070502")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .select($"url", $"crawl_date")
  .filter(!hasDate($"crawl_date", lit(dates)))
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

dates = ["2008", "200908", "20070502"]

WebArchive(sc, sqlContext, "/path/to/warcs")\
  .all()\
  .select("url", "crawl_date")\
  .filter(~col("crawl_date").isin(dates))
```

## Has Domain(s)

Filters or keeps all data that does or does not match the source domain(s) specified.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val domains = Array("www.archive.org", "www.sloan.org")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .webpages()
  .select($"url")
  .filter(!hasDomains(extractDomain($"url"), lit(domains)))
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

domains = ["www.archive.org", "www.sloan.org"]

WebArchive(sc, sqlContext, "/path/to/warcs")\
  .webpages()\
  .select("url")\
  .filter(~(extract_domain("url").isin(domains)))
```

## Has HTTP Status

Filters or keeps all data that does or does not match the status codes specified.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val statusCodes = Array("200","000")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .select($"url",$"http_status_code")
  .filter(!hasHTTPStatus($"http_status_code", lit(statusCodes)))
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

status_codes = ["200", "000"]

WebArchive(sc, sqlContext, "/path/to/warcs")\
  .all()\
  .select("url", "http_status_code")\
  .filter(~col("http_status_code").isin(status_codes))
```

## Has Images

Filters or keeps all data except images.

### Scala DF

```scala
RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .select($"mime_type_tika", $"mime_type_web_server", $"url")
  .filter(hasImages($"crawl_date", DetectMimeTypeTikaDF($"bytes")))
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

WebArchive(sc, sqlContext, "/path/to/warcs")\
  .all()\
  .select("mime_type_tika", "mime_type_web_server", "url")\
  .filter(col("mime_type_tika").like("image/%") | col("mime_type_web_server").like("image/%"))
```

## Has Languages

Filters or keeps all data that does or does not match the language(s) ([ISO
639-2 codes](https://www.loc.gov/standards/iso639-2/php/code_list.php))
specified.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val languages = Array("th","de","ht")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .webpages()
  .select($"language", $"url", $"content")
  .filter($"language".isin(languages))
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

languages = ["th","de","ht"]

WebArchive(sc, sqlContext, "/path/to/warcs")\
  .webpages()\
  .select("language", "url", "content")\
  .filter(~col("language").isin(languages))
```

## Keep MIME Types (Apache Tika)

Filters or keeps all data that does or does not match the MIME type(s)
(identified by [Apache Tika](https://tika.apache.org/)) specified.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val mimeTypes = Array("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .select($"url", $"mime_type_tika")
  .filter(!hasMIMETypesTika($"mime_type_tika", lit(mimeTypes)))
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

mime_types = ["text/html", "text/plain"]

WebArchive(sc, sqlContext, "/path/to/warcs")\
  .all()\
  .select("url", "mime_type_tika"))\
  .filter(~col("mime_type_tika").isin(mime_types))
```

## Keep MIME Types (web server)

Filters or keeps all data that does or does not match the MIME type(s)
(identified by the web server) specified.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val mimeTypes = Array("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .select($"url", $"mime_type_web_server")
  .filter(!hasMIMETypes($"mime_type_web_server", lit(mimeTypes)))
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

mime_types = ["text/html", "text/plain"]

WebArchive(sc, sqlContext, "/path/to/warcs")\
  .all()\
  .select("url", "mime_type_web_server"))\
  .filter(~col("mime_type_web_server").isin(mime_types))
```

## Has URL Patterns

Filters or removes all data that does or does not pass a specified regular
expression test on URL patterns.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val urlsPattern = Array(".*images.*")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .select($"url", $"content")
  .filter(hasUrlPatterns($"url", lit(urlsPattern)))
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

url_pattern = ".*images.*"

WebArchive(sc, sqlContext, "/path/to/warcs")\
  .all()\
  .select("url", "content")
  .filter(~col("url").rlike(url_pattern))
```

## Has URLs

Filters or keeps all data that does or does not match the URL(s) specified.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val urls = Array("www.archive.org")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .select($"url", $"content")
  .filter(hasUrls($"url", lit(urls)))
```

### Python DF

```python
from aut import *
from pyspark.sql.functions import col

urls = ["www.archive.org"]

WebArchive(sc, sqlContext, "/path/to/warcs")\
  .all()\
  .select("url", "content")
  .filter(~col("url").isin(urls)
```
