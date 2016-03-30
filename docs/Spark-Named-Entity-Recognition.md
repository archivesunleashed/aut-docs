# Named Entity Recognition

The following Spark scripts use the [Stanford Named Entity Recognizer](http://nlp.stanford.edu/software/CRF-NER.shtml) to extract names of entities – persons, organizations, and locations – from collections of ARC/WARC files or extracted texts.

The scripts require a NER classifier model. There is one provided in the Stanford NER package (in the `classifiers` folder) called `english.all.3class.distsim.crf.ser.gz`, but you can also use your own.

## Extract entities from ARC/WARC files

```
import org.warcbase.spark.matchbox.ExtractEntities

sc.addFile("/path/to/classifier")

ExtractEntities.extractFromRecords("english.all.3class.distsim.crf.ser.gz", "/path/to/arc/or/warc/files", "output/", sc)
```

Note the call to `addFile()`. This is necessary if you are running this script on a cluster; it puts a copy of the classifier on each worker node. The classifier and input file paths may be local or on the cluster (e.g., `hdfs:///user/joe/collection/`).

The output of this script and the one below will consist of lines that look like this:

```
(20090204,http://greenparty.ca/fr/node/6852?size=display,{"PERSON":["Parti Vert","Paul Maillet","Adam Saab"],
"ORGANIZATION":["GPC Candidate Ottawa Orleans","Contact Cabinet","Accueil Paul Maillet GPC Candidate Ottawa Orleans Original","Circonscriptions Nouvelles Événements Blogues Politiques Contact Mon Compte"],
"LOCATION":["Canada","Canada","Canada","Canada"]})
```

## Extract entities from extracted text
Run this script on texts [already extracted](https://github.com/lintool/warcbase/wiki/Spark-Extracting-Domain-Level-Plain-Text) from an ARC/WARC collection.

```
import org.warcbase.spark.matchbox.ExtractEntities

sc.addFile("/path/to/classifier")

ExtractEntities.extractFromScrapeText("english.all.3class.distsim.crf.ser.gz", "/path/to/extracted/text", "output/", sc)
```
