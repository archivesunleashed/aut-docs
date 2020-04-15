# Using the Toolkit with spark-submit

The Toolkit offers a variety of extraction jobs with
[`spark-submit`](https://spark.apache.org/docs/latest/submitting-applications.html)
. These extraction jobs have a few configuration options, and analysis can use
RDD or DataFrame in most cases.

The extraction jobs have a basic outline of:

```shell
spark-submit --class io.archivesunleashed.app.CommandLinAppRunner PATH_TO_AUT_JAR --extractor EXTRACTOR --input INPUT DIRECTORY --output OUTPUT DIRECTORY
```

Additional flags include:

* `--output-format FORMAT` (Used only for the `DomainGraphExtractor`, and the
  options are `TEXT` (default) or `GEXF`.)
* `--df` (The extractor will use a DataFrame to carry out analysis.)
* `--split` (The extractor will put results for each input file in its own
  directory. Each directory name will be the name of the ARC/WARC file parsed.)
* `--partition N` (The extractor will partition RDD or DataFrame according to N
  before writing results. The is useful to combine all the results to a single
  file.)

## Domain Frequency

This extractor outputs a directory of CSV files or a single CSV file with the
following columns: `domain`, and `count`.

### RDD

Directory of CSV files:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor DomainFrequencyExtractor --input /path/to/warcs/* --output output/path
 ```

A single CSV file:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor DomainFrequencyExtractor --input /path/to/warcs/* --output output/path --partition 1
```

### DataFrame

Directory of CSV files:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor DomainFrequencyExtractor --input /path/to/warcs/* --output output/path --df
```

A single CSV file:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor DomainFrequencyExtractor --input /path/to/warcs/* --output output/path --df --partition 1
```

## Domain Graph

This extractor outputs a directory of CSV files or a single CSV file with the
following columns: `crawl_date`, `src_domain`, `dest_domain`, and `count`. In
addition to the standard text output, an additional flag `--output-format` can
output [GraphML](https://en.wikipedia.org/wiki/GraphML), or
[GEXF](https://gephi.org/gexf/format/).

### RDD

**Note**: The RDD output is formatted slightly different. The first three
columns are an array:
`((CrawlDate, SourceDomain, DestinationDomain), Frequency)`

Text output:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor DomainGraphExtractor --input /path/to/warcs/* --output output/path --output-format TEXT
```

GEXF output:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor DomainGraphExtractor --input /path/to/warcs/* --output output/path --output-format GEXF
```

GraphML output:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor DomainGraphExtractor --input /path/to/warcs/* --output output/path --output-format GRAPHML
```

### DataFrame

Text output:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor DomainGraphExtractor --input /path/to/warcs/* --output output/path --df --output-format TEXT
```

GEXF output:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor DomainGraphExtractor --input /path/to/warcs/* --output output/path --df --output-format GEXF
```

GraphML output:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor DomainGraphExtractor --input /path/to/warcs/* --output output/path --df --output-format GRAPHML
```

## Image Graph

This extractor outputs a directory of CSV files or a single CSV file with the
following columns: `crawl_date`, `src`, `image_url`, and `alt_text`.

**Note**: This extractor will only work with the DataFrame option.

### DataFrame

Directory of CSV files:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor ImageGraphExtractor --input /path/to/warcs/* --output output/path --df
```

A single CSV file:

``` shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor ImageGraphExtractor --input /path/to/warcs/* --output output/path --df --partition 1
```

## Plain Text

This extractor outputs a directory of CSV files or a single CSV file with the
following columns: `crawl_date`, `domain`, `url`, and `text`.

### RDD

Directory of CSV files:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor PlainTextExtractor --input /path/to/warcs/* --output output/path
```

A single CSV file:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor PlainTextExtractor --input /path/to/warcs/* --output output/path --partition 1
```

### DataFrame

Directory of CSV files:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor ImageGraphExtractor --input /path/to/warcs/* --output output/path --df
```

A single CSV file:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor ImageGraphExtractor --input /path/to/warcs/* --output output/path --df --partition 1
```

## Web Pages

This extractor outputs a directory of CSV files or a single CSV file with the
following columns: `crawl_date`, `url`, `mime_type_web_server`,
`mime_type_tika`, `language`, and `content`.

**Note**: This extractor will only work with the DataFrame option.

### DataFrame

Directory of CSV files:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor WebPagesExtractor --input /path/to/warcs/* --output output/path --df
```

A single CSV file:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner path/to/aut-fatjar.jar --extractor WebPagesExtractor --input /path/to/warcs/* --output output/path --df --partition 1
```
