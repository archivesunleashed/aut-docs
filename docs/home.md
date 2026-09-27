---
id: home
title: The Toolkit
---

The Archives Unleashed Toolkit (AUT) is an open-source platform for analyzing web
archives built on [Apache Spark](https://spark.apache.org/), which provides
powerful tools for analytics and data processing.

This documentation is based on a cookbook approach, providing a series of
"recipes" for addressing a number of common analytics tasks to provide
inspiration for your own analysis. We generally provide examples for [resilient
distributed datasets
(RDD)](https://spark.apache.org/docs/latest/rdd-programming-guide.html) in
Scala, and
[DataFrames](https://spark.apache.org/docs/latest/sql-programming-guide.html#datasets-and-dataframes)
in both Scala and Python. We leave it up to you to choose Scala or Python
flavours of Spark.

If you want to learn more about [Apache Spark](https://spark.apache.org/), we
highly recommend [Spark: The Definitive
Guide](http://shop.oreilly.com/product/0636920034957.do).

## Table of Contents

Our documentation is divided into several main sections, which cover the
Archives Unleashed Toolkit workflow from analyzing collections to understanding
and working with the results.

### Getting Started

- [Dependencies](dependencies.md)
- [Usage](usage.md)
- [Using the Archives Unleashed Toolkit at Scale](aut-at-scale.md)
- [Toolkit Walkthrough](toolkit-walkthrough.md)
- [DataFrame Schemas](dataframe-schemas.md)

### Generating Results

- [**Collection Analysis**](collection-analysis.md): How do I...
  - [Extract All URLs](collection-analysis.md#extract-all-urls)
  - [Extract Top-Level Domains](collection-analysis.md#extract-top-level-domains)
  - [Extract First-Level Directories](collection-analysis.md#extract-first-level-directories)
  - [Extract HTTP Status Codes](collection-analysis.md#extract-http-status-codes)
  - [Extract the Location of the Resource in ARCs and WARCs](collection-analysis.md#extract-the-location-of-the-resource-in-arcs-and-warcs)
- [**Text Analysis**](text-analysis.md): How do I...
  - [Extract Web Page Text](text-analysis.md#extract-web-page-text)
  - [Extract Web Page Text by Domain](text-analysis.md#extract-web-page-text-by-domain)
  - [Extract Web Page Text by URL Pattern](text-analysis.md#extract-web-page-text-by-url-pattern)
  - [Extract Web Page Text Minus Boilerplate](text-analysis.md#extract-web-page-text-minus-boilerplate)
  - [Extract Web Page Text Filtered by Date](text-analysis.md#extract-web-page-text-filtered-by-date)
  - [Extract Web Page Text Filtered by Language](text-analysis.md#extract-web-page-text-filtered-by-language)
  - [Extract Web Page Text Filtered by Keyword](text-analysis.md#extract-web-page-text-filtered-by-keyword)
  - [Extract Raw HTML and Content of Web Pages](text-analysis.md#extract-raw-html-and-content-of-web-pages)
- **[Link Analysis](link-analysis.md)**: How do I...
  - [Extract Simple Site Link Structure](link-analysis.md#extract-simple-site-link-structure)
  - [Extract Raw URL Link Structure](link-analysis.md#extract-raw-url-link-structure)
  - [Organize Links by URL Pattern](link-analysis.md#organize-links-by-url-pattern)
  - [Organize Links by Crawl Date](link-analysis.md#organize-links-by-crawl-date)
  - [Filter by URL](link-analysis.md#filter-by-url)
  - [Export to Gephi](link-analysis.md#export-to-gephi)
  - [Find Hyperlinks within a Collection on Pages with a Certain Keyword](link-analysis.md#find-hyperlinks-within-a-collection-on-pages-with-a-certain-keyword)
- **[Binary Analysis](binary-analysis.md)**: How do I...
  - [Extract Audio Information](binary-analysis.md#extract-audio-information)
  - [Extract Image Information](binary-analysis.md#extract-image-information)
  - [Extract Most Frequent Image URLs](binary-analysis.md#extract-most-frequent-image-urls)
  - [Extract Most Frequent Images by MD5 Hash](binary-analysis.md#extract-most-frequent-images-by-md5-hash)
  - [Find Images Shared Between Domains](binary-analysis.md#find-images-shared-between-domains)
  - [Extract PDF Information](binary-analysis.md#extract-pdf-information)
  - [Extract Presentation Program Files Information](binary-analysis.md#extract-presentation-program-files-information)
  - [Extract Spreadsheet Information](binary-analysis.md#extract-spreadsheet-information)
  - [Extract Video Information](binary-analysis.md#extract-video-information)
  - [Extract Word Processor Files Information](binary-analysis.md#extract-word-processor-files-information)
- **[Text Files (html, text, css, js, json, xml) Analysis](text-files-analysis.md)**:
  How do I...
  - [Extract CSS Information](text-files-analysis.md#extract-css-information)
  - [Extract HTML Information](text-files-analysis.md#extract-html-information)
  - [Extract JavaScript Information](text-files-analysis.md#extract-javascript-information)
  - [Extract JSON Information](text-files-analysis.md#extract-json-information)
  - [Extract Plain Text Information](text-files-analysis.md#extract-plain-text-information)
  - [Extract XML Information](text-files-analysis.md#extract-xml-information)

### Filtering Results

- **[DataFrame Filters](filters-df.md)**
- **[RDD Filters](filters-rdd.md)**

### Standard Derivatives

**How do I...**

- [Use the Toolkit with spark-submit](aut-spark-submit-app.md)
- [Create the Archives Research Compute Hub (ARCH) Derivatives](auk-derivatives.md)
- [Extract Binary Info](extract-binary-info.md)
- [Extract Binaries to Disk](extract-binary.md)

### What to Do with Results

- **[What to Do with DataFrame Results](df-results.md)**
- **[What to Do with RDD Results](rdd-results.md)**

### Citing Archives Unleashed

How to cite the Archives Unleashed Toolkit or
Cloud in your research:

> Nick Ruest, Jimmy Lin, Ian Milligan, and
Samantha Fritz. 2020. The Archives Unleashed
Project: Technology, Process, and Community
to Improve Scholarly Access to Web Archives.
In _Proceedings of the ACM/IEEE Joint Conference
on Digital Libraries in 2020 (JCDL '20)_.
Association for Computing Machinery, New York,
NY, USA, 157–166. DOI: [https://doi.org/10.1145/3383583.3398513](https://doi.org/10.1145/3383583.3398513).

Your citations help further the recognition
of using open-source tools for scientific
inquiry, assist in growing the web archiving
community, and acknowledge the efforts of
contributors to this project.

## Further Reading

The following two articles provide an overview of the project:

- Jimmy Lin, Ian Milligan, Jeremy Wiebe, and Alice Zhou. [Warcbase: Scalable
  Analytics Infrastructure for Exploring Web
  Archives](https://dl.acm.org/authorize.cfm?key=N46731). _ACM Journal on
  Computing and Cultural Heritage_, 10(4), Article 22, 2017.
- Nick Ruest, Jimmy Lin, Ian Milligan, Samantha Fritz. [The Archives Unleashed
  Project: Technology, Process, and Community to Improve Scholarly Access to
  Web Archives](https://yorkspace.library.yorku.ca/xmlui/handle/10315/37506).
  Proceedings of the 2020 ACM/IEEE Joint Conference on Digital Libraries
  (JCDL 2020), Wuhan, China.

## Acknowledgments

This work is primarily supported by the [Andrew W. Mellon
Foundation](https://mellon.org/). Other financial and in-kind support comes
from the [Social Sciences and Humanities Research
Council](https://www.sshrc-crsh.gc.ca/), [Compute
Canada](https://www.computecanada.ca/), the [Ontario Ministry of Research,
Innovation, and
Science](https://www.ontario.ca/page/ministry-research-innovation-and-science),
[York University Libraries](https://www.library.yorku.ca/web/), [Start Smart
Labs](http://www.startsmartlabs.com/), and the [Faculty of
Arts](https://uwaterloo.ca/arts/) and [David R. Cheriton School of Computer
Science](https://cs.uwaterloo.ca/) at the [University of
Waterloo](https://uwaterloo.ca/).

Any opinions, findings, and conclusions or recommendations expressed are those
of the researchers and do not necessarily reflect the views of the sponsors.
