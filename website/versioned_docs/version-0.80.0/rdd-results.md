---
id: version-0.80.0-rdd-results
title: RDD Results
original_id: rdd-results
---

This page answers to question of what to do with Scala RDD results.

Most script snippets in the documentation begin start with `RecordLoader` and
end with `take`, as in:

```scala
RecordLoader.loadArchives("/path/to/warcs", sc).keepValidPages()
  // more transformations here...
  .take(10)
```

This "takes" the first 10 results and results it as an array (in the console).
In the console, you'll see the array contents printed out.
If you want more or fewer results, just change the number.

In the Scala console, the results are automatically assigned to a variable,
like the following:

```scala
res0: Array[...] = Array(...)
```

Scala automatically numbers the variables, starting at 0, so that the number
will increment with each statement.
You can then manipulate the variable, for example `res0(0)` to access the first
element in the array.

Don't like the variable name Scala gives you?
You can do something like this:

```scala
val r = RecordLoader.loadArchives("/path/to/warcs", sc).keepValidPages()
  // more transformations here...
  .take(10)
```

Scala assigns the results to `r` is this case, which you can then subsequently
manipulate, like `r(0)` to access the first element.

If you want _all_ results, replace `.take(10)` with `.collect()`.
This will return _all_ results to the console.

**WARNING**: Be careful with `.collect()`! If your results contain ten million
records, AUT will try to return _all of them_  to your console (on your
physical machine).
Most likely, your machine won't have enough memory!

Alternatively, if you want to save the results to disk, replace the `.take(10)`
line above with:

```scala
  .saveAsTextFile("/path/to/export/directory/")
```

Replace `/path/to/export/directory/` with your desired location.
Note that this is a _directory_, not a _file_.

You can also format your results to a format of your choice before passing them
to `saveAsTextFile()`.

For example, archive records are represented in Spark as
[tuples](https://en.wikipedia.org/wiki/Tuple), and this is the standard format
of results produced by most of the scripts presented here (e.g., see above). It
may be useful, however, to have this data in TSV (tab-separated value) format,
for further processing outside AUT. The following script uses `tabDelimit`
(from `TupleFormatter`) to transform tuples to tab-delimited strings; it also
flattens any nested tuples. (This is the same script as at the top of the page,
with the addition of the
third and the second-last lines.)

```scala
import io.archivesunleashed._
import io.archivesunleashed.matchbox._
import io.archivesunleashed.matchbox.TupleFormatter._

RecordLoader.loadArchives("/path/to/arc", sc)
  .keepValidPages()
  .map(r => (r.getCrawlDate, ExtractLinks(r.getUrl, r.getContentString)))
  .flatMap(r => r._2.map(f => (r._1,
                               ExtractDomain(f._1).replaceAll("^\\s*www\\.", ""),
                               ExtractDomain(f._2).replaceAll("^\\s*www\\.", ""))))
  .filter(r => r._2 != "" && r._3 != "")
  .countItems()
  .filter(r => r._2 > 5)
  .map(tabDelimit(_))
  .saveAsTextFile("sitelinks-tsv/")
```

Its output looks like:

```tsv
20151107        liberal.ca      youtube.com     16334
20151108        socialist.ca    youtube.com     11690
20151108        socialist.ca    ustream.tv      11584
20151107        canadians.org   canadians.org   11426
20151108        canadians.org   canadians.org   11403
```
