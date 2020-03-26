# Filters DataFrame

The following UDFs (User Defined Functions) for filters can be used on any DataFrame column. In addition, each of the UDFs can be negated with `!`, e.g. `!hasImages`.

**This column...**

- [Has Content](#Has-Content)
- [Has Date(s)](#Has-Dates)
- [Has Domain(s)](#Has-Domains)
- [Has HTTP Status](#Has-HTTP-Status)
- [Has Images](#Has-Images)
- [Has Language(s)](#Has-Languages)
- [Has MIME Type (Apache Tika)](#Has-MIME-Type-Apache-Tika)
- [Has MIME Type (web server)](#Has-MIME-Type-web-server)
- [Has URL Pattern(s)](#Has-URL-Patterns)
- [Has URL(s)](#Has-URLs)

## Has Content

Filters or removes all data that does or does not pass a specified regular expression test on content.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val content = Array("Content-Length: [0-9]{4}")

RecordLoader.loadArchives("/path/to/warcs", sc)
  .all()
  .select("url", "content")
  .filter(!hasContent($"content", lit(content)))
```

### Python DF

**To be implemented.**

## Has Dates

Filters or keeps all data that does or does not match the date(s) specified.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val dates = Array("2008", "200908", "20070502")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .select($"url", $"crawl_date")
  .filter(!hasDate($"crawl_date", lit(dates)))
```

### Python DF

**To be implemented.**

## Has Domain(s)

Filters or keeps all data that does or does not match the source domain(s) specified.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val domains = Array("www.archive.org", "www.sloan.org")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .webpages()
  .select($"url")
  .filter(!hasDomains(ExtractDomainDF($"url"), lit(domains)))
```

### Python DF

**To be implemented.**

## Has HTTP Status

Filters or keeps all data that does or does not match the status codes specified.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val statusCodes = Array("200","000")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .select($"url",$"http_status_code")
  .filter(!hasHTTPStatus($"http_status_code", lit(statusCodes)))
```

### Python DF

**To be implemented.**

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

**To be implemented.**

## Has Languages

Filters or keeps all data that does or does not match the language(s) ([ISO 639-2 codes](https://www.loc.gov/standards/iso639-2/php/code_list.php)) specified.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val languages = Array("th","de","ht")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .webpages()
  .select($"url", $"content")
  .filter(hasLanguages(DetectLanguageDF(RemoveHTMLDF($"content")), lit(languages)))
```

### Python DF

**To be implemented.**

## Keep MIME Types (Apache Tika)

Filters or keeps all data that does or does not match the MIME type(s) (identified by [Apache Tika](https://tika.apache.org/)) specified.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val mimeTypes = Array("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .select($"url", $"mime_type_tika")
  .filter(!hasMIMETypesTika($"mime_type_tika", lit(mimeTypes)))
```

### Python DF

**To be implemented.**

## Keep MIME Types (web server)

Filters or keeps all data that does or does not match the MIME type(s) (identified by the web server) specified.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val mimeTypes = Array("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .select($"url", $"mime_type_web_server")
  .filter(!hasMIMETypesTika($"mime_type_web_server", lit(mimeTypes)))
```

### Python DF

**To be implemented.**

## Has URL Patterns

Filters or removes all data that does or does not pass a specified regular expression test on URL patterns.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val urlsPattern = Array(".*images.*")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .select($"url", $"content")
  .filter(hasUrlPatterns($"url", lit(urlsPattern)))
```

### Python DF

**To be implemented.**

## Has URLs

Filters or keeps all data that does or does not match the URL(s) specified.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val urls = Array("www.archive.org")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .select($"url", $"content")
  .filter(hasUrls($"url", lit(urls)))
```

### Python DF

**To be implemented.**
