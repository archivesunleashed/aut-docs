# Using the Archives Unleashed Toolkit at Scale

As your collections grow, you may need to provide more resources, and adjust Apache Spark configuration options. Apache Spark has a great [Configuration](https://spark.apache.org/docs/latest/configuration.html), and [Tuning](https://spark.apache.org/docs/latest/tuning.html) guides that are worth checking out. If you're not sure where to start with scaling, join us in [Slack](slack.archivesunleashed.org) in the `#aut` channel, and we might be able to provide some guidance.

- [A Note on Memory and Cores](#A-Note-on-Memory-and-Cores)
- [Reading Data from AWS S3](#Reading-Data-from-AWS-S3)

## A Note on Memory and Cores

As your datasets grow, you may need to provide more memory to Apache Spark. You'll know this if you get an error saying that you have run out of "Java Heap Space."

You can add a [configuration](https://spark.apache.org/docs/latest/configuration.html) option for adjusting available memory like so:

```shell
$ spark-shell --driver-memory 4G --packages "io.archivesunleashed:aut:0.18.1-SNAPSHOT"
```

In the above case, you give Apache Spark 4GB of memory to execute the program.

In some other cases, despite giving AUT sufficient memory, you may still encounter Java Heap Space issues. In those cases, it is worth trying to lower the number of worker threads. When running locally (i.e. on a single laptop, desktop, or server), by default AUT runs a number of threads equivalent to the number of cores in your machine.

On a 16-core machine, you may want to drop to 12 cores if you are having memory issues. This will increase stability but decrease performance a bit.

You can do so like this (example is using 12 threads on a 16-core machine):

```shell
$ spark-shell --master local[12] --driver-memory 4G --packages "io.archivesunleashed:aut:0.18.1-SNAPSHOT"
```

If you continue to have errors, look at your output and logs. They will usually point you in the right direction. For instance, you may also need to increase the network timeout value. Once in a while, AUT might get stuck on an odd record and take longer than normal to process it. The `--conf spark.network.timeout=10000000` will ensure that AUT continues to work on material, although it may take a while to process. This command then works:

```shell
$ spark-shell --master local[12] --driver-memory 90G --conf spark.network.timeout=10000000 --packages "io.archivesunleashed:aut:0.18.1-SNAPSHOT"
```

## Reading Data from AWS S3

We also support loading data stored in [Amazon S3](https://aws.amazon.com/s3/). This advanced functionality requires that you provide Spark shell with your AWS Access Key and AWS Secret Key, which you will get when creating your AWS credentials ([read more here](https://aws.amazon.com/blogs/security/wheres-my-secret-access-key/)).

This script, for example, will find the top ten domains from a set of WARCs found in an s3 bucket.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

sc.hadoopConfiguration.set("fs.s3a.access.key", "<my-access-key>")
sc.hadoopConfiguration.set("fs.s3a.secret.key", "<my-secret-key>")

RecordLoader.loadArchives("s3a://<my-bucket>/*.gz", sc)
  .keepValidPages()
  .map(r => ExtractDomainRDD(r.getUrl))
  .countItems()
  .take(10)
```

### Reading Data from a S3-like Endpoint

We also support loading data stored in an Amazon S3-like system such as [Ceph RADOS](https://docs.ceph.com/docs/master/rados/). Similar to the above example, you'll need an access key and secret, and additionally you'll need to define your endpoint.

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

sc.hadoopConfiguration.set("fs.s3a.access.key", "<my-access-key>")
sc.hadoopConfiguration.set("fs.s3a.secret.key", "<my-secret-key>")
sc.hadoopConfiguration.set("fs.s3a.endpoint", "<my-end-point>")

RecordLoader.loadArchives("s3a://<my-bucket>/*.gz", sc)
  .keepValidPages()
  .map(r => ExtractDomainRDD(r.getUrl))
  .countItems()
  .take(10)
```

### Troubleshooting S3 

If you run into this `AmazonHttpClient` timeout error:

```
19/10/24 11:12:51 INFO AmazonHttpClient: Unable to execute HTTP request: Timeout waiting for connection from pool
org.apache.http.conn.ConnectionPoolTimeoutException: Timeout waiting for connection from pool
  at org.apache.http.impl.conn.PoolingClientConnectionManager.leaseConnection(PoolingClientConnectionManager.java:231)
  at org.apache.http.impl.conn.PoolingClientConnectionManager$1.getConnection(PoolingClientConnectionManager.java:200)
  at sun.reflect.GeneratedMethodAccessor7.invoke(Unknown Source)
  at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
  at java.lang.reflect.Method.invoke(Method.java:498)
  at com.amazonaws.http.conn.ClientConnectionRequestFactory$Handler.invoke(ClientConnectionRequestFactory.java:70)
```

You can add the following two configuration lines to your script:

```scala
sc.hadoopConfiguration.set("fs.s3a.impl", "org.apache.hadoop.fs.s3a.S3AFileSystem")
sc.hadoopConfiguration.setInt("fs.s3a.connection.maximum", 100)
```
