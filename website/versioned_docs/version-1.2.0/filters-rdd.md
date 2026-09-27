---
id: version-1.2.0-filters-rdd
title: RDD Filters
original_id: filters-rdd
---

The following filters can be used on any `RecordLoader` RDDs.

## Keep Valid Pages

Removes all pages that do not have a crawl date or are robots.txt files, and
keeps pages that are of the MIME type `text/html` or `application/xhtml+xml`,
or whose URL ends with `htm` or `html`, and that have a `200` HTTP response
status code.

### Scala RDD

```scala
import io.archivesunleashed._

RecordLoader.loadArchives("/path/to/warcs", sc).keepValidPages()
```

### Scala DF

```scala
import io.archivesunleashed._

RecordLoader.loadArchives("/path/to/warcs", sc).all().keepValidPagesDF()
```

## Keep Images

Removes all data except images.

### Scala RDD

```scala
import io.archivesunleashed._

RecordLoader.loadArchives("/path/to/warcs", sc).keepImages()
```

## Keep MIME Types (Web Server)

Removes all data except the selected MIME types (identified by the web server).

### Scala RDD

```scala
import io.archivesunleashed._

val mimeTypes = Set("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs", sc).keepMimeTypes(mimeTypes)
```

## Keep MIME Types (Apache Tika)

Removes all data except the selected MIME types (identified by [Apache Tika](https://tika.apache.org/)).

### Scala RDD

```scala
import io.archivesunleashed._

val mimeTypes = Set("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs", sc).keepMimeTypesTika(mimeTypes)
```

## Keep HTTP Status

Removes all data except records with the selected HTTP status codes.

### Scala RDD

```scala
import io.archivesunleashed._

val statusCodes = Set("200", "404")

RecordLoader.loadArchives("/path/to/warcs", sc).keepHttpStatus(statusCodes)
```

## Keep Dates

Removes all data except records with the selected dates.

### Scala RDD

```scala
import io.archivesunleashed._

val dates = List("2008", "200908", "20070502")

RecordLoader.loadArchives("/path/to/warcs", sc).keepDate(dates)
```

## Keep URLs

Removes all data except the selected exact URLs.

### Scala RDD

```scala
import io.archivesunleashed._

val urls = Set("archive.org", "uwaterloo.ca", "yorku.ca")

RecordLoader.loadArchives("/path/to/warcs", sc).keepUrls(urls)
```

## Keep URL Patterns

Removes all data except URLs matching the selected patterns (regex).

### Scala RDD

```scala
import io.archivesunleashed._

val urlPatterns = Set(".*archive\\.org.*".r, ".*sloan\\.org.*".r)

RecordLoader.loadArchives("/path/to/warcs", sc).keepUrlPatterns(urlPatterns)
```

## Keep Domains

Removes all data except the selected source domains.

### Scala RDD

```scala
import io.archivesunleashed._

val domains = Set("archive.org", "sloan.org")

RecordLoader.loadArchives("/path/to/warcs", sc).keepDomains(domains)
```

## Keep Languages

Removes all data except the selected languages ([ISO 639-1 codes](https://www.loc.gov/standards/iso639-2/php/code_list.php)).

### Scala RDD

```scala
import io.archivesunleashed._

val languages = Set("en", "fr")

RecordLoader.loadArchives("/path/to/warcs", sc).keepLanguages(languages)
```

## Keep Content

Removes all records whose content does not match the regular expression(s).

### Scala RDD

```scala
import io.archivesunleashed._

val content = Set("radio".r, "(?i)election".r)

RecordLoader.loadArchives("/path/to/warcs", sc).keepContent(content)
```

## Discard MIME Types (Web Server)

Filters out the selected MIME types (identified by the web server).

### Scala RDD

```scala
import io.archivesunleashed._

val mimeTypes = Set("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs", sc).discardMimeTypes(mimeTypes)
```

## Discard MIME Types (Apache Tika)

Filters out the selected MIME types (identified by [Apache Tika](https://tika.apache.org/)).

### Scala RDD

```scala
import io.archivesunleashed._

val mimeTypes = Set("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs", sc).discardMimeTypesTika(mimeTypes)
```

## Discard HTTP Status

Filters out the selected HTTP status codes.

### Scala RDD

```scala
import io.archivesunleashed._

val statusCodes = Set("200", "404")

RecordLoader.loadArchives("/path/to/warcs", sc).discardHttpStatus(statusCodes)
```

## Discard Dates

Filters out the selected dates.

### Scala RDD

```scala
import io.archivesunleashed._

val dates = List("2008", "200908", "20070502")

RecordLoader.loadArchives("/path/to/warcs", sc).discardDate(dates)
```

## Discard URLs

Filters out the selected exact URLs.

### Scala RDD

```scala
import io.archivesunleashed._

val urls = Set("archive.org", "uwaterloo.ca", "yorku.ca")

RecordLoader.loadArchives("/path/to/warcs", sc).discardUrls(urls)
```

## Discard URL Patterns

Filters out URLs matching the selected patterns (regex).

### Scala RDD

```scala
import io.archivesunleashed._

val urlPatterns = Set(".*archive\\.org.*".r, ".*sloan\\.org.*".r)

RecordLoader.loadArchives("/path/to/warcs", sc).discardUrlPatterns(urlPatterns)
```

## Discard Domains

Filters out the selected source domains.

### Scala RDD

```scala
import io.archivesunleashed._

val domains = Set("archive.org", "sloan.org")

RecordLoader.loadArchives("/path/to/warcs", sc).discardDomains(domains)
```

## Discard Languages

Filters out the selected languages ([ISO 639-1 codes](https://www.loc.gov/standards/iso639-2/php/code_list.php)).

### Scala RDD

```scala
import io.archivesunleashed._

val languages = Set("en", "fr")

RecordLoader.loadArchives("/path/to/warcs", sc).discardLanguages(languages)
```

## Discard Content

Filters out records whose content matches the regular expression(s).

### Scala RDD

```scala
import io.archivesunleashed._

val content = Set("radio".r, "(?i)election".r)

RecordLoader.loadArchives("/path/to/warcs", sc).discardContent(content)
```
