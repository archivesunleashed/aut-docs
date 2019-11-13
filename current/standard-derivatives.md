# Standard Derivatives

**How do I...**

- [Create the Archives Unleashed Cloud Scholarly Derivatives](#Create-the-Archives-Unleashed-Scholarly-Derivatives)
- [Extract Binary Info to CSV](#Extract-Binary-Info-to-CSV)
- [Extract Binary Info to CSV (s3)](#Extract-Binary-Info-to-CSV-s3)
- [Extract Binary Info to Parquet](#Extract-Binary-Info-to-Parquet)
- [Extract Binaries to Disk](#Extract-Binaries-to-Disk)

For all the scripts below, you can type `:paste` into Spark Shell, paste the script, and then run it with <kbd>CTRL</kbd>+<kbd>d</kbd>:

## Create the Archives Unleashed Cloud Scholarly Derivatives

How do I create the [scholarly derivatives](https://cloud.archivesunleashed.org/derivatives) that the Archives Unleashed Cloud creates on my own web archive collection?

### Scala RDD

```scala
import io.archivesunleashed._
import io.archivesunleashed.app._
import io.archivesunleashed.matchbox._

sc.setLogLevel("INFO")

val statusCodes = Set("200")

warcs = RecordLoader
  .loadArchives("/path/to/data", sc)
  .keepValidPages()
  .keepHttpStatus(statusCodes)

warcs
  .map(r => ExtractDomain(r.getUrl))
  .countItems()
  .saveAsTextFile("/path/to/derivatives/auk/all-domains/output")

warcs
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHttpHeader(r.getContentString))))
  .saveAsTextFile("/path/to/derivatives/auk/full-text/output")

val links = warcs
  .map(r => (r.getCrawlDate, ExtractLinks(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1, ExtractDomain(f._1).replaceAll("^\\\\s*www\\\\.", ""), ExtractDomain(f._2).replaceAll("^\\\\s*www\\\\.", ""))))
  .filter(r => r._2 != "" && r._3 != "")
  .countItems()
  .filter(r => r._2 > 5)

WriteGraph
  .asGraphml(links, "/path/to/derivatives/auk/graph/example-gephi.graphml")

sys.exit
```

### Scala DF

TODO

### Python DF

TODO

## Extract Binary Info to CSV

How do I extract binary information of PDFs, audio files, video files, word processor files, spreadsheet files, presentation program files, and text files to a CSV file?

### Scala RDD

TODO

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

sc.setLogLevel("INFO")

val warcs = RecordLoader.loadArchives("/path/to/data", sc)

warcs
  .extractPDFDetailsDF()
    .select($"bytes", $"extension")
    .saveToDisk("bytes", "/path/to/derivatives/csv/pdf", "extension")

warcs
  .extractAudioDetailsDF()
    .select($"bytes", $"extension")
    .saveToDisk("bytes", "/path/to/derivatives/csv/audio", "extension")

warcs
  .extractVideoDetailsDF()
    .select($"bytes", $"extension")
    .saveToDisk("bytes", "/path/to/derivatives/csv/video", "extension")

warcs
  .extractImageDetailsDF()
    .select($"bytes", $"extension")
    .saveToDisk("bytes", "/path/to/derivatives/csv/image", "extension")

warcs
  .extractSpreadsheetDetailsDF()
    .select($"bytes", $"extension")
    .saveToDisk("bytes", "/path/to/derivatives/csv/spreadsheet", "extension")

warcs
  .extractPresentationProgramDetailsDF()
    .select($"bytes", $"extension")
    .saveToDisk("bytes", "/path/to/derivatives/csv/presentation-program", "extension")

warcs
  .extractTextFilesDetailsDF()
    .select($"bytes", $"extension")
    .saveToDisk("bytes", "/path/to/derivatives/csv/text", "extension")

warcs
  .extractWordProcessorDetailsDF()
    .select($"bytes", $"extension")
    .saveToDisk("bytes", "/path/to/derivatives/csv/word-processor", "extension")

sys.exit
```

### Python DF

```python
from aut import *

warcs = WebArchive(sc, sqlContext, "/path/to/aut-resources-master/Sample-Data/*gz")

warcs.audio().write.csv('/path/to/derivatives/csv/audio', header='true')

warcs.images().write.csv('/path/to/derivatives/csv/images', header='true')

warcs.image_links().write.csv('/path/to/derivatives/csv/images-links', header='true')

warcs.pdfs().write.csv('/path/to/derivatives/csv/pdfs', header='true')

warcs.spreadsheets().write.csv('/path/to/derivatives/csv/spreadsheets', header='true')

warcs.presentation_program().write.csv('/path/to/derivatives/csv/presentation_program', header='true')

warcs.text_files().write.csv('/path/to/derivatives/csv/text_files', header='true')

warcs.video().write.csv('/path/to/derivatives/csv/video', header='true')

warcs.word_processor().write.csv('/path/to/derivatives/csv/word_processor', header='true')
```

## Extract Binary Info to CSV (s3)

How do I extract binary information of PDFs, audio files, video files, word processor files, spreadsheet files, presentation program files, and text files to a S3 bucket?

### Scala RDD

TODO

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

sc.setLogLevel("INFO")

sc.hadoopConfiguration.set("fs.s3a.access.key", "YOUR ACCESS KEY")
sc.hadoopConfiguration.set("fs.s3a.secret.key", "YOUR SECRET KEY ")

// Local web archive collection
val warcs = RecordLoader.loadArchives("/local/path/to/data", sc)

// S3 hosted web archive collection
val warcsS3 = RecordLoader.loadArchives("s3a://your-data-bucket/"", sc)

warcs
  .extractPDFDetailsDF()
    .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
    .orderBy(desc("md5"))
    .write
    .format("csv")
    .option("header","true")
    .mode("Overwrite")
    .save("s3a://your-derivative-bucket/pdf")

warcs
  .extractAudioDetailsDF()
    .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
    .orderBy(desc("md5"))
    .write.format("csv")
    .option("header","true")
    .mode("Overwrite")
    .save("s3a://your-derivative-bucket/audio")

warcs
  .extractVideoDetailsDF()
    .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
    .orderBy(desc("md5"))
    .write
    .format("csv")
    .option("header","true")
    .mode("Overwrite")
    .save("s3a://your-derivative-bucket/video")

warcs
  .extractImageDetailsDF()
    .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"width", $"height", $"md5")
    .orderBy(desc("md5"))
    .write
    .format("csv")
    .option("header","true")
    .mode("Overwrite")
    .save("s3a://your-derivative-bucket/image")

warcs
  .extractSpreadsheetDetailsDF()
    .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
    .orderBy(desc("md5"))
    .write
    .format("csv")
    .option("header","true")
    .mode("Overwrite")
    .save("s3a://your-derivative-bucket/spreadsheet")

warcs
  .extractPresentationProgramDetailsDF()
    .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
    .orderBy(desc("md5"))
    .write
    .format("csv")
    .option("header","true")
    .mode("Overwrite")
    .save("s3a://your-derivative-bucket/presentation-program")

warcs
  .extractTextFilesDetailsDF()
    .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
    .orderBy(desc("md5"))
    .write
    .format("csv")
    .option("header","true")
    .mode("Overwrite")
    .save("s3a://your-derivative-bucket/text")

warcs
  .extractWordProcessorDetailsDF()
    .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
    .orderBy(desc("md5"))
    .write
    .format("csv")
    .option("header","true")
    .mode("Overwrite")
    .save("s3a://your-derivative-bucket/word-processor")

sys.exit
```

### Python DF

TODO

## Extract Binary Info to Parquet

How do I extract binary information of PDFs, audio files, video files, word processor files, spreadsheet files, presentation program files, and text files to the [Apache Parquet](https://parquet.apache.org/) format to [work with later](df-results.md#what-to-do-with-dataframe-results)?

### Scala RDD

TODO

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val warcs = RecordLoader.loadArchives("/path/to/data", sc)

// Web graph.
warcs
  .extractHyperlinksDF()
    .select($"src".as("source_url"), $"dest".as("destination_url"), $"anchor", $"crawl_date")
    .write
    .parquet("/path/to/derivatives/parquet/webgraph/");

// Valid Pages.
warcs
  .extractValidPagesDF()
     .select($"crawl_date", $"url", $"mime_type_web_server", $"mime_type_tika", RemoveHTML($"content").as("text"))
     .write
     .parquet("/path/to/derivatives/parquet/pages/");

// Audio Files.
warcs
  .extractAudioDetailsDF()
    .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
    .orderBy(desc("md5"))
    .write
    .parquet("/path/to/derivatives/parquet/audio")

// Images.
warcs
  .extractImageDetailsDF()
    .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"width", $"height", $"md5")
    .orderBy(desc("md5"))
    .write
    .parquet("/path/to/derivatives/parquet/image")


// Images Links.
warcs
  .extractImageLinksDF()
    .select($"src", $"image_url")
    .write
    .parquet("/path/to/derivatives/parquet/image")

// PDFs.
warcs
  .extractPDFDetailsDF()
    .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
    .orderBy(desc("md5"))
    .write
    .parquet("/path/to/derivatives/parquet/pdf")

// Presentation Program Files.
warcs
  .extractPresentationProgramDetailsDF()
    .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
    .orderBy(desc("md5"))
    .write
    .parquet("/path/to/derivatives/parquet/presentation-program")

// Spreadsheets.
warcs
  .extractSpreadsheetDetailsDF();
    .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
    .orderBy(desc("md5"))
    .write
    .parquet("/path/to/derivatives/parquet/spreadsheet")

// Text Files.
warcs
  .extractTextFilesDetailsDF()
    .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
    .orderBy(desc("md5"))
    .write
    .parquet("/path/to/derivatives/parquet/text")

// Videos.
warcs
  .extractVideoDetailsDF()
    .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
    .orderBy(desc("md5"))
    .write
    .parquet("/path/to/derivatives/parquet/video")

// Word Processor Files.
warcs
  .extractWordProcessorDetailsDF()
    .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
    .orderBy(desc("md5"))
    .write
    .parquet("/path/to/derivatives/parquet/word-processor")

sys.exit
```

### Python DF

```python
from aut import *

warcs = WebArchive(sc, sqlContext, "/path/to/aut-resources-master/Sample-Data/*gz")

# Web graph.
warcs.links().write.parquet("/path/to/derivatives/parquet/webgraph/")

# Valid pages.
warcs.pages().write.parquet("/path/to/derivatives/parquet/pages/")

# Audio Files.
warcs.audio().write.parquet('/path/to/derivatives/parquet/audio')

# Images.
warcs.images().write.parquet('/path/to/derivatives/parquet/images')

# Image Links.
warcs.image_links().write.parquet('/path/to/derivatives/parquet/images-links')

# PDFs.
warcs.pdfs().write.parquet('/path/to/derivatives/parquet/pdfs')

# Spreadsheets
warcs.spreadsheets().write.parquet('/path/to/derivatives/parquet/spreadsheets')

# Presentation Program Files.
warcs.presentation_program().write.parquet('/path/to/derivatives/parquet/presentation_program')

# Text Files.
warcs.text_files().write.parquet('/path/to/derivatives/parquet/text_files')

# Videos.
warcs.video().write.parquet('/path/to/derivatives/parquet/video')

# Word Processor Files.
warcs.word_processor().write.parquet('/path/to/derivatives/parquet/word_processor')
```

## Extract Binaries to Disk

How do I all the binary files of PDFs, audio files, video files, word processor files, spreadsheet files, presentation program files, and text files to disk?

### Scala RDD

TODO

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

warcs = RecordLoader.loadArchives("/path/to/warcs", sc)

warcs
  .extractPDFDetailsDF()
    .select($"bytes", $"extension")
    .saveToDisk("bytes", "/path/to/derivatives/binaries/pdf/collection-prefix-pdf", "extension")

warcs
  .extractAudioDetailsDF()
    .select($"bytes", $"extension")
    .saveToDisk("bytes", "/path/to/derivatives/binaries/audio/collection-prefix-audio", "extension")

warcs
  .extractVideoDetailsDF()
    .select($"bytes", $"extension")
    .saveToDisk("bytes", "/path/to/derivatives/binaries/video/collection-prefix-video", "extension")

warcs
  .extractImageDetailsDF()
    .select($"bytes", $"extension")
    .saveToDisk("bytes", "/path/to/derivatives/binaries/image/collection-prefix-image", "extension")

warcs
  .extractSpreadsheetDetailsDF()
    .select($"bytes", $"extension")
    .saveToDisk("bytes", "/path/to/derivatives/binaries/spreadsheet/collection-prefix-spreadsheet", "extension")

warcs
  .extractPresentationProgramDetailsDF()
    .select($"bytes", $"extension")
    .saveToDisk("bytes", "/path/to/derivatives/binaries/presentation-program/collection-prefix-presentation-program", "extension")

warcs
  .extractWordProcessorDetailsDF()
    .select($"bytes", $"extension")
    .saveToDisk("bytes", "/path/to/derivatives/binaries/word-processor/collection-prefix-word-processor", "extension")

warcs
  .extractTextFilesDetailsDF()
    .select($"bytes", $"extension")
    .saveToDisk("bytes", "/path/to/derivatives/binaries/text/collection-prefix-text", "extension")

warcs
  .extractVideoDetailsDF()
    .select($"bytes", $"extension")
    .saveToDisk("bytes", "/path/to/derivatives/binaries/text/collection-prefix-video", "extension")

sys.exit
```

### Python DF

TODO
