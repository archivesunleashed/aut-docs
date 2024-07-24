---
id: extract-binary-info
title: Extract Binary Info
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

// Local web archive collection.
val warcs = RecordLoader.loadArchives("/local/path/to/warcs", sc)

// Choose your format: CSV or Parquet.

// For CSV:
//  .write.csv("/path/to/derivatives/csv/audio")

// For Parquet:
// .write.parquet("/path/to/derivatives/parquet/pages/")

// Audio Files.
warcs.audio()
  .select($"crawl_date", $"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5", $"sha1")
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save("/path/to/derivatives/csv/audio")

// Images.
warcsS3.images()
  .select($"crawl_date", $"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"width", $"height", $"md5", $"sha1")
  .write
  .parquet("/path/to/derivatives/parquet/image")

// PDFs.
warcs.pdfs()
  .select($"crawl_date", $"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5", $"sha1")
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save("/path/to/derivatives/csv/pdf")

// Presentation Program Files.
warcs.presentationProgramFiles()
  .select($"crawl_date", $"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5", $"sha1")
  .write
  .parquet("/path/to/derivatives/parquet/presentation-program")

// Spreadsheets.
warcs.spreadsheets()
  .select($"crawl_date", $"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5", $"sha1")
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save("/path/to/derivatives/csv/spreadsheet")

// Videos.
warcs.videos()
  .select($"crawl_date", $"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5", $"sha1")
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save("/path/to/derivatives/csv/video")

// Word Processor Files.
warcs.wordProcessorFiles()
  .select($"crawl_date", $"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5", $"sha1")
  .write
  .parquet("/path/to/derivatives/parquet/word-processor")

sys.exit
```

## Python DF

```python
from aut import *

# Web archive collection (dataset).
warcs = WebArchive(sc, sqlContext, "/path/to/aut-resources-master/Sample-Data/*gz")

# Choose your format: CSV or Parquet.

# For CSV:
# .write.csv('/path/to/derivatives/csv/audio')
# Include header='true' if you want headers.

# For Parquet:
# .write.parquet("/path/to/derivatives/parquet/pages/")

# Audio Files.
warcs.audio()
  .select("crawl_date", "url", "filename", "extension", "mime_type_web_server", "mime_type_tika", "md5", "sha1")\
  .write \
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ") \
  .format("csv") \
  .option("escape", "\"") \
  .option("encoding", "utf-8") \
  .save('/path/to/derivatives/csv/audio')

# Images.
warcs.images()\
  .select("crawl_date", "url", "filename", "extension", "mime_type_web_server", "mime_type_tika", "width", "height", "md5", "sha1")\
  .write\
  .parquet('/path/to/derivatives/parquet/images')

# PDFs.
warcs.pdfs()\
  .select("crawl_date", "url", "filename", "extension", "mime_type_web_server", "mime_type_tika", "md5", "sha1")\
  .write\
  .parquet('/path/to/derivatives/csv/pdfs')

# Spreadsheets.
warcs.spreadsheets()\
  .select("crawl_date", "url", "filename", "extension", "mime_type_web_server", "mime_type_tika", "md5", "sha1")\
  .write \
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ") \
  .format("csv") \
  .option("escape", "\"") \
  .option("encoding", "utf-8") \
  .save('/path/to/derivatives/csv/spreadsheets')

# Presentation Program Files.
warcs.presentation_program()\
  .select("crawl_date", "url", "filename", "extension", "mime_type_web_server", "mime_type_tika", "md5", "sha1")\
  .write\
  .parquet('/path/to/derivatives/csv/presentation_program')

# Videos.
warcs.video()\
  .select("crawl_date", "url", "filename", "extension", "mime_type_web_server", "mime_type_tika", "md5", "sha1")\
  .write\
  .parquet('/path/to/derivatives/csv/video')

# Word Processor Files.
warcs.word_processor()\
  .select("crawl_date", "url", "filename", "extension", "mime_type_web_server", "mime_type_tika", "md5", "sha1")\
  .write \
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ") \
  .format("csv") \
  .option("escape", "\"") \
  .option("encoding", "utf-8") \
  .save('/path/to/derivatives/csv/word_processor')
```
