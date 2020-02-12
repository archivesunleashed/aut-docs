# Standard Derivatives

**How do I...**

- [Create the Archives Unleashed Cloud Scholarly Derivatives](#Create-the-Archives-Unleashed-Scholarly-Derivatives)
- [Extract Binary Info](#Extract-Binary-Info)
- [Extract Binaries to Disk](#Extract-Binaries-to-Disk)

For all the scripts below, you can type `:paste` into Spark Shell, paste the script, and then run it with <kbd>CTRL</kbd>+<kbd>d</kbd>:

## Create the Archives Unleashed Cloud Scholarly Derivatives

How do I create the [scholarly derivatives](https://cloud.archivesunleashed.org/derivatives) that the Archives Unleashed Cloud creates on my own web archive collection?

Note, the full-text and domains output needs to be concatenated together into a single file respectively to replicate the Cloud output, and the GraphML file needs to be run through [GraphPass](https://github.com/archivesunleashed/graphpass) with the following command:

```bash
$ graphpass input.graphml output.gexf -gq
```

### Scala RDD

```scala
import io.archivesunleashed._
import io.archivesunleashed.app._
import io.archivesunleashed.matchbox._

sc.setLogLevel("INFO")

// Web archive collection.
val warcs = RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()

// Domains file.
warcs.map(r => ExtractDomainRDD(r.getUrl))
  .countItems()
  .saveAsTextFile("/path/to/derivatives/auk/all-domains/output")

// Full-text.
warcs.map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTMLRDD(RemoveHTTPHeaderRDD(r.getContentString))))
  .saveAsTextFile("/path/to/derivatives/auk/full-text/output")

// Gephi GraphML.
val links = warcs
  .map(r => (r.getCrawlDate, ExtractLinksRDD(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1,
                               ExtractDomainRDD(f._1).replaceAll("^\\\\s*www\\\\.", ""),
                               ExtractDomainRDD(f._2).replaceAll("^\\\\s*www\\\\.", ""))))
  .filter(r => r._2 != "" && r._3 != "")
  .countItems()
  .filter(r => r._2 > 5)

WriteGraph.asGraphml(links, "/path/to/derivatives/auk/graph/example.graphml")

sys.exit
```

### Scala DF

TODO

### Python DF

TODO

## Extract Binary Info

How do I extract the binary information of PDFs, audio files, video files, word processor files, spreadsheet files, presentation program files, and text files to a CSV file, or into the [Apache Parquet](https://parquet.apache.org/) format to [work with later](df-results.md#what-to-do-with-dataframe-results)?

You can also read and write to Amazon S3 by supplying your AWS credentials, and using `s3a`.

### Scala RDD

**Will not be implemented.**

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

sc.setLogLevel("INFO")

sc.hadoopConfiguration.set("fs.s3a.access.key", "YOUR ACCESS KEY")
sc.hadoopConfiguration.set("fs.s3a.secret.key", "YOUR SECRET KEY ")

// Local web archive collection.
val warcs = RecordLoader.loadArchives("/local/path/to/warcs", sc)

// S3 hosted web archive collection.
val warcsS3 = RecordLoader.loadArchives("s3a://your-data-bucket/", sc)

// Choose your format: CSV or Parquet.

// For CSV:
//  .write.csv("/path/to/derivatives/csv/audio")
//  .write.csv("s3a://your-derivatives-bucket/parquet/pages")

// For Parquet:
// .write.parquet("/path/to/derivatives/parquet/pages/")
// .write.parquet("s3a://your-derivatives-bucket/parquet/pages")

// Audio Files.
warcs.audio()
  .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
  .orderBy(desc("md5"))
  .write.csv("/path/to/derivatives/csv/audio")

// Images.
warcsS3.images()
  .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"width", $"height", $"md5")
  .orderBy(desc("md5"))
  .write.parquet("/path/to/derivatives/parquet/image")

// PDFs.
warcs.pdfs()
  .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
  .orderBy(desc("md5"))
  .write.csv("s3a://your-derivatives-bucket/csv/pdf")

// Presentation Program Files.
warcs.presentationProgramFiles()
  .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
  .orderBy(desc("md5"))
  .write.parquet("s3a://your-derivatives-bucket/parquet/presentation-program")

// Spreadsheets.
warcs.spreadsheets()
  .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
  .orderBy(desc("md5"))
  .write.csv("/path/to/derivatives/csv/spreadsheet")

// Text Files.
warcs.textFiles()
  .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
  .orderBy(desc("md5"))
  .write.parquet("/path/to/derivatives/parquet/text")

// Videos.
warcs.videos()
  .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
  .orderBy(desc("md5"))
  .write.csv("/path/to/derivatives/csv/video")

// Word Processor Files.
warcs.wordProcessorFiles()
  .select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5")
  .orderBy(desc("md5"))
  .write.parquet("/path/to/derivatives/parquet/word-processor")

sys.exit
```

### Python DF

```python
from aut import *

# Web archive collection (dataset).
warcs = WebArchive(sc, sqlContext, "/path/to/aut-resources-master/Sample-Data/*gz")

# Choose your format: CSV or Parquet.

# For CSV:
# .write.csv('/path/to/derivatives/csv/audio', header='true')
# Include header='true' if you want headers.

# For Parquet:
# .write.parquet("/path/to/derivatives/parquet/pages/")

# Audio Files.
warcs.audio().write.csv('/path/to/derivatives/csv/audio', header='true')

# Images.
warcs.images().write.parquet('/path/to/derivatives/parquet/images')

# Image Links.
warcs.image_links().write.csv('/path/to/derivatives/csv/images-links', header='true')

# PDFs.
warcs.pdfs().write.parquet('/path/to/derivatives/csv/pdfs')

# Spreadsheets.
warcs.spreadsheets().write.csv('/path/to/derivatives/csv/spreadsheets', header='true')

# Presentation Program Files.
warcs.presentation_program().write.parquet('/path/to/derivatives/csv/presentation_program')

# Text Files.
warcs.text_files().write.csv('/path/to/derivatives/csv/text_files', header='true')

# Videos.
warcs.video().write.parquet('/path/to/derivatives/csv/video')

# Word Processor Files.
warcs.word_processor().write.csv('/path/to/derivatives/csv/word_processor', header='true')
```

## Extract Binaries to Disk

How do I all the binary files of PDFs, audio files, video files, word processor files, spreadsheet files, presentation program files, and text files to disk?

### Scala RDD

**Will not be implemented.**

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

// Web archive collection.
warcs = RecordLoader.loadArchives("/path/to/warcs", sc)

// Audio Files.
warcs.audio()
  .select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/derivatives/binaries/audio/your-prefix-audio", "extension")

// Images.
warcs.images()
  .select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/derivatives/binaries/image/your-prefix-image", "extension")

 // PDFs
warcs.pdfs()
  .select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/derivatives/binaries/pdf/your-prefix-pdf", "extension")

// Presentation Program Files.
warcs.presentationProgramFiles()
  .select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/derivatives/binaries/presentation-program/your-prefix-presentation-program", "extension")

// Spreadsheets.
warcs.spreadsheets()
  .select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/derivatives/binaries/spreadsheet/your-prefix-spreadsheet", "extension")

// Text Files.
warcs.textFiles()
  .select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/derivatives/binaries/text/your-prefix-text", "extension")

// Videos.
warcs.videos()
  .select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/derivatives/binaries/text/your-prefix-video", "extension")

// Word Processor Files.
warcs.wordProcessorFiles()
  .select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/derivatives/binaries/word-processor/your-prefix-word-processor", "extension")

sys.exit
```

### Python DF

**To be implemented.**
