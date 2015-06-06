The following Pig script generates the aggregated site-level link structure, grouped by crawl date (YYYYMM):

```
register 'target/warcbase-0.1.0-SNAPSHOT-fatjar.jar';

DEFINE ArcLoader org.warcbase.pig.ArcLoader();
DEFINE ExtractLinks org.warcbase.pig.piggybank.ExtractLinks();
DEFINE ExtractTopLevelDomain org.warcbase.pig.piggybank.ExtractTopLevelDomain();

raw = load '/shared/collections/CanadianPoliticalParties/arc/' using ArcLoader as
  (url: chararray, date: chararray, mime: chararray, content: bytearray);

a = filter raw by mime == 'text/html' and date is not null;
b = foreach a generate SUBSTRING(date, 0, 6) as date, url, FLATTEN(ExtractLinks((chararray) content, url));
c = foreach b generate $0 as date, REPLACE(ExtractTopLevelDomain($1), '^\\s*www\\.', '') as source, 
                                   REPLACE(ExtractTopLevelDomain($2), '^\\s*www\\.', '') as target;
d = group c by (date, source, target);
e = foreach d generate FLATTEN(group), COUNT(c) as count;
f = filter e by count > 10 and $1 != '' and $2 != '';
g = order f by date, source, target;

store g into 'cpp.sitelinks/';
```

Note that we remove leading `www.` to normalize the top-level domains.
