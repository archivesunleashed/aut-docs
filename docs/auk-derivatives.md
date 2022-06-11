---
id: auk-derivatives
title: ARCH Derivatives
---

How do I create the Toolkit generated derivatives that the Archives
Research Compute Hub creates on my own web archive collection?

## Scala RDD

**Will not be implemented.**

## Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val warcs = "/path/to/warcs/*"
val results = "/path/to/results/"

val webpages = RecordLoader.loadArchives(warcs, sc).webpages()
val webgraph = RecordLoader.loadArchives(warcs, sc).webgraph()

// Domain frequency.
webpages.groupBy($"domain")
  .count()
  .sort($"count".desc)
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save(results + "domains")

// Domain graph.
webgraph.groupBy(
    $"crawl_date",
    removePrefixWWW(extractDomain($"src")).as("src_domain"),
    removePrefixWWW(extractDomain($"dest")).as("dest_domain")
  )
  .count()
  .filter(!($"dest_domain" === ""))
  .filter(!($"src_domain" === ""))
  .filter($"count" > 5)
  .orderBy(desc("count"))
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save(results + "domain-graph")

// Image graph.
RecordLoader.loadArchives(warcs, sc)
  .imagegraph()
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save(results + "image-graph")

// Web graph.
webgraph.write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save(results + "web-graph")

// Web pages.
webpages.write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save(results + "webpages")

// Binary information.
RecordLoader.loadArchives(warcs, sc)
  .audio()
  .select($"crawl_date", $"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5", $"sha1")
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save(results + "audio")

RecordLoader.loadArchives(warcs, sc)
  .images()
  .select($"crawl_date", $"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"width", $"height", $"md5", $"sha1")
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save(results + "image")

RecordLoader.loadArchives(warcs, sc)
  .pdfs()
  .select($"crawl_date", $"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5", $"sha1")
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save(results + "pdf")

RecordLoader.loadArchives(warcs, sc)
  .presentationProgramFiles()
  .select($"crawl_date", $"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5", $"sha1")
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save(results + "presentation-program")

RecordLoader.loadArchives(warcs, sc)
  .spreadsheets()
  .select($"crawl_date", $"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5", $"sha1")
  .write.option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save(results + "spreadsheet")

RecordLoader.loadArchives(warcs, sc)
  .videos()
  .select($"crawl_date", $"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5", $"sha1")
  .write
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save(results + "video")

RecordLoader.loadArchives(warcs, sc)
  .wordProcessorFiles()
  .select($"crawl_date", $"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5", $"sha1")
  .write.option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
  .format("csv")
  .option("escape", "\"")
  .option("encoding", "utf-8")
  .save(results + "word-processor")

sys.exit
```

## Python DF

```python
from aut import *
from pyspark.sql.functions import col, desc

warcs = "/path/to/warcs/*"
results = "/path/to/results/"

webpages = WebArchive(sc, sqlContext, warcs).webpages()
webgraph = WebArchive(sc, sqlContext, warcs).webgraph()

# Domain frequency.
webpages.groupBy("domain") \
  .count() \
  .sort(col("count")\
  .desc()) \
  .write\
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")\
  .format("csv")\
  .option("escape", "\"")\
  .option("encoding", "utf-8")\
  .save(results + "domains")

# Domain graph.
webgraph.groupBy("crawl_date", remove_prefix_www(extract_domain("src")).alias("src_domain"), remove_prefix_www(extract_domain("dest")).alias("dest_domain"))\
  .count()\
  .filter((col("dest_domain").isNotNull()) & (col("dest_domain") !=""))\
  .filter((col("src_domain").isNotNull()) & (col("src_domain") !=""))\
  .filter(col("count") > 5)\
  .orderBy(desc("count"))\
  .write\
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")\
  .format("csv")\
  .option("escape", "\"")\
  .option("encoding", "utf-8")\
  .save(results + "domain-graph")

# Image graph.
WebArchive(sc, sqlContext, warcs).imagegraph()\
  .write\
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")\
  .format("csv")\
  .option("escape", "\"")\
  .option("encoding", "utf-8")\
  .save(results + "image-graph")

# Web graph.
webgraph.write\
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")\
  .format("csv")\
  .option("escape", "\"")\
  .option("encoding", "utf-8")\
  .save(results + "web-graph")

# Web pages.
webpages.write\
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")\
  .format("csv")\
  .option("escape", "\"")\
  .option("encoding", "utf-8")\
  .save(results + "webpages")

# Binary information.
WebArchive(sc, sqlContext, warcs).audio()\
  .select("crawl_date", "url", "filename", "extension", "mime_type_web_server", "mime_type_tika", "md5", "sha1")\
  .write\
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")\
  .format("csv")\
  .option("escape", "\"")\
  .option("encoding", "utf-8")\
  .save(results + "audio")

WebArchive(sc, sqlContext, warcs).images()\
  .select("crawl_date", "url", "filename", "extension", "mime_type_web_server", "mime_type_tika", "md5", "sha1")\
  .write\
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")\
  .format("csv")\
  .option("escape", "\"")\
  .option("encoding", "utf-8")\
  .save(results + "images")

WebArchive(sc, sqlContext, warcs).pdfs()\
  .select("crawl_date", "url", "filename", "extension", "mime_type_web_server", "mime_type_tika", "md5", "sha1")\
  .write\
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")\
  .format("csv")\
  .option("escape", "\"")\
  .option("encoding", "utf-8")\
  .save(results + "pdfs")

WebArchive(sc, sqlContext, warcs).presentation_program()\
  .select("crawl_date", "url", "filename", "extension", "mime_type_web_server", "mime_type_tika", "md5", "sha1")\
  .write\
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")\
  .format("csv")\
  .option("escape", "\"")\
  .option("encoding", "utf-8")\
  .save(results + "presentation_program")

WebArchive(sc, sqlContext, warcs).spreadsheets()\
  .select("crawl_date", "url", "filename", "extension", "mime_type_web_server", "mime_type_tika", "md5", "sha1")\
  .write\
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")\
  .format("csv")\
  .option("escape", "\"")\
  .option("encoding", "utf-8")\
  .save(results + "spreadsheets")

WebArchive(sc, sqlContext, warcs).video()\
  .select("crawl_date", "url", "filename", "extension", "mime_type_web_server", "mime_type_tika", "md5", "sha1")\
  .write\
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")\
  .format("csv")\
  .option("escape", "\"")\
  .option("encoding", "utf-8")\
  .save(results + "videos")

WebArchive(sc, sqlContext, warcs).word_processor()\
  .select("crawl_date", "url", "filename", "extension", "mime_type_web_server", "mime_type_tika", "md5", "sha1")\
  .write\
  .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")\
  .format("csv")\
  .option("escape", "\"")\
  .option("encoding", "utf-8")\
  .save(results + "word_processor")
```
