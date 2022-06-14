---
id: text-files-analysis
title: Text Files (html, text, css, js, json, xml) Analysis
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

Will extract all following information from audio files in a web collection:

- css url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|            filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|             content|
+--------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|20080430204833|http://www.archiv...|         details.css|      css|            text/css|    text/plain|f675020391de85d91...|2961a59b8fc20f401...|div#details,table...|
|20080430204906|http://www.archiv...|         archive.css|      css|            text/css|    text/plain|e61ac6932b45ed727...|28b5a02f69dbb75d7...|BODY {  margin-to...|
|20080430205124|http://www.archiv...|         toppage.css|      css|            text/css|    text/plain|93a188fe6a26128f8...|9b52b1d3a6f3e7388...|.box {    padding...|
|20080430205306|http://www.archiv...|         players.css|      css|            text/css|    text/plain|622b43c9a4cb85c07...|724d975b8b64def5d...|/* this is kept o...|
|20190812222520|https://yorkspace...|           style.css|      css|            text/css|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|https://yorkspace...|          helper.css|      css|            text/css|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|https://yorkspace...|            base.css|      css|            text/css|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|https://yorkspace...|           style.css|      css|            text/css|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|https://yorkspace...|           print.css|      css|            text/css|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|https://yorkspace...|           reset.css|      css|            text/css|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|http://d39af2mgp1...|           popup.css|      css|            text/css|    text/plain|3cc638a079ba56f4e...|1b6315718ddd4b1cc...|.plx-wrapping-lin...|
|20190812222520|https://yorkspace...|authority-control...|      css|            text/css|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|https://yorkspace...|        handheld.css|      css|            text/css|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|https://yorkspace...|jquery-ui-1.8.15....|      css|            text/css|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|https://yorkspace...|           media.css|      css|            text/css|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
+--------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.css()
df.show()
```

Will extract all following information from audio files in a web collection:

- audio url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|            filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|             content|
+--------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|20080430204833|http://www.archiv...|         details.css|      css|            text/css|    text/plain|f675020391de85d91...|2961a59b8fc20f401...|div#details,table...|
|20080430204906|http://www.archiv...|         archive.css|      css|            text/css|    text/plain|e61ac6932b45ed727...|28b5a02f69dbb75d7...|BODY {  margin-to...|
|20080430205124|http://www.archiv...|         toppage.css|      css|            text/css|    text/plain|93a188fe6a26128f8...|9b52b1d3a6f3e7388...|.box {    padding...|
|20080430205306|http://www.archiv...|         players.css|      css|            text/css|    text/plain|622b43c9a4cb85c07...|724d975b8b64def5d...|/* this is kept o...|
|20190812222520|https://yorkspace...|           style.css|      css|            text/css|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|https://yorkspace...|          helper.css|      css|            text/css|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|https://yorkspace...|            base.css|      css|            text/css|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|https://yorkspace...|           style.css|      css|            text/css|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|https://yorkspace...|           print.css|      css|            text/css|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|https://yorkspace...|           reset.css|      css|            text/css|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|http://d39af2mgp1...|           popup.css|      css|            text/css|    text/plain|3cc638a079ba56f4e...|1b6315718ddd4b1cc...|.plx-wrapping-lin...|
|20190812222520|https://yorkspace...|authority-control...|      css|            text/css|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|https://yorkspace...|        handheld.css|      css|            text/css|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|https://yorkspace...|jquery-ui-1.8.15....|      css|            text/css|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|https://yorkspace...|           media.css|      css|            text/css|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
+--------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
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

Will extract all following information from images in a web collection:

- html url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|            filename|extension|mime_type_web_server|      mime_type_tika|                 md5|                sha1|             content|
+--------------+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|20200627135126|http://auer.netzl...|            wend.htm|      htm|           text/html|           text/html|2fe7ddc90ce33d918...|43956c8e9b47bda1d...|<!DOCTYPE HTML PU...|
|20200627135127|https://auer.netz...|            wend.htm|      htm|           text/html|           text/html|8d3cb8874acf03dbd...|032b85a5a8b5d5d9b...|<HTML>

<HEAD>

<...|
|20200627135144|https://auer.netz...|           wend1.htm|      htm|           text/html|           text/html|a173955315039920d...|f6cb762993aece7b5...|<!DOCTYPE HTML PU...|
|20200627135157|https://auer.netz...|           wend2.htm|      htm|           text/html|           text/html|45f2cd879c69ac24c...|3f2721d9ed0c772ee...|<!DOCTYPE HTML PU...|
|20200627135207|https://auer.netz...|           wend3.htm|      htm|           text/html|           text/html|025e35542b5091e47...|637ac5c43d3b2ec4f...|<!DOCTYPE HTML PU...|
|20080430204826|http://www.archiv...|                    |     html|           text/html|           text/html|990fc5f1674fd21b9...|d5817bf5b4b35a296...|<html>
<head>
<me...|
|20080430204826|http://www.archiv...|           index.php|     html|           text/html|application/xhtml...|07cf838c6b735fe25...|13d514bfaf5da199e...|<!DOCTYPE html PU...|
|20080430204831|http://www.archiv...|DrinkingWithBob-M...|     html|           text/html|           text/html|db923bf20967f9ba5...|44b0b385f7f33da23...|<html><head>
 <li...|
|20080430204834|http://www.archiv...|         credits.php|     html|           text/html|           text/html|379d44078db6ed54c...|63c59963d98950909...|<html><head>
 <li...|
|20080430204841|http://www.archiv...|  get-item-image.php|     html|           text/html|                 N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20080430204841|http://www.archiv...|secretarmiesb00sp...|     html|           text/html|           text/html|d2a64931f560db2f9...|a3e1e4eeb1f433e41...|<html><head>
 <li...|
|20080430204844|http://www.archiv...|  get-item-image.php|     html|           text/html|                 N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20080430204845|http://www.archiv...|       post-view.php|     html|           text/html|           text/html|e091184abe915ecdf...|e334aa6885bdbbfa2...|<html><head>
 <li...|
|20080430204847|http://www.archiv...|             web.php|     html|           text/html|           text/html|6b145d89dbb85944e...|ae8967684a1435555...|<html><head>
 <li...|
|20080430204848|http://tsunami.ar...|          robots.txt|     html|           text/html|           text/html|23d6b92bc7eb100fc...|f0649f9495d1f566a...|<!DOCTYPE HTML PU...|
|20080430204854|http://www.archiv...|   forum-display.php|     html|           text/html|           text/html|6a64f2b26b0654280...|d04663aaff59f005b...|<html><head>
 <li...|
|20080430204859|http://www.archiv...|       post-view.php|     html|           text/html|           text/html|e65b7d84e236de7aa...|6d553c0286a118fb4...|<html><head>
 <li...|
|20080430204901|http://www.archiv...|              movies|     html|           text/html|           text/html|fdd59f5e1c89ff338...|f4873568e507ecf5b...|<html><head>
 <li...|
|20080430204905|http://www.archiv...|     texts.americana|     html|           text/html|           text/html|9ad5043c79ac57aee...|84ef99b5d30bf7d8c...|<html><head>
 <li...|
|20080430204907|http://www.archiv...|       post-view.php|     html|           text/html|           text/html|9a084be7785eb4a1b...|848eb3679ccddef18...|<html><head>
 <li...|
+--------------+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.html()
df.show()
```

Will extract all following information from images in a web collection:

- html url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|            filename|extension|mime_type_web_server|      mime_type_tika|                 md5|                sha1|             content|
+--------------+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|20200627135126|http://auer.netzl...|            wend.htm|      htm|           text/html|           text/html|2fe7ddc90ce33d918...|43956c8e9b47bda1d...|<!DOCTYPE HTML PU...|
|20200627135127|https://auer.netz...|            wend.htm|      htm|           text/html|           text/html|8d3cb8874acf03dbd...|032b85a5a8b5d5d9b...|<HTML>

<HEAD>

<...|
|20200627135144|https://auer.netz...|           wend1.htm|      htm|           text/html|           text/html|a173955315039920d...|f6cb762993aece7b5...|<!DOCTYPE HTML PU...|
|20200627135157|https://auer.netz...|           wend2.htm|      htm|           text/html|           text/html|45f2cd879c69ac24c...|3f2721d9ed0c772ee...|<!DOCTYPE HTML PU...|
|20200627135207|https://auer.netz...|           wend3.htm|      htm|           text/html|           text/html|025e35542b5091e47...|637ac5c43d3b2ec4f...|<!DOCTYPE HTML PU...|
|20080430204826|http://www.archiv...|                    |     html|           text/html|           text/html|990fc5f1674fd21b9...|d5817bf5b4b35a296...|<html>
<head>
<me...|
|20080430204826|http://www.archiv...|           index.php|     html|           text/html|application/xhtml...|07cf838c6b735fe25...|13d514bfaf5da199e...|<!DOCTYPE html PU...|
|20080430204831|http://www.archiv...|DrinkingWithBob-M...|     html|           text/html|           text/html|db923bf20967f9ba5...|44b0b385f7f33da23...|<html><head>
 <li...|
|20080430204834|http://www.archiv...|         credits.php|     html|           text/html|           text/html|379d44078db6ed54c...|63c59963d98950909...|<html><head>
 <li...|
|20080430204841|http://www.archiv...|  get-item-image.php|     html|           text/html|                 N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20080430204841|http://www.archiv...|secretarmiesb00sp...|     html|           text/html|           text/html|d2a64931f560db2f9...|a3e1e4eeb1f433e41...|<html><head>
 <li...|
|20080430204844|http://www.archiv...|  get-item-image.php|     html|           text/html|                 N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20080430204845|http://www.archiv...|       post-view.php|     html|           text/html|           text/html|e091184abe915ecdf...|e334aa6885bdbbfa2...|<html><head>
 <li...|
|20080430204847|http://www.archiv...|             web.php|     html|           text/html|           text/html|6b145d89dbb85944e...|ae8967684a1435555...|<html><head>
 <li...|
|20080430204848|http://tsunami.ar...|          robots.txt|     html|           text/html|           text/html|23d6b92bc7eb100fc...|f0649f9495d1f566a...|<!DOCTYPE HTML PU...|
|20080430204854|http://www.archiv...|   forum-display.php|     html|           text/html|           text/html|6a64f2b26b0654280...|d04663aaff59f005b...|<html><head>
 <li...|
|20080430204859|http://www.archiv...|       post-view.php|     html|           text/html|           text/html|e65b7d84e236de7aa...|6d553c0286a118fb4...|<html><head>
 <li...|
|20080430204901|http://www.archiv...|              movies|     html|           text/html|           text/html|fdd59f5e1c89ff338...|f4873568e507ecf5b...|<html><head>
 <li...|
|20080430204905|http://www.archiv...|     texts.americana|     html|           text/html|           text/html|9ad5043c79ac57aee...|84ef99b5d30bf7d8c...|<html><head>
 <li...|
|20080430204907|http://www.archiv...|       post-view.php|     html|           text/html|           text/html|9a084be7785eb4a1b...|848eb3679ccddef18...|<html><head>
 <li...|
+--------------+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
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

Will extract all following information from PDF files in a web collection:

- Javascript url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|            filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|             content|
+--------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|20080430204833|http://www.archiv...|              flv.js|       js|application/x-jav...|    text/plain|8c73985a47e0d3720...|83a0951127abb1da1...|/////////////////...|
|20080430204844|http://www.archiv...|             pdfs.js|       js|application/x-jav...|    text/plain|26320ee4933f07a27...|407c7544a6a0a0f77...|// used by /style...|
|20080430204936|http://www.archiv...|          players.js|       js|application/x-jav...|    text/plain|eeeef39e53bd5ad97...|bac594b41e60bb979...|/////////////////...|
|20080430205037|http://www.archiv...|          players.js|       js|application/x-jav...|    text/plain|eeeef39e53bd5ad97...|bac594b41e60bb979...|/////////////////...|
|20080430205210|http://www.archiv...|        prototype.js|       js|application/x-jav...|    text/plain|ed2d6608b0832c5e9...|4540775a3cb3fd95d...|/*  Prototype Jav...|
|20080430205258|http://www.archiv...|          players.js|       js|application/x-jav...|    text/plain|eeeef39e53bd5ad97...|bac594b41e60bb979...|/////////////////...|
|20080430205305|http://www.archiv...|   flashembed.min.js|       js|application/x-jav...|    text/plain|0856895cc7e76cf1a...|927b20a74d690d057...|/**
 * flashembed...|
|20080430205325|http://www.archiv...|        AC_OETags.js|       js|application/x-jav...|    text/plain|a23a4dd5b50b15b57...|2ad62f86ba80c94a6...|// Flash Player V...|
|20190812222520|https://ajax.goog...|       jquery.min.js|       js|     text/javascript|     text/html|a1a8cb16a060f6280...|7622c9ac2335be6dc...|/*!
 * jQuery Jav...|
|20190812222520|https://yorkspace...|jquery-ui-1.8.15....|       js|application/javas...|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|https://d39af2mgp...|     widget-popup.js|       js|application/javas...|    text/plain|bdbc38657ff7a22cb...|d5136439efac0f3fd...|(function(){var c...|
|20190812222520|http://ajax.googl...|       jquery.min.js|       js|     text/javascript|    text/plain|e0e0559014b222245...|e2f3603e23711f644...|/*! jQuery v1.10....|
|20190812222520|https://yorkspace...|modernizr-1.7.min.js|       js|application/javas...|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|https://d1bxh8uas...|            embed.js|       js|application/javas...|    text/plain|4489c5c27b24214da...|32c0925cf517a46fc...|!function(e,t,d){...|
|20190812222520|https://d1bxh8uas...|altmetric_badges-...|       js|application/javas...|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|http://d39af2mgp1...|              xss.js|       js|application/javas...|    text/plain|3b1b5a0af85778c2c...|12df56f38f1dab359...|(function e(t,n,r...|
|20190812222520|https://ssl.googl...|               ga.js|       js|     text/javascript|    text/plain|e9372f0ebbcf71f85...|2c7d19d1af7d97085...|(function(){var E...|
+--------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.js()
df.show()
```

Will extract all following information from PDF files in a web collection:

- Javascript url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|            filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|             content|
+--------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|20080430204833|http://www.archiv...|              flv.js|       js|application/x-jav...|    text/plain|8c73985a47e0d3720...|83a0951127abb1da1...|/////////////////...|
|20080430204844|http://www.archiv...|             pdfs.js|       js|application/x-jav...|    text/plain|26320ee4933f07a27...|407c7544a6a0a0f77...|// used by /style...|
|20080430204936|http://www.archiv...|          players.js|       js|application/x-jav...|    text/plain|eeeef39e53bd5ad97...|bac594b41e60bb979...|/////////////////...|
|20080430205037|http://www.archiv...|          players.js|       js|application/x-jav...|    text/plain|eeeef39e53bd5ad97...|bac594b41e60bb979...|/////////////////...|
|20080430205210|http://www.archiv...|        prototype.js|       js|application/x-jav...|    text/plain|ed2d6608b0832c5e9...|4540775a3cb3fd95d...|/*  Prototype Jav...|
|20080430205258|http://www.archiv...|          players.js|       js|application/x-jav...|    text/plain|eeeef39e53bd5ad97...|bac594b41e60bb979...|/////////////////...|
|20080430205305|http://www.archiv...|   flashembed.min.js|       js|application/x-jav...|    text/plain|0856895cc7e76cf1a...|927b20a74d690d057...|/**
 * flashembed...|
|20080430205325|http://www.archiv...|        AC_OETags.js|       js|application/x-jav...|    text/plain|a23a4dd5b50b15b57...|2ad62f86ba80c94a6...|// Flash Player V...|
|20190812222520|https://ajax.goog...|       jquery.min.js|       js|     text/javascript|     text/html|a1a8cb16a060f6280...|7622c9ac2335be6dc...|/*!
 * jQuery Jav...|
|20190812222520|https://yorkspace...|jquery-ui-1.8.15....|       js|application/javas...|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|https://d39af2mgp...|     widget-popup.js|       js|application/javas...|    text/plain|bdbc38657ff7a22cb...|d5136439efac0f3fd...|(function(){var c...|
|20190812222520|http://ajax.googl...|       jquery.min.js|       js|     text/javascript|    text/plain|e0e0559014b222245...|e2f3603e23711f644...|/*! jQuery v1.10....|
|20190812222520|https://yorkspace...|modernizr-1.7.min.js|       js|application/javas...|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|https://d1bxh8uas...|            embed.js|       js|application/javas...|    text/plain|4489c5c27b24214da...|32c0925cf517a46fc...|!function(e,t,d){...|
|20190812222520|https://d1bxh8uas...|altmetric_badges-...|       js|application/javas...|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222520|http://d39af2mgp1...|              xss.js|       js|application/javas...|    text/plain|3b1b5a0af85778c2c...|12df56f38f1dab359...|(function e(t,n,r...|
|20190812222520|https://ssl.googl...|               ga.js|       js|     text/javascript|    text/plain|e9372f0ebbcf71f85...|2c7d19d1af7d97085...|(function(){var E...|
+--------------+--------------------+--------------------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
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

Will extract all following information from presentation program files in a web collection:

- JSON url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+--------------------+--------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|             content|
+--------------+--------------------+--------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|20190812222538|https://api.plu.m...|artifact|     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222521|https://api.plu.m...|artifact|     json|    application/json|    text/plain|e121fc1e3ab3525b8...|74bf89f58c2c41b61...|{"link":"https://...|
|20190812222533|https://api.plu.m...|artifact|     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
+--------------+--------------------+--------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.json()
df.show()
```

Will extract all following information from presentation program files in a web collection:

- JSON url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+--------------------+--------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|             content|
+--------------+--------------------+--------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|20190812222538|https://api.plu.m...|artifact|     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
|20190812222521|https://api.plu.m...|artifact|     json|    application/json|    text/plain|e121fc1e3ab3525b8...|74bf89f58c2c41b61...|{"link":"https://...|
|20190812222533|https://api.plu.m...|artifact|     json|    application/json|           N/A|d41d8cd98f00b204e...|da39a3ee5e6b4b0d3...|                    |
+--------------+--------------------+--------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
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

Will extract all following information from spreadsheet files in a web collection:

- Plain text url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+--------------------+----------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|  filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|             content|
+--------------+--------------------+----------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|20080430204825|http://www.archiv...|robots.txt|      txt|          text/plain|    text/plain|a6d6869f680b1bdd0...|95046652b71aaa1e8...|#################...|
|20080430204832|http://ia331306.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204833|http://www.adobe....|robots.txt|      txt|          text/plain|    text/plain|f1e5640c9d5c8d694...|eeeb8d4bbaa8a6e96...|#
# This file is ...|
|20080430204843|http://ia300226.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204843|http://ia300142.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204848|http://websearch....|robots.txt|      txt|          text/plain|    text/plain|b6216d61c03e6ce0c...|c47ccf1a49c24cc58...|User-agent: *
Dis...|
|20080430204848|http://web.archiv...|robots.txt|      txt|          text/plain|    text/plain|d221567e7ce0bb4d6...|36d618c9e67614197...|# robots.txt web....|
|20080430204902|http://ia341035.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204913|http://ia311518.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204913|http://ia341007.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204932|http://ia310121.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204936|http://ia341009.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204936|http://fpdownload...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204936|http://creativeco...|robots.txt|      txt|          text/plain|    text/plain|b6216d61c03e6ce0c...|c47ccf1a49c24cc58...|User-agent: *
Dis...|
|20080430204939|http://ia300230.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204939|http://ia360602.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204945|http://ia340915.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430205005|http://ia331343.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430205028|http://ia350615.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430205046|http://ia311527.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
+--------------+--------------------+----------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.plain_text()
df.show()
```

Will extract all following information from spreadsheet files in a web collection:

- Plain text url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+--------------------+----------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|  filename|extension|mime_type_web_server|mime_type_tika|                 md5|                sha1|             content|
+--------------+--------------------+----------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
|20080430204825|http://www.archiv...|robots.txt|      txt|          text/plain|    text/plain|a6d6869f680b1bdd0...|95046652b71aaa1e8...|#################...|
|20080430204832|http://ia331306.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204833|http://www.adobe....|robots.txt|      txt|          text/plain|    text/plain|f1e5640c9d5c8d694...|eeeb8d4bbaa8a6e96...|#
# This file is ...|
|20080430204843|http://ia300226.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204843|http://ia300142.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204848|http://websearch....|robots.txt|      txt|          text/plain|    text/plain|b6216d61c03e6ce0c...|c47ccf1a49c24cc58...|User-agent: *
Dis...|
|20080430204848|http://web.archiv...|robots.txt|      txt|          text/plain|    text/plain|d221567e7ce0bb4d6...|36d618c9e67614197...|# robots.txt web....|
|20080430204902|http://ia341035.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204913|http://ia311518.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204913|http://ia341007.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204932|http://ia310121.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204936|http://ia341009.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204936|http://fpdownload...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204936|http://creativeco...|robots.txt|      txt|          text/plain|    text/plain|b6216d61c03e6ce0c...|c47ccf1a49c24cc58...|User-agent: *
Dis...|
|20080430204939|http://ia300230.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204939|http://ia360602.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430204945|http://ia340915.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430205005|http://ia331343.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430205028|http://ia350615.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
|20080430205046|http://ia311527.u...|robots.txt|      txt|          text/plain|    text/plain|f71d20196d4caf35b...|63657cbb7d7086c56...|User-agent: *
Dis...|
+--------------+--------------------+----------+---------+--------------------+--------------+--------------------+--------------------+--------------------+
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

Will extract all following information from videos in a web collection:

- XML url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|            filename|extension|mime_type_web_server|      mime_type_tika|                 md5|                sha1|             content|
+--------------+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|20080430204830|http://www.archiv...|  collection-rss.php|      xml|            text/xml| application/rss+xml|647a665e6acc2141a...|4dee969d37e188ce7...|<?xml version="1....|
|20080430204903|http://www.archiv...|  collection-rss.php|      xml|            text/xml| application/rss+xml|dd9dd0036fcf31a94...|65e421a5ec9616a91...|<?xml version="1....|
|20080430204913|http://www.archiv...|  collection-rss.php|      xml|            text/xml| application/rss+xml|d007b402db454a515...|7468c4b981ff415fe...|<?xml version="1....|
|20080430204933|http://www.archiv...|  collection-rss.php|      xml|            text/xml| application/rss+xml|e1f71773d48c203ea...|ed41136901fd5ba7e...|<?xml version="1....|
|20080430205001|http://www.archiv...|  collection-rss.php|      xml|            text/xml| application/rss+xml|0558a42d5ec8b1d87...|ef025617922a3bfaa...|<?xml version="1....|
|20080430205009|http://www.archiv...|  collection-rss.php|      xml|            text/xml| application/rss+xml|b8da7a003f92370d1...|c20a79ffd94a7d192...|<?xml version="1....|
|20080430205132|http://www.archiv...|  collection-rss.php|      xml|            text/xml| application/rss+xml|e604cdf857cc802f9...|abda5b53f6e4d742e...|<?xml version="1....|
|20080430205150|http://www.archiv...|  collection-rss.php|      xml|            text/xml| application/rss+xml|06a424dccf31045e6...|849cf070d5079e367...|<?xml version="1....|
|20080430205208|http://www.archiv...|  collection-rss.php|      xml|            text/xml| application/rss+xml|ee53d25e03b8aee3d...|e66a706848ae03aee...|<?xml version="1....|
|20190815004338|https://ruebot.ne...|aut-test-fixtures...|     pptx|application/vnd.o...|application/vnd.o...|7a7b1fe4b6d311376...|86fadca47b134b682...O...|
|20190815004353|https://ruebot.ne...|test-aut-fixtures...|     docx|application/vnd.o...|application/vnd.o...|51040165e60629c6b...|cb8bd0f643e9610e1...ÎPK
O...|
|20190815004429|https://ruebot.ne...|test-aut-fixture....|     xlsx|application/vnd.o...|application/vnd.o...|befb3304cb592e076...|80b1793bf01707140...ëPK
O...|
+--------------+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
```

### Python DF

The following script:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/warcs")

df = archive.xml()
df.show()
```

Will extract all following information from videos in a web collection:

- XML url
- filename
- extension
- MimeType as identified by the hosting web server
- MimeType as identified by [Apache Tika](https://tika.apache.org)
- md5 hash
- sha1 hash
- content

```dataframe
+--------------+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|    crawl_date|                 url|            filename|extension|mime_type_web_server|      mime_type_tika|                 md5|                sha1|             content|
+--------------+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
|20080430204830|http://www.archiv...|  collection-rss.php|      xml|            text/xml| application/rss+xml|647a665e6acc2141a...|4dee969d37e188ce7...|<?xml version="1....|
|20080430204903|http://www.archiv...|  collection-rss.php|      xml|            text/xml| application/rss+xml|dd9dd0036fcf31a94...|65e421a5ec9616a91...|<?xml version="1....|
|20080430204913|http://www.archiv...|  collection-rss.php|      xml|            text/xml| application/rss+xml|d007b402db454a515...|7468c4b981ff415fe...|<?xml version="1....|
|20080430204933|http://www.archiv...|  collection-rss.php|      xml|            text/xml| application/rss+xml|e1f71773d48c203ea...|ed41136901fd5ba7e...|<?xml version="1....|
|20080430205001|http://www.archiv...|  collection-rss.php|      xml|            text/xml| application/rss+xml|0558a42d5ec8b1d87...|ef025617922a3bfaa...|<?xml version="1....|
|20080430205009|http://www.archiv...|  collection-rss.php|      xml|            text/xml| application/rss+xml|b8da7a003f92370d1...|c20a79ffd94a7d192...|<?xml version="1....|
|20080430205132|http://www.archiv...|  collection-rss.php|      xml|            text/xml| application/rss+xml|e604cdf857cc802f9...|abda5b53f6e4d742e...|<?xml version="1....|
|20080430205150|http://www.archiv...|  collection-rss.php|      xml|            text/xml| application/rss+xml|06a424dccf31045e6...|849cf070d5079e367...|<?xml version="1....|
|20080430205208|http://www.archiv...|  collection-rss.php|      xml|            text/xml| application/rss+xml|ee53d25e03b8aee3d...|e66a706848ae03aee...|<?xml version="1....|
|20190815004338|https://ruebot.ne...|aut-test-fixtures...|     pptx|application/vnd.o...|application/vnd.o...|7a7b1fe4b6d311376...|86fadca47b134b682...O...|
|20190815004353|https://ruebot.ne...|test-aut-fixtures...|     docx|application/vnd.o...|application/vnd.o...|51040165e60629c6b...|cb8bd0f643e9610e1...ÎPK
O...|
|20190815004429|https://ruebot.ne...|test-aut-fixture....|     xlsx|application/vnd.o...|application/vnd.o...|befb3304cb592e076...|80b1793bf01707140...ëPK
O...|
+--------------+--------------------+--------------------+---------+--------------------+--------------------+--------------------+--------------------+--------------------+
```
