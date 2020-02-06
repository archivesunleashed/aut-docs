# Filters

The following filters can be used on any `RecordLoader` DataFrames or RDDs.

**How do I...**

- [Keep Valid Pages](filters.md#keep-valid-pages)
- [Keep Images](filters.md#keep-images)
- [Keep MIME Types (web server)](filters.md#keep-mime-types-web-server)
- [Keep MIME Types (Apache Tika)](filters.md#keep-mime-types-apache-tika)
- [Keep HTTP Status](filters.md#keep-http-status)
- [Keep Dates](filters.md#keep-dates)
- [Keep URLs](filters.md#keep-urls)
- [Keep URL Patterns](filters.md#keep-url-patterns)
- [Keep Domains](filters.md#keep-domains)
- [Keep Languages](filters.md#keep-languages)
- [Keep Content](filters.md#keep-content)
- [Discard MIME Types (web server)](filters.md#discard-mime-types-web-server)
- [Discard MIME Types (Apache Tika)](filters.md#discard-mime-types-apache-tika)
- [Discard HTTP Status](filters.md#discard-http-status)
- [Discard Dates](filters.md#discard-dates)
- [Discard URLs](filters.md#discard-urls)
- [Discard URL Patterns](filters.md#discard-url-patterns)
- [Discard Domains](filters.md#discard-domains)
- [Discard Languages](filters.md#discard-languages)
- [Discard Content](filters.md#discard-content)

## Keep Valid Pages

Removes all pages that do note have a crawl date and are robots.txt, and keeps pages that are of the MIME type `text/html`, `application/xhtml+xml`, or ends with `html` or `html`, and have a `200` HTTP response status code.

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

### Python DF

**To be implemented.**

## Keep Images

Removes all data except images. 

### Scala RDD

```scala
import io.archivesunleashed._

RecordLoader.loadArchives("/path/to/warcs",sc).keepImages()
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .keepImagesDF()
```

### Python DF

TODO

## Keep MIME Types (web server)

Removes all data but selected MIME Types (identified by the web server).

### Scala RDD

```scala
import io.archivesunleashed._

val mimeTypes = Set("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs",sc).keepMimeTypes(mimeTypes)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val mimeTypes = Set("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .keepMimeTypesDF(mimeTypes)
```

### Python DF

TODO

## Keep MIME Types (Apache Tika)

Removes all data but selected MIME Types (identified by [Apache Tika](https://tika.apache.org/)).

### Scala RDD

```scala
import io.archivesunleashed._

val mimetypes = Set("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs",sc).keepMimeTypesTika(mimetypes)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val mimeTypes = Set("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .keepMimeTypesTikaDF(mimeTypes)
```

### Python DF

TODO

## Keep HTTP Status

Removes all data that does not have selected status codes specified.

### Scala RDD

```scala
import io.archivesunleashed._

val statusCodes = Set("200", "404")

RecordLoader.loadArchives("/path/to/warcs",sc).keepHttpStatus(statusCodes)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val statusCodes = Set("200")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .keepHttpStatusDF(statusCodes)
```

### Python DF

TODO

## Keep Dates

Removes all data that does not have selected date.

### Scala RDD

```scala
import io.archivesunleashed._

val val dates = List("2008", "200908", "20070502")

RecordLoader.loadArchives("/path/to/warcs",sc).keepDate(dates)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val dates = List("04")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .keepDateDF(dates)
```

### Python DF

TODO

## Keep URLs

Removes all data but selected exact URLs.

### Scala RDD

```scala
import io.archivesunleashed._

val val urls = Set("archive.org", "uwaterloo.ca", "yorku.ca")

RecordLoader.loadArchives("/path/to/warcs",sc).keepUrls(urls)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val urls = Set("www.archive.org")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .keepUrlsDF(urls)
```

### Python DF

TODO

## Keep URL Patterns

Removes all data but selected URL patterns (regex).

### Scala RDD

```scala
import io.archivesunleashed._

val val urls = Set(archive.r, sloan.r, "".r)

RecordLoader.loadArchives("/path/to/warcs",sc).keepUrlPatterns(urls)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val urlsPattern = Set(".*images.*".r)

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .keepUrlPatternsDF(urlPattern)
```

TODO

### Python DF

TODO

## Keep Domains

Removes all data but selected source domains.

### Scala RDD

```scala
import io.archivesunleashed._

val val doamins = Set("www.archive.org", "www.sloan.org")

RecordLoader.loadArchives("/path/to/warcs",sc).keepDomains(domains)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val urls = Set("http://www.archive.org/")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .webpages()
  .keepUrlsDF(urls)
```

### Python DF

TODO

## Keep Languages

Removes all data not in selected language ([ISO 639-2 codes](https://www.loc.gov/standards/iso639-2/php/code_list.php)).

### Scala RDD

```scala
import io.archivesunleashed._

val val languages = Set("en", "fr")

RecordLoader.loadArchives("/path/to/warcs",sc).keepLanguages(languages)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val languages = Set("th","de","ht")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .webpages()
  .keepLanguagesDF(languages)
```

### Python DF

TODO

## Keep Content

Removes all content that does not pass Regular Expression test.

### Scala RDD

```scala
import io.archivesunleashed._

val val content = Set(regex, raw"UNINTELLIBLEDFSJKLS".r)

RecordLoader.loadArchives("/path/to/warcs",sc).keepContent(content)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val content = Set("Content-Length: [0-9]{4}".r)

RecordLoader.loadArchives("/path/to/warcs", sc)
  .all()
  .select("url", "content")
  .keepContentDF(content)
```

### Python DF

TODO

## Discard MIME Types (web server)

Filters out detected MIME Types (identified by the web server).

### Scala RDD

```scala
import io.archivesunleashed._

val mimeTypes = Set("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs",sc).discardMimeTypes(mimeTypes)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val mimeTypes = Set("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .webpages()
  .discardMimeTypesDF(mimeTypes)
```

### Python DF

TODO

## Discard MIME Types (Apache Tika)

Filters out detected MIME Types (identified by [Apache Tika](https://tika.apache.org/)).

### Scala RDD

```scala
import io.archivesunleashed._

val mimeTypes = Set("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs",sc).discardMimeTypesTika(mimeTypes)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val mimeTypes = Set("text/html", "text/plain")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .webpages()
  .discardMimeTypesTikaDF(mimeTypes)
```

### Python DF

TODO

## Discard HTTP Status

Filters out detected HTTP status codes.

### Scala RDD

```scala
import io.archivesunleashed._

val statusCodes = Set("200", "404")

RecordLoader.loadArchives("/path/to/warcs",sc).discardHttpStatus(statusCodes)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val statusCodes = Set("200")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .discardHttpStatusDF(statusCodes)
```

### Python DF

TODO

## Discard Dates

Filters out detected dates.

### Scala RDD

```scala
import io.archivesunleashed._

val val dates = List("2008", "200908", "20070502")

RecordLoader.loadArchives("/path/to/warcs",sc).discardDate(dates)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

RecordLoader.loadArchives("/path/to/warcs",sc)
  .webpages()
  .discardDateDF("20080429")
```

### Python DF

TODO

## Discard URLs

Filters out detected URLs.

### Scala RDD

```scala
import io.archivesunleashed._

val val urls = Set("archive.org", "uwaterloo.ca", "yorku.ca")

RecordLoader.loadArchives("/path/to/warcs",sc).discardUrls(urls)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

RecordLoader.loadArchives("/path/to/warcs",sc)
  .webpages()
  .discardUrlsDF(Set("http://www.archive.org/"))
```

### Python DF

TODO

## Discard URL Patterns

Filters out detected URL patterns (regex).

### Scala RDD

```scala
import io.archivesunleashed._

val val urls = Set(archive.r, sloan.r, "".r)

RecordLoader.loadArchives("/path/to/warcs",sc).discardUrlPatterns(urls)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val urlPattern = Set(".*images.*".r)

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .select("url")
  .discardUrlPatternsDF(urlPattern)
```

### Python DF

TODO

## Discard Domains

Filters out detected source domains.

### Scala RDD

```scala
import io.archivesunleashed._

val val doamins = Set("www.archive.org", "www.sloan.org")

RecordLoader.loadArchives("/path/to/warcs",sc).discardDomains(domains)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

RecordLoader.loadArchives("/path/to/warcs",sc)
  .webpages()
  .discardDomainsDF(Set("www.archive.org"))
```

### Python DF

TODO

## Discard Languages

Filters out detected languages ([ISO 639-2 codes](https://www.loc.gov/standards/iso639-2/php/code_list.php)).

### Scala RDD

```scala
import io.archivesunleashed._

val val languages = Set("en", "fr")

RecordLoader.loadArchives("/path/to/warcs",sc).keepLanguages(languages)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val languages = Set("th","de","ht")

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .select("url")
  .discardLanguagesDF(languages)
```

### Python DF

TODO

## Discard Content

Filters out detected content that does pass Regular Expression test.

### Scala RDD

```scala
import io.archivesunleashed._

val val content = Set(regex, raw"UNINTELLIBLEDFSJKLS".r)

RecordLoader.loadArchives("/path/to/warcs",sc).discardContent(content)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val content = Set("Content-Length: [0-9]{4}".r)

RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .select("url", "content")
  .discardContentDF(content)
```

### Python DF

TODO
