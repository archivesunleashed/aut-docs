# Archives Unleashed Toolkit Cookbook

## Archives Unleashed Cloud Scholarly Derivatives

This is an example of the [Archives Unleashed Cloud](https://cloud.archivesunleashed.org/) script that generates the foundation of [the scholarly derivatives](https://cloud.archivesunleashed.org/derivatives) the Cloud produces.

```scala
import io.archivesunleashed._
import io.archivesunleashed.app._
import io.archivesunleashed.matchbox._

sc.setLogLevel("INFO")

val statusCodes = Set("200")

val validPages = RecordLoader
  .loadArchives("/path/to/data", sc)
  .keepValidPages()
  .keepHttpStatus(statusCodes)

validPages
  .map(r => ExtractDomain(r.getUrl))
  .countItems()
  .saveAsTextFile("/path/to/alldomains/output")

validPages
  .map(r => (r.getCrawlDate, r.getDomain, r.getUrl, RemoveHTML(RemoveHttpHeader(r.getContentString))))
  .saveAsTextFile("/path/to/fulltext/output")

val links = validPages
  .map(r => (r.getCrawlDate, ExtractLinks(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1, ExtractDomain(f._1).replaceAll("^\\\\s*www\\\\.", ""), ExtractDomain(f._2).replaceAll("^\\\\s*www\\\\.", ""))))
  .filter(r => r._2 != "" && r._3 != "")
  .countItems()
  .filter(r => r._2 > 5)

WriteGraph.asGraphml(links, "//path/to/graph/output/example-gephi.graphml")

sys.exit
```

## Extract Binary Info to CSV

The following script will extract all the binary information of PDFs, audio files, video files, word processor files, spreadsheet files, presentation program files, and text files. 

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

sc.setLogLevel("INFO")

val df_pdf = RecordLoader.loadArchives("/path/to/data/*gz", sc).extractPDFDetailsDF();
val res_pdf = df_pdf.select($"bytes", $"extension").saveToDisk("bytes", "/path/to/binary/output/pdf/cookbook-example-pdf", "extension")

val df_audio = RecordLoader.loadArchives("/path/to/data/*gz", sc).extractAudioDetailsDF();
val res_audio = df_audio.select($"bytes", $"extension").saveToDisk("bytes", "/path/to/binary/output/audio/cookbook-example-audio", "extension")

val df_video = RecordLoader.loadArchives("/path/to/data/*gz", sc).extractVideoDetailsDF();
val res_video = df_video.select($"bytes", $"extension").saveToDisk("bytes", "/path/to/binary/output/video/cookbook-example-video", "extension")

val df_image = RecordLoader.loadArchives("/path/to/data/*gz", sc).extractImageDetailsDF();
val res_image = df_image.select($"bytes", $"extension").saveToDisk("bytes", "/path/to/binary/output/image/cookbook-example-image", "extension")

val df_ss = RecordLoader.loadArchives("/path/to/data/*gz", sc).extractSpreadsheetDetailsDF();
val res_ss = df_ss.select($"bytes", $"extension").saveToDisk("bytes", "/path/to/binary/output/spreadsheet/cookbook-example-spreadsheet", "extension")

val df_pp = RecordLoader.loadArchives("/path/to/data/*gz", sc).extractPresentationProgramDetailsDF();
val res_pp = df_pp.select($"bytes", $"extension").saveToDisk("bytes", "/path/to/binary/output/presentation-program/cookbook-example-presentation-program", "extension")

val df_word = RecordLoader.loadArchives("/path/to/data/*gz", sc).extractWordProcessorDetailsDF();
val res_word = df_word.select($"bytes", $"extension").saveToDisk("bytes", "/path/to/binary/output/word-processor/cookbook-example-word-processor", "extension")

val df_txt = RecordLoader.loadArchives("/path/to/data/*gz", sc).extractTextFilesDetailsDF();
val res_txt = df_txt.select($"bytes", $"extension").saveToDisk("bytes", "/path/to/binary/output/text/cookbook-example-text", "extension")

sys.exit
```

Output will look like:

```csv
http://hk.geocities.com/bobolaw2001/midi/88.mid,88.mid,mid,audio/midi,audio/midi,ffffc41d33c23d6d5456d72366979559
http://us.geocities.com/Heartland/Grove/1469/midis/callinelvis.mid,callinelvis.mid,mid,audio/midi,audio/midi,fffd075dccd7f1ca7fee1ef868fd0e16
http://espanol.geocities.com/neo_irvine/terminator.mid,terminator.mid,mid,audio/midi,audio/midi,fffb8c7e68f92ce16c3e6755dde22f12
http://espanol.geocities.com/morfheo_ig/midis/terminator2.mid,terminator2.mid,mid,audio/midi,audio/midi,fffb8c7e68f92ce16c3e6755dde22f12
http://br.geocities.com/pmmidi1/midis/brasil/aguas_marco_TJobim.mid,aguas_marco_TJobim.mid,mid,audio/midi,audio/midi,fffa3598d430e7367102813bae445401
http://espanol.geocities.com/katherinne_j3/Aguas_de_Marco.mid,Aguas_de_Marco.mid,mid,audio/midi,audio/midi,fffa3598d430e7367102813bae445401
http://au.geocities.com/saurus1000/SpringsteenStsofPhil.mid,SpringsteenStsofPhil.mid,mid,audio/midi,audio/midi,fff537c7ec012eb3d95245eb79f84adb
http://ar.geocities.com/ebanisteriaflamboyan/midis/filadelfia.mid,filadelfia.mid,mid,audio/midi,audio/midi,fff537c7ec012eb3d95245eb79f84adb
http://es.geocities.com/lapolla_directo5/20_Cara_Al_Culo,20_Cara_Al_Culo,mpga,audio/mpeg,audio/mpeg,fff4f06560dfb6cfaec576fee2439cce
http://mx.geocities.com/fly26523/manga/dragonquest/audio/dw1_kng.mid,dw1_kng.mid,mid,audio/midi,audio/midi,fff1cf3a341f7041872f8c3a2cd43cf5
```

## Extract Binary Info to CSV (S3)

The following script will extract all the binary information of PDFs, audio files, video files, word processor files, spreadsheet files, presentation program files, and text files to a S3 bucket.

```scala
 import io.archivesunleashed._
import io.archivesunleashed.df._

sc.setLogLevel("INFO")

sc.hadoopConfiguration.set("fs.s3a.access.key", "YOUR ACCESS KEY")
sc.hadoopConfiguration.set("fs.s3a.secret.key", "YOUR SECRET KEY ")

val df_pdf = RecordLoader.loadArchives("/local/path/to/data/*gz", sc).extractPDFDetailsDF();
val res_pdf = df_pdf.select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5").orderBy(desc("md5")).write.format("csv").option("header","true").mode("Overwrite").save("s3a://YourBucket/pdf")

val df_audio = RecordLoader.loadArchives("/local/path/to/data/*gz", sc).extractAudioDetailsDF();
val res_audio = df_audio.select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5").orderBy(desc("md5")).write.format("csv").option("header","true").mode("Overwrite").save("s3a://YourBucket/audio")

val df_video = RecordLoader.loadArchives("/local/path/to/data/*gz", sc).extractVideoDetailsDF();
val res_video = df_video.select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5").orderBy(desc("md5")).write.format("csv").option("header","true").mode("Overwrite").save("s3a://YourBucket/video")

val df_image = RecordLoader.loadArchives("/local/path/to/data/*gz", sc).extractImageDetailsDF();
val res_image = df_image.select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"width", $"height", $"md5").orderBy(desc("md5")).write.format("csv").option("header","true").mode("Overwrite").save("s3a://YourBucket/image")

val df_ss = RecordLoader.loadArchives("/local/path/to/data/*gz", sc).extractSpreadsheetDetailsDF();
val res_ss = df_ss.select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5").orderBy(desc("md5")).write.format("csv").option("header","true").mode("Overwrite").save("s3a://YourBucket/spreadsheet")

val df_pp = RecordLoader.loadArchives("/local/path/to/data/*gz", sc).extractPresentationProgramDetailsDF();
val res_pp = df_pp.select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5").orderBy(desc("md5")).write.format("csv").option("header","true").mode("Overwrite").save("s3a://YourBucket/presentation-program")

val df_word = RecordLoader.loadArchives("/local/path/to/data/*gz", sc).extractWordProcessorDetailsDF();
val res_word = df_word.select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5").orderBy(desc("md5")).write.format("csv").option("header","true").mode("Overwrite").save("s3a://YourBucket/word-processor")

val df_txt = RecordLoader.loadArchives("/local/path/to/data/*gz", sc).extractTextFilesDetailsDF();
val res_txt = df_txt.select($"url", $"filename", $"extension", $"mime_type_web_server", $"mime_type_tika", $"md5").orderBy(desc("md5")).write.format("csv").option("header","true").mode("Overwrite").save("s3a://YourBucket/text")

sys.exit
```

## Extract Binaries to Disk

The following script will extract all the binary files of PDFs, audio files, video files, word processor files, spreadsheet files, presentation program files, and text files to disk. 

```scala
import io.archivesunleashed._
import io.archivesunleashed.df._

val df_pdf = RecordLoader.loadArchives("/path/to/warcs/*", sc).extractPDFDetailsDF();
val res_pdf = df_pdf.select($"bytes", $"extension").saveToDisk("bytes", "/path/to/binaries/pdf/collection-prefix-pdf", "extension")

val df_audio = RecordLoader.loadArchives("/path/to/warcs/*", sc).extractAudioDetailsDF();
val res_audio = df_audio.select($"bytes", $"extension").saveToDisk("bytes", "/path/to/binaries/audio/collection-prefix-audio", "extension")

val df_video = RecordLoader.loadArchives("/path/to/warcs/*", sc).extractVideoDetailsDF();
val res_video = df_video.select($"bytes", $"extension").saveToDisk("bytes", "/path/to/binaries/video/collection-prefix-video", "extension")

val df_image = RecordLoader.loadArchives("/path/to/warcs/*", sc).extractImageDetailsDF();
val res_image = df_image.select($"bytes", $"extension").saveToDisk("bytes", "/path/to/binaries/image/collection-prefix-image", "extension")

val df_ss = RecordLoader.loadArchives("/path/to/warcs/*", sc).extractSpreadsheetDetailsDF();
val res_ss = df_ss.select($"bytes", $"extension").saveToDisk("bytes", "/path/to/binaries/spreadsheet/collection-prefix-spreadsheet", "extension")

val df_pp = RecordLoader.loadArchives("/path/to/warcs/*", sc).extractPresentationProgramDetailsDF();
val res_pp = df_pp.select($"bytes", $"extension").saveToDisk("bytes", "/path/to/binaries/presentation-program/collection-prefix-presentation-program", "extension")

val df_word = RecordLoader.loadArchives("/path/to/warcs/*", sc).extractWordProcessorDetailsDF();
val res_word = df_word.select($"bytes", $"extension").saveToDisk("bytes", "/path/to/binaries/word-processor/collection-prefix-word-processor", "extension")

val df_txt = RecordLoader.loadArchives("/path/to/warcs/*", sc).extractTextFilesDetailsDF();
val res_txt = df_txt.select($"bytes", $"extension").saveToDisk("bytes", "/path/to/binaries/text/collection-prefix-text", "extension")

sys.exit
```