---
id: auk-derivatives
title: AU Cloud Scholarly Derivatives
---

How do I create the [scholarly
derivatives](https://cloud.archivesunleashed.org/derivatives) that the Archives
Unleashed Cloud creates on my own web archive collection?

Note, the full-text and domains output needs to be concatenated together into a
single file respectively to replicate the Cloud output, and the GraphML file
needs to be run through
[GraphPass](https://github.com/archivesunleashed/graphpass) with the following
command:

```bash
graphpass input.graphml output.gexf -gq
```

## Scala RDD

**Will not be implemented.**

## Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._
import io.archivesunleashed.app._

sc.setLogLevel("INFO")

// Web archive collection; web pages.
val webpages = RecordLoader.loadArchives("/path/to/data", sc)
  .webpages()

// Web archive collection; web graph.
val webgraph = RecordLoader.loadArchives("/path/to/data", sc)
  .webgraph()

// Domains file.
webpages.groupBy(removePrefixWWW(extractDomain($"Url")).alias("url"))
  .count()
  .sort($"count".desc)
  .write.csv("/path/to/derivatives/auk/all-domains/output")

// Full-text.
webpages.select($"crawl_date", removePrefixWWW(extractDomain(($"url")).alias("domain")), $"url", removeHTML(removeHTTPHeader(($"content"))))
  .write.csv("/path/to/derivatives/auk/full-text/output")

// GraphML
val graph = webgraph.groupBy(
                       $"crawl_date",
                       removePrefixWWW(extractDomain($"src")).as("src_domain"),
                       removePrefixWWW(extractDomain($"dest")).as("dest_domain"))
              .count()
              .filter(!($"dest_domain"===""))
              .filter(!($"src_domain"===""))
              .filter($"count" > 5)
              .orderBy(desc("count"))

WriteGraphML(graph.collect(), "/path/to/derivatives/auk/graph/example.graphml")

sys.exit
```

## Python DF

```python
from aut import *
from pyspark.sql.functions import col, desc

# Web archive collection; web pages.
webpages = WebArchive(sc, sqlContext, "/path/to/data").webpages()

# Web archive collection; web graph.
webgraph = WebArchive(sc, sqlContext, "/path/to/data").webgraph()

# Domains file.
webpages.groupBy(remove_prefix_www(extract_domain("url")).alias("url"))\
  .count()\
  .sort(col("count").desc())\
  .write.csv("/path/to/derivatives/auk/all-domains/output"")

# Full-text.
webpages.select("crawl_date", remove_prefix_www(extract_domain("url")).alias("domain"), "url", remove_html(remove_http_header("content")).alias("content"))\
  .write.csv("/path/to/derivatives/auk/full-text/output")

# Create DataFrame for GraphML output
graph = webgraph.groupBy("crawl_date", remove_prefix_www(extract_domain("src")).alias("src_domain"), remove_prefix_www(extract_domain("dest")).alias("dest_domain"))\
          .count()\
          .filter((col("dest_domain").isNotNull()) & (col("dest_domain") !=""))\
          .filter((col("src_domain").isNotNull()) & (col("src_domain") !=""))\
          .filter(col("count") > 5)\
          .orderBy(desc("count"))

# Write the GraphML out to a file.
WriteGraphML(graph.collect(), "/path/to/derivatives/auk/graph/example.graphml")
```
