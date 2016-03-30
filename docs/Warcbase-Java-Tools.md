Building the URL mapping
------------------------

It's convenient for a variety of tasks to map every URL to a unique integer id. Lucene's FST package provides a nice API for this task.

There are two ways to build the URL mapping, the first of which is via a MapReduce job:

```
$ hadoop jar target/warcbase-0.1.0-SNAPSHOT-fatjar.jar \
    org.warcbase.data.UrlMappingMapReduceBuilder \
    -input /hdfs/path/to/data -output fst.dat
```

The FST data in this case will be written to HDFS. The potential issue with this approach is that building the FST is relatively memory hungry, and cluster memory is sometimes scarce.

The alternative is to build the mapping locally on a machine with sufficient memory. To do this, first run a MapReduce job to extract all the unique URLs:

```
$ hadoop jar target/warcbase-0.1.0-SNAPSHOT-fatjar.jar \
    org.warcbase.analysis.ExtractUniqueUrls \
    -input /hdfs/path/to/data -output urls
```

Now copy the `urls/` directory out of HDFS and then run the following program:

```
$ sh target/appassembler/bin/UrlMappingBuilder -input urls -output fst.dat
```

Where `urls` is the output directory from above and `fst.dat` is the name of the FST data file. We can examine the FST data with the following utility program:

```
# Lookup by URL, fetches the integer id
$ sh target/appassembler/bin/UrlMapping -data fst.dat -getId http://www.foo.com/

# Lookup by id, fetches the URL
$ sh target/appassembler/bin/UrlMapping -data fst.dat -getUrl 42

# Fetches all URLs with the prefix
$ sh target/appassembler/bin/UrlMapping -data fst.dat -getPrefix http://www.foo.com/
```

Now copy the fst.dat file into HDFS for use in the next step:

```
$ hadoop fs -put fst.dat /hdfs/path/
```

Extracting the Webgraph
-----------------------

We can use the mapping data (from above) to extract the webgraph and at the same time map URLs to unique integer ids. This is accomplished by a Hadoop program:

```
$ hadoop jar target/warcbase-0.1.0-SNAPSHOT-fatjar.jar \
    org.warcbase.analysis.graph.ExtractLinksWac \
    -hdfs /hdfs/path/to/data -output output -urlMapping fst.dat
```

Finally, instead of extracting links between individual URLs, we can extract the site-level webgraph by aggregating all URLs with common prefix into a "supernode". Link counts between supernodes represent the total number of links between individual URLs. In order to do this, following input files are needed:

+ a prefix file providing URL prefixes for each supernode (comma-delimited: id, URL prefix);
+ an FST mapping file to map individual URLs to unique integer ids (from above);

Then run this MapReduce program:

```
$ hadoop jar target/warcbase-0.1.0-SNAPSHOT-fatjar.jar \
    org.warcbase.analysis.graph.ExtractSiteLinks \
    -hdfs /hdfs/path/to/data -output output \
    -numReducers 1 -urlMapping fst.dat -prefixFile prefix.csv
```

You'll find site-level webgraph in `output/` on HDFS.
