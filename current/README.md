# The Archives Unleashed Toolkit: Latest Documentation

The Archives Unleashed Toolkit is an open-source platform for analyzing web archives built on [Hadoop](https://hadoop.apache.org/). Tight integration with Hadoop provides powerful tools for analytics and data processing via [Spark](http://spark.apache.org/).

Most of this documentation is built on [resilient distributed datasets (RDD)](https://spark.apache.org/docs/latest/rdd-programming-guide.html). We are working on adding support for [DataFrames](https://spark.apache.org/docs/latest/sql-programming-guide.html#datasets-and-dataframes). You can read more about this in our experimental [DataFrames section](#dataframes), and at our [[Using the Archives Unleashed Toolkit with PySpark]] tutorial.

If you want to learn more about [Apache Spark](https://spark.apache.org/), we highly recommend [Spark: The Definitive Guide](http://shop.oreilly.com/product/0636920034957.do) 

## Table of Contents

Our documentation is divided into several main sections, which cover the Archives Unleashed Toolkit workflow from analyzing collections to understanding and working with the results.

### Getting Started

- [Installing the Archives Unleashed Toolkit](https://github.com/archivesunleashed/aut-docs-new/blob/master/current/install.md)

### Generating Results
- [**Collection Analysis**](collection-analysis.md): How do I...
  - [Extract All URLs](collection-analysis.md#Extract-All-URLs)
  - [Extract Top-Level Domains](collection-analysis.md#Extract-Top-Level-Domains)
  - [Extract Different Subdomains](collection-analysis.md#Extract-Different-Subdomains)
  - [Extract HTTP Status Codes](collection-analysis.md#Extract-HTTP-Status-Codes)
  - [Extract the Location of the Resource in ARCs and WARCs](collection-analysis.md#Extract-the-Location-of-the-Resource-in-ARCs-and-WARCs)
- [**Text Analysis**](https://github.com/archivesunleashed/aut-docs-new/blob/master/current/text-analysis.md): How do I...
  - [Extract All Plain Text](text-analysis.md#Extract-All-Plain-Text)
  - [Extract Plain Text Without HTTP Headers](text-analysis.md#Extract-Plain-Text-Without-HTTP-Headers)
  - [Extract Plain Text By Domain](text-analysis.md#Extract-Plain-Text-By-Domain)
  - [Extract Plain Text by URL Pattern](text-analysis.md#Extract-Plain-Text-by-URL-Pattern)
  - [Extract Plain Text Minus Boilerplate](text-analysis.md#Extract-Plain-Text-Minus-Boilerplate)
  - [Extract Plain Text Filtered by Date](text-analysis.md#Extract-Plain-Text-Filtered-by-Date)
  - [Extract Plain Text Filtered by Language](text-analysis.md#Extract-Plain-Text-Filtered-by-Language)
  - [Extract Plain text Filtered by Keyword](text-analysis.md#Extract-Plain-Text-Filtered-by-Keyword)
  - [Extract Raw HTML](text-analysis.md#Extract-Raw-HTML)
  - [Extract Named Entities](text-analysis.md#Extract-Named-Entities)
- **[Link Analysis](https://github.com/archivesunleashed/aut-docs-new/blob/master/current/link-analysis.md)**: How do I...
  - [Extract Simple Site Link Structure](link-analysis.md#Extract-Simple-Site-Link-Structure)
  - [Extract Raw URL Link Structure](link-analysis.md#Extract-Raw-URL-Link-Structure)
  - [Organize Links by URL Pattern](link-analysis.md#Organize-Links-by-URL-Pattern)
  - [Organize Links by Crawl Date](link-analysis.md#Organize-Links-by-Crawl-Date)
  - [Export as TSV](link-analysis.md#Export-as-TSV)
  - [Filter by URL](link-analysis.md#Filter-by-URL)
  - [Export to Gephi](link-analysis.md#Export-to-Gephi)
- **[Image Analysis](image-analysis.md)**: How do I...
  - [Most Frequent Image URLs](image-analysis.md#Most-Frequent-Image-URLs)
  - [Most Frequent Images MD5 Hash](image-analysis.md#Most-Frequent-Images-MD5-Hash)
- **[Binary Analysis](binary-analysis.md)**: How do I...
  - [Audio](binary-analysis.md#Extract-Audio-Information)
  - [Images](image-analysis.md#Extract-Image-information)
  - [PDFs](binary-analysis.md#Extract-PDF-Information)
  - [Presentation program files](binary-analysis.md#Extract-Presentation-Program-Files-Information)
  - [Spreadsheets](binary-analysis.md#Extract-Spreadsheet-Information)
  - [Text files](binary-analysis.md#Extract-Text-Files-Information)
  - [Videos](binary-analysis.md#Extract-Video-Information)
  - [Word processor files](binary-analysis.md#Extract-Word-Processor-Files-Information) 

### Filtering Results
- **[Filters](filters.md)**: A variety of ways to filter results.

### What to do with Results
- **[What to do with DataFrame Results](df-results.md)**
- **[What to do with RDD Results](rdd-results.md)**

## Further Reading

The toolkit grew out of a previous project called [Warcbase](https://github.com/lintool/warcbase). The following article provides a nice overview, much of which is still relevant:

Jimmy Lin, Ian Milligan, Jeremy Wiebe, and Alice Zhou. [Warcbase: Scalable Analytics Infrastructure for Exploring Web Archives](https://dl.acm.org/authorize.cfm?key=N46731). *ACM Journal on Computing and Cultural Heritage*, 10(4), Article 22, 2017.

## Acknowledgments

This work is primarily supported by the [Andrew W. Mellon Foundation](https://mellon.org/). Other financial and in-kind support comes from the [Social Sciences and Humanities Research Council](http://www.sshrc-crsh.gc.ca/), [Compute Canada](https://www.computecanada.ca/), the [Ontario Ministry of Research, Innovation, and Science](https://www.ontario.ca/page/ministry-research-innovation-and-science), [York University Libraries](https://www.library.yorku.ca/web/), [Start Smart Labs](http://www.startsmartlabs.com/), and the [Faculty of Arts](https://uwaterloo.ca/arts/) and [David R. Cheriton School of Computer Science](https://cs.uwaterloo.ca/) at the [University of Waterloo](https://uwaterloo.ca/).

Any opinions, findings, and conclusions or recommendations expressed are those of the researchers and do not necessarily reflect the views of the sponsors.
