# NER Visualization

The Warcbase Spark _matchbox_ functions in [ExtractEntities](https://github.com/lintool/warcbase/wiki/Spark-Named-Entity-Recognition) list the named entities contained in each page in an archive, but we are often interested in getting a sense of what is contained in a collection as a whole. Visualization can help. We have provided a Javascript visualizer using [D3.js](http://d3js.org/) that produces views of NER data. You can try the visualizer [here](http://jrwiebe.github.io/WAHR/nervis/).

The visualizer can currently produce the following:
* a list view, with frequency of the selected entity type represented by font size (inspired by the [Trading Consequences Location Cloud](http://tcqdev.edina.ac.uk/vis/locationCloud/index.php?com=Sugar) 
![List view](http://jrwiebe.github.io/WAHR/nervis/screenshots/listview.png)
* a standard word cloud for the selected entity type ![Word cloud](http://jrwiebe.github.io/WAHR/nervis/screenshots/wordcloud.png)
* a bubble chart, representing all entity types at once.![Bubble view](http://jrwiebe.github.io/WAHR/nervis/screenshots/bubbleview.png)

## Generating NER Data
The _matchbox_ contains a function in [NERCombinedJson](https://github.com/lintool/warcbase/blob/master/src/main/scala/org/warcbase/spark/matchbox/NERCombinedJson.scala) that will extract NER entities from [plain text records](./Spark-Extracting-Domain-Level-Plain-Text/), summarize them by crawl date, and save the results as a single JSON file. The following script calls the function. Modify the file names in (1) and (2) as appropriate.

```
import org.warcbase.spark.matchbox.NERCombinedJson

sc.addFile("/path/to/english.all.3class.distsim.crf.ser.gz") // (1)

val ner = new NERCombinedJson

ner.classify("english.all.3class.distsim.crf.ser.gz", "hdfs:///path/to/plaintext/", "results.json", sc) // (2)
```

## Setting Up the Visualizer
To use the visualizer with your own data you must place the files from `warcbase/vis/ner` into a folder on a web server. If you wish to serve files locally the Python SimpleHTTPServer is [easy to use](http://www.pythonforbeginners.com/modules-in-python/how-to-use-simplehttpserver/). Because of cross-domain restrictions your web browser will only allow the visualizer to load JSON files from the same server, so place the data file somewhere accessible (local) to the web server.
