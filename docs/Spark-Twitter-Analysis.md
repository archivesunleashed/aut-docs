# Twitter Analysis

AUT also supports parsing and analysis of large volumes of Twitter JSON. This allows you to work with social media and web archiving together on one platform. We are currently in active development. If you have any suggestions or want more features, feel free to pitch in at [our AUT repository](https://github.com/archivesunleashed/aut).

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

Functionality is similar to other parts of AUT, but note that you use `loadTweets` rather than `loadArchives`. 

## Basic Twitter Analysis

With the ensuing JSON file (or directory of JSON files), you can use the following scripts. Here we're using the "top ten", but you can always save all of the results to a text file if you desire.

### An Example script, annotated

```scala
import io.archivesunleashed.spark.matchbox._
import io.archivesunleashed.spark.matchbox.TweetUtils._
import io.archivesunleashed.spark.rdd.RecordRDD._

// Load tweets from HDFS
val tweets = RecordLoader.loadTweets("/path/to/tweets", sc)

// Count them
tweets.count()

// Extract some fields
val r = tweets.map(tweet => (tweet.id, tweet.createdAt, tweet.username, tweet.text, tweet.lang,
                             tweet.isVerifiedUser, tweet.followerCount, tweet.friendCount))

// Take a sample of 10 on console
r.take(10)

// Count the different number of languages
val s = tweets.map(tweet => tweet.lang).countItems().collect()

// Count the number of hashtags
// (Note we don't 'collect' here because it's too much data to bring into the shell)
val hashtags = tweets.map(tweet => tweet.text)
                     .filter(text => text != null)
                     .flatMap(text => {"""#[^ ]+""".r.findAllIn(text).toList})
                     .countItems()

// Take the top 10 hashtags
hashtags.take(10)
```

The above script does the following:

* loads the tweets; 
* counts them; 
* extracts specific fields based on the Twitter JSON; 
* Samples them; 
* counts languages; 
* and counts and lets you know the top 10 hashtags in a collection. 

### Parsing a Specific Field

For example, a user may want to parse a specific field. Here we explore the `created_at` field. 

```scala
import io.archivesunleashed.spark.matchbox._
import io.archivesunleashed.spark.matchbox.TweetUtils._
import io.archivesunleashed.spark.rdd.RecordRDD._
import java.text.SimpleDateFormat
import java.util.TimeZone

val tweets = RecordLoader.loadTweets("/shared/uwaterloo/uroc2017/tweets-2016-11", sc)

val counts = tweets.map(tweet => tweet.createdAt)
  .mapPartitions(iter => {
      TimeZone.setDefault(TimeZone.getTimeZone("UTC"))
      val dateIn = new SimpleDateFormat("EEE MMM dd HH:mm:ss ZZZZZ yyyy")
      val dateOut = new SimpleDateFormat("yyyy-MM-dd")
    iter.map(d => try { dateOut.format(dateIn.parse(d)) } catch { case e: Exception => null })})
  .filter(d => d != null)
  .countItems()
  .sortByKey()
  .collect()
```

The next example takes the parsed `created_at` field with some of the earlier elements to see how often the user @HillaryClinton (or any other user) was mentioned in a corpus.

```scala
import io.archivesunleashed.spark.matchbox._
import io.archivesunleashed.spark.matchbox.TweetUtils._
import io.archivesunleashed.spark.rdd.RecordRDD._
import java.text.SimpleDateFormat
import java.util.TimeZone

val tweets = RecordLoader.loadTweets("/shared/uwaterloo/uroc2017/tweets-2016-11/", sc)

val clintonCounts = tweets
  .filter(tweet => tweet.text != null && tweet.text.contains("@HillaryClinton"))
  .map(tweet => tweet.createdAt)
  .mapPartitions(iter => {
      TimeZone.setDefault(TimeZone.getTimeZone("UTC"))
      val dateIn = new SimpleDateFormat("EEE MMM dd HH:mm:ss ZZZZZ yyyy")
      val dateOut = new SimpleDateFormat("yyyy-MM-dd")
    iter.map(d => try { dateOut.format(dateIn.parse(d)) } catch { case e: Exception => null })})
  .filter(d => d != null)
  .countItems()
  .sortByKey()
  .collect()
```

## Parsing JSON

What if you want to do more and access more data inside tweets?
Tweets are just JSON objects, see examples
[here](https://gist.github.com/hrp/900964) and
[here](https://gist.github.com/gnip/764239).  Twitter has [detailed
API documentation](https://dev.twitter.com/overview/api/tweets) that
tells you what all the fields mean.

The Archives Unleashed Toolkit internally uses
[json4s](https://github.com/json4s/json4s) to access fields in
JSON. You can manipulate fields directly to access any part of tweets.
Here are some examples:

```scala
import org.json4s._
import org.json4s.jackson.JsonMethods._

val sampleTweet = """  [insert tweet in JSON format here] """
val json = parse(sampleTweet)
```

The you can do something like:

```scala
implicit lazy val formats = org.json4s.DefaultFormats

// Extract id
(json \ "id_str").extract[String]

// Extract created_at
(json \ "created_at").extract[String]
```

## Acknowledgements

These tutorials are adapted from Jimmy Lin's [UROC 2017](https://github.com/lintool/UROC-projects/blob/master/UROC2017/README.md) project.