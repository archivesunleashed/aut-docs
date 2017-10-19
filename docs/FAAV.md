# Getting Started: The FAAV Cycle

Working with web archives can be overwhelming. To help researchers, we propose a process model that begins with your scholarly question and then proceeds through four main steps: 

* Filtering;
* Analyzing;
* Aggregating; 
* Visualizing;

This Filter-Analyze-Aggregate-Visualize (FAAV) cycle is presented on this page, with sample scripts to draw a user through a work cycle. It can help a researcher get started with web archiving analysis.

To show how the FAAV cycle works, we use the example of our work with the Canadian Political Parties and Political Interest Groups collection (CPP). This as collected by the University of Toronto using the Internet Archive's Archive-It platform. It is approximately 380 GB in size compressed, comprised of content from around fifty Canadian political organizations. 

## Filtering

To work with CPP, then, a researcher is confronted with 380 GB of WARC files and some 14.5 million documents. The first step is to **filter** the content, to focus on a paritcular portion of the web archive. Content can be filtered on either metadata or content.

For example, imagine the researcher wants to do a textual analysis of plain text. They cannot do this on all the documents. But perhaps they are interested only in pages that only mention the phrase "global warming." 

```scala
import io.archivesunleashed.spark.matchbox._ 
import io.archivesunleashed.spark.rdd.RecordRDD._ 

val r = RecordLoader.loadArchives("/path/to/cpp",sc)
.keepValidPages()
.keepContent(Set("climate change".r))
.map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(r.getContentString)))
.saveAsTextFile("climate change/")
```

Or alternatively, they are focused only on the 2006 federal election, held in January of that year.

```scala
import io.archivesunleashed.spark.matchbox.RecordLoader
import io.archivesunleashed.spark.rdd.RecordRDD._
import io.archivesunleashed.spark.matchbox.{RemoveHTML, RecordLoader}
import io.archivesunleashed.spark.matchbox.ExtractDate.DateComponent._

RecordLoader.loadArchives("/path/to/cpp", sc)
  .keepValidPages()
  .keepDate("200601", YYYYMM)
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(r.getContentString)))
  .saveAsTextFile("out/")
```

## Analyzing

After finding a subsection, the scholar may want to do analysis. This might be within AUT or outside of AUT. For example, the researcher may want to know the linking structure of pages during the 2006 federal election.

```scala
import io.archivesunleashed.spark.matchbox._
import io.archivesunleashed.spark.rdd.RecordRDD._
import StringUtils._

val links = RecordLoader.loadArchives("/path/to/cpp/", sc)
  .keepValidPages()
  .keepDate("200601", YYYYMM)
  .flatMap(r => ExtractLinks(r.getUrl, r.getContentString))
  .map(r => (ExtractDomain(r._1).removePrefixWWW(), ExtractDomain(r._2).removePrefixWWW()))
  .filter(r => r._1 != "" && r._2 != "")

links.saveAsTextFile("2006-federal-election-links/")
```

Or, for the climate change example, links between pages within the "climate change" subset.

```scala
import io.archivesunleashed.spark.matchbox._
import io.archivesunleashed.spark.rdd.RecordRDD._
import StringUtils._

val links = RecordLoader.loadArchives("/path/to/cpp/", sc)
  .keepValidPages()
  .keepContent(Set("climte change".r))
  .flatMap(r => ExtractLinks(r.getUrl, r.getContentString))
  .map(r => (ExtractDomain(r._1).removePrefixWWW(), ExtractDomain(r._2).removePrefixWWW()))
  .filter(r => r._1 != "" && r._2 != "")

links.saveAsTextFile("climate-change-links/")
```

## Aggregate

Now you may want to aggregate or summarize the analysis from the previous step. In this case, a simple `.countItems()` can help. Here is the 2006 federal election, so you can see the frequency of specific links:

```scala
import io.archivesunleashed.spark.matchbox._
import io.archivesunleashed.spark.rdd.RecordRDD._
import StringUtils._

val links = RecordLoader.loadArchives("/path/to/cpp/", sc)
  .keepValidPages()
  .keepDate("200601", YYYYMM)
  .flatMap(r => ExtractLinks(r.getUrl, r.getContentString))
  .map(r => (ExtractDomain(r._1).removePrefixWWW(), ExtractDomain(r._2).removePrefixWWW()))
  .filter(r => r._1 != "" && r._2 != "")
  .countItems()
  .filter(r => r._2 > 5)

links.saveAsTextFile("2006-federal-election-links/")
```

## Visualize

Finally, you may want a visualization. This could be a table of results, or a CSV file, or beyond.

Stay tuned for more details on our in-house visualization options as they come together.

## Acknowledgements

For more on the FAAV cycle, please read (and cite if you use it):

Jimmy Lin, Ian Milligan, Jeremy Wiebe, and Alice Zhou. ["Warcbase: Scalable Analytics Infrastructure for Exploring Web Archives,"](https://dl.acm.org/citation.cfm?id=3097570) *ACM Journal of Computing and Cultural Heritage*, Vol. 10, Issue 4, July 2017.