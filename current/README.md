
The Archives Unleashed Toolkit is an open-source platform for analyzing web archives built on [Hadoop](https://hadoop.apache.org/). Tight integration with Hadoop provides powerful tools for analytics and data processing via [Spark](http://spark.apache.org/).

Most of this documentation is built on [resilient distributed datasets (RDD)](https://spark.apache.org/docs/latest/rdd-programming-guide.html). We are working on adding support for [DataFrames](https://spark.apache.org/docs/latest/sql-programming-guide.html#datasets-and-dataframes). You can read more about this in our experimental [DataFrames section](#dataframes), and at our [[Using the Archives Unleashed Toolkit with PySpark]] tutorial.

If you want to learn more about [Apache Spark](https://spark.apache.org/), we highly recommend [Spark: The Definitive Guide](http://shop.oreilly.com/product/0636920034957.do) 

## Table of Contents

Our documentation is divided into several main sections, which cover the Archives Unleashed Toolkit workflow from analyzing collections to understanding and working with the results.

### Getting Started

- [Installing the Archives Unleashed Toolkit](https://github.com/archivesunleashed/aut-docs-new/blob/master/current/install.md)

### Generating Results
- [**Collection Analysis**](collection-analysis.md): How do I...
  - [List URLs](collection-analysis.md#List-URLs)
  - [List Top-Level Domains](collection-analysis.md#List-Top-Level-Domains)
  - [List Different Subdomains](collection-analysis.md#List-Different-Subdomains)
  - [List HTTP Status Codes](collection-analysis.md#List-HTTP-Status-Codes)
  - [Get the Location of the Resource in ARCs and WARCs](collection-analysis.md#Get-the-Location-of-the-Resource-in-ARCs-and-WARCs)
- **[Text Analysis](https://github.com/archivesunleashed/aut-docs-new/blob/master/current/text-analysis.md)**: How do I extract all plain text; plain text without HTTP headers; filter by domain, URL pattern, date, language, keyword; remove boilerplate; extract raw HTML or named entities.
- **[Link Analysis](https://github.com/archivesunleashed/aut-docs-new/blob/master/current/link-analysis.md)**: How do I extract a simple site link structure, a raw URL link structure, organize links by URL patter or crawl date, filter by URL, or export as TSV or Gephi file.
- **[Image Analysis](https://github.com/archivesunleashed/aut-docs-new/blob/master/current/image-analysis.md)**: How do I find the most frequent images in a collection by URL or MD5 hash.

### Filtering Results
- **[Filters](https://github.com/archivesunleashed/aut-docs-new/blob/master/current/filters.md NOW)**: A variety of ways to filter results.

### What to do with Results
- **[What to do with DataFrame Results](https://github.com/archivesunleashed/aut-docs-new/blob/master/current/df-results.md)**
- **[What to do with RDD Results](https://github.com/archivesunleashed/aut-docs-new/blob/master/current/rdd-results.md)**

## Further Reading

The toolkit grew out of a previous project called [Warcbase](https://github.com/lintool/warcbase). The following article provides a nice overview, much of which is still relevant:

Jimmy Lin, Ian Milligan, Jeremy Wiebe, and Alice Zhou. [Warcbase: Scalable Analytics Infrastructure for Exploring Web Archives](https://dl.acm.org/authorize.cfm?key=N46731). *ACM Journal on Computing and Cultural Heritage*, 10(4), Article 22, 2017.

## Acknowledgments

This work is primarily supported by the [Andrew W. Mellon Foundation](https://mellon.org/). Other financial and in-kind support comes from the [Social Sciences and Humanities Research Council](http://www.sshrc-crsh.gc.ca/), [Compute Canada](https://www.computecanada.ca/), the [Ontario Ministry of Research, Innovation, and Science](https://www.ontario.ca/page/ministry-research-innovation-and-science), [York University Libraries](https://www.library.yorku.ca/web/), [Start Smart Labs](http://www.startsmartlabs.com/), and the [Faculty of Arts](https://uwaterloo.ca/arts/) and [David R. Cheriton School of Computer Science](https://cs.uwaterloo.ca/) at the [University of Waterloo](https://uwaterloo.ca/).

Any opinions, findings, and conclusions or recommendations expressed are those of the researchers and do not necessarily reflect the views of the sponsors.
