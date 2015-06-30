The following Pig script generates plain text renderings for all the web pages in a collection with a URL matching a filter string. (The URL filter statement is assigned to variable `c`.) 

_See below for more advanced filtering by text language._

```
register 'target/warcbase-0.1.0-SNAPSHOT-fatjar.jar';

DEFINE ArcLoader org.warcbase.pig.ArcLoader();
DEFINE ExtractRawText org.warcbase.pig.piggybank.ExtractRawText();
DEFINE ExtractTopLevelDomain org.warcbase.pig.piggybank.ExtractTopLevelDomain();

raw = load '/shared/collections/CanadianPoliticalParties/arc/' using ArcLoader as
  (url: chararray, date: chararray, mime: chararray, content: bytearray);

a = filter raw by mime == 'text/html' and date is not null;
b = foreach a generate SUBSTRING(date, 0, 6) as date,
                       REPLACE(ExtractTopLevelDomain(url), '^\\s*www\\.', '') as url, content;
c = filter b by url == 'greenparty.ca';
d = foreach c generate date, url, ExtractRawText((chararray) content) as text;

store d into 'cpp.text-greenparty';
```

In this case, the plain text of the `greenparty.ca` websites would be extracted and stored as `cpp.text-greenparty` within HDFS. 

You may subsequently want to convert this output so that it is arranged in date-ordered (i.e. the GreenParty.ca websites from 2008-10 stored together). To do so, use this `break-into-date-scrapes.py` from <https://github.com/ianmilligan1/WAHR/blob/master/code/break-into-date-scrapes.py>. Usage example:

```
./break-into-date-scrapes.py <INPUT DIRECTORY WITH PART-M files> <OUTPUT DIRECTORY>
```

## Applying a Language Filter

The following script incorporates filtering by detected language. Set the URL in the filter statement assigned to variable `c` and language ID in the filter assigned to variable `f`.

```
register 'target/warcbase-0.1.0-SNAPSHOT-fatjar.jar';

DEFINE ArcLoader org.warcbase.pig.ArcLoader();
DEFINE DetectLanguage org.warcbase.pig.piggybank.DetectLanguage();
DEFINE ExtractRawText org.warcbase.pig.piggybank.ExtractRawText();
DEFINE ExtractTopLevelDomain org.warcbase.pig.piggybank.ExtractTopLevelDomain();

raw = load '/shared/collections/CanadianPoliticalParties/arc/' using ArcLoader as
  (url: chararray, date: chararray, mime: chararray, content: bytearray);

a = filter raw by mime == 'text/html' and date is not null;
b = foreach a generate SUBSTRING(date, 0, 6) as date,
                       REPLACE(ExtractTopLevelDomain(url), '^\\s*www\\.', '') as url, content;
c = filter b by url == 'greenparty.ca';
d = foreach c generate date, url, ExtractRawText((chararray) content) as text;
e = foreach d generate date, url, DetectLanguage(text) as lang, text;
f = filter e by lang == 'fr';

store f into 'cpp.text-greenparty-fr';
```

If you just, however, want to add a language ID and filter later, the following works:

```
register 'target/warcbase-0.1.0-SNAPSHOT-fatjar.jar';

DEFINE ArcLoader org.warcbase.pig.ArcLoader();
DEFINE DetectLanguage org.warcbase.pig.piggybank.DetectLanguage();
DEFINE ExtractRawText org.warcbase.pig.piggybank.ExtractRawText();
DEFINE ExtractTopLevelDomain org.warcbase.pig.piggybank.ExtractTopLevelDomain();

raw = load '/shared/collections/CanadianPoliticalParties/arc/' using ArcLoader as
  (url: chararray, date: chararray, mime: chararray, content: bytearray);

a = filter raw by mime == 'text/html' and date is not null;
b = foreach a generate SUBSTRING(date, 0, 6) as date,
                       REPLACE(ExtractTopLevelDomain(url), '^\\s*www\\.', '') as url, content;
c = filter b by url == 'greenparty.ca';
d = foreach c generate date, url, ExtractRawText((chararray) content) as text;
e = foreach d generate date, url, DetectLanguage(text) as lang, text;

store e into 'cpp.text-greenparty';
```

You will notice that all of the text has a language ID next to it.

If you want a breakdown of the languages used in your collection, this script will work:

```
register 'target/warcbase-0.1.0-SNAPSHOT-fatjar.jar';

DEFINE ArcLoader org.warcbase.pig.ArcLoader();
DEFINE DetectLanguage org.warcbase.pig.piggybank.DetectLanguage();
DEFINE ExtractRawText org.warcbase.pig.piggybank.ExtractRawText();
DEFINE ExtractTopLevelDomain org.warcbase.pig.piggybank.ExtractTopLevelDomain();

raw = load '/shared/collections/CanadianPoliticalParties/arc/' using ArcLoader as
  (url: chararray, date: chararray, mime: chararray, content: bytearray);

a = filter raw by mime == 'text/html' and date is not null;
b = foreach a generate SUBSTRING(date, 0, 6) as date,
                       REPLACE(ExtractTopLevelDomain(url), '^\\s*www\\.', '') as url, content;
c = filter b by url == 'greenparty.ca';
d = foreach c generate date, url, ExtractRawText((chararray) content) as text;
e = foreach d generate DetectLanguage(text) as lang;
f = group e by lang;
g = foreach f generate group, COUNT(e);

dump g;
```

Sample output:
```
(en,981352)
(es,22)
(et,7537)
(nl,3)
(no,189)
(fi,13)
(fr,776220)
(gl,103)
(it,57398)
(ro,207378)
(sk,54)
(sl,1)
(lt,124120)
```

## Removing "Boilerplate" Text
The following script employs the _Boilerpipe_ library to detect and remove "boilerplate" text (navigation elements, standard headers and footers, etc.) from web pages. The library provides a number of _extractors_ designed to recognize the main text content of different categories of websites. Warcbase currently employs the generic _DefaultExtractor_, but in many cases _ArticleExtractor_, tuned to find news articles, might be more suitable. Note that this script filters out documents for which Boilerpipe produces empty text strings (i.e., determines the entire web page to consist of irrelevant text). 

```
register 'target/warcbase-0.1.0-SNAPSHOT-fatjar.jar';

DEFINE ArcLoader org.warcbase.pig.ArcLoader();
DEFINE ExtractBoilerpipeText org.warcbase.pig.piggybank.ExtractBoilerpipeText();
DEFINE ExtractTopLevelDomain org.warcbase.pig.piggybank.ExtractTopLevelDomain();

raw = load '/collections/webarchives/CanadianPoliticalParties/arc/' using ArcLoader as (url: chararray, date: chararray, mime: chararray, content: bytearray);

a = filter raw by mime == 'text/html' and date is not null;
b = foreach a generate SUBSTRING(date, 0, 6) as date, REPLACE(ExtractTopLevelDomain(url), '^\\s*www\\.', '') as url, content;
c = filter b by url == 'greenparty.ca';
d = foreach c generate date, url, ExtractBoilerpipeText((chararray) content) as text;
e = filter d by text is not null;   /* Boilerpipe may produce empty strings */

store e into 'cpp.text-greenparty-boilerpiped';
```