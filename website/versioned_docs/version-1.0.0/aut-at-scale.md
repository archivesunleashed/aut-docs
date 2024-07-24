---
id: version-1.0.0-aut-at-scale
title: The Toolkit at Scale
original_id: aut-at-scale
---

As your collections grow, you may need to provide more resources, and adjust
Apache Spark configuration options. Apache Spark has great
[Configuration](https://spark.apache.org/docs/latest/configuration.html) and
[Tuning](https://spark.apache.org/docs/latest/tuning.html) guides that are
worth checking out. If you're not sure where to start with scaling, join us in
[Slack](slack.archivesunleashed.org) in the `#aut` channel, and we might be
able to provide some guidance.

## A Note on Memory and Cores

As your datasets grow, you may need to provide more memory to Apache Spark.
You'll know this if you get an error saying that you have run out of "Java Heap
Space."

You can add a
[configuration](https://spark.apache.org/docs/latest/configuration.html) option
for adjusting available memory like so:

```shell
spark-shell --driver-memory 4G --jars /path/to/aut-1.0.0-fatjar.jar
```

In the above case, you give Apache Spark 4GB of memory to execute the program.

In some other cases, despite giving AUT sufficient memory, you may still
encounter Java Heap Space issues. In those cases, it is worth trying to lower
the number of worker threads. When running locally (i.e. on a single laptop,
desktop, or server), by default AUT runs a number of threads equivalent to the
number of cores in your machine.

On a 16-core machine, you may want to drop to 12 cores if you are having memory
issues. This will increase stability but decrease performance a bit.

You can do so like this (the example is using 12 threads on a 16-core machine):

```shell
spark-shell --master local[12] --driver-memory 4G --jars /path/to/aut-1.0.0-fatjar.jar
```

If you continue to have errors, look at your output and logs. They will usually
point you in the right direction. For instance, you may also need to increase
the network timeout value. Once in a while, AUT might get stuck on an odd
record and take longer than normal to process it. The `--conf
spark.network.timeout=10000000` will ensure that AUT continues to work on
material, although it may take a while to process. This command then works:

```shell
spark-shell --master local[12] --driver-memory 90G --conf spark.network.timeout=10000000 --jars /path/to/aut-1.0.0-fatjar.jar
```
