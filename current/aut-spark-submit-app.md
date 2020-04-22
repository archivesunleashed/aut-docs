# Using the Toolkit with spark-submit

The Toolkit offers a variety of extraction jobs with
[`spark-submit`](https://spark.apache.org/docs/latest/submitting-applications.html)
. These extraction jobs have a few configuration options.

The extraction jobs have a basic outline of:

```shell
spark-submit --class io.archivesunleashed.app.CommandLinAppRunner PATH_TO_AUT_JAR --extractor EXTRACTOR --input INPUT DIRECTORY --output OUTPUT DIRECTORY
```

Additional flags include:

* `--output-format FORMAT` (Used only for the `DomainGraphExtractor`, and the
  options are `csv` (default), `graphml`, or `gexf`.)
* `--split` (The extractor will put results for each input file in its own
  directory. Each directory name will be the name of the ARC/WARC file parsed.)
* `--partition N` (The extractor will partition the DataFrame according to N
  before writing results. The is useful to combine all the results to a single
  file.)

## Audio Information

This extractor outputs a directory of CSV files, or a single CSV file with the
following columns: `crawl_date`, `url`, `filename`, `extension`,
`mime_type_web_server`, `mime_type_tika`, `md5`, and `sha1`.

Directory of CSV files:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor AudioInformationExtractor --input /path/to/warcs/* --output output/path
```

A single CSV file:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor AudioInformationExtractor --input /path/to/warcs/* --output output/path --partition 1
```

## Domain Frequency

This extractor outputs a directory of CSV files or a single CSV file with the
following columns: `domain`, and `count`.

Directory of CSV files:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor DomainFrequencyExtractor --input /path/to/warcs/* --output output/path
```

A single CSV file:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor DomainFrequencyExtractor --input /path/to/warcs/* --output output/path --partition 1
```

## Domain Graph

This extractor outputs a directory of CSV files or a single CSV file with the
following columns: `crawl_date`, `src_domain`, `dest_domain`, and `count`. In
addition to the standard text output, an additional flag `--output-format` can
output [GraphML](https://en.wikipedia.org/wiki/GraphML), or
[GEXF](https://gephi.org/gexf/format/).

Text output:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor DomainGraphExtractor --input /path/to/warcs/* --output output/path --output-format csv
```

GEXF output:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor DomainGraphExtractor --input /path/to/warcs/* --output output/path --output-format gexf
```

GraphML output:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor DomainGraphExtractor --input /path/to/warcs/* --output output/path --output-format graphml
```

## Image Graph

This extractor outputs a directory of CSV files or a single CSV file with the
following columns: `crawl_date`, `src`, `image_url`, and `alt_text`.

Directory of CSV files:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor ImageGraphExtractor --input /path/to/warcs/* --output output/path
```

A single CSV file:

``` shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor ImageGraphExtractor --input /path/to/warcs/* --output output/path --partition 1
```

## Image Information

This extractor outputs a directory of CSV files, or a single CSV file with the
following columns: `crawl_date`, `url`, `filename`, `extension`,
`mime_type_web_server`, `mime_type_tika`, `width`, `height`, `md5`, and `sha1`.

Directory of CSV files:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor ImageInformationExtractor --input /path/to/warcs/* --output output/path
```

A single CSV file:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor ImageInformationExtractor --input /path/to/warcs/* --output output/path --partition 1
```

## PDF Information

This extractor outputs a directory of CSV files, or a single CSV file with the
following columns: `crawl_date`, `url`, `filename`, `extension`,
`mime_type_web_server`, `mime_type_tika`, `md5`, and `sha1`.

Directory of CSV files:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor PDFInformationExtractor --input /path/to/warcs/* --output output/path
```

A single CSV file:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor PDFInformationExtractor --input /path/to/warcs/* --output output/path --partition 1
```

## Plain Text

This extractor outputs a directory of CSV files or a single CSV file with the
following columns: `content` (Boilerplate, HTTP headers, and HTML removed).

Directory of CSV files:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor PlainTextExtractor --input /path/to/warcs/* --output output/path
```

A single CSV file:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor PlainTextExtractor --input /path/to/warcs/* --output output/path --partition 1
```

## Presentation Program Information

This extractor outputs a directory of CSV files, or a single CSV file with the
following columns: `crawl_date`, `url`, `filename`, `extension`,
`mime_type_web_server`, `mime_type_tika`, `md5`, and `sha1`.

Directory of CSV files:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor PresentationProgramInformationExtractor --input /path/to/warcs/* --output output/path
```

A single CSV file:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor PresentationProgramInformationExtractor --input /path/to/warcs/* --output output/path --partition 1
```

## Spreadsheet Information

This extractor outputs a directory of CSV files, or a single CSV file with the
following columns: `crawl_date`, `url`, `filename`, `extension`,
`mime_type_web_server`, `mime_type_tika`, `md5`, and `sha1`.

Directory of CSV files:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor SpreadsheetInformationExtractor --input /path/to/warcs/* --output output/path
```

A single CSV file:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor SpreadsheetInformationExtractor --input /path/to/warcs/* --output output/path --partition 1
```

## Text Files Information

This extractor outputs a directory of CSV files, or a single CSV file with the
following columns: `crawl_date`, `url`, `filename`, `extension`,
`mime_type_web_server`, `mime_type_tika`, `md5`, and `sha1`.

Directory of CSV files:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor TextFilesInformationExtractor --input /path/to/warcs/* --output output/path
```

A single CSV file:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor TextFilesInformationExtractor --input /path/to/warcs/* --output output/path --partition 1
```

## Video Information

This extractor outputs a directory of CSV files, or a single CSV file with the
following columns: `crawl_date`, `url`, `filename`, `extension`,
`mime_type_web_server`, `mime_type_tika`, `md5`, and `sha1`.

Directory of CSV files:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor VideoInformationExtractor --input /path/to/warcs/* --output output/path
```

A single CSV file:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor VideoInformationExtractor --input /path/to/warcs/* --output output/path --partition 1
```

## Web Graph Information

This extractor outputs a directory of CSV files, or a single CSV file with the
following columns: `crawl_date`, `src`, `dest`, and `anchor`.

Directory of CSV files:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor WebGraphExtractor --input /path/to/warcs/* --output output/path
```

A single CSV file:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor WebGraphExtractor --input /path/to/warcs/* --output output/path --partition 1
```

## Web Pages

This extractor outputs a directory of CSV files or a single CSV file with the
following columns: `crawl_date`, `domain` (www prefix removed), `url`,
`mime_type_web_server`, `mime_type_tika`, and `content`
(HTTP headers, and HTML removed).

Directory of CSV files:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor WebPagesExtractor --input /path/to/warcs/* --output output/path
```

A single CSV file:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor WebPagesExtractor --input /path/to/warcs/* --output output/path --partition 1
```

## Word Processor Information

This extractor outputs a directory of CSV files, or a single CSV file with the
following columns: `crawl_date`, `url`, `filename`, `extension`,
`mime_type_web_server`, `mime_type_tika`, `md5`, and `sha1`.

Directory of CSV files:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor WordProcessorInformationExtractor --input /path/to/warcs/* --output output/path
```

A single CSV file:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor WordProcessorInformationExtractor --input /path/to/warcs/* --output output/path --partition 1
```
