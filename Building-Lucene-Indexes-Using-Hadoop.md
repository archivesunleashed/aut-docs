Warcbase integrates with the UK web archive's [WARC indexer](https://github.com/ukwa/webarchive-discovery) and Hadoop-related tools to build Lucene indexes using Hadoop. The command-line invocation is as follows:

```
hadoop jar target/warcbase-0.1.0-SNAPSHOT-fatjar.jar org.warcbase.index.IndexerRunner \
  -input cpp-all-files.txt -index cpp-all-index -numShards 200
```

The file specified by `-input` is a file on local disk that lists the WARC and ARC files to be indexed. It should be a plain-text file, one (W)ARC file per line, something like:

```
/collections/webarchives/CanadianPoliticalParties/arc/227-20051004191331-00000-crawling015.archive.org.arc.gz
/collections/webarchives/CanadianPoliticalParties/arc/227-20051004192151-00001-crawling015.archive.org.arc.gz
/collections/webarchives/CanadianPoliticalParties/arc/227-20051004192747-00002-crawling015.archive.org.arc.gz
...
```

The option `-index` specifies the location on HDFS where the index will be built. The option `-numShards` specifies the number of shards. Indexing speed is affected by the number of shards: the more shards, the more parallelization, hence faster. But the downside is that you'll have to do shard merging later (more below). Another issue to consider is memory usage: too few shards, the shards get too big, and you'll run out of memory in your reducers.

After the job completes, in `cpp-all-index/' on HDFS, you'll see 200 sub-directories, one for each shard. If you want to use Shine to search these indexes, the next thing we have to do is to merge all the shards into one unified index.

To merge the shards, you'll need to copy the shards out of HDFS, and then use the following Lucene tool:

```
java -cp lucene-core-4.7.2.jar:lucene-misc-4.7.2.jar \
  org.apache.lucene.misc.IndexMergeTool [merged-index] [shard1] [shard2] ...
```

You can get the above jars from Maven central:
[`lucene-core-4.7.2.jar`](http://search.maven.org/remotecontent?filepath=org/apache/lucene/lucene-core/4.7.2/lucene-core-4.7.2.jar) and
[`lucene-misc-4.7.2.jar`](http://search.maven.org/remotecontent?filepath=org/apache/lucene/lucene-misc/4.7.2/lucene-misc-4.7.2.jar)

You might want to write a simple script to generate the right command. In the case of the index above, the complete merging command is:

```
nohup java -cp lucene-core-4.7.2.jar:lucene-misc-4.7.2.jar org.apache.lucene.misc.IndexMergeTool cpp-index \
  shard1/data/index shard2/data/index shard3/data/index shard4/data/index shard5/data/index \
  shard6/data/index shard7/data/index shard8/data/index shard9/data/index shard10/data/index \
  shard11/data/index shard12/data/index shard13/data/index shard14/data/index shard15/data/index \
  shard16/data/index shard17/data/index shard18/data/index shard19/data/index shard20/data/index \
  shard21/data/index shard22/data/index shard23/data/index shard24/data/index shard25/data/index \
  shard26/data/index shard27/data/index shard28/data/index shard29/data/index shard30/data/index \
  shard31/data/index shard32/data/index shard33/data/index shard34/data/index shard35/data/index \
  shard36/data/index shard37/data/index shard38/data/index shard39/data/index shard40/data/index \
  shard41/data/index shard42/data/index shard43/data/index shard44/data/index shard45/data/index \
  shard46/data/index shard47/data/index shard48/data/index shard49/data/index shard50/data/index \
  shard51/data/index shard52/data/index shard53/data/index shard54/data/index shard55/data/index \
  shard56/data/index shard57/data/index shard58/data/index shard59/data/index shard60/data/index \
  shard61/data/index shard62/data/index shard63/data/index shard64/data/index shard65/data/index \
  shard66/data/index shard67/data/index shard68/data/index shard69/data/index shard70/data/index \
  shard71/data/index shard72/data/index shard73/data/index shard74/data/index shard75/data/index \
  shard76/data/index shard77/data/index shard78/data/index shard79/data/index shard80/data/index \
  shard81/data/index shard82/data/index shard83/data/index shard84/data/index shard85/data/index \
  shard86/data/index shard87/data/index shard88/data/index shard89/data/index shard90/data/index \
  shard91/data/index shard92/data/index shard93/data/index shard94/data/index shard95/data/index \
  shard96/data/index shard97/data/index shard98/data/index shard99/data/index shard100/data/index \
  shard101/data/index shard102/data/index shard103/data/index shard104/data/index shard105/data/index \
  shard106/data/index shard107/data/index shard108/data/index shard109/data/index shard110/data/index \
  shard111/data/index shard112/data/index shard113/data/index shard114/data/index shard115/data/index \
  shard116/data/index shard117/data/index shard118/data/index shard119/data/index shard120/data/index \
  shard121/data/index shard122/data/index shard123/data/index shard124/data/index shard125/data/index \
  shard126/data/index shard127/data/index shard128/data/index shard129/data/index shard130/data/index \
  shard131/data/index shard132/data/index shard133/data/index shard134/data/index shard135/data/index \
  shard136/data/index shard137/data/index shard138/data/index shard139/data/index shard140/data/index \
  shard141/data/index shard142/data/index shard143/data/index shard144/data/index shard145/data/index \
  shard146/data/index shard147/data/index shard148/data/index shard149/data/index shard150/data/index \
  shard151/data/index shard152/data/index shard153/data/index shard154/data/index shard155/data/index \
  shard156/data/index shard157/data/index shard158/data/index shard159/data/index shard160/data/index \
  shard161/data/index shard162/data/index shard163/data/index shard164/data/index shard165/data/index \
  shard166/data/index shard167/data/index shard168/data/index shard169/data/index shard170/data/index \
  shard171/data/index shard172/data/index shard173/data/index shard174/data/index shard175/data/index \
  shard176/data/index shard177/data/index shard178/data/index shard179/data/index shard180/data/index \
  shard181/data/index shard182/data/index shard183/data/index shard184/data/index shard185/data/index \
  shard186/data/index shard187/data/index shard188/data/index shard189/data/index shard190/data/index \
  shard191/data/index shard192/data/index shard193/data/index shard194/data/index shard195/data/index \
  shard196/data/index shard197/data/index shard198/data/index shard199/data/index shard200/data/index >& log.txt &
```
