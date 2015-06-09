The following Pig script extracts the text of all `greenparty.ca` pages across all time. Edit the url string in the filter statement assigned to variable `c`, and the output directory in the store statement, to apply script to other pages. The text from each page will be stored on a separate line:

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