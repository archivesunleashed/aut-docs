# Network Analysis and Visualization in Spark using GraphX

We use the Apache Spark [GraphX API](http://spark.apache.org/graphx/) to calculate graph information within warcbase. This can complement analysis done in Gephi.

### Calculating Dynamic PageRank

Here is a script that calculates dynamic PageRank on a WARC file:

```scala
import org.warcbase.spark.rdd.RecordRDD._
import org.warcbase.spark.matchbox.RecordLoader
import org.warcbase.spark.matchbox.ExtractGraph

val recs=RecordLoader.loadArchives("path/to/warc.gz", sc)

val graph = ExtractGraph(recs, dynamic=true)
graph.writeAsJson("/path/to/home/nodes-test", "/path/to/home/links-test")
```

### ExtractGraph Explained

`ExtractGraph` implements two versions of the PageRank version: 
a dynamic version, which iterates over the graph until scores converge
within a specified convergence value, and a static version which runs
for a fixed number of iterations. The version is specified by the
boolean `dynamic` parameter. The parameters `tolerance` and `numIter`
are optional (the former defaults to 0.001, the latter to 3).

Dynamic PageRank example:
``val graph = ExtractGraph(recs, dynamic = true, tolerance = 0.0001)``

Static:
``val graph = ExtractGraph(recs, dynamic = false, numIter = 4)``

### Understanding Results

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

### Visualizing Results in a Browser with D3.js

We have a built in link visualizer, built in D3.js. This was developed by the amazing team of Alice Ran Zhou (University of Waterloo), Jeremy Wiebe (University of Waterloo), Shane Martin (York University), and Eric Oosenbrug (York University), in part during the [Archives Unleashed hackathon](http://archivesunleashed.ca/). You can see their commit history in [this repository](https://github.com/shamrt/link-structure). 

The D3.js visualizer looks like this:

![Example of the D3.js visualizer](https://raw.githubusercontent.com/web-archive-group/WAHR/master/images/d3js-example.png)

You can find it in `warcbase/vis/link-vis`. This page shows you two things: how you can load in sample data and visualize it, and then how you can replace the sample data with your own.

#### Using Sample Data

To test it out, navigate to the `warcbase/vis/link-vis` directory on your command line. You can then complete the following steps:

1. Create a new directory labelled `data`, which will have the full path of ``warcbase/vis/link-vis/data`. 
2. Copy the `graph.json` file from the [warcbase-resources](https://github.com/lintool/warcbase-resources) directory into `data`.
3. Run `python -m SimpleHTTPServer 4321` from your `warcbase/vis/link-vis` directory.

You can then navigate to [localhost:4321](http://localhost:4321) in your browser.

#### Generating Your Own Data

The visualizer requires your data to be in a particular format. To do so, we use `jq` to combine the NODES and LINKS data as above. [You can download jq here](https://stedolan.github.io/jq/). 

```
$ jq -c -n --slurpfile nodes <(cat nodes/part-*) --slurpfile links \
  <(cat links/part-*) '{nodes: $nodes, links: $links}' > graph.json
```

Replace your old `graph.json` with this new one and you can explore your data in a browser!
