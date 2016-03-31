# Twitter Analysis

Warcbase also supports parsing and analysis of large volumes of Twitter JSON. This allows you to work with social media and web archiving together on one platform. 

## Gathering Twitter JSON

To gather Twitter JSON, you will need to use the Twitter API to gather information. We recommend [twarc](https://github.com/edsu/twarc), a "command line tool (and Python library) for archiving Twitter JSON." Nick Ruest and Ian Milligan wrote an open-access article on using twarc to archive an ongoing event, which [you can read here](https://github.com/web-archive-group/ELXN42-Article/blob/master/elxn42.md). 

For example, with twarc, you could begin using the searching API (stretching back somewhere between six and nine days) on the #elxn42 hashtag with:

```
twarc.py --search "#elxn42" > elxn42-search.json
```

Or you could use the streaming API with:

```
twarc.py --stream "#elxn42" > elxn42-stream.json
```

Functionality is similar to other parts of warcbase, but not that you use `loadTweets` rather than `loadArchives`. 

## Basic Twitter Analysis

With the ensuing JSON file, you can use the following scripts. Here we're using the "top ten", but you can always save all of the results to a text file if you desire.

### Top Ten Tweeted URLs

If you want the top 10 tweeted (shortened) URLs:

```
import org.warcbase.spark.matchbox._
import org.warcbase.spark.matchbox.TweetUtils._
import org.warcbase.spark.rdd.RecordRDD._

val tweets =
RecordLoader.loadTweets("path/to/elxn42-search.json",
sc)
val r = tweets.flatMap(tweet => {"""http://[^ ]+""".r.findAllIn(tweet.text).toList})
          .countItems()
          .take(10)
```

### Top Ten Languages

If you want the top 10 languages:

```
import org.warcbase.spark.matchbox._
import org.warcbase.spark.matchbox.TweetUtils._
import org.warcbase.spark.rdd.RecordRDD._

val tweets =
RecordLoader.loadTweets("/mnt/vol1/data_sets/elxn42/ruest-white/elxn42-tweets-combined-deduplicated.json",
sc)

val lang =
  tweets.map(tweet => tweet.lang)
    .countItems()
    .take(10)
```

### Top Ten Hashtags

If you want the top 10 hashtags:

```
import org.warcbase.spark.matchbox._
import org.warcbase.spark.matchbox.TweetUtils._
import org.warcbase.spark.rdd.RecordRDD._

val tweets = 
RecordLoader.loadTweets("/mnt/vol1/data_sets/elxn42/ruest-white/elxn42-tweets-combined-deduplicated.json", 
sc)
val r = tweets.flatMap(tweet => {"""#[^ ]+""".r.findAllIn(tweet.text).toList})
          .countItems()
          .take(10)
```

### Top Ten Images

If you want the top 10 tweeted images:
```
import org.warcbase.spark.matchbox._
import org.warcbase.spark.matchbox.TweetUtils._
import org.warcbase.spark.rdd.RecordRDD._
import org.json4s._
import org.json4s.jackson.JsonMethods._

val tweets = RecordLoader.loadTweets("/mnt/vol1/data_sets/elxn42/ruest-white/elxn42-tweets-combined-deduplicated.json", sc)

val counts = tweets.flatMap(tweet => tweet \\ "media_url_https" \ classOf[JString] )
    .countItems()
    .take(10)
```
    

Stay tuned for more functionality, including in-browser Spark Notebook Twitter visualization.
