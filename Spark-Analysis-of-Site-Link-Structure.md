Site link structures can be very useful, allowing you to learn such things as:
- what websites were the most linked to;
- what websites had the most outbound links;
- what paths could be taken through the network to connect pages;
- what communities existed within the link structure?

# Grouping by Crawl Date

The following Spark script generates the aggregated site-level link structure, grouped by crawl date (YYYYMMDD):

```
import org.warcbase.spark.matchbox.RecordTransformers._
import org.warcbase.spark.matchbox.{ExtractTopLevelDomain, ExtractLinks, RecordLoader}
import org.warcbase.spark.rdd.RecordRDD._

RecordLoader.loadArc("/path/to/arc", sc)
  .discardDate(null)
  .keepMimeTypes(Set("text/html"))
  .map(r => (r.getCrawldate, ExtractLinks(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1, ExtractTopLevelDomain(f._1).replaceAll("^\\s*www\\.", ""), ExtractTopLevelDomain(f._2).replaceAll("^\\s*www\\.", ""))))
  .filter(r => r._2 != "" && r._3 != "")
  .countItems()
  .filter(r => r._2 > 5)
  .saveAsTextFile("cpp.sitelinks")
```

The ensuing format will look like this. 

The format of this visualization is:

Column one: Crawldate, yyyyMMdd
Column two: Source domain (i.e. liberal.ca)
Column three: Target domain of link (i.e. ndp.ca)
Column four: number of links.

```
((20080612,liberal.ca,liberal.ca),1832983)
((20060326,ndp.ca,ndp.ca),1801775)
((20060426,ndp.ca,ndp.ca),1771993)
((20060325,policyalternatives.ca,policyalternatives.ca),1735154)
```

In the above example, you are seeing INTERNAL links - those within domains.

# Aggregating by Month

In your analysis, you may want to group the link structures by month rather than by day (if a crawl is carried out over several days, this may help smooth out inconsistencies). 

The following script will do so:

```
import org.warcbase.spark.matchbox.RecordTransformers._
import org.warcbase.spark.matchbox.{ExtractTopLevelDomain, ExtractLinks, RecordLoader}
import org.warcbase.spark.rdd.RecordRDD._

RecordLoader.loadArc("/mnt/vol1/data_sets/cpp_arcs/", sc)
  .discardDate(null)
  .keepMimeTypes(Set("text/html"))
  .map(r => (r.getCrawldate, ExtractLinks(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1.substring(0,6), ExtractTopLevelDomain(f._1).replaceAll("^\\s*www\\.", ""), ExtractTopLevelDomain(f._2).replaceAll("^\\s*www\\.", ""))))
  .filter(r => r._2 != null && r._3 != null)
  .countItems()
  .filter(r => r._2 > 5)
  .groupBy(_._1._1)
  .flatMap(r => r._2)
  .saveAsTextFile("cpp.sitelinks-groupedByMonth")
```

It generates results like:

```
((200701,policyalternatives.ca,policyalternatives.ca),6234276)
((200701,fairvotecanada.org,fairvotecanada.org),908615)
((200701,greenparty.ca,contact.greenparty.ca),150519)
((200701,conservative.ca,conservative.ca),119375)
((200701,greenparty.ca,secure.greenparty.ca),100371)
((200701,greenparty.ca,ridings.greenparty.ca),100360)
((200701,policyalternatives.ca,),97147)
((200701,policyalternatives.ca,pencilneck.net),96190)
((200701,policyalternatives.ca,raisedeyebrow.com),96190)
((200701,ndp.ca,ndp.ca),89337)
((200701,egale.ca,egale.ca),74661)
((200701,policyalternatives.ca,adobe.com),55703)
((200701,greenparty.ca,community.greenparty.ca),50308)
((200701,greenparty.ca,greenparty.ca),50238)
((200701,greenparty.ca,web.greenparty.ca),50212)
((200701,greenparty.ca,partivert.ca),50176)
((200701,greenparty.ca,validator.w3.org),50171)
((200701,davidsuzuki.org,davidsuzuki.org),40867)
[etc.]
```

# Exporting to Gephi Directly

You may want to export your data directly to the [Gephi software suite](http://gephi.github.io/), an open-soure network analysis project. We have a separate lesson on this: [Gephi: Converting the Site Link Structure into a Dynamic Visualization](http://lintool.github.io/warcbase-docs/Gephi:-Converting-Site-Link-Structure-into-Dynamic-Visualization/).