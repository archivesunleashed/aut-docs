# Filters

The following filters can be used on any `RecordLoader` DataFrames or RDDs.

## Keep Images

Removes all data except images. 

```scala
import io.archivesunleashed._

val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepImages()
```

## Keep MIME Types (web server)

Removes all data but selected MIME Types (identified by the web server).

```scala
import io.archivesunleashed._

val mimetypes = Set("text/html", "text/plain")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepMimeTypes(mimetypes)
```

## Keep MIME Types (Apache Tika)

Removes all data but selected MIME Types (identified by [Apache Tika](https://tika.apache.org/)).

```scala
import io.archivesunleashed._

val mimetypes = Set("text/html", "text/plain")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepMimeTypesTika(mimetypes)
```

## Keep HTTP Status

Removes all data that does not have selected status codes specified.

```scala
import io.archivesunleashed._

val statusCodes = Set("200", "404")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepHttpStatus(statusCodes)
```

## Keep Dates

Removes all data that does not have selected date.

```scala
import io.archivesunleashed._

val val dates = List("2008", "200908", "20070502")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepDate(dates)
```

## Keep URLs

Removes all data but selected exact URLs.

```scala
import io.archivesunleashed._

val val urls = Set("archive.org", "uwaterloo.ca", "yorku.ca")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepUrls(urls)
```

## Keep URL Patterns

Removes all data but selected URL patterns (regex).

```scala
import io.archivesunleashed._

val val urls = Set(archive.r, sloan.r, "".r)
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepUrlPatterns(urls)
```

## Keep Domains

Removes all data but selected source domains.

```scala
import io.archivesunleashed._

val val doamins = Set("www.archive.org", "www.sloan.org")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepDomains(domains)
```

## Keep Languages

Removes all data not in selected language ([ISO 639-2 codes](https://www.loc.gov/standards/iso639-2/php/code_list.php)).

```scala
import io.archivesunleashed._

val val languages = Set("en", "fr")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepLanguages(languages)
```

## Keep Content

Removes all content that does not pass Regular Expression test.

```scala
import io.archivesunleashed._

val val content = Set(regex, raw"UNINTELLIBLEDFSJKLS".r)
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepContent(content)
```

## Discard MIME Types (web server)

Filters out detected MIME Types (identified by the web server).

```scala
import io.archivesunleashed._

val mimetypes = Set("text/html", "text/plain")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardMimeTypes(mimetypes)
```

## Discard MIME Types (Apache Tika)

Filters out detected MIME Types (identified by [Apache Tika](https://tika.apache.org/)).

```scala
import io.archivesunleashed._

val mimetypes = Set("text/html", "text/plain")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardMimeTypesTika(mimetypes)
```

## Discard HTTP Status

Filters out detected HTTP status codes.

```scala
import io.archivesunleashed._

val statusCodes = Set("200", "404")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardHttpStatus(statusCodes)
```

## Discard Dates

Filters out detected dates.

```scala
import io.archivesunleashed._

val val dates = List("2008", "200908", "20070502")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardDate(dates)
```

## Discard URLs

Filters out detected URLs.

```scala
import io.archivesunleashed._

val val urls = Set("archive.org", "uwaterloo.ca", "yorku.ca")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardUrls(urls)
```

## Discard URL Patterns

Filters out detected URL patterns (regex).

```scala
import io.archivesunleashed._

val val urls = Set(archive.r, sloan.r, "".r)
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardUrlPatterns(urls)
```

## Discard Domains

Filters out detected source domains.

```scala
import io.archivesunleashed._

val val doamins = Set("www.archive.org", "www.sloan.org")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardDomains(domains)
```
## Discard Languages

Filters out detected languages ([ISO 639-2 codes](https://www.loc.gov/standards/iso639-2/php/code_list.php)).

```scala
import io.archivesunleashed._

val val languages = Set("en", "fr")
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.keepLanguages(languages)
```

## Discard Content

Filters out detected content that does pass Regular Expression test.

```scala
import io.archivesunleashed._

val val content = Set(regex, raw"UNINTELLIBLEDFSJKLS".r)
val r = RecordLoader.loadArchives("example.warc.gz",sc)
r.discardContent(content)
```