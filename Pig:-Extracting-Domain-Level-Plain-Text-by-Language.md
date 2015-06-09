The following script is similar to the normal plain text extractor, but incorporates language ID and filter. In the following script, change URL in variable c and language ID in variable f.

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