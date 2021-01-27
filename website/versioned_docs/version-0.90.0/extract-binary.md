---
id: version-0.90.0-extract-binary
title: Extract Binaries to Disk
original_id: extract-binary
---

How do I extract all the binary files of PDFs, audio files, video files, word processor
files, spreadsheet files, and presentation program files to disk?

## Scala RDD

**Will not be implemented.**

## Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

// Web archive collection.
warcs = RecordLoader.loadArchives("/path/to/warcs", sc)

// Audio Files.
warcs.audio()
  .select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/extract/binaries/audio/your-prefix-audio", "extension")

// Images.
warcs.images()
  .select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/extract/binaries/image/your-prefix-image", "extension")

// PDFs
warcs.pdfs()
  .select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/extract/binaries/pdf/your-prefix-pdf", "extension")

// Presentation Program Files.
warcs.presentationProgramFiles()
  .select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/extract/binaries/presentation-program/your-prefix-presentation-program", "extension")

// Spreadsheets.
warcs.spreadsheets()
  .select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/extract/binaries/spreadsheet/your-prefix-spreadsheet", "extension")

// Videos.
warcs.videos()
  .select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/extract/binaries/video/your-prefix-video", "extension")

// Word Processor Files.
warcs.wordProcessorFiles()
  .select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/extract/binaries/word-processor/your-prefix-word-processor", "extension")

sys.exit
```

## Python DF

```python
from aut import *

# Web archive collection.
warcs = WebArchive(sc, sqlContext, "path/to/warcs")

# Audio Files.
audio = warcs.audio() \
             .select("extension", "bytes") \
             .collect()

SaveBytes(audio, "/path/to/extract/binaries/audio")

# Images.
images = warcs.images()
              .select("extension", "bytes") \
              .collect()

SaveBytes(images, "/path/to/extract/binaries/image")

# PDFs
pdfs = warcs.pdfs()
            .select("extension", "bytes") \
            .collect()

SaveBytes(pdfs, "/path/to/extract/binaries/pdf")

# Presentation Program Files.
pp_files = warcs.presentationProgramFiles()
                .select("extension", "bytes") \
                .collect()

SaveBytes(pp_files, "/path/to/extract/binaries/presentation_program")

# Spreadsheets.
spreadsheets = warcs.spreadsheets()
                    .select("extension", "bytes") \
                    .collect()

SaveBytes(spreadsheets, "/path/to/extract/binaries/spreadsheet")

# Videos.
videos = warcs.videos()
              .select("extension", "bytes") \
              .collect()

SaveBytes(videos, "/path/to/extract/binaries/video")

# Word Processor Files.
wp_files = warcs.wordProcessorFiles()
                .select("extension", "bytes") \
                .collect()

SaveBytes(wp_files, "/path/to/extract/binaries/word_processor")
```
