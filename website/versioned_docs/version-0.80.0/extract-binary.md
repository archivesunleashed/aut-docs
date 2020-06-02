---
id: version-0.80.0-extract-binary
title: Extract Binaries to Disk
original_id: extract-binary
---

How do I all the binary files of PDFs, audio files, video files, word processor
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

## Python DF

**To be implemented.**
