---
id: binary-analysis
title: Binary Analysis
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

df.select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5", $"sha1", $"bytes")
  .orderBy(desc("md5"))
  .show()
```

Will extract all following information from images in a web collection:

- audio url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|                 url|            filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|               bytes|
+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|http://geocities....|    capasoligero.mp3|      mp3|          audio/mpeg|    audio/mpeg|fffd1aa802392be0f...|88e254b4cab7848a9...|//MozAAAAAAAAAAAA...|
|http://www.geocit...|        colorwnd.mid|      mid|          audio/midi|    audio/midi|fff3f4e8a473f7c9a...|aea92a6f32dd1a1f4...|TVRoZAAAAAYAAQAGA...|
|http://geocities....|santana_rob_thoma...|      mid|          audio/midi|    audio/midi|ffd4a24d4e4722d94...|28576c271898a1de5...|TVRoZAAAAAYAAQASA...|
|http://geocities....|           music.mid|      mid|          audio/midi|    audio/midi|ffcbe35e28b553481...|cf1ebdbe1a070d4f6...|TVRoZAAAAAYAAAABA...|
|http://geocities....|        evrythng.mid|      mid|          audio/midi|    audio/midi|ff751c86728ff09b5...|d22fc0911d3ceb17a...|TVRoZAAAAAYAAAABA...|
|http://geocities....|        evrythn2.mid|      mid|          audio/midi|    audio/midi|ff751c86728ff09b5...|d22fc0911d3ceb17a...|TVRoZAAAAAYAAAABA...|
|http://geocities....|          picket.mid|      mid|          audio/midi|    audio/midi|ff4d225a602630584...|ecef0a851cc028853...|TVRoZAAAAAYAAQAHA...|
|http://geocities....|        simpsons.mid|      mid|          audio/midi|    audio/midi|ff3bc375860979f2f...|9c1204dad686ddeea...|TVRoZAAAAAYAAQAPA...|
|http://www.geocit...|        simpsons.mid|      mid|          audio/midi|    audio/midi|ff3bc375860979f2f...|9c1204dad686ddeea...|TVRoZAAAAAYAAQAPA...|
|http://geocities....|        mypretty.wav|      wav|         audio/x-wav|audio/vnd.wave|ff1a5015d3a380955...|113de5c1bb2f7ddb4...|UklGRvz8AABXQVZFZ...|
|http://geocities....|          song37.mid|      mid|          audio/midi|    audio/midi|fee0a67ff7c71e35c...|ccd4fdfa0483d1058...|TVRoZAAAAAYAAAABA...|
|http://geocities....|    holdyourhand.mid|      mid|          audio/midi|    audio/midi|fed14ecd7099e3fb9...|24fe5c097db5d506a...|TVRoZAAAAAYAAQANA...|
|http://geocities....|    es_tu_sangre.mid|      mid|          audio/midi|    audio/midi|fec196e8086d868f2...|eccb1551d1e7b236e...|TVRoZAAAAAYAAQASA...|
|http://www.geocit...|          virgin.mid|      mid|          audio/midi|    audio/midi|fec0ce795723b1287...|cc651312b1d57fe64...|TVRoZAAAAAYAAQAMA...|
|http://www.geocit...|tonibraxtonunbrea...|      wav|         audio/x-wav|audio/vnd.wave|feb7e31a8edb0a484...|9420bdeece0f23b78...|UklGRtQoCgBXQVZFZ...|
|http://geocities....|      comeandsee.mid|      mid|          audio/midi|    audio/midi|feb513cd7b6fab9cc...|51b4c2bb113cb43aa...|TVRoZAAAAAYAAAABA...|
|http://geocities....|        song186t.mid|      mid|          audio/midi|    audio/midi|fead61a5a439675a3...|c652eda8a4ec5d197...|TVRoZAAAAAYAAAABA...|
|http://geocities....|    be_magnified.mid|      mid|          audio/midi|    audio/midi|feac0e996e1555d84...|f51ec1e62a166fa82...|TVRoZAAAAAYAAQAPA...|
|http://geocities....|        EVERYBOD.MID|      mid|          audio/midi|    audio/midi|fea911b19f0cf709d...|58bcd1b3c0288cbe0...|TVRoZAAAAAYAAQAUA...|
|http://www.geocit...|        ff9waltz.mid|      mid|          audio/midi|    audio/midi|fe9eb1ea6d4b53a9f...|72e2467bfea6240b8...|TVRoZAAAAAYAAQAKA...|
+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
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

Will extract all following information from audio in a web collection:

- audio url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|                 url|            filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|               bytes|
+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|http://www.geocit...|        hc-tibet.wav|      wav|         audio/x-wav|audio/vnd.wave|416ad26133f63dc3e...|dfb764d759187d102...|UklGRg6eAABXQVZFZ...|
|http://geocities....|bookmarkthissite.wav|      wav|         audio/x-wav|audio/vnd.wave|7897ff71780a903ca...|cfb942aeb3bc881cd...|UklGRppkAABXQVZFZ...|
|http://geocities....|   NeilYoung-Hey.mp3|      mp3|          audio/mpeg|    audio/mpeg|40869eb3181e6035b...|19fa693521cd8125c...|//uQRAAAAcAAsNUEA...|
|http://geocities....|          misty1.mp3|      mp3|          audio/mpeg|    audio/mpeg|d8cb3ce54072a7d4b...|43b92e16932c13a43...|//uQBAAAAsJl22mBE...|
|http://geocities....|            sale.mid|      mid|          audio/midi|    audio/midi|5dfc0c3dd884e50c7...|071840b4822ae5e80...|TVRoZAAAAAYAAQALA...|
|http://geocities....|        swaplink.mid|      mid|          audio/midi|    audio/midi|f32117ce2bffa9902...|0346223861c87acc1...|TVRoZAAAAAYAAQALA...|
|http://geocities....|              m5.mid|      mid|          audio/midi|    audio/midi|7e5eedebafecd26c4...|393dfbc00c49fcdc9...|TVRoZAAAAAYAAQAJA...|
|http://geocities....|          morder.mid|      mid|          audio/midi|    audio/midi|6cec0785377f5bbaf...|a94f0a75c0c3b3cf5...|TVRoZAAAAAYAAQAMA...|
|http://geocities....|              m2.mid|      mid|          audio/midi|    audio/midi|58b0102f997e689a2...|51ad469ebc931e160...|TVRoZAAAAAYAAQALA...|
|http://geocities....|           music.mid|      mid|          audio/midi|    audio/midi|7917a5a9d6ddfb8dd...|009db9df73cdf5247...|TVRoZAAAAAYAAQALA...|
|http://www.geocit...|        hcpopeye.wav|      wav|         audio/x-wav|audio/vnd.wave|04d7b45c70e0a496e...|9db0e61c16554af88...|UklGRrbAAABXQVZFZ...|
|http://geocities....|              m7.mid|      mid|          audio/midi|    audio/midi|3906ecaba32ba15a8...|e0d6e9f1c86b6204e...|TVRoZAAAAAYAAQAHA...|
|http://geocities....|           words.mid|      mid|          audio/midi|    audio/midi|30da01a4ed42ae469...|160b2e5aaa9b95641...|TVRoZAAAAAYAAQAIA...|
|http://geocities....|          brock5.mp3|      mp3|          audio/mpeg|    audio/mpeg|17f4e1c7a007983a5...|3bbdb27fafa4e8b12...|//MozAANkCLE/gjGA...|
|http://geocities....|          brock1.mp3|      mp3|          audio/mpeg|    audio/mpeg|67db65825afc326ed...|2ec4ac110cff19134...|//MozAAMyX7VmBjGl...|
|http://geocities....|       funkytown.wav|      wav|         audio/x-wav|audio/vnd.wave|6f841bcffe4bbb61d...|ab1fdb143d5752cf1...|UklGRlLOCQBXQVZFZ...|
|http://geocities....|  welcomemyworld.mid|      mid|          audio/midi|    audio/midi|c546eac675e2dd974...|cb4f1fa32aa1e3205...|TVRoZAAAAAYAAQAMA...|
|http://www.geocit...|        irisheye.mid|      mid|          audio/midi|    audio/midi|d906f32953742fdef...|f3ca7449483b0ea65...|TVRoZAAAAAYAAQAFA...|
|http://geocities....|       mission21.mid|      mid|          audio/midi|    audio/midi|c507304afe6cddba1...|72a74c1914044746f...|TVRoZAAAAAYAAQAVA...|
|http://geocities....|         tellit1.mid|      mid|          audio/midi|    audio/midi|a604ae85251d55504...|95096668900a76dc8...|TVRoZAAAAAYAAQAQA...|
+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
only showing top 20 rows
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

df.select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5", $"sha1", $"bytes")
  .orderBy(desc("md5"))
  .show()
```

Will extract all following information from PDF files in a web collection:

- file url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------------+--------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
|                 url|            filename|extension|mime_type_web_server| mime_type_tika|                 md5|                sha1|               bytes|
+--------------------+--------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
|http://geocities....|adicec_sopar_2009...|      pdf|application/octet...|application/pdf|ffc2ccc373b8ffd39...|3831b0f228af1701e...|JVBERi0xLjMNJeLjz...|
|http://www.geocit...|      IntSt_2301.pdf|      pdf|application/octet...|application/pdf|ffa638c418dac2e19...|84dbaccde1ace4b24...|JVBERi0xLjQNJeLjz...|
|http://www.geocit...|            lotg.pdf|      pdf|application/octet...|application/pdf|ff871ef64d3739b03...|95a777f0b4c7703c6...|JVBERi0xLjINJeLjz...|
|http://geocities....|            ebad.pdf|      pdf|application/octet...|application/pdf|fe8feece5d08dc2ce...|0c01cc31b40a286da...|JVBERi0xLjMNJeLjz...|
|http://geocities....|      regulament.pdf|      pdf|application/octet...|application/pdf|fe8018451633fd76c...|9c7cc720e29cad6e8...|JVBERi0xLjMKJcfsj...|
|http://geocities....|dmatias_letterfor...|      pdf|application/octet...|application/pdf|fe7dbc89e664ba790...|dbe965e7a288cce59...|JVBERi0xLjYNJeLjz...|
|http://geocities....|overcome_the_fear...|      pdf|application/octet...|application/pdf|fe3ec0805564cd3fc...|d0d30ba4f7f40434d...|JVBERi0xLjMKJcfsj...|
|http://geocities....|       CIM_marks.pdf|      pdf|application/octet...|application/pdf|fe1622ac08b47cf60...|b97b57b3c77887324...|JVBERi0xLjMKJcTl8...|
|http://geocities....|           board.PDF|      pdf|application/octet...|application/pdf|fd969b57508d3b135...|fc121c07fefbb722b...|JVBERi0xLjIgDQol4...|
|http://geocities....|          cowell.pdf|      pdf|application/octet...|application/pdf|fbacc01cbe01aa0b4...|f9e9eba1b281ad800...|JVBERi0xLjMKJeLjz...|
|http://geocities....|        gdbrasil.pdf|      pdf|application/octet...|application/pdf|fadc9b9b2408a1112...|247671acb971ddc21...|JVBERi0xLjQNJeLjz...|
|http://www.geocit...|         EBOrder.pdf|      pdf|application/octet...|application/pdf|fa4a83d96441324b3...|5f6870832d035a5a9...|JVBERi0xLjINJeLjz...|
|http://geocities....|        butlleta.pdf|      pdf|application/octet...|application/pdf|fa13dfbf62acb5083...|9a8ec0c0e8a190f46...|JVBERi0xLjQNJeLjz...|
|http://www.geocit...|ALABAMAUNDERWOODM...|      pdf|application/octet...|application/pdf|f9791c7df35d9092a...|3e4c0ca1031152d24...|JVBERi0xLjIgDQol4...|
|http://geocities....|         chimera.pdf|      pdf|application/octet...|application/pdf|f92a40f58cffcdc8e...|ba038d0146b0171f2...|JVBERi0xLjMKJcfsj...|
|http://geocities....|          icarus.pdf|      pdf|application/octet...|application/pdf|f8da963b714e684b3...|4444f5a12c9dbb1df...|JVBERi0xLjMKJcfsj...|
|http://geocities....|2008_ClubFinances...|      pdf|application/octet...|application/pdf|f878c0373edbc89f9...|700393c7b6aaf93df...|JVBERi0xLjQNJeLjz...|
|http://geocities....|  WILLOWSTScene5.pdf|      pdf|application/octet...|application/pdf|f84fc521602fdf163...|5f03b19201536cbc8...|JVBERi0xLjQKJcfsj...|
|http://geocities....|        isrherb2.pdf|      pdf|application/octet...|application/pdf|f83390642e9fe6313...|60befa2b5913bb19d...|JVBERi0xLjMNJeLjz...|
|http://geocities....|            joel.pdf|      pdf|application/octet...|application/pdf|f828e4b447c085fdd...|2e3308c1a52f2f75a...|JVBERi0xLjQKJcOkw...|
+--------------------+--------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
only showing top 20 rows

import io.archivesunleashed._
import io.archivesunleashed.udfs._
df: org.apache.spark.sql.DataFrame = [url: string, filename: string ... 6 more fields]
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

- file url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------------+--------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
|                 url|            filename|extension|mime_type_web_server| mime_type_tika|                 md5|                sha1|               bytes|
+--------------------+--------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
|http://geocities....|20080304ordinance...|      pdf|application/octet...|application/pdf|ebbf9bf99b363493b...|f0b9a6788cbc1f8ab...|JVBERi0xLjMNJeLjz...|
|http://geocities....|FACTSHEET2008ADOP...|      pdf|application/octet...|application/pdf|4fe261c2210189a52...|a91180b9170ff757f...|JVBERi0xLjQNJeLjz...|
|http://geocities....|            Menu.pdf|      pdf|application/octet...|application/pdf|75e4d587589a1d85d...|d18724100d4616a45...|JVBERi0xLjMNJeLjz...|
|http://geocities....|DSTC2009ContestFl...|      pdf|application/octet...|application/pdf|c80f38f96480aab0c...|369c4415ed9c2476d...|JVBERi0xLjQNJeLjz...|
|http://geocities....|            ebad.pdf|      pdf|application/octet...|application/pdf|fe8feece5d08dc2ce...|0c01cc31b40a286da...|JVBERi0xLjMNJeLjz...|
|http://geocities....|FACTSHEET2008APPR...|      pdf|application/octet...|application/pdf|8747971e78acb768b...|770f97a95c7e2ee16...|JVBERi0xLjQNJeLjz...|
|http://geocities....|FACTSHEET2008APPE...|      pdf|application/octet...|application/pdf|32f57bbe5b28f4ab1...|d4f63b8d29f4c5dc5...|JVBERi0xLjQNJeLjz...|
|http://geocities....|FACTSHEET2008ADOP...|      pdf|application/octet...|application/pdf|e9189eea563fde074...|f14b1846499dd4bd0...|JVBERi0xLjQNJeLjz...|
|http://geocities....|          sharar.pdf|      pdf|application/octet...|application/pdf|771f5bd1b72b8e324...|9cef1f6af9e5c127e...|JVBERi0xLjMNJeLjz...|
|http://geocities....|FACTSHEET2008UTIL...|      pdf|application/octet...|application/pdf|7f45c93d16823e852...|b3a2d3b95efd77bd6...|JVBERi0xLjQNJeLjz...|
|http://geocities....|BakweriMarginalis...|      pdf|application/octet...|application/pdf|d25863303ba46a872...|bbd6c9bce4c523f0f...|JVBERi0xLjINJeLjz...|
|http://geocities....|McCallaFoodSecuri...|      pdf|application/octet...|application/pdf|1291b633f49f7e51d...|622144ed0fd56bae3...|JVBERi0xLjMNJeLjz...|
|http://geocities....|PovertyAndIncome.pdf|      pdf|application/octet...|application/pdf|278e1f281905d419d...|9bc00a54147a4b350...|JVBERi0xLjIgDSXi4...|
|http://geocities....|          behold.pdf|      pdf|application/octet...|application/pdf|9fc1e4e1e0f567477...|63d324984d34eb168...|JVBERi0xLjMKJcfsj...|
|http://geocities....|overcome_the_fear...|      pdf|application/octet...|application/pdf|fe3ec0805564cd3fc...|d0d30ba4f7f40434d...|JVBERi0xLjMKJcfsj...|
|http://geocities....|           raven.pdf|      pdf|application/octet...|application/pdf|acabc7f7dba954f99...|1ddf3e53813a805a1...|JVBERi0xLjMKJcfsj...|
|http://geocities....|          sunset.pdf|      pdf|application/octet...|application/pdf|1dc037712d47b11d9...|f502ca5cc2de2483b...|JVBERi0xLjMKJcfsj...|
|http://geocities....|night_lasts_less_...|      pdf|application/octet...|application/pdf|1cda3dfab3bedaf04...|ad0f6e6fd53e4eb5f...|JVBERi0xLjMKJcfsj...|
|http://geocities....|      angel_dust.pdf|      pdf|application/octet...|application/pdf|92d14676e34dfcb7e...|1588b870928d56667...|JVBERi0xLjMKJcfsj...|
|http://geocities....|         vampire.pdf|      pdf|application/octet...|application/pdf|f1730689d52b9524e...|bf377a4e2580b8a29...|JVBERi0xLjMKJcfsj...|
+--------------------+--------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
only showing top 20 rows
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

df.select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5", $"sha1", $"bytes")
  .orderBy(desc("md5"))
  .show()
```

Will extract all following information from presentation program files in a web collection:

- file url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|                 url|            filename|extension|mime_type_web_server|      mime_type_tika|                 md5|                sha1|               bytes|
+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|http://geocities....|           index.pps|      pps|application/mspow...|application/vnd.m...|fbaed5a1df163270a...|afa4c82593ea5bfd6...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|MathForEveryoneCa...|      ppt|application/mspow...|application/vnd.m...|f5fde5813a5aef2f3...|e791212ac91243f39...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|AD1-GE-Quiz4-Samp...|      ppt|application/mspow...|application/vnd.m...|f5824d64bb74b1377...|aaea2a38d11682753...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|    Agrarianism1.ppt|      ppt|application/mspow...|application/vnd.m...|f581932d9e4c57dc0...|3fbce2d175be293a8...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|            lego.pps|      pps|application/mspow...|application/vnd.m...|f0da5c58e7abbf102...|78bc45da68c6784be...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|            HPIB.ppt|      ppt|application/mspow...|application/vnd.m...|ef09c31bd8079d40b...|875a96d8b8dd3bf18...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|learningdisabilit...|      ppt|application/mspow...|application/vnd.m...|e6bb4f98761839a3a...|5a4dcc8bab2ee15f3...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|assessmentsummer.ppt|      ppt|application/mspow...|application/vnd.m...|e116a443b9031ec01...|141563f2f32687587...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|CommonlyConfusedW...|      ppt|application/mspow...|application/vnd.m...|dde43870e0da8ebf6...|7a94bf766d931a046...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|AD1-Unit5-Achieve...|      ppt|application/mspow...|application/vnd.m...|d4530e506c2e41f8f...|6c89c0e3d28ecceed...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|         Schwind.ppt|      ppt|application/mspow...|application/vnd.m...|cfdd4bb6e7b04f24a...|9c26a8ac091f88a35...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|  cpphtp4_PPT_07.ppt|      ppt|application/mspow...|application/vnd.m...|cd98e6e18c3b0ada0...|b3651507f61bafa4d...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|          mylife.ppt|      ppt|application/mspow...|application/vnd.m...|cb146894f8a544ace...|0129cfdfd2f196346...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|    refinterview.ppt|      ppt|application/mspow...|application/vnd.m...|ca6fd4ec5fcb8237d...|8312ca4c0dbeb6008...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|MathForEveryoneAl...|      ppt|application/mspow...|application/vnd.m...|c887f45fa58f273b0...|b253b732f8502f357...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|   ch2-DataTypes.ppt|      ppt|application/mspow...|application/vnd.m...|c74caee72b5ee6684...|f3bf878c775e2f72a...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|geographyofnortha...|      ppt|application/mspow...|application/vnd.m...|c35b93ac59f2eb5af...|b5de05a856838328c...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|       people1st.ppt|      ppt|application/mspow...|application/vnd.m...|bf19cdc1ff3ad82fd...|99f14fe81d8a9587f...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|     AD1-Reading.ppt|      ppt|application/mspow...|application/vnd.m...|be020b4564f972218...|0761a2fd5c176ce1c...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|         majalah.ppt|      ppt|application/mspow...|application/vnd.m...|b6f219693ef1df49f...|1039013624cf8de35...|0M8R4KGxGuEAAAAAA...|
+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
only showing top 20 rows

import io.archivesunleashed._
import io.archivesunleashed.udfs._
df: org.apache.spark.sql.DataFrame = [url: string, filename: string ... 6 more fields]
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

- file url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|                 url|            filename|extension|mime_type_web_server|      mime_type_tika|                 md5|                sha1|               bytes|
+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|http://geocities....|          wincvs.ppt|      ppt|application/mspow...|application/vnd.m...|52ac23b58493234b2...|a2206af9847cceb06...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|           index.pps|      pps|application/mspow...|application/vnd.m...|fbaed5a1df163270a...|afa4c82593ea5bfd6...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|MathForEveryoneCa...|      ppt|application/mspow...|application/vnd.m...|f5fde5813a5aef2f3...|e791212ac91243f39...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|MathForEveryone7t...|      ppt|application/mspow...|application/vnd.m...|9893643e1cb87af0c...|2fa8301893ad21b2b...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|MathForEveryoneGe...|      ppt|application/mspow...|application/vnd.m...|2a914a95a61b227dd...|5d783c1beaffc0b57...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|MathForEveryoneAl...|      ppt|application/mspow...|application/vnd.m...|c887f45fa58f273b0...|b253b732f8502f357...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|MathForEveryone7t...|      ppt|application/mspow...|application/vnd.m...|034906471a0c0b997...|16142a0aa69b2fb1f...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|           tiago.ppt|      ppt|application/mspow...|application/vnd.m...|6871786192c187783...|e5a91a65ef9a4bade...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|        energypp.ppt|      ppt|application/mspow...|application/vnd.m...|94f9384ec57d8849c...|e943c5cf509f8f816...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|            lego.pps|      pps|application/mspow...|application/vnd.m...|f0da5c58e7abbf102...|78bc45da68c6784be...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|      celtiberos.pps|      pps|application/mspow...|application/vnd.m...|af897525acd31d359...|9c018a80253c38a57...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|          porque.pps|      pps|application/mspow...|application/vnd.m...|9c2cba37c64fd0ac8...|6f11733ddec0abc2d...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|SoftHandoffbyPara...|      pps|application/mspow...|application/vnd.m...|0c5ef732ea466574f...|dc7dfe545b401aeab...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|A_Land_Remembered...|      ppt|application/mspow...|application/vnd.m...|5b7273d03f8490490...|2d8721e7876cb6697...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|           DANCE.ppt|      ppt|application/mspow...|application/vnd.m...|5aa3308433666a30a...|4a23bd20768501dac...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|            unit.ppt|      ppt|application/mspow...|application/vnd.m...|6736886864069ee66...|e92031e6e0293cb73...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|         majalah.ppt|      ppt|application/mspow...|application/vnd.m...|b6f219693ef1df49f...|1039013624cf8de35...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|esos_si_son_probl...|      pps|application/mspow...|application/vnd.m...|932221045b6154d7e...|b23a0238c852d28bb...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|    refinterview.ppt|      ppt|application/mspow...|application/vnd.m...|ca6fd4ec5fcb8237d...|8312ca4c0dbeb6008...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|         Schwind.ppt|      ppt|application/mspow...|application/vnd.m...|cfdd4bb6e7b04f24a...|9c26a8ac091f88a35...|0M8R4KGxGuEAAAAAA...|
+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
only showing top 20 rows
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

df.select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5", $"sha1", $"bytes")
  .orderBy(desc("md5"))
  .show()
```

Will extract all following information from spreadsheet files in a web collection:

- file url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|                 url|            filename|extension|mime_type_web_server|      mime_type_tika|                 md5|                sha1|               bytes|
+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|http://geocities....|     statuscarib.xls|      xls|application/vnd.m...|application/vnd.m...|f9fd18b158df52ff2...|0d606f25ac3c9abc4...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|       timesheet.xls|      xls|application/vnd.m...|application/vnd.m...|f9549db15de69bc21...|e9c239d812705842f...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|statusccusspring0...|      xls|application/vnd.m...|application/vnd.m...|ef99704e5a734f386...|f265fc5c581ad1762...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|  Laboratorio_05.xls|      xls|application/vnd.m...|application/vnd.m...|eb0e39898ba513234...|976f69da07122d285...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|110_Laboratorio_6...|      xls|application/vnd.m...|application/vnd.m...|e5b7fee6d4c45e171...|befd9670be70a4fdb...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|          Pakuan.xls|      xls|application/vnd.m...|application/vnd.m...|e386f85a7bd74b1ab...|5b2b142de2c57ec68...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|Spring08_statusre...|      xls|application/vnd.m...|application/vnd.m...|df2d6792fb55c4e26...|6f4d2aef711aff4e1...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|    CTtimetable2.xls|      xls|application/vnd.m...|application/vnd.m...|dc987d3e996677ce9...|40bb63a4c0038a6ae...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|MalibuTrailChalle...|      xls|application/vnd.m...|application/vnd.m...|dbba76ead82576178...|ffbe099441053b47b...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|     CTtimetable.xls|      xls|application/vnd.m...|application/vnd.m...|d9ee9117e70df43b5...|596c4c6d5cdc7ddb5...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|  1071_Parcial_2.xls|      xls|application/vnd.m...|application/vnd.m...|d90dc210138676a2c...|6e3ed07f50393815c...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|excelsubtractione...|      xls|application/vnd.m...|application/vnd.m...|d6c8314e52f22e4aa...|1b1ebce0f85628921...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|Fall2008_statusre...|      xls|application/vnd.m...|application/vnd.m...|cd9974430477b75ce...|0e756bbc38608cb51...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|        report01.xls|      xls|application/vnd.m...|application/vnd.m...|cd947fe4099df4fe3...|0f11d17d38a72977b...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|TrackRecords20010...|      xls|application/vnd.m...|application/vnd.m...|c8aa0122443efa0e5...|fa9cdb4a329f926bf...|0M8R4KGxGuEAAAAAA...|
|http://br.geociti...|  mycoinsforswap.xls|      xls|application/vnd.m...|application/vnd.m...|c665c83bc2b54292f...|18f1f3a4559d5c40a...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|     AAtimetable.xls|      xls|application/vnd.m...|application/vnd.m...|c66201762bf5e473e...|4e9bac4f217b0605d...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|   carwashroster.xls|      xls|application/vnd.m...|application/vnd.m...|c495d1b7dc954b975...|062167485baf9aa5d...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|         RSL_MDP.xls|      xls|application/vnd.m...|application/vnd.m...|bf6479bacbb758b52...|4d7ea33849447853d...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|  status_report4.xls|      xls|application/vnd.m...|application/vnd.m...|bc4d18e022522d185...|fc7b9fc64116c9ad1...|0M8R4KGxGuEAAAAAA...|
+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
only showing top 20 rows

import io.archivesunleashed._
import io.archivesunleashed.udfs._
df: org.apache.spark.sql.DataFrame = [url: string, filename: string ... 6 more fields]
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

- file url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|                 url|            filename|extension|mime_type_web_server|      mime_type_tika|                 md5|                sha1|               bytes|
+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|http://geocities....|        tkadrosu.xls|      xls|application/vnd.m...|application/vnd.m...|8033532f88da42ad6...|a52b24bc760c5265b...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|     cal_counter.xls|      xls|application/vnd.m...|application/vnd.m...|56ad6c2f84fdd4a88...|ad0db35f2d7ff2cca...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|    CTtimetable2.xls|      xls|application/vnd.m...|application/vnd.m...|dc987d3e996677ce9...|40bb63a4c0038a6ae...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|     AAtimetable.xls|      xls|application/vnd.m...|application/vnd.m...|c66201762bf5e473e...|4e9bac4f217b0605d...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|     CTtimetable.xls|      xls|application/vnd.m...|application/vnd.m...|d9ee9117e70df43b5...|596c4c6d5cdc7ddb5...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|    CTtimetable2.xls|      xls|application/vnd.m...|application/vnd.m...|a4ed4330d5c18f1b2...|d8ce479596d49679d...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|           teams.xls|      xls|application/vnd.m...|application/vnd.m...|334fa42776cef7f81...|aa57fda7fb634c931...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|      collection.xls|      xls|application/vnd.m...|application/vnd.m...|30d7a67de8150f712...|841ba91f009d48b7a...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|music-collection.xls|      xls|application/vnd.m...|application/vnd.m...|4def75fa96bae579d...|090a95923c9599454...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|          020103.xls|      xls|application/vnd.m...|application/vnd.m...|48651a7592ca1b0f0...|1e2438c8247d33870...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|          011803.xls|      xls|application/vnd.m...|application/vnd.m...|0aab8ed40f91c1c76...|8e02e408fe1ce40b9...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|     RSL_TorOton.xls|      xls|application/vnd.m...|application/vnd.m...|1d9c13c6407a2b696...|007010ecf5b208453...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|         members.xls|      xls|application/vnd.m...|application/vnd.m...|b045a6b118981c6eb...|3ae096d6602b7cb36...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|        round309.xls|      xls|application/vnd.m...|application/vnd.m...|50bed4b3e9facb278...|f26e0c38082141598...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|       result109.xls|      xls|application/vnd.m...|application/vnd.m...|2235d094897f10c3b...|6ed0b65fd43502a2b...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|TrackRecords20010...|      xls|application/vnd.m...|application/vnd.m...|c8aa0122443efa0e5...|fa9cdb4a329f926bf...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|           Digox.xls|      xls|application/vnd.m...|application/vnd.m...|182d08821797269c7...|80e7ce8ecc1ecf389...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|       RSL_SemBA.xls|      xls|application/vnd.m...|application/vnd.m...|59613700fbf08b795...|44eac99a514141520...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|         RSL_MDP.xls|      xls|application/vnd.m...|application/vnd.m...|bf6479bacbb758b52...|4d7ea33849447853d...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|       RSL_ARG99.xls|      xls|application/vnd.m...|application/vnd.m...|a2f2fd063dd5689a7...|61568e0f4139ec568...|0M8R4KGxGuEAAAAAA...|
+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
only showing top 20 rows
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

df.select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5", $"sha1", $"bytes")
  .orderBy(desc("md5"))
  .show()
```

Will extract all following information from videos in a web collection:

- file url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------------+--------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
|                 url|            filename|extension|mime_type_web_server| mime_type_tika|                 md5|                sha1|               bytes|
+--------------------+--------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
|http://geocities....|       videohead.avi|      avi|     video/x-msvideo|video/x-msvideo|fa9852748ba7b4829...|0be56f200f8e1cb83...|UklGRjoMIQBBVkkgT...|
|http://www.geocit...|       HandWrap2.avi|      avi|     video/x-msvideo|video/x-msvideo|f680cb463e7cb291e...|1d2ea1df3f5af2599...|UklGRrBrAgBBVkkgT...|
|http://geocities....|         1kungfu.avi|      avi|     video/x-msvideo|video/x-msvideo|f4429277ed4b48efb...|5c542e8990efd484b...|UklGRkoSFwBBVkkgT...|
|http://geocities....|  Vol_III_sample.mpg|      mpg|          video/mpeg|     video/mpeg|f2bc34f7294edc376...|a939dc619c123f81b...|AAABuiEAAdLxgA7xA...|
|http://geocities....|         wherego.avi|      avi|     video/x-msvideo|video/x-msvideo|f23976ddeb6f08810...|714a9a548f9b2a156...|UklGRkq4HgBBVkkgT...|
|http://geocities....|       couch100k.wmv|      asf|      video/x-ms-wmv| video/x-ms-asf|ee316d5871acb7859...|0593ebb8e450a6c3e...|MCaydY5mzxGm2QCqA...|
|http://geocities....|    Mitwa_Lagaan.mp3|       qt|          audio/mpeg|video/quicktime|ebc5db8d30edd0135...|d3ebdd6da2c732481...|AAAE6W1vb3YAAABsb...|
|http://www.geocit...|       tydunking.mpg|      mpg|          video/mpeg|     video/mpeg|eaa0d14dc05bdab98...|05d4ff2301d2d3818...|AAABuiEAAQALgBcdA...|
|http://geocities....|       bigjleroy.avi|      avi|     video/x-msvideo|video/x-msvideo|e93538f0d76b86cca...|ebeb89fc2fa8f7cd6...|UklGRrjUCgBBVkkgT...|
|http://geocities....|     NollieBs180.mov|      mov|     video/quicktime|video/quicktime|e7b97c287329340d5...|138fb8b0dea4c8e16...|AAAGwm1vb3YAAABsb...|
|http://www.geocit...|           shirt.avi|      avi|     video/x-msvideo|video/x-msvideo|e36119d3c78225cbf...|11af72475ca754639...|UklGRvhdHQBBVkkgT...|
|http://geocities....|          atdawn.wma|      asf|      audio/x-ms-wma| video/x-ms-asf|e1a85a79ea3ba5d96...|1be05aecdff99298c...|MCaydY5mzxGm2QCqA...|
|http://www.geocit...|non_will_go_to_wa...|      mov|     video/quicktime|video/quicktime|de6cc975363c4076b...|0c00d0be9c89f9e97...|AAs4JW1kYXQAAA70A...|
|http://geocities....|      Movies_20.mpeg|     mpeg|          video/mpeg|     video/mpeg|dd9d2af0c1318b5ff...|9d06f09744fe93408...|AAABuiEAV+PlgAU7A...|
|http://www.geocit...|        artilery.mpg|      mpg|          video/mpeg|     video/mpeg|dcecbdfe46448bffb...|0b292aab1078d9bfa...|AAABswsAkBP//+CkA...|
|http://geocities....| tancfigurakbbpl.wmv|      wmv|      video/x-ms-wmv| video/x-ms-wmv|dca4991392572dbc0...|cb349bdc35484d976...|MCaydY5mzxGm2QCqA...|
|http://www.geocit...|          Trevi2.mov|      mov|     video/quicktime|video/quicktime|dc882205f5cae38f5...|c9dd804e1ee140221...|AAAEvG1vb3YAAAS0Y...|
|http://www.geocit...|skillful_driving_...|      mpg|          video/mpeg|     video/mpeg|db8a767b00884e426...|f5a70cf5f091b530f...|AAABuiEAAQABgAORA...|
|http://geocities....|      jeremy100k.wmv|      asf|      video/x-ms-wmv| video/x-ms-asf|dafba744438ae0110...|d3a217ce25507ae90...|MCaydY5mzxGm2QCqA...|
|http://www.geocit...|           mbrl2.mpg|      mpg|          video/mpeg|     video/mpeg|d8eb5a12f0da99ca0...|8686002a444cc9dce...|AAABswsAkBP//+CkA...|
+--------------------+--------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
only showing top 20 rows

import io.archivesunleashed._
import io.archivesunleashed.udfs._
df: org.apache.spark.sql.DataFrame = [url: string, filename: string ... 6 more fields]
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

- file url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------------+--------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
|                 url|            filename|extension|mime_type_web_server| mime_type_tika|                 md5|                sha1|               bytes|
+--------------------+--------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
|http://www.geocit...|Sea_Dawgs_2008_Ha...|      wmv|      video/x-ms-wmv| video/x-ms-wmv|7b35e4cf60a3cfa67...|b35ad7242e8135326...|MCaydY5mzxGm2QCqA...|
|http://www.geocit...|       Excedrine.wmv|      wmv|      video/x-ms-wmv| video/x-ms-wmv|0aaf1d81ab6f2b354...|0b52af5f5facfd30f...|MCaydY5mzxGm2QCqA...|
|http://geocities....|        homework.avi|      avi|     video/x-msvideo|video/x-msvideo|4e06cbd11764cd2ac...|770a8849375965b20...|UklGRsrLAgBBVkkgT...|
|http://geocities....|    macarenababy.avi|      avi|     video/x-msvideo|video/x-msvideo|600084bbd732c0fda...|f99b2e31374d4ea18...|UklGRrC0AwBBVkkgT...|
|http://geocities....|orlando_viggokiss...|      wmv|      video/x-ms-asf| video/x-ms-wmv|79d093eb6184dba74...|395eaf6dcb29a66d2...|MCaydY5mzxGm2QCqA...|
|http://www.geocit...|skillful_driving_...|      mpg|          video/mpeg|     video/mpeg|db8a767b00884e426...|f5a70cf5f091b530f...|AAABuiEAAQABgAORA...|
|http://www.geocit...|gray_havens_2.35.MPG|      mpg|          video/mpeg|     video/mpeg|af71353d69af0b42f...|f3625b897339b0f23...|AAABuiEAAQABgAORA...|
|http://geocities....|         movie2.mpeg|     mpeg|          video/mpeg|     video/mpeg|3f6c7c48d2a990cf2...|760e6752bfd9e8a84...|AAABsxQA8MMCcSClE...|
|http://www.geocit...|       Sequence1.mov|      mov|     video/quicktime|video/quicktime|931fc4dee8aa260f9...|5a5cf58e2a50cf942...|AAELrG1vb3YAAABsb...|
|http://www.geocit...|           santa.mov|      mov|     video/quicktime|video/quicktime|8b9b98d0c567c4381...|49f49dd23c3bad61b...|AAAAIGZ0eXBxdCAgI...|
|http://geocities....|          0602-2.avi|      avi|     video/x-msvideo|video/x-msvideo|92d04dbe7f1bdc109...|65ed7327aece11bac...|UklGRkauOABBVkkgT...|
|http://geocities....|           movie.mpg|      mpg|          video/mpeg|     video/mpeg|a0e86539e5eb9bd35...|82eb4680a9f65ed1b...|AAABuiEAAdLxgASfA...|
|http://geocities....|     misshawaii.mpeg|     mpeg|          video/mpeg|     video/mpeg|45cbfc4d03547861b...|44c93f871ea602112...|AAABuiEAAQABgAORA...|
|http://geocities....|      Explosions.wmv|      wmv|      video/x-ms-wmv| video/x-ms-wmv|22cb24bffbd7eabf9...|a44d261ef5d7e7993...|MCaydY5mzxGm2QCqA...|
|http://geocities....|       couch100k.wmv|      asf|      video/x-ms-wmv| video/x-ms-asf|ee316d5871acb7859...|0593ebb8e450a6c3e...|MCaydY5mzxGm2QCqA...|
|http://geocities....|      jeremy100k.wmv|      asf|      video/x-ms-wmv| video/x-ms-asf|dafba744438ae0110...|d3a217ce25507ae90...|MCaydY5mzxGm2QCqA...|
|http://geocities....|       jedi_wade.mov|      mov|     video/quicktime|video/quicktime|674688fd09bf18d29...|cd21c3a5b9e2f18b6...|AAAFB21vb3YAAAT/Y...|
|http://geocities....|ylagallinanonosga...|      asf|      audio/x-ms-wma| video/x-ms-asf|9aac473134d7f2e7a...|3af7fbab238772f48...|MCaydY5mzxGm2QCqA...|
|http://geocities....|Chris-5050NollieS...|      mov|     video/quicktime|video/quicktime|93aa2ce07e01f90ad...|f066f29e5faf0cee1...|AAAHRG1vb3YAAABsb...|
|http://geocities....| floursack_jump2.avi|      avi|     video/x-msvideo|video/x-msvideo|a922441c0a7f0018d...|b82ca6fe1d46e16dc...|UklGRgjlAwBBVkkgT...|
+--------------------+--------------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
only showing top 20 rows
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

df.select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5", $"sha1", $"bytes")
  .orderBy(desc("md5"))
  .show()
```

Will extract all following information from word processor files in a web collection:

- file url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------------+--------------------+---------+--------------------+------------------+--------------------+--------------------+--------------------+
|                 url|            filename|extension|mime_type_web_server|    mime_type_tika|                 md5|                sha1|               bytes|
+--------------------+--------------------+---------+--------------------+------------------+--------------------+--------------------+--------------------+
|http://geocities....|infiniteproducts.doc|      doc|  application/msword|application/msword|ffa1ea83af6cb9508...|7a3ae86a7a22d2682...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|      Everything.doc|      doc|  application/msword|application/msword|ff7216edf86fe196c...|082a889c27640fc9a...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|          survey.doc|      doc|  application/msword|application/msword|ff48df5e64bd5adeb...|383ab6ead48795ff3...|0M8R4KGxGuEAAAAAA...|
|http://geocities....| iepWrkshpFall01.doc|      doc|  application/msword|application/msword|ff421feb87b826d39...|ec60a48d393642629...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|24_reproduction_s...|      doc|  application/msword|application/msword|fec21eb30fac4588e...|36b41ba66801b10b9...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|Descendit_ad_Infe...|      doc|  application/msword|application/msword|fe66eeb7c04942c8b...|14f207787abef983e...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|Anthropology21FEB...|      doc|  application/msword|application/msword|fe079d498bd5e91f2...|ca54e6be7c0618ecc...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|          Senses.doc|      doc|  application/msword|application/msword|fdf881ef998c227f7...|04d6e72132537053a...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|hopewel-loudon-cl...|      doc|  application/msword|application/msword|fddffbabcaf1976c9...|b7ade5d661dd597a1...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|   billmprev9899.doc|      doc|  application/msword|application/msword|fdcc8b65cfb0a18c9...|602f323278c9fb726...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|approachesProject...|      doc|  application/msword|application/msword|fd4df7f89efe9cea7...|4e7be7664bfe992f3...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|         batayan.doc|      doc|  application/msword|application/msword|fc6f45fdfce72d4a3...|e614c9b9e95d64aa6...|0M8R4KGxGuEAAAAAA...|
|http://geocities....| VisitUnitPacket.doc|      doc|  application/msword|application/msword|fc2a0e45b627c3d4a...|dc7ba874b7b13d548...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|vc3c3ppstudyguide...|      doc|  application/msword|application/msword|fc293bbddb906615f...|538aa0d5e2f554258...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|30_chordates_fish...|      doc|  application/msword|application/msword|fc053770a82822f69...|9df86863983889373...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|c6artposterexampl...|      doc|  application/msword|application/msword|fbe2427b48f32d1d9...|47de792202dc3a059...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|        kun20509.doc|      doc|  application/msword|application/msword|fb8d1ae5e3db45131...|6b13d73759a956e62...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|            kun20509|      doc|  application/msword|application/msword|fb8d1ae5e3db45131...|6b13d73759a956e62...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|         Fishing.doc|      doc|  application/msword|application/msword|fb7df7ac80aa2cc8a...|eb4bb266226349bac...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|      resumedoAw.doc|      doc|  application/msword|application/msword|fb6d5bf501b9b97b3...|1e0d6500192d4ee21...|0M8R4KGxGuEAAAAAA...|
+--------------------+--------------------+---------+--------------------+------------------+--------------------+--------------------+--------------------+
only showing top 20 rows

import io.archivesunleashed._
import io.archivesunleashed.udfs._
df: org.apache.spark.sql.DataFrame = [url: string, filename: string ... 6 more fields]
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

- file url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- bytes

```dataframe
+--------------------+--------------------+---------+--------------------+------------------+--------------------+--------------------+--------------------+
|                 url|            filename|extension|mime_type_web_server|    mime_type_tika|                 md5|                sha1|               bytes|
+--------------------+--------------------+---------+--------------------+------------------+--------------------+--------------------+--------------------+
|http://geocities....|            Doc2.doc|      doc|  application/msword|application/msword|09159efbefff59f64...|5412d6c55c2c8bec7...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|        CV-ITjob.doc|      doc|  application/msword|application/msword|7f2b7540e558de24e...|96a6ece7202ab309b...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|        CV-Teach.doc|      doc|  application/msword|application/msword|637bb22eff4bc5be5...|76130b6ffeac5c678...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|       CV-covlet.doc|      doc|  application/msword|application/msword|466c06bfa5a47d5cb...|dc763126cbdb589eb...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|        CV-extra.doc|      doc|  application/msword|application/msword|ab0fa931229c02a4b...|4c2a8200e6eaaafb2...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|020410Indonesia_N...|      doc|  application/msword|application/msword|b195e90841347be61...|6d2845902ad15a9a2...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|        Chapter1.doc|      doc|  application/msword|application/msword|65383c8c0cf5b6a4f...|fcf3008e9478b773c...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|CathyKoning_resum...|      doc|  application/msword|application/msword|924ad3f9f66d3c6bd...|2d0887c93ffd3e78b...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|  Greek_colonels.doc|      doc|  application/msword|application/msword|ee4b9db827086d0db...|94e5569e064195db5...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|         resume2.doc|      doc|  application/msword|application/msword|c39fa601733093268...|108563de6ba6102a5...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|     eta_writeup.doc|      doc|  application/msword|application/msword|661328d76ce3aa340...|debadb248da4dfbd3...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|Before_Night_Fall...|      doc|  application/msword|application/msword|a40371b35b4bf0838...|8f1dba8a46ea297b8...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|Membership_Form_2...|      doc|  application/msword|application/msword|bf3a3b8cc86b371c3...|472810e93a2245fb1...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|  walkthroughff1.doc|      doc|  application/msword|application/msword|c97de6941c3fb4aed...|16851a5445bdce07d...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|    Encyclopedia.doc|      doc|  application/msword|application/msword|26a94e8f3358c878c...|07f9b2ce6342f73bc...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|        Y.Kurulu.doc|      doc|  application/msword|application/msword|8e0ebe7c4f27b1841...|ebb5ce328f717f8e6...|0M8R4KGxGuEAAAAAA...|
|http://www.geocit...|      fifty_eggs.doc|      doc|  application/msword|application/msword|2c1cdd4f75030650e...|d022311b2fc399750...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|     1pitagoras2.doc|      doc|  application/msword|application/msword|e07ff47cb8ebc4356...|97d46d781458f5a82...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|    constitution.doc|      doc|  application/msword|application/msword|e38dc3e5d553d8799...|d50096b5208146ce9...|0M8R4KGxGuEAAAAAA...|
|http://geocities....|     feasibility.doc|      doc|  application/msword|application/msword|5574bf82d65935191...|53de74880c9ea2e2b...|0M8R4KGxGuEAAAAAA...|
+--------------------+--------------------+---------+--------------------+------------------+--------------------+--------------------+--------------------+
only showing top 20 rows
```
