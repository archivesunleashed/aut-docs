---
id: version-1.1.0-binary-analysis
title: Binary Analysis
original_id: binary-analysis
---

## Extract Audio Information

### Scala RDD

**Will not be implemented.**

### Scala DF

The following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).audio();

df.show()
```

Will extract all following information from audio files in a web collection:

- crawl date
- audio url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|            filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|               bytes|
+--------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|20091027143347|http://geocities....|Record_of_Lodoss_...|      wav|         audio/x-wav|audio/vnd.wave|3be1b99dc30a16002...|755c864ecd1a21cd1...|UklGRp66EQBXQVZFZ...|
|20091027143400|http://www.geocit...|hesseman19681215.mp3|      mp3|          audio/mpeg|    audio/mpeg|02f5d231e2859dd8f...|26c6b3a6764b4d4a3...|SUQzAwAAAAAPdgAAA...|
|20091027143409|http://geocities....|Record_of_Lodoss_...|      wav|         audio/x-wav|audio/vnd.wave|42900e5fb354a35a8...|ceca9e52d2733efea...|UklGRsYhCABXQVZFZ...|
|20091027143417|http://www.geocit...|       freiheit1.mp3|      mp3|          audio/mpeg|    audio/mpeg|626a23b1d3e333744...|05ac9b809ff333350...|SUQzAwAAAAAPdgAAA...|
|20091027143511|http://geocities....|        locomotn.mid|      mid|          audio/midi|    audio/midi|a77c3c9318ed24c36...|2741bd99117a93aec...|TVRoZAAAAAYAAQARA...|
|20091027143510|http://geocities....|              do.mp3|      mp3|          audio/mpeg|    audio/mpeg|4b1b503f55ab53cb4...|312480c4376933802...|SUQzAwAAAAAKblRSQ...|
|20091027143503|http://www.geocit...|        cuznite1.mp3|      mp3|          audio/mpeg|    audio/mpeg|2968833f5681d2eef...|76a1cdf1b5fe9420f...|SUQzAwAAAAAPdgAAA...|
|20091027143525|http://geocities....| thankyou_alanis.mid|      mid|          audio/midi|    audio/midi|91582855a125a966d...|b2485702a97a895f1...|TVRoZAAAAAYAAAABA...|
|20091027143538|http://geocities....|   evenou-chalom.mid|      mid|          audio/midi|    audio/midi|21ff842e892b29ed0...|8fd74371e3d9d9153...|TVRoZAAAAAYAAQAJA...|
|20091027143540|http://geocities....|         artbell.mid|      mid|          audio/midi|    audio/midi|47ba50801e05539bd...|a2dc5a8c69a9b8093...|TVRoZAAAAAYAAQAHA...|
|20091027143540|http://geocities....|        smells_l.mid|      mid|          audio/midi|    audio/midi|eaa1fdb23ddc3ee59...|4e2246653b45ada4b...|TVRoZAAAAAYAAQALA...|
|20091027143545|http://geocities....|           zilla.mid|      mid|          audio/midi|    audio/midi|3e8f26494d9a419a7...|57c659f2a0e3f7dfa...|TVRoZAAAAAYAAQAHA...|
|20091027143549|http://geocities....|    steppinstone.mid|      mid|          audio/midi|    audio/midi|c4af1b53c1c771ac7...|a57824478e6d47890...|TVRoZAAAAAYAAQAKA...|
|20091027143550|http://www.geocit...|          keeper.mid|      mid|          audio/midi|    audio/midi|fb716dcc69c961ce5...|b3184665624e56d47...|TVRoZAAAAAYAAQANA...|
|20091027143544|http://www.geocit...|          Mitch1.mp3|      mp3|          audio/mpeg|    audio/mpeg|623cff3b9fadb6806...|308d602a59bbcceb0...|SUQzAwAAAAAPdgAAA...|
|20091027143551|http://geocities....|         crtrain.mid|      mid|          audio/midi|    audio/midi|e5b3d0beaaccdb9fb...|2cb900be2c1a55b28...|TVRoZAAAAAYAAQAOA...|
|20091027143545|http://www.geocit...|HolesIntheFloorof...|      wav|         audio/x-wav|audio/vnd.wave|9fa3ba05fd792d7a6...|3091423a09e0490cf...|UklGRr7CCABXQVZFZ...|
|20091027143553|http://geocities....|       surfinusa.mid|      mid|          audio/midi|    audio/midi|2ae9ed3e1c0070ba1...|9b85fe1a9a460fee0...|TVRoZAAAAAYAAQALA...|
|20091027143557|http://geocities....|        djdelite.mid|      mid|          audio/midi|    audio/midi|9fdacbdc6cb625456...|aa40eb1b55fdb995f...|TVRoZAAAAAYAAAABA...|
|20091027143539|http://geocities....|            slow.mp3|      mp3|          audio/mpeg|    audio/mpeg|13e9fa816a1aafb58...|17c16e2470a1f2bfb...|SUQzAwAAAAAHdkdFT...|
+--------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
```

If you wanted to work with all the audio files in a collection, you could
extract them with the following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).audio();

df.select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/export/directory/your-preferred-filename-prefix", $"extension")
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.audio()
df.show()
```

Will extract all following information from audio files in a web collection:

- crawl date
- audio url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|            filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|               bytes|
+--------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|20091027143347|http://geocities....|Record_of_Lodoss_...|      wav|         audio/x-wav|audio/vnd.wave|3be1b99dc30a16002...|755c864ecd1a21cd1...|UklGRp66EQBXQVZFZ...|
|20091027143400|http://www.geocit...|hesseman19681215.mp3|      mp3|          audio/mpeg|    audio/mpeg|02f5d231e2859dd8f...|26c6b3a6764b4d4a3...|SUQzAwAAAAAPdgAAA...|
|20091027143409|http://geocities....|Record_of_Lodoss_...|      wav|         audio/x-wav|audio/vnd.wave|42900e5fb354a35a8...|ceca9e52d2733efea...|UklGRsYhCABXQVZFZ...|
|20091027143417|http://www.geocit...|       freiheit1.mp3|      mp3|          audio/mpeg|    audio/mpeg|626a23b1d3e333744...|05ac9b809ff333350...|SUQzAwAAAAAPdgAAA...|
|20091027143511|http://geocities....|        locomotn.mid|      mid|          audio/midi|    audio/midi|a77c3c9318ed24c36...|2741bd99117a93aec...|TVRoZAAAAAYAAQARA...|
|20091027143510|http://geocities....|              do.mp3|      mp3|          audio/mpeg|    audio/mpeg|4b1b503f55ab53cb4...|312480c4376933802...|SUQzAwAAAAAKblRSQ...|
|20091027143503|http://www.geocit...|        cuznite1.mp3|      mp3|          audio/mpeg|    audio/mpeg|2968833f5681d2eef...|76a1cdf1b5fe9420f...|SUQzAwAAAAAPdgAAA...|
|20091027143525|http://geocities....| thankyou_alanis.mid|      mid|          audio/midi|    audio/midi|91582855a125a966d...|b2485702a97a895f1...|TVRoZAAAAAYAAAABA...|
|20091027143538|http://geocities....|   evenou-chalom.mid|      mid|          audio/midi|    audio/midi|21ff842e892b29ed0...|8fd74371e3d9d9153...|TVRoZAAAAAYAAQAJA...|
|20091027143540|http://geocities....|         artbell.mid|      mid|          audio/midi|    audio/midi|47ba50801e05539bd...|a2dc5a8c69a9b8093...|TVRoZAAAAAYAAQAHA...|
|20091027143540|http://geocities....|        smells_l.mid|      mid|          audio/midi|    audio/midi|eaa1fdb23ddc3ee59...|4e2246653b45ada4b...|TVRoZAAAAAYAAQALA...|
|20091027143545|http://geocities....|           zilla.mid|      mid|          audio/midi|    audio/midi|3e8f26494d9a419a7...|57c659f2a0e3f7dfa...|TVRoZAAAAAYAAQAHA...|
|20091027143549|http://geocities....|    steppinstone.mid|      mid|          audio/midi|    audio/midi|c4af1b53c1c771ac7...|a57824478e6d47890...|TVRoZAAAAAYAAQAKA...|
|20091027143550|http://www.geocit...|          keeper.mid|      mid|          audio/midi|    audio/midi|fb716dcc69c961ce5...|b3184665624e56d47...|TVRoZAAAAAYAAQANA...|
|20091027143544|http://www.geocit...|          Mitch1.mp3|      mp3|          audio/mpeg|    audio/mpeg|623cff3b9fadb6806...|308d602a59bbcceb0...|SUQzAwAAAAAPdgAAA...|
|20091027143551|http://geocities....|         crtrain.mid|      mid|          audio/midi|    audio/midi|e5b3d0beaaccdb9fb...|2cb900be2c1a55b28...|TVRoZAAAAAYAAQAOA...|
|20091027143545|http://www.geocit...|HolesIntheFloorof...|      wav|         audio/x-wav|audio/vnd.wave|9fa3ba05fd792d7a6...|3091423a09e0490cf...|UklGRr7CCABXQVZFZ...|
|20091027143553|http://geocities....|       surfinusa.mid|      mid|          audio/midi|    audio/midi|2ae9ed3e1c0070ba1...|9b85fe1a9a460fee0...|TVRoZAAAAAYAAQALA...|
|20091027143557|http://geocities....|        djdelite.mid|      mid|          audio/midi|    audio/midi|9fdacbdc6cb625456...|aa40eb1b55fdb995f...|TVRoZAAAAAYAAAABA...|
|20091027143539|http://geocities....|            slow.mp3|      mp3|          audio/mpeg|    audio/mpeg|13e9fa816a1aafb58...|17c16e2470a1f2bfb...|SUQzAwAAAAAHdkdFT...|
+--------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
```

## Extract Image Information

### Scala RDD

**Will not be implemented.**

### Scala DF

The following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).images();

df.show()
```

Will extract all following information from images in a web collection:

- crawl date
- image url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- Width
- Height
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------+--------------------+--------------------+---------+--------------------+--------------+-----+------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|            filename|extension|mime_type_web_server|mime_type_tika|width|height|                 md5|                sha1|               bytes|
+--------------+--------------------+--------------------+---------+--------------------+--------------+-----+------+--------------------+--------------------+--------------------+
|20091027143351|http://geocities....|      flag_small.jpg|      jpg|          image/jpeg|    image/jpeg|   67|   100|e5017e41557b625a3...|ef47cb633641fe91e...|/9j/4AAQSkZJRgABA...|
|20091027143350|http://www.geocit...|   ncmazzeogirls.jpg|      jpg|          image/jpeg|    image/jpeg|  688|   496|94f899cff69f47020...|069e7e5cf18bee85e...|/9j/4AAQSkZJRgABA...|
|20091027143350|http://geocities....|           img42.jpg|      jpg|          image/jpeg|    image/jpeg|  320|   240|1b5b5fba6ef78a440...|26a3f369097b37282...|/9j/4AAQSkZJRgABA...|
|20091027143351|http://geocities....| neuroticevietro.gif|      gif|           image/gif|     image/gif|  130|   236|9b47826988a0ed476...|abcd08eb4afaf1edf...|R0lGODlhggDsAPf/A...|
|20091027143351|http://geocities....|            legz.gif|      gif|           image/gif|     image/gif|   22|    47|72ca62e8e29a62c03...|142db323266090918...|R0lGODlhFgAvAPMAA...|
|20091027143351|http://geocities....|thumbbuffynightma...|      jpg|          image/jpeg|    image/jpeg|   56|    74|e7630c4a59c5ca94c...|7ea611e40d74d65eb...|/9j/4AAQSkZJRgABA...|
|20091027143351|http://www.geocit...|             sea.gif|      gif|           image/gif|     image/gif|  130|   130|84d589f3f4e60a685...|8bfd3bf9efe4b0e76...|R0lGODlhggCCANX/A...|
|20091027143351|http://www.geocit...|          llmc10.jpg|      jpg|          image/jpeg|    image/jpeg|   25|    25|d559d964408bbcc6c...|1d03fd7b1bdc4f380...|/9j/4AAQSkZJRgABA...|
|20091027143350|http://geocities....|    LIBMystBttl3.gif|      gif|           image/gif|     image/gif|  184|   214|9d543c8af39c2b384...|2e427925d08123a3c...|R0lGODlhuADWAOYAA...|
|20091027143351|http://geocities....|         pic208s.jpg|      jpg|          image/jpeg|    image/jpeg|   60|    70|81608e1c633a88142...|804575eaf85a5025e...|/9j/4AAQSkZJRgABA...|
|20091027143351|http://www.geocit...|             nyy.gif|      gif|           image/gif|     image/gif|  130|   130|13d593a582e6bc84d...|ce73094e346fcd78e...|R0lGODlhggCCANX/A...|
|20091027143351|http://www.geocit...|    sm_hayride67.jpg|      jpg|          image/jpeg|    image/jpeg|  200|   150|a801fd64f3b8f683e...|7fb064717ce7e8948...|/9j/4AAQSkZJRgABA...|
|20091027143351|http://geocities....|           white.gif|      gif|           image/gif|     image/gif|   14|    14|300347136c9189646...|33c14c6be919115a4...|R0lGODlhDgAOAIQAA...|
|20091027143351|http://geocities....|      GlasPlyPic.jpg|      jpg|          image/jpeg|    image/jpeg|  419|   285|357dc7a0dd213cb56...|5648b4ddbb091874b...|/9j/4AAQSkZJRgABA...|
|20091027143351|http://www.geocit...|    Burstani81C4.gif|      gif|           image/gif|     image/gif|  462|    18|8959ff83dea984dd9...|09a5cc8340e466552...|R0lGODlhzgESAIcAA...|
|20091027143351|http://geocities....|       quickstop.jpg|      jpg|          image/jpeg|    image/jpeg|  320|   240|ef2d2d0d9161c060d...|344e8ff7c4adcb339...|/9j/4AAQSkZJRgABA...|
|20091027143352|http://geocities....|  pinkbuffythumb.jpg|      jpg|          image/jpeg|    image/jpeg|   23|    74|c3a22101ef7940ffb...|1d5f8537f4451056c...|/9j/4AAQSkZJRgABA...|
|20091027143351|http://geocities....|        PICT0050.JPG|      jpg|          image/jpeg|    image/jpeg|  448|   336|5c42b790adf7efaca...|cb4a3ac3ddcb36f74...|/9j/4AAQSkZJRgABA...|
|20091027143352|http://www.geocit...|           llmc6.jpg|      jpg|          image/jpeg|    image/jpeg|   25|    25|5af77dfbfd8ad6924...|581e720061c5e1d61...|/9j/4AAQSkZJRgABA...|
|20091027143348|http://geocities....|mehandface_collag...|      jpg|          image/jpeg|    image/jpeg| 1600|  1200|60c142bdb0018c5e5...|ae250210ddc5a35d9...|/9j/4AAQSkZJRgABA...|
+--------------+--------------------+--------------------+---------+--------------------+--------------+-----+------+--------------------+--------------------+--------------------+
```

If you wanted to work with all the images in a collection, you could extract
them with the following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).images();

df.select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/export/directory/your-preferred-filename-prefix", $"extension")
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.images()
df.show()
```

Will extract all following information from images in a web collection:

- crawl date
- image url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- Width
- Height
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------+--------------------+--------------------+---------+--------------------+--------------+-----+------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|            filename|extension|mime_type_web_server|mime_type_tika|width|height|                 md5|                sha1|               bytes|
+--------------+--------------------+--------------------+---------+--------------------+--------------+-----+------+--------------------+--------------------+--------------------+
|20091027143351|http://geocities....|      flag_small.jpg|      jpg|          image/jpeg|    image/jpeg|   67|   100|e5017e41557b625a3...|ef47cb633641fe91e...|/9j/4AAQSkZJRgABA...|
|20091027143350|http://www.geocit...|   ncmazzeogirls.jpg|      jpg|          image/jpeg|    image/jpeg|  688|   496|94f899cff69f47020...|069e7e5cf18bee85e...|/9j/4AAQSkZJRgABA...|
|20091027143350|http://geocities....|           img42.jpg|      jpg|          image/jpeg|    image/jpeg|  320|   240|1b5b5fba6ef78a440...|26a3f369097b37282...|/9j/4AAQSkZJRgABA...|
|20091027143351|http://geocities....| neuroticevietro.gif|      gif|           image/gif|     image/gif|  130|   236|9b47826988a0ed476...|abcd08eb4afaf1edf...|R0lGODlhggDsAPf/A...|
|20091027143351|http://geocities....|            legz.gif|      gif|           image/gif|     image/gif|   22|    47|72ca62e8e29a62c03...|142db323266090918...|R0lGODlhFgAvAPMAA...|
|20091027143351|http://geocities....|thumbbuffynightma...|      jpg|          image/jpeg|    image/jpeg|   56|    74|e7630c4a59c5ca94c...|7ea611e40d74d65eb...|/9j/4AAQSkZJRgABA...|
|20091027143351|http://www.geocit...|             sea.gif|      gif|           image/gif|     image/gif|  130|   130|84d589f3f4e60a685...|8bfd3bf9efe4b0e76...|R0lGODlhggCCANX/A...|
|20091027143351|http://www.geocit...|          llmc10.jpg|      jpg|          image/jpeg|    image/jpeg|   25|    25|d559d964408bbcc6c...|1d03fd7b1bdc4f380...|/9j/4AAQSkZJRgABA...|
|20091027143350|http://geocities....|    LIBMystBttl3.gif|      gif|           image/gif|     image/gif|  184|   214|9d543c8af39c2b384...|2e427925d08123a3c...|R0lGODlhuADWAOYAA...|
|20091027143351|http://geocities....|         pic208s.jpg|      jpg|          image/jpeg|    image/jpeg|   60|    70|81608e1c633a88142...|804575eaf85a5025e...|/9j/4AAQSkZJRgABA...|
|20091027143351|http://www.geocit...|             nyy.gif|      gif|           image/gif|     image/gif|  130|   130|13d593a582e6bc84d...|ce73094e346fcd78e...|R0lGODlhggCCANX/A...|
|20091027143351|http://www.geocit...|    sm_hayride67.jpg|      jpg|          image/jpeg|    image/jpeg|  200|   150|a801fd64f3b8f683e...|7fb064717ce7e8948...|/9j/4AAQSkZJRgABA...|
|20091027143351|http://geocities....|           white.gif|      gif|           image/gif|     image/gif|   14|    14|300347136c9189646...|33c14c6be919115a4...|R0lGODlhDgAOAIQAA...|
|20091027143351|http://geocities....|      GlasPlyPic.jpg|      jpg|          image/jpeg|    image/jpeg|  419|   285|357dc7a0dd213cb56...|5648b4ddbb091874b...|/9j/4AAQSkZJRgABA...|
|20091027143351|http://www.geocit...|    Burstani81C4.gif|      gif|           image/gif|     image/gif|  462|    18|8959ff83dea984dd9...|09a5cc8340e466552...|R0lGODlhzgESAIcAA...|
|20091027143351|http://geocities....|       quickstop.jpg|      jpg|          image/jpeg|    image/jpeg|  320|   240|ef2d2d0d9161c060d...|344e8ff7c4adcb339...|/9j/4AAQSkZJRgABA...|
|20091027143352|http://geocities....|  pinkbuffythumb.jpg|      jpg|          image/jpeg|    image/jpeg|   23|    74|c3a22101ef7940ffb...|1d5f8537f4451056c...|/9j/4AAQSkZJRgABA...|
|20091027143351|http://geocities....|        PICT0050.JPG|      jpg|          image/jpeg|    image/jpeg|  448|   336|5c42b790adf7efaca...|cb4a3ac3ddcb36f74...|/9j/4AAQSkZJRgABA...|
|20091027143352|http://www.geocit...|           llmc6.jpg|      jpg|          image/jpeg|    image/jpeg|   25|    25|5af77dfbfd8ad6924...|581e720061c5e1d61...|/9j/4AAQSkZJRgABA...|
|20091027143348|http://geocities....|mehandface_collag...|      jpg|          image/jpeg|    image/jpeg| 1600|  1200|60c142bdb0018c5e5...|ae250210ddc5a35d9...|/9j/4AAQSkZJRgABA...|
+--------------+--------------------+--------------------+---------+--------------------+--------------+-----+------+--------------------+--------------------+--------------------+
```

## Extract Most Frequent Image URLs

### Scala RDD

The following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._

RecordLoader.loadArchives("/path/to/warcs", sc)
  .keepValidPages()
  .flatMap(r => ExtractImageLinks(r.getUrl, r.getContentString))
  .countItems()
  .take(10)
```

Will extract the top ten URLs of images found within a collection, in an array
like so:

```bash
links: Array[(String, Int)] = Array((http://www.archive.org/images/star.png,408), (http://www.archive.org/images/no_star.png,122), (http://www.archive.org/images/logo.jpg,118), (http://www.archive.org/images/main-header.jpg,84), (http://www.archive.org/images/rss.png,20), (http://www.archive.org/images/mail.gif,13), (http://www.archive.org/images/half_star.png,10), (http://www.archive.org/images/arrow.gif,7), (http://ia300142.us.archive.org/3/items/americana/am_libraries.gif?cnt=0,3), (http://ia310121.us.archive.org/2/items/GratefulDead/gratefuldead.gif?cnt=0,3), (http://www.archive.org/images/wayback.gif,2), (http://www.archive.org/images/wayback-election2000.gif,2), (http://www.archive.org/images/wayback-wt...
```

If you wanted to work with the images, you could download them from the
Internet Archive.

Let's use the top-ranked example. [This
link](http://web.archive.org/web/*/http://archive.org/images/star.png), for
example, will show you the temporal distribution of the image. For a snapshot
from September 2007, this URL would work:

<http://web.archive.org/web/20070913051458/http://www.archive.org/images/star.png>

To do analysis on all images, you could thus prepend
`http://web.archive.org/web/20070913051458/` to each URL and `wget` them en
masse.

For more information on `wget`, please consult [this lesson available on the
Programming Historian
website](http://programminghistorian.org/lessons/automated-downloading-with-wget).

### Scala DF

The following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).imagegraph();

df.groupBy($"image_url")
  .count()
  .orderBy($"count".desc)
  .show(10)
```

Will extract the top ten URLs of images found within a collection, in a
DataFrame like so:

```dataframe
+--------------------+-----+
|           image_url|count|
+--------------------+-----+
|http://geocities....|77295|
|http://geocities....|19290|
|http://www.geocit...|12235|
|http://geocities....| 4056|
|http://geocities....| 4056|
|http://geocities....| 2594|
|http://geocities....| 2262|
|http://geocities....| 1713|
|http://geocities....| 1203|
|http://www.geocit...|  549|
+--------------------+-----+
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.imagegraph()

df.groupBy("image_url")\
  .count()\
  .orderBy("count", ascending=False)\
  .show(10)
```

Will extract the top ten URLs of images found within a collection, in a
DataFrame like so:

```dataframe
+--------------------+-----+
|           image_url|count|
+--------------------+-----+
|http://geocities....|77295|
|http://geocities....|19290|
|http://www.geocit...|12235|
|http://geocities....| 4056|
|http://geocities....| 4056|
|http://geocities....| 2594|
|http://geocities....| 2262|
|http://geocities....| 1713|
|http://geocities....| 1203|
|http://www.geocit...|  549|
+--------------------+-----+
```

## Extract Most Frequent Images MD5 Hash

Some images may be the same, but have different URLs. This UDF finds the
popular images by calculating the MD5 hash of each and presents the most
frequent images based on that metric. This script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.app._
import io.archivesunleashed.matchbox._

val r = RecordLoader.loadArchives("/path/to/warcs",sc).persist()
ExtractPopularImages(r, 500, sc).saveAsTextFile("500-Popular-Images")
```

Will save the 500 most popular URLs to an output directory.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.app._

val df = RecordLoader.loadArchives("/path/to/warcs",sc).images()

ExtractPopularImagesDF(df,10,30,30).show()
```

### Python DF

```python
from aut import *

images = WebArchive(sc, sqlContext, "/path/to/warcs").images()

popular_images = ExtractPopularImages(images, 20, 10, 10)

popular_images.show()
```

## Find Images Shared Between Domains

How to find images shared between domains that appear more than once _in more
than one domain_.

### Scala DF

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val images = RecordLoader.loadArchives("/path/to/warcs", sc)
                        .images()
                        .select(removePrefixWWW(extractDomain($"url")).as("domain"), $"url", $"md5")

val links = images.groupBy("md5").count().where(countDistinct("domain")>=2)

val result = images.join(links, "md5")
                   .groupBy("domain", "md5")
                   .agg(first("url").as("image_url"))
                   .orderBy(asc("md5"))
                   .write
                   .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
                   .format("csv")
                   .option("escape", "\"")
                   .option("encoding", "utf-8")
                   .save("/path/to/output")
```

### PythonDF

```python
from aut import *
from pyspark.sql.functions import asc, countDistinct, first

images = WebArchive(sc, sqlContext, "/path/to/warcs") \
  .images() \
  .select(remove_prefix_www(extract_domain("url")).alias("domain"), "url", "md5")

links = images.groupBy("md5") \
              .count() \
              .where(countDistinct("domain")>=2)

result = images.join(links, "md5") \
               .groupBy("domain", "md5") \
               .agg(first("url").alias("image_url")) \
               .orderBy(asc("md5")) \
               .write
               .option("timestampFormat", "yyyy/MM/dd HH:mm:ss ZZ")
               .format("csv")
               .option("escape", "\"")
               .option("encoding", "utf-8")
               .save("/path/to/output")
```

## Extract PDF Information

### Scala RDD

**Will not be implemented.**

### Scala DF

The following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).pdfs();

df.show()
```

Will extract all following information from PDF files in a web collection:

- crawl date
- file url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------+--------------------+--------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|            filename|extension|mime_type_web_server| mime_type_tika|                 md5|                sha1|               bytes|
+--------------+--------------------+--------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
|20091027143421|http://geocities....|MartinLings_QueEs...|      pdf|application/octet...|application/pdf|c2fe0fa9853029d18...|8c5f4530ac318fc13...|JVBERi0xLjIgDQol4...|
|20091027143427|http://geocities....|LeoSchaya_LaDoctr...|      pdf|application/octet...|application/pdf|493dda2d89a527617...|5907d1cfdfee6dc1d...|JVBERi0xLjMNJeLjz...|
|20091027143440|http://geocities....|paulocoellhoSufis...|      pdf|application/octet...|application/pdf|894cb95cd21d545ed...|502484b6db47ea1f0...|JVBERi0xLjQNJeLjz...|
|20091027143502|http://geocities....|     instapplication|      pdf|application/octet...|application/pdf|2a3260d44a3ef0fa1...|abf31dba2d2ee906b...|JVBERi0xLjQNJeLjz...|
|20091027143524|http://geocities....|YuvalShayEl_CV_20...|      pdf|application/octet...|application/pdf|220132bc51ff59500...|9575283c4f37ab18f...|JVBERi0xLjQKJcfsj...|
|20091027143540|http://geocities....|     KM_Quest_HR.pdf|      pdf|application/octet...|application/pdf|64ed9ba9c8a088719...|75b019273fe66be47...|JVBERi0xLjMKJcfsj...|
|20091027143552|http://geocities....|              CV.pdf|      pdf|application/octet...|application/pdf|b572275ce93c1db85...|dc2692fba90300ea5...|JVBERi0xLjQKJcfsj...|
|20091027143551|http://geocities....|       Manhattan.pdf|      pdf|application/octet...|application/pdf|3fb5b98141a04479a...|1a07aebcf21ed3cc1...|JVBERi0xLjQKJcOkw...|
|20091027144115|http://geocities....|        schema9p.pdf|      pdf|application/octet...|application/pdf|501cd4462b2fda581...|2c954f482ebdab4d1...|JVBERi0xLjMNJeLjz...|
|20091027144159|http://geocities....|  PlayerContract.pdf|      pdf|application/octet...|application/pdf|433456d41b8847221...|ee65a6bb75c1ffc49...|JVBERi0xLjMNJeLjz...|
|20091027144157|http://www.geocit...|   proof-2-block.pdf|      pdf|application/octet...|application/pdf|8bb6b5090ac9a16b1...|20e7d9bb1d9826ab9...|JVBERi0xLjINJYCEi...|
|20091027144209|http://geocities....|           HB658.pdf|      pdf|application/octet...|application/pdf|225af35c62d3d0b87...|4d564941dcce3d400...|JVBERi0xLjIKJeLjz...|
|20091027144211|http://geocities....|      tariff1-60.pdf|      pdf|application/octet...|application/pdf|27cf3fa7cf5492639...|c681e75f41b049468...|JVBERi0xLjMNJeLjz...|
|20091027144217|http://www.geocit...|            DQSJ.pdf|      pdf|application/octet...|application/pdf|0779805da373d8dd7...|e210552a5d2a7f6fe...|JVBERi0xLjQNJeLjz...|
|20091027144219|http://geocities....|     tariff61-97.pdf|      pdf|application/octet...|application/pdf|904de8b1d8421de05...|a9cb6012cb00cdd93...|JVBERi0xLjIgDSXi4...|
|20091027144227|http://geocities....| yeildsanddosage.pdf|      pdf|application/octet...|application/pdf|c8767d66df41cc3c2...|8e1d7ac6bca4a4b52...|JVBERi0xLjMNJeLjz...|
|20091027144245|http://geocities....|FALL2008NEWSLETTE...|      pdf|application/octet...|application/pdf|5e0d285091dda3ff0...|640c35c9bd2f4bbeb...|JVBERi0xLjQNJeLjz...|
|20091027144247|http://geocities....|      caged_bird.pdf|      pdf|application/octet...|application/pdf|d281353db534d02c3...|cbd2899fc263ca8d2...|JVBERi0xLjMKJcfsj...|
|20091027144240|http://geocities....|  freedom_card_4.pdf|      pdf|application/octet...|application/pdf|5bdfae3a4fb8259b1...|76d193c29d602e1ee...|JVBERi0xLjQNJeLjz...|
|20091027144253|http://geocities....| Resume_Computer.pdf|      pdf|application/octet...|application/pdf|024535c78cdfec54e...|1c1e808804908baa3...|JVBERi0xLjQKJcOkw...|
+--------------+--------------------+--------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
```

If you wanted to work with all the PDF files in a collection, you could extract
them with the following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).pdfs();

df.select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/export/directory/your-preferred-filename-prefix", $"extension")
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.pdfs()
df.show()
```

Will extract all following information from PDF files in a web collection:

- crawl date
- file url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------+--------------------+--------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|            filename|extension|mime_type_web_server| mime_type_tika|                 md5|                sha1|               bytes|
+--------------+--------------------+--------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
|20091027143421|http://geocities....|MartinLings_QueEs...|      pdf|application/octet...|application/pdf|c2fe0fa9853029d18...|8c5f4530ac318fc13...|JVBERi0xLjIgDQol4...|
|20091027143427|http://geocities....|LeoSchaya_LaDoctr...|      pdf|application/octet...|application/pdf|493dda2d89a527617...|5907d1cfdfee6dc1d...|JVBERi0xLjMNJeLjz...|
|20091027143440|http://geocities....|paulocoellhoSufis...|      pdf|application/octet...|application/pdf|894cb95cd21d545ed...|502484b6db47ea1f0...|JVBERi0xLjQNJeLjz...|
|20091027143502|http://geocities....|     instapplication|      pdf|application/octet...|application/pdf|2a3260d44a3ef0fa1...|abf31dba2d2ee906b...|JVBERi0xLjQNJeLjz...|
|20091027143524|http://geocities....|YuvalShayEl_CV_20...|      pdf|application/octet...|application/pdf|220132bc51ff59500...|9575283c4f37ab18f...|JVBERi0xLjQKJcfsj...|
|20091027143540|http://geocities....|     KM_Quest_HR.pdf|      pdf|application/octet...|application/pdf|64ed9ba9c8a088719...|75b019273fe66be47...|JVBERi0xLjMKJcfsj...|
|20091027143552|http://geocities....|              CV.pdf|      pdf|application/octet...|application/pdf|b572275ce93c1db85...|dc2692fba90300ea5...|JVBERi0xLjQKJcfsj...|
|20091027143551|http://geocities....|       Manhattan.pdf|      pdf|application/octet...|application/pdf|3fb5b98141a04479a...|1a07aebcf21ed3cc1...|JVBERi0xLjQKJcOkw...|
|20091027144115|http://geocities....|        schema9p.pdf|      pdf|application/octet...|application/pdf|501cd4462b2fda581...|2c954f482ebdab4d1...|JVBERi0xLjMNJeLjz...|
|20091027144159|http://geocities....|  PlayerContract.pdf|      pdf|application/octet...|application/pdf|433456d41b8847221...|ee65a6bb75c1ffc49...|JVBERi0xLjMNJeLjz...|
|20091027144157|http://www.geocit...|   proof-2-block.pdf|      pdf|application/octet...|application/pdf|8bb6b5090ac9a16b1...|20e7d9bb1d9826ab9...|JVBERi0xLjINJYCEi...|
|20091027144209|http://geocities....|           HB658.pdf|      pdf|application/octet...|application/pdf|225af35c62d3d0b87...|4d564941dcce3d400...|JVBERi0xLjIKJeLjz...|
|20091027144211|http://geocities....|      tariff1-60.pdf|      pdf|application/octet...|application/pdf|27cf3fa7cf5492639...|c681e75f41b049468...|JVBERi0xLjMNJeLjz...|
|20091027144217|http://www.geocit...|            DQSJ.pdf|      pdf|application/octet...|application/pdf|0779805da373d8dd7...|e210552a5d2a7f6fe...|JVBERi0xLjQNJeLjz...|
|20091027144219|http://geocities....|     tariff61-97.pdf|      pdf|application/octet...|application/pdf|904de8b1d8421de05...|a9cb6012cb00cdd93...|JVBERi0xLjIgDSXi4...|
|20091027144227|http://geocities....| yeildsanddosage.pdf|      pdf|application/octet...|application/pdf|c8767d66df41cc3c2...|8e1d7ac6bca4a4b52...|JVBERi0xLjMNJeLjz...|
|20091027144245|http://geocities....|FALL2008NEWSLETTE...|      pdf|application/octet...|application/pdf|5e0d285091dda3ff0...|640c35c9bd2f4bbeb...|JVBERi0xLjQNJeLjz...|
|20091027144247|http://geocities....|      caged_bird.pdf|      pdf|application/octet...|application/pdf|d281353db534d02c3...|cbd2899fc263ca8d2...|JVBERi0xLjMKJcfsj...|
|20091027144240|http://geocities....|  freedom_card_4.pdf|      pdf|application/octet...|application/pdf|5bdfae3a4fb8259b1...|76d193c29d602e1ee...|JVBERi0xLjQNJeLjz...|
|20091027144253|http://geocities....| Resume_Computer.pdf|      pdf|application/octet...|application/pdf|024535c78cdfec54e...|1c1e808804908baa3...|JVBERi0xLjQKJcOkw...|
+--------------+--------------------+--------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
```

## Extract Presentation Program Files Information

### Scala RDD

**Will not be implemented.**

### Scala DF

The following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).presentationProgramFiles();

df.show()
```

Will extract all following information from presentation program files in a web collection:

- crawl date
- file url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------+--------------------+----------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|  filename|extension|mime_type_web_server|      mime_type_tika|                 md5|                sha1|               bytes|
+--------------+--------------------+----------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|20091027144808|http://www.geocit...|amanda.ppt|      ppt|application/mspow...|application/vnd.m...|41eb6193b0f9d5c60...|f252fa6528fe423e5...|0M8R4KGxGuEAAAAAA...|
|20091027144828|http://www.geocit...| amrit.ppt|      ppt|application/mspow...|application/vnd.m...|6baedd860bc343621...|6922f706b3aab9d31...|0M8R4KGxGuEAAAAAA...|
|20091027144837|http://www.geocit...|  sara.ppt|      ppt|application/mspow...|application/vnd.m...|2100cd48f59d257e9...|dfd9ad3ccd9c66393...|0M8R4KGxGuEAAAAAA...|
+--------------+--------------------+----------+---------+--------------------+--------------------+--------------------+--------------------+--------------------
```

If you wanted to work with all the presentation program files in a collection,
you could extract them with the following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).presentationProgramFiles();

df.select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/export/directory/your-preferred-filename-prefix", $"extension")
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.presentation_program()
df.show()
```

Will extract all following information from presentation program files in a web collection:

- crawl date
- file url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------+--------------------+----------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|  filename|extension|mime_type_web_server|      mime_type_tika|                 md5|                sha1|               bytes|
+--------------+--------------------+----------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|20091027144808|http://www.geocit...|amanda.ppt|      ppt|application/mspow...|application/vnd.m...|41eb6193b0f9d5c60...|f252fa6528fe423e5...|0M8R4KGxGuEAAAAAA...|
|20091027144828|http://www.geocit...| amrit.ppt|      ppt|application/mspow...|application/vnd.m...|6baedd860bc343621...|6922f706b3aab9d31...|0M8R4KGxGuEAAAAAA...|
|20091027144837|http://www.geocit...|  sara.ppt|      ppt|application/mspow...|application/vnd.m...|2100cd48f59d257e9...|dfd9ad3ccd9c66393...|0M8R4KGxGuEAAAAAA...|
+--------------+--------------------+----------+---------+--------------------+--------------------+--------------------+--------------------+--------------------
```

## Extract Spreadsheet Information

### Scala RDD

**Will not be implemented.**

### Scala DF

The following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).spreadsheets();

df.show()
```

Will extract all following information from spreadsheet files in a web collection:

- crawl date
- file url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|            filename|extension|mime_type_web_server|      mime_type_tika|                 md5|                sha1|               bytes|
+--------------+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|20091027143417|http://www.geocit...|         Avprod2.xls|      xls|application/vnd.m...|application/vnd.m...|25633d8ac40a77d74...|baafdad84cc3041b8...|0M8R4KGxGuEAAAAAA...|
|20091027143429|http://www.geocit...|  DecisionEngine.xls|      xls|application/vnd.m...|application/vnd.m...|8d1f08d0498ec0494...|89a797b655bcfcdb8...|0M8R4KGxGuEAAAAAA...|
|20091027143454|http://geocities....| F06_Course_Data.xls|      xls|application/vnd.m...|application/vnd.m...|1afdb672a2f0e1dfe...|d95427abbbf835752...|0M8R4KGxGuEAAAAAA...|
|20091027143456|http://geocities....|      winter07bs.xls|      xls|application/vnd.m...|application/vnd.m...|bb291b46ab8834fed...|6671575f8c8f6997e...|0M8R4KGxGuEAAAAAA...|
|20091027143503|http://geocities....|          sp07bs.xls|      xls|application/vnd.m...|application/vnd.m...|85344b51b5ad52386...|e2072065d21330263...|0M8R4KGxGuEAAAAAA...|
|20091027143528|http://geocities....|   LARRY-GIPHARM.xls|      xls|application/vnd.m...|application/vnd.m...|bb6c950e9b22c6f4f...|dcf389c08cff411ca...|0M8R4KGxGuEAAAAAA...|
|20091027145246|http://geocities....|LISTA_DE_ASISTENC...|      xls|application/vnd.m...|application/vnd.m...|30b477eb264b9d4f4...|64d99d3c1174109c2...|0M8R4KGxGuEAAAAAA...|
|20091027145256|http://geocities....|concentradoconten...|      xls|application/vnd.m...|application/vnd.m...|63e82750cf5212074...|4a8acf98269bf14e0...|0M8R4KGxGuEAAAAAA...|
|20091027145311|http://geocities....|  avancedesector.XLS|      xls|application/vnd.m...|application/vnd.m...|81363680ca74c155e...|59561a672b2b1ac08...|0M8R4KGxGuEAAAAAA...|
|20091027145353|http://geocities....| Ced_Inscrip_nat.xls|      xls|application/vnd.m...|application/vnd.m...|8b2cb62c4a11d3b26...|e6a5a23bdc7064818...|0M8R4KGxGuEAAAAAA...|
|20091027145357|http://geocities....|Anotac_de_basquet...|      xls|application/vnd.m...|application/vnd.m...|93eeec3065cd8eba3...|f56d1f28ec83dee87...|0M8R4KGxGuEAAAAAA...|
|20091027145410|http://geocities....|Anotac_de_cachivo...|      xls|application/vnd.m...|application/vnd.m...|268b5a687f91370f6...|a17a14332c88c1078...|0M8R4KGxGuEAAAAAA...|
|20091027145415|http://geocities....|Sesion_de_Entrena...|      xls|application/vnd.m...|application/vnd.m...|5065c2ae0169b5a20...|01612ad40b13de2aa...|0M8R4KGxGuEAAAAAA...|
|20091027145416|http://geocities....|Ced_Inscrip_Tetra...|      xls|application/vnd.m...|application/vnd.m...|20246307b1167edb6...|ff407c9d91a207049...|0M8R4KGxGuEAAAAAA...|
|20091027145757|http://www.geocit...|  DominoPedigree.xls|      xls|application/vnd.m...|application/vnd.m...|60e21671177c535ed...|3821f9803590a8c06...|0M8R4KGxGuEAAAAAA...|
+--------------+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
```

If you wanted to work with all the spreadsheet files in a collection, you could extract
them with the following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).spreadsheets();

df.select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/export/directory/your-preferred-filename-prefix", $"extension")
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.spreadsheets()
df.show()
```

Will extract all following information from spreadsheet files in a web collection:

- crawl date
- file url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|            filename|extension|mime_type_web_server|      mime_type_tika|                 md5|                sha1|               bytes|
+--------------+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|20091027143417|http://www.geocit...|         Avprod2.xls|      xls|application/vnd.m...|application/vnd.m...|25633d8ac40a77d74...|baafdad84cc3041b8...|0M8R4KGxGuEAAAAAA...|
|20091027143429|http://www.geocit...|  DecisionEngine.xls|      xls|application/vnd.m...|application/vnd.m...|8d1f08d0498ec0494...|89a797b655bcfcdb8...|0M8R4KGxGuEAAAAAA...|
|20091027143454|http://geocities....| F06_Course_Data.xls|      xls|application/vnd.m...|application/vnd.m...|1afdb672a2f0e1dfe...|d95427abbbf835752...|0M8R4KGxGuEAAAAAA...|
|20091027143456|http://geocities....|      winter07bs.xls|      xls|application/vnd.m...|application/vnd.m...|bb291b46ab8834fed...|6671575f8c8f6997e...|0M8R4KGxGuEAAAAAA...|
|20091027143503|http://geocities....|          sp07bs.xls|      xls|application/vnd.m...|application/vnd.m...|85344b51b5ad52386...|e2072065d21330263...|0M8R4KGxGuEAAAAAA...|
|20091027143528|http://geocities....|   LARRY-GIPHARM.xls|      xls|application/vnd.m...|application/vnd.m...|bb6c950e9b22c6f4f...|dcf389c08cff411ca...|0M8R4KGxGuEAAAAAA...|
|20091027145246|http://geocities....|LISTA_DE_ASISTENC...|      xls|application/vnd.m...|application/vnd.m...|30b477eb264b9d4f4...|64d99d3c1174109c2...|0M8R4KGxGuEAAAAAA...|
|20091027145256|http://geocities....|concentradoconten...|      xls|application/vnd.m...|application/vnd.m...|63e82750cf5212074...|4a8acf98269bf14e0...|0M8R4KGxGuEAAAAAA...|
|20091027145311|http://geocities....|  avancedesector.XLS|      xls|application/vnd.m...|application/vnd.m...|81363680ca74c155e...|59561a672b2b1ac08...|0M8R4KGxGuEAAAAAA...|
|20091027145353|http://geocities....| Ced_Inscrip_nat.xls|      xls|application/vnd.m...|application/vnd.m...|8b2cb62c4a11d3b26...|e6a5a23bdc7064818...|0M8R4KGxGuEAAAAAA...|
|20091027145357|http://geocities....|Anotac_de_basquet...|      xls|application/vnd.m...|application/vnd.m...|93eeec3065cd8eba3...|f56d1f28ec83dee87...|0M8R4KGxGuEAAAAAA...|
|20091027145410|http://geocities....|Anotac_de_cachivo...|      xls|application/vnd.m...|application/vnd.m...|268b5a687f91370f6...|a17a14332c88c1078...|0M8R4KGxGuEAAAAAA...|
|20091027145415|http://geocities....|Sesion_de_Entrena...|      xls|application/vnd.m...|application/vnd.m...|5065c2ae0169b5a20...|01612ad40b13de2aa...|0M8R4KGxGuEAAAAAA...|
|20091027145416|http://geocities....|Ced_Inscrip_Tetra...|      xls|application/vnd.m...|application/vnd.m...|20246307b1167edb6...|ff407c9d91a207049...|0M8R4KGxGuEAAAAAA...|
|20091027145757|http://www.geocit...|  DominoPedigree.xls|      xls|application/vnd.m...|application/vnd.m...|60e21671177c535ed...|3821f9803590a8c06...|0M8R4KGxGuEAAAAAA...|
+--------------+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
```

## Extract Video Information

### Scala RDD

**Will not be implemented.**

### Scala DF

The following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).videos();

df.show()
```

Will extract all following information from videos in a web collection:

- crawl date
- file url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------+--------------------+-------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|           filename|extension|mime_type_web_server| mime_type_tika|                 md5|                sha1|               bytes|
+--------------+--------------------+-------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
|20091027143703|http://geocities....|  2005MustangGT.MPG|      mpg|          video/mpeg|     video/mpeg|1c981c61ed6545879...|2f53fc6f4d1c7eb51...|AAABuiEAAQABgB1pA...|
|20091027143755|http://geocities....|        twocars.asf|      asf|      video/x-ms-asf| video/x-ms-asf|cc5ef3c72388bc758...|160c01a9f99e5ce70...|MCaydY5mzxGm2QCqA...|
|20091027143759|http://geocities....|         badday.mpg|      mpg|          video/mpeg|     video/mpeg|7fb4e5b7c1c03acaf...|050f2fc6c33e76c9b...|AAABuiEAAQABgB7hA...|
|20091027144827|http://geocities....|       Mov00038.mpg|      mpg|          video/mpeg|     video/mpeg|c67cb3b66b1acb963...|6aaf252cdefb793bc...|AAABuiEAAQABgAORA...|
|20091027145056|http://geocities....|tancfigurakbbpl.wmv|      wmv|      video/x-ms-wmv| video/x-ms-wmv|dca4991392572dbc0...|cb349bdc35484d976...|MCaydY5mzxGm2QCqA...|
|20091027145221|http://www.geocit...|         tobayz.mpg|      mpg|          video/mpeg|     video/mpeg|b32ac297e747b2ae2...|4b4714d28d724c6ee...|AAABuiEAAQABgB1NA...|
|20091027145309|http://geocities....|      AlienSong.mpg|      mpg|          video/mpeg|     video/mpeg|a343295859311ff5f...|0159fd559a2464d6d...|AAABuiEAAQAVgAu5A...|
|20091027145347|http://geocities....|          video.avi|      avi|     video/x-msvideo|video/x-msvideo|210247652d5631dd7...|daa49a70a9094242a...|UklGRtriHQBBVkkgT...|
|20091027145405|http://geocities....|          video.mpg|      mpg|          video/mpeg|     video/mpeg|d00a99183be3c39f3...|8b2aee6d8ec1682cd...|AAABuiEAAQABoZsdA...|
|20091027145414|http://geocities....|        movie01.avi|      avi|     video/x-msvideo|video/x-msvideo|21a1f171ab51fa938...|f932bc7daf166fb8f...|UklGRp7tFgBBVkkgT...|
|20091027145526|http://www.geocit...|     Kiseki360c.mpg|      wmv|          video/mpeg| video/x-ms-wmv|d8578622ce4bdc31d...|accff02d061ce65e3...|MCaydY5mzxGm2QCqA...|
+--------------+--------------------+-------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
```

If you wanted to work with all the video files in a collection, you could extract
them with the following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).videos();

df.select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/export/directory/your-preferred-filename-prefix", $"extension")
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.video()
df.show()
```

Will extract all following information from videos in a web collection:

- crawl date
- file url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------+--------------------+-------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|           filename|extension|mime_type_web_server| mime_type_tika|                 md5|                sha1|               bytes|
+--------------+--------------------+-------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
|20091027143703|http://geocities....|  2005MustangGT.MPG|      mpg|          video/mpeg|     video/mpeg|1c981c61ed6545879...|2f53fc6f4d1c7eb51...|AAABuiEAAQABgB1pA...|
|20091027143755|http://geocities....|        twocars.asf|      asf|      video/x-ms-asf| video/x-ms-asf|cc5ef3c72388bc758...|160c01a9f99e5ce70...|MCaydY5mzxGm2QCqA...|
|20091027143759|http://geocities....|         badday.mpg|      mpg|          video/mpeg|     video/mpeg|7fb4e5b7c1c03acaf...|050f2fc6c33e76c9b...|AAABuiEAAQABgB7hA...|
|20091027144827|http://geocities....|       Mov00038.mpg|      mpg|          video/mpeg|     video/mpeg|c67cb3b66b1acb963...|6aaf252cdefb793bc...|AAABuiEAAQABgAORA...|
|20091027145056|http://geocities....|tancfigurakbbpl.wmv|      wmv|      video/x-ms-wmv| video/x-ms-wmv|dca4991392572dbc0...|cb349bdc35484d976...|MCaydY5mzxGm2QCqA...|
|20091027145221|http://www.geocit...|         tobayz.mpg|      mpg|          video/mpeg|     video/mpeg|b32ac297e747b2ae2...|4b4714d28d724c6ee...|AAABuiEAAQABgB1NA...|
|20091027145309|http://geocities....|      AlienSong.mpg|      mpg|          video/mpeg|     video/mpeg|a343295859311ff5f...|0159fd559a2464d6d...|AAABuiEAAQAVgAu5A...|
|20091027145347|http://geocities....|          video.avi|      avi|     video/x-msvideo|video/x-msvideo|210247652d5631dd7...|daa49a70a9094242a...|UklGRtriHQBBVkkgT...|
|20091027145405|http://geocities....|          video.mpg|      mpg|          video/mpeg|     video/mpeg|d00a99183be3c39f3...|8b2aee6d8ec1682cd...|AAABuiEAAQABoZsdA...|
|20091027145414|http://geocities....|        movie01.avi|      avi|     video/x-msvideo|video/x-msvideo|21a1f171ab51fa938...|f932bc7daf166fb8f...|UklGRp7tFgBBVkkgT...|
|20091027145526|http://www.geocit...|     Kiseki360c.mpg|      wmv|          video/mpeg| video/x-ms-wmv|d8578622ce4bdc31d...|accff02d061ce65e3...|MCaydY5mzxGm2QCqA...|
+--------------+--------------------+-------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
```

## Extract Word Processor Files Information

### Scala RDD

**Will not be implemented.**

### Scala DF

The following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).wordProcessorFiles();

df.show()
```

Will extract all following information from word processor files in a web collection:

- crawl date
- file url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------+--------------------+--------------------+---------+--------------------+------------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|            filename|extension|mime_type_web_server|    mime_type_tika|                 md5|                sha1|               bytes|
+--------------+--------------------+--------------------+---------+--------------------+------------------+--------------------+--------------------+--------------------+
|20091027143402|http://geocities....|         4397Syl.DOC|      doc|  application/msword|application/msword|866eda303f876b7c4...|91c0cc9de023bf115...|0M8R4KGxGuEAAAAAA...|
|20091027143457|http://geocities....|Instructors_Handb...|      doc|  application/msword|application/msword|8aceead26707c0f8a...|a779ff7bf170fece1...|0M8R4KGxGuEAAAAAA...|
|20091027143459|http://geocities....|Instructor_Feedba...|      doc|  application/msword|application/msword|8f995f5c66ecd0d58...|9faaeb1be43bca7bd...|0M8R4KGxGuEAAAAAA...|
|20091027143500|http://geocities....|        winter07.doc|      doc|  application/msword|application/msword|438e551fa3e61551d...|b66cc2ae58bd16ce2...|0M8R4KGxGuEAAAAAA...|
|20091027143511|http://geocities....|Student_Feedback_...|      doc|  application/msword|application/msword|ee3ed5d430b3f585b...|bde62d02db1b4cc3d...|0M8R4KGxGuEAAAAAA...|
|20091027143523|http://geocities....|             MVC.doc|      doc|  application/msword|application/msword|7cdfae5ac3409ea51...|5a13dc3f237ffbbf8...|0M8R4KGxGuEAAAAAA...|
|20091027143547|http://geocities....|  HR_not_tech_km.doc|      doc|  application/msword|application/msword|da57f475bae351d29...|6e176bb7abaae6fdd...|0M8R4KGxGuEAAAAAA...|
|20091027143617|http://geocities....|AGREEMENT_FOR_SUB...|      doc|  application/msword|application/msword|550d7ac804be8cd61...|5d70cbc3c7f8ab038...|0M8R4KGxGuEAAAAAA...|
|20091027143620|http://geocities....|DECLARATION_of_co...|      doc|  application/msword|application/msword|9a7b05b88efd0ad44...|0ea2b339f3b5227c9...|0M8R4KGxGuEAAAAAA...|
|20091027143657|http://geocities....|         attacks.rtf|      rtf|            text/rtf|   application/rtf|b103e2752cf1dcee9...|90a43940606725cef...|e1xydGYxXGFuc2lcY...|
|20091027143719|http://geocities....|JuneteenthCertifi...|      doc|  application/msword|application/msword|07e4f315c47b7e416...|7d4a1d37ad5d100c5...|0M8R4KGxGuEAAAAAA...|
|20091027143848|http://geocities....|           info1.doc|      doc|  application/msword|application/msword|8552c46956df7d979...|bb06c6b16ab7d28d3...|0M8R4KGxGuEAAAAAA...|
|20091027143849|http://geocities....|       entryform.doc|      doc|  application/msword|application/msword|57e7a27707714e907...|1c82da09d7c008997...|0M8R4KGxGuEAAAAAA...|
|20091027143919|http://geocities....|          diario.doc|      doc|  application/msword|application/msword|47067621f74230bba...|95f55ae3cdf7017b3...|0M8R4KGxGuEAAAAAA...|
|20091027143932|http://geocities....|           arica.doc|      doc|  application/msword|application/msword|3d24b22d780c59d6b...|4e66c656ce227ff91...|0M8R4KGxGuEAAAAAA...|
|20091027144116|http://geocities....|           hpnap.doc|      doc|  application/msword|application/msword|41b890f140894441c...|1168de2af5d10c807...|0M8R4KGxGuEAAAAAA...|
|20091027144202|http://www.geocit...|pressrelease_Away...|      rtf|            text/rtf|   application/rtf|94b9b450ac2454d94...|720630fced5434e5e...|e1xydGYxXGFuc2lcY...|
|20091027144157|http://geocities....|TxConstNov03Text.doc|      doc|  application/msword|application/msword|d52eef881e96c99a8...|4a24d78a374935d06...|0M8R4KGxGuEAAAAAA...|
|20091027144226|http://geocities....|   resume...inet.doc|      doc|  application/msword|application/msword|18a9de9a5ba3afd0e...|b0e210a886cd0163c...|0M8R4KGxGuEAAAAAA...|
|20091027144252|http://geocities....|20092010Membershi...|      doc|  application/msword|application/msword|ae9a8987d5303de42...|dfe67865650e1d9c0...|0M8R4KGxGuEAAAAAA...|
+--------------+--------------------+--------------------+---------+--------------------+------------------+--------------------+--------------------+--------------------+
```

If you wanted to work with all the word processor files in a collection,
you could extract them with the following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).wordProcessorFiles();

df.select($"bytes", $"extension")
  .saveToDisk("bytes", "/path/to/export/directory/your-preferred-filename-prefix", $"extension")
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.word_processor()
df.show()
```

Will extract all following information from word processor files in a web collection:

- crawl date
- file url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------+--------------------+--------------------+---------+--------------------+------------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|            filename|extension|mime_type_web_server|    mime_type_tika|                 md5|                sha1|               bytes|
+--------------+--------------------+--------------------+---------+--------------------+------------------+--------------------+--------------------+--------------------+
|20091027143402|http://geocities....|         4397Syl.DOC|      doc|  application/msword|application/msword|866eda303f876b7c4...|91c0cc9de023bf115...|0M8R4KGxGuEAAAAAA...|
|20091027143457|http://geocities....|Instructors_Handb...|      doc|  application/msword|application/msword|8aceead26707c0f8a...|a779ff7bf170fece1...|0M8R4KGxGuEAAAAAA...|
|20091027143459|http://geocities....|Instructor_Feedba...|      doc|  application/msword|application/msword|8f995f5c66ecd0d58...|9faaeb1be43bca7bd...|0M8R4KGxGuEAAAAAA...|
|20091027143500|http://geocities....|        winter07.doc|      doc|  application/msword|application/msword|438e551fa3e61551d...|b66cc2ae58bd16ce2...|0M8R4KGxGuEAAAAAA...|
|20091027143511|http://geocities....|Student_Feedback_...|      doc|  application/msword|application/msword|ee3ed5d430b3f585b...|bde62d02db1b4cc3d...|0M8R4KGxGuEAAAAAA...|
|20091027143523|http://geocities....|             MVC.doc|      doc|  application/msword|application/msword|7cdfae5ac3409ea51...|5a13dc3f237ffbbf8...|0M8R4KGxGuEAAAAAA...|
|20091027143547|http://geocities....|  HR_not_tech_km.doc|      doc|  application/msword|application/msword|da57f475bae351d29...|6e176bb7abaae6fdd...|0M8R4KGxGuEAAAAAA...|
|20091027143617|http://geocities....|AGREEMENT_FOR_SUB...|      doc|  application/msword|application/msword|550d7ac804be8cd61...|5d70cbc3c7f8ab038...|0M8R4KGxGuEAAAAAA...|
|20091027143620|http://geocities....|DECLARATION_of_co...|      doc|  application/msword|application/msword|9a7b05b88efd0ad44...|0ea2b339f3b5227c9...|0M8R4KGxGuEAAAAAA...|
|20091027143657|http://geocities....|         attacks.rtf|      rtf|            text/rtf|   application/rtf|b103e2752cf1dcee9...|90a43940606725cef...|e1xydGYxXGFuc2lcY...|
|20091027143719|http://geocities....|JuneteenthCertifi...|      doc|  application/msword|application/msword|07e4f315c47b7e416...|7d4a1d37ad5d100c5...|0M8R4KGxGuEAAAAAA...|
|20091027143848|http://geocities....|           info1.doc|      doc|  application/msword|application/msword|8552c46956df7d979...|bb06c6b16ab7d28d3...|0M8R4KGxGuEAAAAAA...|
|20091027143849|http://geocities....|       entryform.doc|      doc|  application/msword|application/msword|57e7a27707714e907...|1c82da09d7c008997...|0M8R4KGxGuEAAAAAA...|
|20091027143919|http://geocities....|          diario.doc|      doc|  application/msword|application/msword|47067621f74230bba...|95f55ae3cdf7017b3...|0M8R4KGxGuEAAAAAA...|
|20091027143932|http://geocities....|           arica.doc|      doc|  application/msword|application/msword|3d24b22d780c59d6b...|4e66c656ce227ff91...|0M8R4KGxGuEAAAAAA...|
|20091027144116|http://geocities....|           hpnap.doc|      doc|  application/msword|application/msword|41b890f140894441c...|1168de2af5d10c807...|0M8R4KGxGuEAAAAAA...|
|20091027144202|http://www.geocit...|pressrelease_Away...|      rtf|            text/rtf|   application/rtf|94b9b450ac2454d94...|720630fced5434e5e...|e1xydGYxXGFuc2lcY...|
|20091027144157|http://geocities....|TxConstNov03Text.doc|      doc|  application/msword|application/msword|d52eef881e96c99a8...|4a24d78a374935d06...|0M8R4KGxGuEAAAAAA...|
|20091027144226|http://geocities....|   resume...inet.doc|      doc|  application/msword|application/msword|18a9de9a5ba3afd0e...|b0e210a886cd0163c...|0M8R4KGxGuEAAAAAA...|
|20091027144252|http://geocities....|20092010Membershi...|      doc|  application/msword|application/msword|ae9a8987d5303de42...|dfe67865650e1d9c0...|0M8R4KGxGuEAAAAAA...|
+--------------+--------------------+--------------------+---------+--------------------+------------------+--------------------+--------------------+--------------------+
```
