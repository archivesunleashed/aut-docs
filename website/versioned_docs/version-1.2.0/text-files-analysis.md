---
id: version-1.2.0-text-files-analysis
title: Text Files (html, text, css, js, json, xml) Analysis
original_id: text-files-analysis
---

## Extract CSS Information

### Scala RDD

**Will not be implemented.**

### Scala DF

The following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).css();

df.show()
```

Will extract all following information from css files in a web collection:

- crawl date
- last modified date
- css url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+------------------+--------------------+-----------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|    crawl_date|last_modified_date|                 url|         filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|             content|
+--------------+------------------+--------------------+-----------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|20091027143356|    20081201152149|http://geocities....|     will1011.css|      css|            text/css|    text/plain|697e9a984ec5432f0...|ac2343fc128b90c22...|.mstheme{\r\nnav-...|
|20091027143400|    20021203112405|http://geocities....|affl_flmstyle.css|      css|            text/css|    text/plain|c3b976fe4d295f76e...|171967d23d5a44434...|td { font-family:...|
|20091027143406|    20040120180918|http://geocities....|        myCss.css|      css|            text/css|    text/plain|6dc7da3d87cd15674...|b0a3eeb60a809527e...|/* Generic Select...|
|20091027143408|    20040711165229|http://geocities....|         def2.css|      css|            text/css|    text/plain|806da7dcf79931c9e...|14ea1e704ce84f578...|body\r\n{\r\n\tsc...|
|20091027143410|    20030613194405|http://geocities....|    uni1style.css|      css|            text/css|    text/plain|ff2d35d5548169924...|d961c786665e69c30...|body { background...|
|20091027143431|    20090406121936|http://geocities....|        style.css|      css|            text/css|    text/plain|60a5a8cb4f9694179...|452a40545b570b043...|﻿/*\nTheme  ...|
|20091027143453|    20010320155440|http://geocities....|        theme.css|      css|            text/css|    text/plain|afd79d6ebc4918d84...|233fd343a931a8a6b...|.mstheme\r\n{\r\n...|
|20091027143503|    20010320155430|http://geocities....|       color0.css|      css|            text/css|    text/plain|c237436a24f67c96c...|806351cc2fb654fc7...|a:link\r\n{\r\n\t...|
|20091027143511|    20010320155438|http://geocities....|       graph1.css|      css|            text/css|    text/plain|2d3bd2eed7b7290fc...|de4c2c0dc23d5d40d...|.mstheme\r\n{\r\n...|
|20091027143512|    20010320155436|http://geocities....|       graph0.css|      css|            text/css|    text/plain|af18d7c1ab29918e7...|78b3f781992894c9f...|.mstheme\r\n{\r\n...|
|20091027143540|    20000503224221|http://geocities....|       graph1.css|      css|            text/css|    text/plain|d67df8c9f7b5ff787...|338fa4a9a3d7174ef...|.mstheme\r\n{\r\n...|
|20091027143545|    20000503224217|http://geocities....|       color1.css|      css|            text/css|    text/plain|58f313e384d212b71...|193f89e84b25d1614...|a:link\r\n{\r\n\t...|
|20091027143551|    20000503224220|http://geocities....|       graph0.css|      css|            text/css|    text/plain|f5a58785538278992...|109cc3f90e40c66d2...|.mstheme\r\n{\r\n...|
|20091027143554|    20010824074320|http://geocities....|      formate.css|      css|            text/css|    text/plain|be7d072735ad829cf...|a5a0ea5aaf1404713...|h1 { font-size: 1...|
|20091027143600|    20030221224917|http://geocities....|        misc1.css|      css|            text/css|    text/plain|5852d4b0ed5191e47...|f73a37079de2987f6...|body {background:...|
|20091027143659|    20030119042931|http://geocities....|       census.css|      css|            text/css|    text/plain|2eb62774ed251df55...|f6165cc47bd8c46b9...|/* At-Rules */\r\...|
|20091027143721|    20010606220428|http://geocities....|   hauptseite.css|      css|            text/css|    text/plain|87848cebf5ac11eb8...|9948813069d63a0d0...|body {\r\n backgr...|
|20091027143755|    20040316190038|http://geocities....|        style.css|      css|            text/css|    text/plain|b47758ca22799bc7c...|994ecd200c1bfa6c5...|blockquote,div,p,...|
|20091027143757|    20020918082310|http://geocities....|    nomburdua.css|      css|            text/css|    text/plain|c6fe67b54b78b633f...|4dd03720d85f2f982...|.ranti {  font-fa...|
|20091027143842|    20040703142500|http://geocities....|         main.css|      css|            text/css|    text/plain|f7582c9838bebc55b...|cb6e02313c6a5bc99...|.commands {\r\n\t...|
+--------------+------------------+--------------------+-----------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.css()
df.show()
```

Will extract all following information from css files in a web collection:

- crawl date
- last modified date
- css url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+------------------+--------------------+-----------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|    crawl_date|last_modified_date|                 url|         filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|             content|
+--------------+------------------+--------------------+-----------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|20091027143356|    20081201152149|http://geocities....|     will1011.css|      css|            text/css|    text/plain|697e9a984ec5432f0...|ac2343fc128b90c22...|.mstheme{\r\nnav-...|
|20091027143400|    20021203112405|http://geocities....|affl_flmstyle.css|      css|            text/css|    text/plain|c3b976fe4d295f76e...|171967d23d5a44434...|td { font-family:...|
|20091027143406|    20040120180918|http://geocities....|        myCss.css|      css|            text/css|    text/plain|6dc7da3d87cd15674...|b0a3eeb60a809527e...|/* Generic Select...|
|20091027143408|    20040711165229|http://geocities....|         def2.css|      css|            text/css|    text/plain|806da7dcf79931c9e...|14ea1e704ce84f578...|body\r\n{\r\n\tsc...|
|20091027143410|    20030613194405|http://geocities....|    uni1style.css|      css|            text/css|    text/plain|ff2d35d5548169924...|d961c786665e69c30...|body { background...|
|20091027143431|    20090406121936|http://geocities....|        style.css|      css|            text/css|    text/plain|60a5a8cb4f9694179...|452a40545b570b043...|﻿/*\nTheme  ...|
|20091027143453|    20010320155440|http://geocities....|        theme.css|      css|            text/css|    text/plain|afd79d6ebc4918d84...|233fd343a931a8a6b...|.mstheme\r\n{\r\n...|
|20091027143503|    20010320155430|http://geocities....|       color0.css|      css|            text/css|    text/plain|c237436a24f67c96c...|806351cc2fb654fc7...|a:link\r\n{\r\n\t...|
|20091027143511|    20010320155438|http://geocities....|       graph1.css|      css|            text/css|    text/plain|2d3bd2eed7b7290fc...|de4c2c0dc23d5d40d...|.mstheme\r\n{\r\n...|
|20091027143512|    20010320155436|http://geocities....|       graph0.css|      css|            text/css|    text/plain|af18d7c1ab29918e7...|78b3f781992894c9f...|.mstheme\r\n{\r\n...|
|20091027143540|    20000503224221|http://geocities....|       graph1.css|      css|            text/css|    text/plain|d67df8c9f7b5ff787...|338fa4a9a3d7174ef...|.mstheme\r\n{\r\n...|
|20091027143545|    20000503224217|http://geocities....|       color1.css|      css|            text/css|    text/plain|58f313e384d212b71...|193f89e84b25d1614...|a:link\r\n{\r\n\t...|
|20091027143551|    20000503224220|http://geocities....|       graph0.css|      css|            text/css|    text/plain|f5a58785538278992...|109cc3f90e40c66d2...|.mstheme\r\n{\r\n...|
|20091027143554|    20010824074320|http://geocities....|      formate.css|      css|            text/css|    text/plain|be7d072735ad829cf...|a5a0ea5aaf1404713...|h1 { font-size: 1...|
|20091027143600|    20030221224917|http://geocities....|        misc1.css|      css|            text/css|    text/plain|5852d4b0ed5191e47...|f73a37079de2987f6...|body {background:...|
|20091027143659|    20030119042931|http://geocities....|       census.css|      css|            text/css|    text/plain|2eb62774ed251df55...|f6165cc47bd8c46b9...|/* At-Rules */\r\...|
|20091027143721|    20010606220428|http://geocities....|   hauptseite.css|      css|            text/css|    text/plain|87848cebf5ac11eb8...|9948813069d63a0d0...|body {\r\n backgr...|
|20091027143755|    20040316190038|http://geocities....|        style.css|      css|            text/css|    text/plain|b47758ca22799bc7c...|994ecd200c1bfa6c5...|blockquote,div,p,...|
|20091027143757|    20020918082310|http://geocities....|    nomburdua.css|      css|            text/css|    text/plain|c6fe67b54b78b633f...|4dd03720d85f2f982...|.ranti {  font-fa...|
|20091027143842|    20040703142500|http://geocities....|         main.css|      css|            text/css|    text/plain|f7582c9838bebc55b...|cb6e02313c6a5bc99...|.commands {\r\n\t...|
+--------------+------------------+--------------------+-----------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
```

## Extract HTML Information

### Scala RDD

**Will not be implemented.**

### Scala DF

The following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).html();

df.show()
```

Will extract all following information from HTML files in a web collection:

- crawl date
- last modified date
- html url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+------------------+--------------------+------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|    crawl_date|last_modified_date|                 url|          filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|             content|
+--------------+------------------+--------------------+------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|20091027143351|    20000807145505|http://geocities....|        sld016.htm|      htm|           text/html|    text/plain|127471f3dffa3b0fe...|1c6e3cf8a95ff488f...|\r\n<!--  Present...|
|20091027143351|                  |http://geocities....|                  |     html|           text/html|     text/html|8529ca97e911200cd...|413009a3dd18247d9...|<!DOCTYPE HTML PU...|
|20091027143351|    20010418111505|http://geocities....|           07.html|     html|           text/html|     text/html|2ed0eb187604be1b5...|879ac81e08cde20df...|<html>\r\n<head>\...|
|20091027143351|    20090223023317|http://geocities....|       webpgs.html|     html|           text/html|     text/html|647f21084b24b4413...|d3bceb1e246e883d6...|<HTML><HEAD><TITL...|
|20091027143351|    19990606173754|http://www.geocit...|         ories.htm|      htm|           text/html|     text/html|c97248fb58f5471fe...|ee0935ab18ad6e484...|<!DOCTYPE HTML PU...|
|20091027143351|                  |http://geocities....|                  |     html|           text/html|     text/html|e097ef39e1b8808cb...|4c2488eb2555d7d47...|<!DOCTYPE HTML PU...|
|20091027143351|    20030916023140|http://www.geocit...|    Lienhardt.html|     html|           text/html|     text/html|e8e63dd31072b9fab...|cacc7f50003470cbe...|<html>\n<head>\n<...|
|20091027143351|    20011230150100|http://geocities....|HeartsDelight.html|     html|           text/html|     text/html|367899cf7951c8b71...|828e90996c75b0e8c...|<html>\r\n<head>\...|
|20091027143351|    20010418112637|http://geocities....|           13.html|     html|           text/html|     text/html|73512de4bd8a74d8e...|4911b7b2b6644d96d...|<html>\r\n<head>\...|
|20091027143351|    20090223023317|http://geocities....|          man2.jpg|     html|           text/html|     text/html|647f21084b24b4413...|d3bceb1e246e883d6...|<HTML><HEAD><TITL...|
|20091027143346|                  |http://geocities....|                  |     html|           text/html|     text/html|7f873717f2fd67b8a...|c0ca5f1ae47e57ba6...|<!DOCTYPE HTML PU...|
|20091027143351|                  |http://geocities....|                  |     html|           text/html|     text/html|0b0effa7a9b9ddb7b...|0e2761aabcd497698...|<!DOCTYPE HTML PU...|
|20091027143352|    20000807145520|http://geocities....|        sld014.htm|      htm|           text/html|    text/plain|6efe8c845e4766ca1...|6aa94ff9dee0a6728...|\r\n<!--  Present...|
|20091027143352|                  |http://geocities....|                  |     html|           text/html|     text/html|876a360d146635039...|f6b2ede1616aa2baa...|<!DOCTYPE HTML PU...|
|20091027143352|                  |http://geocities....|                  |     html|           text/html|     text/html|7d6c71d92d1682923...|30c30cdaf888390b9...|<!DOCTYPE HTML PU...|
|20091027143352|                  |http://geocities....|                  |     html|           text/html|     text/html|159df7ea020a07600...|7b7e5bc7a6c1c871b...|<!DOCTYPE HTML PU...|
|20091027143352|    20000807145500|http://geocities....|        sld012.htm|      htm|           text/html|    text/plain|1714d4cb34af991a8...|58289c263e392f1dd...|\r\n<!--  Present...|
|20091027143351|                  |http://geocities....|                  |     html|           text/html|     text/html|bbbfe9f8c5fa52d56...|e753a8e24518c0db4...|<!DOCTYPE HTML PU...|
|20091027143356|    19990606173419|http://www.geocit...|          maps.htm|      htm|           text/html|     text/html|28d2c8b2ffdd85f43...|9931f86198bebc831...|<!DOCTYPE HTML PU...|
|20091027143356|    20040119230348|http://geocities....|    3368class.html|     html|           text/html|     text/html|0ed6f056e7996ee62...|caaf8a4f17dab8932...|<!DOCTYPE HTML PU...|
+--------------+------------------+--------------------+------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.html()
df.show()
```

Will extract all following information from HTML files in a web collection:

- crawl date
- last modified date
- html url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+------------------+--------------------+------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|    crawl_date|last_modified_date|                 url|          filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|             content|
+--------------+------------------+--------------------+------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|20091027143351|    20000807145505|http://geocities....|        sld016.htm|      htm|           text/html|    text/plain|127471f3dffa3b0fe...|1c6e3cf8a95ff488f...|\r\n<!--  Present...|
|20091027143351|                  |http://geocities....|                  |     html|           text/html|     text/html|8529ca97e911200cd...|413009a3dd18247d9...|<!DOCTYPE HTML PU...|
|20091027143351|    20010418111505|http://geocities....|           07.html|     html|           text/html|     text/html|2ed0eb187604be1b5...|879ac81e08cde20df...|<html>\r\n<head>\...|
|20091027143351|    20090223023317|http://geocities....|       webpgs.html|     html|           text/html|     text/html|647f21084b24b4413...|d3bceb1e246e883d6...|<HTML><HEAD><TITL...|
|20091027143351|    19990606173754|http://www.geocit...|         ories.htm|      htm|           text/html|     text/html|c97248fb58f5471fe...|ee0935ab18ad6e484...|<!DOCTYPE HTML PU...|
|20091027143351|                  |http://geocities....|                  |     html|           text/html|     text/html|e097ef39e1b8808cb...|4c2488eb2555d7d47...|<!DOCTYPE HTML PU...|
|20091027143351|    20030916023140|http://www.geocit...|    Lienhardt.html|     html|           text/html|     text/html|e8e63dd31072b9fab...|cacc7f50003470cbe...|<html>\n<head>\n<...|
|20091027143351|    20011230150100|http://geocities....|HeartsDelight.html|     html|           text/html|     text/html|367899cf7951c8b71...|828e90996c75b0e8c...|<html>\r\n<head>\...|
|20091027143351|    20010418112637|http://geocities....|           13.html|     html|           text/html|     text/html|73512de4bd8a74d8e...|4911b7b2b6644d96d...|<html>\r\n<head>\...|
|20091027143351|    20090223023317|http://geocities....|          man2.jpg|     html|           text/html|     text/html|647f21084b24b4413...|d3bceb1e246e883d6...|<HTML><HEAD><TITL...|
|20091027143346|                  |http://geocities....|                  |     html|           text/html|     text/html|7f873717f2fd67b8a...|c0ca5f1ae47e57ba6...|<!DOCTYPE HTML PU...|
|20091027143351|                  |http://geocities....|                  |     html|           text/html|     text/html|0b0effa7a9b9ddb7b...|0e2761aabcd497698...|<!DOCTYPE HTML PU...|
|20091027143352|    20000807145520|http://geocities....|        sld014.htm|      htm|           text/html|    text/plain|6efe8c845e4766ca1...|6aa94ff9dee0a6728...|\r\n<!--  Present...|
|20091027143352|                  |http://geocities....|                  |     html|           text/html|     text/html|876a360d146635039...|f6b2ede1616aa2baa...|<!DOCTYPE HTML PU...|
|20091027143352|                  |http://geocities....|                  |     html|           text/html|     text/html|7d6c71d92d1682923...|30c30cdaf888390b9...|<!DOCTYPE HTML PU...|
|20091027143352|                  |http://geocities....|                  |     html|           text/html|     text/html|159df7ea020a07600...|7b7e5bc7a6c1c871b...|<!DOCTYPE HTML PU...|
|20091027143352|    20000807145500|http://geocities....|        sld012.htm|      htm|           text/html|    text/plain|1714d4cb34af991a8...|58289c263e392f1dd...|\r\n<!--  Present...|
|20091027143351|                  |http://geocities....|                  |     html|           text/html|     text/html|bbbfe9f8c5fa52d56...|e753a8e24518c0db4...|<!DOCTYPE HTML PU...|
|20091027143356|    19990606173419|http://www.geocit...|          maps.htm|      htm|           text/html|     text/html|28d2c8b2ffdd85f43...|9931f86198bebc831...|<!DOCTYPE HTML PU...|
|20091027143356|    20040119230348|http://geocities....|    3368class.html|     html|           text/html|     text/html|0ed6f056e7996ee62...|caaf8a4f17dab8932...|<!DOCTYPE HTML PU...|
+--------------+------------------+--------------------+------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
```

## Extract Javascript Information

### Scala RDD

**Will not be implemented.**

### Scala DF

The following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).js();

df.show()
```

Will extract all following information from Javascript files in a web collection:

- crawl date
- last modified date
- Javascript url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+------------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|    crawl_date|last_modified_date|                 url|            filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|             content|
+--------------+------------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|20091027143359|    20021220182656|http://geocities....|affl_2002teams_ve...|       js|application/x-jav...|    text/plain|ecc947cf41560248f...|e200d0cc8d167e588...|//  Copyright (c)...|
|20091027143359|    20021220182656|http://geocities....|affl_2002menu_ver...|       js|application/x-jav...|    text/plain|9ed4199ccb9aadbc6...|ade6e33984a571b4f...|//  Copyright (c)...|
|20091027143359|    20021220182657|http://geocities....|affl_2002weeks_ho...|       js|application/x-jav...|    text/plain|e1d530ba9a3113f76...|21fe28b0bb00fc2ea...|//  Copyright (c)...|
|20091027143401|    20071025193708|http://geocities....|          effects.js|       js|application/x-jav...|    text/plain|82e25a810f86d3b8c...|21ce51daa693e3716...|// Copyright (c) ...|
|20091027143402|    20071025193708|http://geocities....|    scriptaculous.js|       js|application/x-jav...|    text/plain|696bd054b0069b607...|914db330c7fe585df...|// Copyright (c) ...|
|20091027143431|    20090406122000|http://geocities....|              oea.js|       js|application/x-jav...|    text/plain|500ceaa723d95be31...|6185b986af821a054...|addComment={moveF...|
|20091027143433|    20090406122000|http://geocities....|             shot.js|       js|application/x-jav...|    text/plain|cc408c7eba68a6378...|23545b737b19f34c7...|//<!--\n/*! Snap ...|
|20091027143502|    20010925080657|http://geocities....|           bubble.js|       js|application/x-jav...|    text/plain|b11424d14656b3e5e...|36655a71af25d6360...|//+--------------...|
|20091027143509|    20010925101649|http://geocities....|          puzzlex.js|       js|application/x-jav...|    text/plain|0fddc85095cc2476f...|74be255b206285af2...|// ------ this fu...|
|20091027143724|    20000906162714|http://geocities....|            geov2.js|       js|application/x-jav...|    text/plain|26821d2d7f896da03...|29c53eaed516ff43c...|var ycsdone;\nfun...|
|20091027143726|    20090329164941|http://geocities....|             shot.js|       js|application/x-jav...|    text/plain|cc408c7eba68a6378...|23545b737b19f34c7...|//<!--\n/*! Snap ...|
|20091027143728|    20090329164941|http://geocities....|              yre.js|       js|application/x-jav...|    text/plain|500ceaa723d95be31...|6185b986af821a054...|addComment={moveF...|
|20091027143806|    20061210200851|http://geocities....|ActiveContent_Fla...|       js|application/x-jav...|    text/plain|7a1ee205b2dea3f29...|5c52c1be91092b6ef...|/*\r\nIE Flash Ac...|
|20091027143809|    20080407182913|http://geocities....|ActiveContent_Fla...|       js|application/x-jav...|    text/plain|7a1ee205b2dea3f29...|5c52c1be91092b6ef...|/*\r\nIE Flash Ac...|
|20091027143855|    20010303131242|http://www.geocit...|    VMaxDynoMenu3.js|       js|application/x-jav...|    text/plain|029fd2e9f9d2973c3...|c30650399cfc15e8e...|/****************...|
|20091027143908|    20020404031834|http://www.geocit...|vmaxformvalidator.js|       js|application/x-jav...|    text/plain|359e439b13a5fcfd6...|db3db85d75f1086f2...|/****************...|
|20091027143921|    20071031154845|http://geocities....|        op7-build.js|       js|application/x-jav...|    text/plain|c106186f7f04a432e...|082169240fa1a1927...|var docType = (do...|
|20091027143922|    20071031154845|http://geocities....|        saf-build.js|       js|application/x-jav...|    text/plain|93f06ba888f3ed236...|05c4966a8cd488a33...|var docType = (do...|
|20091027143923|    20071031154845|http://geocities....|       ie5m-build.js|       js|application/x-jav...|    text/plain|584a5769d7aa1a80e...|1e17f55615d38cbed...|var docType = (do...|
|20091027143924|    20071031154845|http://geocities....|        ns4-build.js|       js|application/x-jav...|    text/plain|0f7a424f607eba6ab...|3d184d00c2f568bfa...|window.onresize =...|
+--------------+------------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.js()
df.show()
```

Will extract all following information from Javascript files in a web collection:

- crawl date
- last modified date
- Javascript url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+------------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|    crawl_date|last_modified_date|                 url|            filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|             content|
+--------------+------------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|20091027143359|    20021220182656|http://geocities....|affl_2002teams_ve...|       js|application/x-jav...|    text/plain|ecc947cf41560248f...|e200d0cc8d167e588...|//  Copyright (c)...|
|20091027143359|    20021220182656|http://geocities....|affl_2002menu_ver...|       js|application/x-jav...|    text/plain|9ed4199ccb9aadbc6...|ade6e33984a571b4f...|//  Copyright (c)...|
|20091027143359|    20021220182657|http://geocities....|affl_2002weeks_ho...|       js|application/x-jav...|    text/plain|e1d530ba9a3113f76...|21fe28b0bb00fc2ea...|//  Copyright (c)...|
|20091027143401|    20071025193708|http://geocities....|          effects.js|       js|application/x-jav...|    text/plain|82e25a810f86d3b8c...|21ce51daa693e3716...|// Copyright (c) ...|
|20091027143402|    20071025193708|http://geocities....|    scriptaculous.js|       js|application/x-jav...|    text/plain|696bd054b0069b607...|914db330c7fe585df...|// Copyright (c) ...|
|20091027143431|    20090406122000|http://geocities....|              oea.js|       js|application/x-jav...|    text/plain|500ceaa723d95be31...|6185b986af821a054...|addComment={moveF...|
|20091027143433|    20090406122000|http://geocities....|             shot.js|       js|application/x-jav...|    text/plain|cc408c7eba68a6378...|23545b737b19f34c7...|//<!--\n/*! Snap ...|
|20091027143502|    20010925080657|http://geocities....|           bubble.js|       js|application/x-jav...|    text/plain|b11424d14656b3e5e...|36655a71af25d6360...|//+--------------...|
|20091027143509|    20010925101649|http://geocities....|          puzzlex.js|       js|application/x-jav...|    text/plain|0fddc85095cc2476f...|74be255b206285af2...|// ------ this fu...|
|20091027143724|    20000906162714|http://geocities....|            geov2.js|       js|application/x-jav...|    text/plain|26821d2d7f896da03...|29c53eaed516ff43c...|var ycsdone;\nfun...|
|20091027143726|    20090329164941|http://geocities....|             shot.js|       js|application/x-jav...|    text/plain|cc408c7eba68a6378...|23545b737b19f34c7...|//<!--\n/*! Snap ...|
|20091027143728|    20090329164941|http://geocities....|              yre.js|       js|application/x-jav...|    text/plain|500ceaa723d95be31...|6185b986af821a054...|addComment={moveF...|
|20091027143806|    20061210200851|http://geocities....|ActiveContent_Fla...|       js|application/x-jav...|    text/plain|7a1ee205b2dea3f29...|5c52c1be91092b6ef...|/*\r\nIE Flash Ac...|
|20091027143809|    20080407182913|http://geocities....|ActiveContent_Fla...|       js|application/x-jav...|    text/plain|7a1ee205b2dea3f29...|5c52c1be91092b6ef...|/*\r\nIE Flash Ac...|
|20091027143855|    20010303131242|http://www.geocit...|    VMaxDynoMenu3.js|       js|application/x-jav...|    text/plain|029fd2e9f9d2973c3...|c30650399cfc15e8e...|/****************...|
|20091027143908|    20020404031834|http://www.geocit...|vmaxformvalidator.js|       js|application/x-jav...|    text/plain|359e439b13a5fcfd6...|db3db85d75f1086f2...|/****************...|
|20091027143921|    20071031154845|http://geocities....|        op7-build.js|       js|application/x-jav...|    text/plain|c106186f7f04a432e...|082169240fa1a1927...|var docType = (do...|
|20091027143922|    20071031154845|http://geocities....|        saf-build.js|       js|application/x-jav...|    text/plain|93f06ba888f3ed236...|05c4966a8cd488a33...|var docType = (do...|
|20091027143923|    20071031154845|http://geocities....|       ie5m-build.js|       js|application/x-jav...|    text/plain|584a5769d7aa1a80e...|1e17f55615d38cbed...|var docType = (do...|
|20091027143924|    20071031154845|http://geocities....|        ns4-build.js|       js|application/x-jav...|    text/plain|0f7a424f607eba6ab...|3d184d00c2f568bfa...|window.onresize =...|
+--------------+------------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
```

## Extract JSON Information

### Scala RDD

**Will not be implemented.**

### Scala DF

The following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).json();

df.show()
```

Will extract all following information from JSON files in a web collection:

- crawl date
- last modified date
- JSON url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+------------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|    crawl_date|last_modified_date|                 url|            filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|             content|
+--------------+------------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|20200629190008|                  |https://map.toron...|findAddressCandid...|     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200629190022|                  |https://c.oraclei...|          robots.txt|     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200629190148|                  |https://www.toron...|                    |     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200629190152|                  |https://www.toron...|                    |     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200629190302|                  |https://www.toron...|                    |     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200817190116|                  |https://api.ontar...|page%2Fhow-ontari...|     json|    application/json|    text/plain|15c31f1d6321af994...|9fe80f13837add909...|{"_id":"5f3a984bc...|
|20200817190119|                  |https://api.ontar...|page%2Fhow-ontari...|     json|    application/json|    text/plain|05a4b7753855bdc62...|6fe1660d9664c3b78...|{"_id":"5f3a984bc...|
|20200721190037|                  |https://map.toron...|findAddressCandid...|     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200721190451|                  |https://www.toron...|                    |     json|    application/json|    text/plain|ec308cb0f98033491...|694def805e20eb826...|[{"answer":"Monit...|
|20200721191757|                  |https://c.oraclei...|          robots.txt|     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200721191846|                  |https://www.toron...|                    |     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200721191858|                  |https://www.toron...|                    |     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200808190252|                  |https://api.ontar...|page%2Fhow-ontari...|     json|    application/json|    text/plain|08816f4b398bb1228...|78e73437f1b8085ab...|{"_id":"5f2ec105c...|
|20200808190257|                  |https://api.ontar...|page%2Fhow-ontari...|     json|    application/json|    text/plain|554d765096250e4e4...|861c69ee9c671c716...|{"_id":"5f2ec105c...|
|20200721191749|                  |https://api.ontar...|page%2Fhow-ontari...|     json|    application/json|    text/plain|622058a03b029934f...|2fd5dbdf3c51678d0...|{"_id":"5f16ff51c...|
|20200721191751|                  |https://api.ontar...|page%2Fhow-ontari...|     json|    application/json|    text/plain|fe91df263ed26a5cb...|e59d5e0eb0eadff05...|{"_id":"5f16ff51c...|
|20200716190031|                  |https://c.oraclei...|          robots.txt|     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200716190055|                  |https://map.toron...|findAddressCandid...|     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200716190605|                  |https://www.toron...|                    |     json|    application/json|    text/plain|8d6accf32259c10e4...|b28ce854dee0e169e...|[{"answer":"Monit...|
|20200716190702|                  |https://www.toron...|                    |     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
+--------------+------------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.json()
df.show()
```

Will extract all following information from JSON files in a web collection:

- crawl date
- last modified date
- JSON url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+------------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|    crawl_date|last_modified_date|                 url|            filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|             content|
+--------------+------------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|20200629190008|                  |https://map.toron...|findAddressCandid...|     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200629190022|                  |https://c.oraclei...|          robots.txt|     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200629190148|                  |https://www.toron...|                    |     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200629190152|                  |https://www.toron...|                    |     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200629190302|                  |https://www.toron...|                    |     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200817190116|                  |https://api.ontar...|page%2Fhow-ontari...|     json|    application/json|    text/plain|15c31f1d6321af994...|9fe80f13837add909...|{"_id":"5f3a984bc...|
|20200817190119|                  |https://api.ontar...|page%2Fhow-ontari...|     json|    application/json|    text/plain|05a4b7753855bdc62...|6fe1660d9664c3b78...|{"_id":"5f3a984bc...|
|20200721190037|                  |https://map.toron...|findAddressCandid...|     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200721190451|                  |https://www.toron...|                    |     json|    application/json|    text/plain|ec308cb0f98033491...|694def805e20eb826...|[{"answer":"Monit...|
|20200721191757|                  |https://c.oraclei...|          robots.txt|     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200721191846|                  |https://www.toron...|                    |     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200721191858|                  |https://www.toron...|                    |     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200808190252|                  |https://api.ontar...|page%2Fhow-ontari...|     json|    application/json|    text/plain|08816f4b398bb1228...|78e73437f1b8085ab...|{"_id":"5f2ec105c...|
|20200808190257|                  |https://api.ontar...|page%2Fhow-ontari...|     json|    application/json|    text/plain|554d765096250e4e4...|861c69ee9c671c716...|{"_id":"5f2ec105c...|
|20200721191749|                  |https://api.ontar...|page%2Fhow-ontari...|     json|    application/json|    text/plain|622058a03b029934f...|2fd5dbdf3c51678d0...|{"_id":"5f16ff51c...|
|20200721191751|                  |https://api.ontar...|page%2Fhow-ontari...|     json|    application/json|    text/plain|fe91df263ed26a5cb...|e59d5e0eb0eadff05...|{"_id":"5f16ff51c...|
|20200716190031|                  |https://c.oraclei...|          robots.txt|     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200716190055|                  |https://map.toron...|findAddressCandid...|     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20200716190605|                  |https://www.toron...|                    |     json|    application/json|    text/plain|8d6accf32259c10e4...|b28ce854dee0e169e...|[{"answer":"Monit...|
|20200716190702|                  |https://www.toron...|                    |     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
+--------------+------------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
```

## Extract Plain Text Information

### Scala RDD

**Will not be implemented.**

### Scala DF

The following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).plainText();

df.show()
```

Will extract all following information from plain text files in a web collection:

- crawl date
- last modified date
- Plain text url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+------------------+--------------------+-------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|    crawl_date|last_modified_date|                 url|     filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|             content|
+--------------+------------------+--------------------+-------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|20091027143357|    20050624112247|http://geocities....|      100.txt|      txt|          text/plain|    text/plain|d551b4e1341fedeb1...|6da698a82e6f2cd86...|Checklist With Pe...|
|20091027143453|    20030614122143|http://geocities....| Password.pas|      txt|          text/plain|    text/plain|af14db1afe4e91655...|94639d5ae81de1829...|michael\r\njacob\...|
|20091027143503|    20081106140745|http://www.knatte...|   robots.txt|      txt|          text/plain|    text/plain|48ca1fcf2991ae97e...|a2a115de2795276ab...|# parking, see cv...|
|20091027143514|    20071122094558|http://geocities....| plansite.txt|      txt|          text/plain|    text/plain|e6bda66886cf51a42...|70514bd62a54738dc...|Index.html\r\n\r\...|
|20091027143519|    20070628091530|http://geocities....|  xmldata.txt|      txt|          text/plain|    text/plain|3c66ec8b796fd012a...|934ba89998a9f9089...|set xmlDoc=Create...|
|20091027143530|    20090310131332|http://geocities....|Manhattan.txt|      txt|          text/plain|    text/plain|33bec040c2319f50d...|8b78c2a100dc13687...|Endwich Bank \r\n...|
|20091027143604|    20030802211911|http://geocities....|   WS_FTP.LOG|      txt|          text/plain|    text/plain|b9132d6f9170ece38...|0b66844444a894955...|2003.08.02 03:01 ...|
|20091027143610|    20040929172044|http://geocities....|1-teras-1.txt|      txt|          text/plain|    text/plain|ca1cdfd1b1ae53d02...|2e9d01175b3b549f1...|KASIH FOTO DJAKA ...|
|20091027143610|    20040929172044|http://geocities....|1-kanan-1.txt|      txt|          text/plain|    text/plain|516ed33a73a93f41c...|c7c9ff394e51e8be2...|Jaringan Azhari \...|
|20091027143612|    20040929172255|http://geocities....|    2open.txt|      txt|          text/plain|    text/plain|3e0f80d7b1a3bf060...|c681bd52d84e66a68...|Banteng Boyolali ...|
|20091027143612|    20040929172044|http://geocities....|1-teras-2.txt|      txt|          text/plain|    text/plain|a5a0abbe4138622a3...|61aa0c8a2455d1149...|Targetnya Ngerem ...|
|20091027143613|    20050401210115|http://geocities....|  scans85.txt|      txt|          text/plain|    text/plain|d1387c7eaf4377f02...|b2a18ea8434a34d94...|Sector Spy Report...|
|20091027143613|    20040929172044|http://geocities....|    1-box.txt|      txt|          text/plain|    text/plain|3105034b810cc7fbe...|d99c38f517cab35ab...|Wali Kota Slamet ...|
|20091027143614|    20040929172044|http://geocities....| 1-banner.txt|      txt|          text/plain|    text/plain|210378da87dad8670...|d441267103dc9f5bc...|Mencoba Membuka P...|
|20091027143614|    20040929172255|http://geocities....|     2bok.txt|      txt|          text/plain|    text/plain|5770633f8db92fa92...|c9fce5df4fc48fa32...|//Ada foto "sai-k...|
|20091027143614|    20040929183551|http://geocities....|or-persis.txt|      txt|          text/plain|    text/plain|67395ee85f65defeb...|1770bfc0429015c26...|OK TEJ\r\nKASIH F...|
|20091027143615|    20040929172255|http://geocities....|  2teras2.txt|      txt|          text/plain|    text/plain|5e220b3462bf1ddd3...|0a8e612d0bba58438...|//Ada foto Eko Yu...|
|20091027143615|    20060307030916|http://geocities....|     12-1.txt|      txt|          text/plain|    text/plain|ea593b76a0c226242...|007baa64ed745a838...|Planet Scan on Th...|
|20091027143615|    20040929172255|http://geocities....|  2teras3.txt|      txt|          text/plain|    text/plain|f4239d5c1258e559f...|b6f75b6f657eba68c...|*Upah\r\nRapat Al...|
|20091027143616|    20040929172255|http://geocities....|  2kanan1.txt|      txt|          text/plain|    text/plain|200615b82bfaf7d25...|ce11da3111186d24d...|Mantan DPRD Incar...|
+--------------+------------------+--------------------+-------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.plain_text()
df.show()
```

Will extract all following information from plain text files in a web collection:

- crawl date
- last modified date
- Plain text url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+------------------+--------------------+-------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|    crawl_date|last_modified_date|                 url|     filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|             content|
+--------------+------------------+--------------------+-------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|20091027143357|    20050624112247|http://geocities....|      100.txt|      txt|          text/plain|    text/plain|d551b4e1341fedeb1...|6da698a82e6f2cd86...|Checklist With Pe...|
|20091027143453|    20030614122143|http://geocities....| Password.pas|      txt|          text/plain|    text/plain|af14db1afe4e91655...|94639d5ae81de1829...|michael\r\njacob\...|
|20091027143503|    20081106140745|http://www.knatte...|   robots.txt|      txt|          text/plain|    text/plain|48ca1fcf2991ae97e...|a2a115de2795276ab...|# parking, see cv...|
|20091027143514|    20071122094558|http://geocities....| plansite.txt|      txt|          text/plain|    text/plain|e6bda66886cf51a42...|70514bd62a54738dc...|Index.html\r\n\r\...|
|20091027143519|    20070628091530|http://geocities....|  xmldata.txt|      txt|          text/plain|    text/plain|3c66ec8b796fd012a...|934ba89998a9f9089...|set xmlDoc=Create...|
|20091027143530|    20090310131332|http://geocities....|Manhattan.txt|      txt|          text/plain|    text/plain|33bec040c2319f50d...|8b78c2a100dc13687...|Endwich Bank \r\n...|
|20091027143604|    20030802211911|http://geocities....|   WS_FTP.LOG|      txt|          text/plain|    text/plain|b9132d6f9170ece38...|0b66844444a894955...|2003.08.02 03:01 ...|
|20091027143610|    20040929172044|http://geocities....|1-teras-1.txt|      txt|          text/plain|    text/plain|ca1cdfd1b1ae53d02...|2e9d01175b3b549f1...|KASIH FOTO DJAKA ...|
|20091027143610|    20040929172044|http://geocities....|1-kanan-1.txt|      txt|          text/plain|    text/plain|516ed33a73a93f41c...|c7c9ff394e51e8be2...|Jaringan Azhari \...|
|20091027143612|    20040929172255|http://geocities....|    2open.txt|      txt|          text/plain|    text/plain|3e0f80d7b1a3bf060...|c681bd52d84e66a68...|Banteng Boyolali ...|
|20091027143612|    20040929172044|http://geocities....|1-teras-2.txt|      txt|          text/plain|    text/plain|a5a0abbe4138622a3...|61aa0c8a2455d1149...|Targetnya Ngerem ...|
|20091027143613|    20050401210115|http://geocities....|  scans85.txt|      txt|          text/plain|    text/plain|d1387c7eaf4377f02...|b2a18ea8434a34d94...|Sector Spy Report...|
|20091027143613|    20040929172044|http://geocities....|    1-box.txt|      txt|          text/plain|    text/plain|3105034b810cc7fbe...|d99c38f517cab35ab...|Wali Kota Slamet ...|
|20091027143614|    20040929172044|http://geocities....| 1-banner.txt|      txt|          text/plain|    text/plain|210378da87dad8670...|d441267103dc9f5bc...|Mencoba Membuka P...|
|20091027143614|    20040929172255|http://geocities....|     2bok.txt|      txt|          text/plain|    text/plain|5770633f8db92fa92...|c9fce5df4fc48fa32...|//Ada foto "sai-k...|
|20091027143614|    20040929183551|http://geocities....|or-persis.txt|      txt|          text/plain|    text/plain|67395ee85f65defeb...|1770bfc0429015c26...|OK TEJ\r\nKASIH F...|
|20091027143615|    20040929172255|http://geocities....|  2teras2.txt|      txt|          text/plain|    text/plain|5e220b3462bf1ddd3...|0a8e612d0bba58438...|//Ada foto Eko Yu...|
|20091027143615|    20060307030916|http://geocities....|     12-1.txt|      txt|          text/plain|    text/plain|ea593b76a0c226242...|007baa64ed745a838...|Planet Scan on Th...|
|20091027143615|    20040929172255|http://geocities....|  2teras3.txt|      txt|          text/plain|    text/plain|f4239d5c1258e559f...|b6f75b6f657eba68c...|*Upah\r\nRapat Al...|
|20091027143616|    20040929172255|http://geocities....|  2kanan1.txt|      txt|          text/plain|    text/plain|200615b82bfaf7d25...|ce11da3111186d24d...|Mantan DPRD Incar...|
+--------------+------------------+--------------------+-------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
```

## Extract XML Information

### Scala RDD

**Will not be implemented.**

### Scala DF

The following script:

```scala
import io.archivesunleashed._
import io.archivesunleashed.udfs._

val df = RecordLoader.loadArchives("/path/to/warcs", sc).xml();

df.show()
```

Will extract all following information from XML files in a web collection:

- crawl date
- last modified date
- XML url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+------------------+--------------------+------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
|    crawl_date|last_modified_date|                 url|    filename|extension|mime_type_web_server| mime_type_tika|                 md5|                sha1|             content|
+--------------+------------------+--------------------+------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
|20091027143451|    20040825111612|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|995d283bbec75fab9...|ab3510dd03546c0e2...|<xml xmlns:o="urn...|
|20091027143521|    20070628091530|http://geocities....| catalog.xml|      xml|     application/xml|     text/plain|8658fa2b69203f4ca...|48c083d2d2c44f7aa...|  <?xml version="...|
|20091027143605|                  |http://geocities....|  index.html|      xml|            text/xml|     text/plain|68b329da9893e3409...|adc83b19e793491b1...|                  \n|
|20091027143750|    20020410223310|http://www.geocit...|filelist.xml|      xml|     application/xml|     text/plain|cf06c050636f13004...|80dcc1e1c1c954da1...|<xml xmlns:o="urn...|
|20091027143759|    20020410224422|http://www.geocit...|filelist.xml|      xml|     application/xml|     text/plain|1399c0b1979207eed...|278fc968f5d300836...|<xml xmlns:o="urn...|
|20091027144100|    20090401195922|http://geocities....| sitemap.xml|      xml|     application/xml|application/xml|18e9b399cd0f9d6f9...|57db99ccc2449ad27...|<?xml version="1....|
|20091027144136|    20030812120928|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|4034a5e018168f946...|f9b43c3ca1811037b...|<xml xmlns:o="urn...|
|20091027144146|    20090326194824|http://geocities....| sitemap.xml|      xml|     application/xml|application/xml|ffbe9a625e027d851...|d78f1dd4f14d62057...|<?xml version="1....|
|20091027144203|    20011208010131|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|309381218ff9f6e10...|ef604ebedfb4a1bf1...|<xml xmlns:o="urn...|
|20091027144214|    20020204215450|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|125f24f030aafbf04...|75f1fbf18bfdc3bb7...|<xml xmlns:o="urn...|
|20091027144213|    20090227121308|http://geocities....| sitemap.xml|      xml|     application/xml|application/xml|8db8406401c4efd3f...|2f8292984adbc9554...|<?xml version="1....|
|20091027144240|    20020204215429|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|db87b5aaf61325c44...|fe8c9fb6cd1bf4b01...|<xml xmlns:o="urn...|
|20091027144353|    20020216004601|http://geocities....|master04.xml|      xml|     application/xml|     text/plain|c669a2a31f1eaec70...|6cde4202cff523081...|<xml xmlns:v="urn...|
|20091027144407|    20020216004514|http://geocities....|master03.xml|      xml|     application/xml|     text/plain|08b06e4f5f7f01290...|499a75007921e840d...|<xml xmlns:v="urn...|
|20091027144702|    20040112203005|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|abf2e9d135f128f70...|047f4d1ee41e05c05...|<xml xmlns:o="urn...|
|20091027144707|    20000823213238|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|94a6bb18c1d70e878...|a3ea0e620441e3d6a...|<xml xmlns:o="urn...|
|20091027144835|    20020322203618|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|aec7bf975bd5133bc...|9d1284eec48acf842...|<xml xmlns:o="urn...|
|20091027144926|    20060313173232|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|5db99547f7684fca3...|3a6edbd7cab3863ca...|<xml xmlns:o="urn...|
|20091027145209|    20011013135956|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|bb20bbce2bfe6c12d...|af5cc58c4cff52321...|<xml xmlns:o="urn...|
|20091027145221|    20011015183425|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|d62f8146726b13a9d...|efbd2bb87b72e56ea...|<xml xmlns:o="urn...|
+--------------+------------------+--------------------+------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.xml()
df.show()
```

Will extract all following information from XML files in a web collection:

- crawl date
- last modified date
- XML url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+------------------+--------------------+------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
|    crawl_date|last_modified_date|                 url|    filename|extension|mime_type_web_server| mime_type_tika|                 md5|                sha1|             content|
+--------------+------------------+--------------------+------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
|20091027143451|    20040825111612|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|995d283bbec75fab9...|ab3510dd03546c0e2...|<xml xmlns:o="urn...|
|20091027143521|    20070628091530|http://geocities....| catalog.xml|      xml|     application/xml|     text/plain|8658fa2b69203f4ca...|48c083d2d2c44f7aa...|  <?xml version="...|
|20091027143605|                  |http://geocities....|  index.html|      xml|            text/xml|     text/plain|68b329da9893e3409...|adc83b19e793491b1...|                  \n|
|20091027143750|    20020410223310|http://www.geocit...|filelist.xml|      xml|     application/xml|     text/plain|cf06c050636f13004...|80dcc1e1c1c954da1...|<xml xmlns:o="urn...|
|20091027143759|    20020410224422|http://www.geocit...|filelist.xml|      xml|     application/xml|     text/plain|1399c0b1979207eed...|278fc968f5d300836...|<xml xmlns:o="urn...|
|20091027144100|    20090401195922|http://geocities....| sitemap.xml|      xml|     application/xml|application/xml|18e9b399cd0f9d6f9...|57db99ccc2449ad27...|<?xml version="1....|
|20091027144136|    20030812120928|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|4034a5e018168f946...|f9b43c3ca1811037b...|<xml xmlns:o="urn...|
|20091027144146|    20090326194824|http://geocities....| sitemap.xml|      xml|     application/xml|application/xml|ffbe9a625e027d851...|d78f1dd4f14d62057...|<?xml version="1....|
|20091027144203|    20011208010131|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|309381218ff9f6e10...|ef604ebedfb4a1bf1...|<xml xmlns:o="urn...|
|20091027144214|    20020204215450|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|125f24f030aafbf04...|75f1fbf18bfdc3bb7...|<xml xmlns:o="urn...|
|20091027144213|    20090227121308|http://geocities....| sitemap.xml|      xml|     application/xml|application/xml|8db8406401c4efd3f...|2f8292984adbc9554...|<?xml version="1....|
|20091027144240|    20020204215429|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|db87b5aaf61325c44...|fe8c9fb6cd1bf4b01...|<xml xmlns:o="urn...|
|20091027144353|    20020216004601|http://geocities....|master04.xml|      xml|     application/xml|     text/plain|c669a2a31f1eaec70...|6cde4202cff523081...|<xml xmlns:v="urn...|
|20091027144407|    20020216004514|http://geocities....|master03.xml|      xml|     application/xml|     text/plain|08b06e4f5f7f01290...|499a75007921e840d...|<xml xmlns:v="urn...|
|20091027144702|    20040112203005|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|abf2e9d135f128f70...|047f4d1ee41e05c05...|<xml xmlns:o="urn...|
|20091027144707|    20000823213238|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|94a6bb18c1d70e878...|a3ea0e620441e3d6a...|<xml xmlns:o="urn...|
|20091027144835|    20020322203618|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|aec7bf975bd5133bc...|9d1284eec48acf842...|<xml xmlns:o="urn...|
|20091027144926|    20060313173232|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|5db99547f7684fca3...|3a6edbd7cab3863ca...|<xml xmlns:o="urn...|
|20091027145209|    20011013135956|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|bb20bbce2bfe6c12d...|af5cc58c4cff52321...|<xml xmlns:o="urn...|
|20091027145221|    20011015183425|http://geocities....|filelist.xml|      xml|     application/xml|     text/plain|d62f8146726b13a9d...|efbd2bb87b72e56ea...|<xml xmlns:o="urn...|
+--------------+------------------+--------------------+------------+---------+--------------------+---------------+--------------------+--------------------+--------------------+
```
