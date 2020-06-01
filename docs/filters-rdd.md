---
id: filters-rdd
title: RDD Filters
---

The following filters can be used on any `RecordLoader` RDDs.

## Keep Valid Pages

Removes all pages that do not have a crawl date and is a robots.txt file, and
keeps pages that are of the MIME type `text/html`, `application/xhtml+xml`, or
ends with `html` or `html`, and have a `200` HTTP response status code.

### Scala RDD

```scala
import io.archivesunleashed._

RecordLoader.loadArchives("/path/to/warcs",sc).keepValidPages()
```

### Scala DF

```scala
import io.archivesunleashed._
RecordLoader.loadArchives("/path/to/warcs",sc).all().keepValidPagesDF()
```

## Keep Images

Removes all data except images.

### Scala RDD

```scala
import io.archivesunleashed._

RecordLoader.loadArchives("/path/to/warcs",sc).keepImages()
```

## Keep MIME Types (web server)

Removes all data but selected MIME Types (identified by the web server).

### Scala RDD

```scala
import io.archivesunleashed._

val mimeTypes = Set("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs",sc).keepMimeTypes(mimeTypes)
```

## Keep MIME Types (Apache Tika)

Removes all data but selected MIME Types (identified by [Apache Tika](https://tika.apache.org/)).

### Scala RDD

```scala
import io.archivesunleashed._

val mimetypes = Set("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs",sc).keepMimeTypesTika(mimetypes)
```

## Keep HTTP Status

Removes all data that does not have selected status codes specified.

### Scala RDD

```scala
import io.archivesunleashed._

val statusCodes = Set("200", "404")

RecordLoader.loadArchives("/path/to/warcs",sc).keepHttpStatus(statusCodes)
```

## Keep Dates

Removes all data that does not have selected date.

### Scala RDD

```scala
import io.archivesunleashed._

val val dates = List("2008", "200908", "20070502")

RecordLoader.loadArchives("/path/to/warcs",sc).keepDate(dates)
```

## Keep URLs

Removes all data but selected exact URLs.

### Scala RDD

```scala
import io.archivesunleashed._

val val urls = Set("archive.org", "uwaterloo.ca", "yorku.ca")

RecordLoader.loadArchives("/path/to/warcs",sc).keepUrls(urls)
```

## Keep URL Patterns

Removes all data but selected URL patterns (regex).

### Scala RDD

```scala
import io.archivesunleashed._

val val urls = Set(archive.r, sloan.r, "".r)

RecordLoader.loadArchives("/path/to/warcs",sc).keepUrlPatterns(urls)
```

## Keep Domains

Removes all data but selected source domains.

### Scala RDD

```scala
import io.archivesunleashed._

val val doamins = Set("www.archive.org", "www.sloan.org")

RecordLoader.loadArchives("/path/to/warcs",sc).keepDomains(domains)
```

## Keep Languages

Removes all data not in selected language ([ISO 639-2 codes](https://www.loc.gov/standards/iso639-2/php/code_list.php)).

### Scala RDD

```scala
import io.archivesunleashed._

val val languages = Set("en", "fr")

RecordLoader.loadArchives("/path/to/warcs",sc).keepLanguages(languages)
```

## Keep Content

Removes all content that does not pass Regular Expression test.

### Scala RDD

```scala
import io.archivesunleashed._

val val content = Set(regex, raw"UNINTELLIBLEDFSJKLS".r)

RecordLoader.loadArchives("/path/to/warcs",sc).keepContent(content)
```

## Discard MIME Types (web server)

Filters out detected MIME Types (identified by the web server).

### Scala RDD

```scala
import io.archivesunleashed._

val mimeTypes = Set("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs",sc).discardMimeTypes(mimeTypes)
```

## Discard MIME Types (Apache Tika)

Filters out detected MIME Types (identified by [Apache Tika](https://tika.apache.org/)).

### Scala RDD

```scala
import io.archivesunleashed._

val mimeTypes = Set("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs",sc).discardMimeTypesTika(mimeTypes)
```

## Discard HTTP Status

Filters out detected HTTP status codes.

### Scala RDD

```scala
import io.archivesunleashed._

val statusCodes = Set("200", "404")

RecordLoader.loadArchives("/path/to/warcs",sc).discardHttpStatus(statusCodes)
```

## Discard Dates

Filters out detected dates.

### Scala RDD

```scala
import io.archivesunleashed._

val val dates = List("2008", "200908", "20070502")

RecordLoader.loadArchives("/path/to/warcs",sc).discardDate(dates)
```

## Discard URLs

Filters out detected URLs.

### Scala RDD

```scala
import io.archivesunleashed._

val val urls = Set("archive.org", "uwaterloo.ca", "yorku.ca")

RecordLoader.loadArchives("/path/to/warcs",sc).discardUrls(urls)
```

## Discard URL Patterns

Filters out detected URL patterns (regex).

### Scala RDD

```scala
import io.archivesunleashed._

val val urls = Set(archive.r, sloan.r, "".r)

RecordLoader.loadArchives("/path/to/warcs",sc).discardUrlPatterns(urls)
```

## Discard Domains

Filters out detected source domains.

### Scala RDD

```scala
import io.archivesunleashed._

val val doamins = Set("www.archive.org", "www.sloan.org")

RecordLoader.loadArchives("/path/to/warcs",sc).discardDomains(domains)
```

## Discard Languages

Filters out detected languages ([ISO 639-2 codes](https://www.loc.gov/standards/iso639-2/php/code_list.php)).

### Scala RDD

```scala
import io.archivesunleashed._

val val languages = Set("en", "fr")

RecordLoader.loadArchives("/path/to/warcs",sc).keepLanguages(languages)
```

## Discard Content

Filters out detected content that does pass Regular Expression test.

### Scala RDD

```scala
import io.archivesunleashed._

val val content = Set(regex, raw"UNINTELLIBLEDFSJKLS".r)

RecordLoader.loadArchives("/path/to/warcs",sc).discardContent(content)
```
