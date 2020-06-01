---
id: version-next-extract-binary-info
title: Extract Binary Info
original_id: extract-binary-info
---

How do I extract the binary information of PDFs, audio files, video files, word
processor files, spreadsheet files, and presentation program files to a CSV
file, or into the [Apache Parquet](https://parquet.apache.org/) format
to [work with later](df-results.md#what-to-do-with-dataframe-results)?

You can also read and write to Amazon S3 by supplying your AWS credentials, and
using `s3a`.

## Scala RDD

**Will not be implemented.**

## Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

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

## Python DF

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

# Videos.
warcs.video().write.parquet('/path/to/derivatives/csv/video')

# Word Processor Files.
warcs.word_processor().write.csv('/path/to/derivatives/csv/word_processor', header='true')
```
