The following pig script generates plain text files, based on the string fed to the filter statement assigned to variable `c`.

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