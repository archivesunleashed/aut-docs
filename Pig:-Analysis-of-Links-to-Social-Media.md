The following Pig script counts all links to YouTube, Facebook, and Twitter, grouped by crawl date (YYYYMM) and top-level domain:

```
register 'target/warcbase-0.1.0-SNAPSHOT-fatjar.jar';

DEFINE ArcLoader org.warcbase.pig.ArcLoader();
DEFINE ExtractLinks org.warcbase.pig.piggybank.ExtractLinks();
DEFINE ExtractTopLevelDomain org.warcbase.pig.piggybank.ExtractTopLevelDomain();

raw = load '/shared/collections/CanadianPoliticalParties/arc/' using ArcLoader as
  (url: chararray, date: chararray, mime: chararray, content: bytearray);

a = filter raw by mime == 'text/html' and date is not null;
b = foreach a generate SUBSTRING(date, 0, 6) as date, url, FLATTEN(ExtractLinks((chararray) content, url));
c = foreach b generate $0 as date, ExtractTopLevelDomain($1) as source, REGEX_EXTRACT($2, '.*(twitter|facebook|youtube).*', 1) as target;
d = filter c by target is not null;
e = group d by (date, source, target);
f = foreach e generate FLATTEN(group), COUNT(d);
g = order f by $0, $1;

store g into 'cpp.socialmedia/';
```

This one breaks social media sites into Twitter, Facebook, YouTube,
and by top-level domain, all in one go.

Let's try to drill down and find out where the first link to YouTube comes from:

```
register 'target/warcbase-0.1.0-SNAPSHOT-fatjar.jar';

DEFINE ArcLoader org.warcbase.pig.ArcLoader();
DEFINE ExtractLinks org.warcbase.pig.piggybank.ExtractLinks();

raw = load '/shared/collections/CanadianPoliticalParties/arc/' using ArcLoader as
  (url: chararray, date: chararray, mime: chararray, content: bytearray);

a = filter raw by mime == 'text/html' and date is not null;
b = foreach a generate date as date, url, FLATTEN(ExtractLinks((chararray) content));
c = foreach b generate $0 as date, $1 as source, REGEX_EXTRACT($2, '.*(youtube).*', 1) as target;
d = filter c by target is not null;
e = order d by date;
f = limit e 10;
```

The script orders all the links by crawl date and then takes the top ten.

The page is [http://canadianactionparty.ca/temp/North_American_Union/index.asp](https://web.archive.org/web/20060722204643/http://canadianactionparty.ca/temp/North_American_Union/index.asp), which contains a link "Do you want to live in the USA of dubya?". Ironically, the YouTube video (which unfortunately isn't archived) is just a CNN segment, so it doesn't quite "count" as using social media.

We can change the `c = ...` line to find out the first page to link to Facebook and Twitter. They are:

+ Facebook: [http://www.liberal.ca/glance_e.aspx](https://web.archive.org/web/20081011072617/http://www.liberal.ca/glance_e.aspx)
+ Twitter: [http://www.pm.gc.ca/eng/feature.asp?pageId=105](https://web.archive.org/web/20080711224545/http://www.pm.gc.ca/eng/feature.asp?pageId=105)
