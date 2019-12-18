# Filters

The following filters can be used on any `RecordLoader` DataFrames or RDDs.

**How do I...**

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

## Keep Images

Removes all data except images. 

### Scala RDD

```scala
import io.archivesunleashed._

val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepImages()
```

### Scala DF

TODO

### Python DF

TODO

## Keep MIME Types (web server)

Removes all data but selected MIME Types (identified by the web server).

### Scala RDD

```scala
import io.archivesunleashed._

val mimetypes = Set("text/html", "text/plain")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepMimeTypes(mimetypes)
```

### Scala DF

TODO

### Python DF

TODO

## Keep MIME Types (Apache Tika)

Removes all data but selected MIME Types (identified by [Apache Tika](https://tika.apache.org/)).

### Scala RDD

```scala
import io.archivesunleashed._

val mimetypes = Set("text/html", "text/plain")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepMimeTypesTika(mimetypes)
```

### Scala DF

TODO

### Python DF

TODO

## Keep HTTP Status

Removes all data that does not have selected status codes specified.

### Scala RDD

```scala
import io.archivesunleashed._

val statusCodes = Set("200", "404")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepHttpStatus(statusCodes)
```

### Scala DF

TODO

### Python DF

TODO

## Keep Dates

Removes all data that does not have selected date.

### Scala RDD

```scala
import io.archivesunleashed._

val val dates = List("2008", "200908", "20070502")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepDate(dates)
```

### Scala DF

TODO

### Python DF

TODO

## Keep URLs

Removes all data but selected exact URLs.

### Scala RDD

```scala
import io.archivesunleashed._

val val urls = Set("archive.org", "uwaterloo.ca", "yorku.ca")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepUrls(urls)
```

### Scala DF

TODO

### Python DF

TODO

## Keep URL Patterns

Removes all data but selected URL patterns (regex).

### Scala RDD

```scala
import io.archivesunleashed._

val val urls = Set(archive.r, sloan.r, "".r)
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepUrlPatterns(urls)
```

### Scala DF

TODO

### Python DF

TODO

## Keep Domains

Removes all data but selected source domains.

### Scala RDD

```scala
import io.archivesunleashed._

val val doamins = Set("www.archive.org", "www.sloan.org")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepDomains(domains)
```

### Scala DF

TODO

### Python DF

TODO

## Keep Languages

Removes all data not in selected language ([ISO 639-2 codes](https://www.loc.gov/standards/iso639-2/php/code_list.php)).

### Scala RDD

```scala
import io.archivesunleashed._

val val languages = Set("en", "fr")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepLanguages(languages)
```

### Scala DF

TODO

### Python DF

TODO

## Keep Content

Removes all content that does not pass Regular Expression test.

### Scala RDD

```scala
import io.archivesunleashed._

val val content = Set(regex, raw"UNINTELLIBLEDFSJKLS".r)
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepContent(content)
```

### Scala DF

TODO

### Python DF

TODO

## Discard MIME Types (web server)

Filters out detected MIME Types (identified by the web server).

### Scala RDD

```scala
import io.archivesunleashed._

val mimetypes = Set("text/html", "text/plain")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardMimeTypes(mimetypes)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

RecordLoader.loadArchives("example.warc.gz",sc)
  .discardMimeTypesDF(Set("text/html"))
```

### Python DF

TODO

## Discard MIME Types (Apache Tika)

Filters out detected MIME Types (identified by [Apache Tika](https://tika.apache.org/)).

### Scala RDD

```scala
import io.archivesunleashed._

val mimetypes = Set("text/html", "text/plain")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardMimeTypesTika(mimetypes)
```

### Scala DF

TODO

### Python DF

TODO

## Discard HTTP Status

Filters out detected HTTP status codes.

### Scala RDD

```scala
import io.archivesunleashed._

val statusCodes = Set("200", "404")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardHttpStatus(statusCodes)
```

### Scala DF

TODO

### Python DF

TODO

## Discard Dates

Filters out detected dates.

### Scala RDD

```scala
import io.archivesunleashed._

val val dates = List("2008", "200908", "20070502")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardDate(dates)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

RecordLoader.loadArchives("example.warc.gz",sc)
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
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardUrls(urls)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

RecordLoader.loadArchives("example.warc.gz",sc)
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
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardUrlPatterns(urls)
```

### Scala DF

TODO

### Python DF

TODO

## Discard Domains

Filters out detected source domains.

### Scala RDD

```scala
import io.archivesunleashed._

val val doamins = Set("www.archive.org", "www.sloan.org")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardDomains(domains)
```

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

RecordLoader.loadArchives("example.warc.gz",sc)
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
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepLanguages(languages)
```

### Scala DF

TODO

### Python DF

TODO

## Discard Content

Filters out detected content that does pass Regular Expression test.

### Scala RDD

```scala
import io.archivesunleashed._

val val content = Set(regex, raw"UNINTELLIBLEDFSJKLS".r)
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardContent(content)
```

### Scala DF

TODO

### Python DF

TODO
