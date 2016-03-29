We use the Apache Spark [GraphX API](http://spark.apache.org/graphx/) to calculate graph information within warcbase. This can complement analysis done in Gephi.

Here is one script that calculates dynamic PageRank on a WARC file:

```
import org.warcbase.spark.rdd.RecordRDD._
import org.warcbase.spark.matchbox.RecordLoader
import org.warcbase.spark.matchbox.ExtractGraph

val recs=RecordLoader.loadArchives("path/to/warc.gz", sc)

val graph = ExtractGraph(recs)
graph.writeAsJson("/path/to/home/nodes-test", "/path/to/home/links-test")
```

Calls to `ExtractGraph` can take several forms:

``val graph = ExtractGraph(recs, dynamic = true, tolerance = 0.0001)``
or
``val graph = ExtractGraph(recs, dynamic = false, numIter = 4)``

You can leave off the third parameter, in which case the default `tolerance` is 0.001 and the default `numIter` is 3.

Results take the form as following:

NODES:
>{"domain":"assnat.qc.ca","pageRank":0.15602109375,"inDegree":1,"outDegree":0}
{"domain":"web.net","pageRank":0.1548755648910227,"inDegree":1,"outDegree":27}
{"domain":"secure.conservative.ca","pageRank":0.1805159076887007,"inDegree":29,"outDegree":0}

LINKS:
>{"date":"20060622","src":"policyalternatives.ca","dst":"policyalternatives.ca","count":1072}
{"date":"20060622","src":"ccsd.ca","dst":"ccsd.ca","count":367}
{"date":"20060622","src":"conservative.ca","dst":"conservative.ca","count":267}
{"date":"20060622","src":"greenparty.ca","dst":"main.greenparty.ca","count":220}

