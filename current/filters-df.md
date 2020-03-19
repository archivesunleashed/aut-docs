# Filters DataFrame

The following UDFs (User Defined Functions) for filters can be used on any DataFrame column. In addition, each of the UDFs can be negated with `!`, e.g. `!hasImages`.

**This column...**

- [Has Content]()
- [Has Domain(s)]()
- [Has HTTP Status]()
- [Has Images](#Has-Images)
- [Has Language(s)]()
- [Has MIME Type (Apache Tika)]()
- [Has MIME Type (web server)]()
- [Has URL Pattern(s)]()
- [Has URL(s)]()

## Has Images

Filters all data except images. 

### Scala DF

```scala
RecordLoader.loadArchives("/path/to/warcs",sc)
  .all()
  .select($"mime_type_tika", $"mime_type_web_server", $"url")
  .filter(hasImages($"crawl_date", DetectMimeTypeTikaDF($"bytes")))
  .show(10,false)
```

### Python DF

TODO

## Keep MIME Types (web server)

Removes all data but selected MIME Types (identified by the web server).

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
