# What to do with DataFrame Results

This page answers the question of what to do with Scala or Python DF results.

Most script snippets in the documentation end with `.show(20, false)` (in Scala) and `.show(20, False)` (in Python).
This prints a table of results with 20 rows and _doesn't_ truncate the columns (the `false` or `False`).
You can change the second parameter to `true` (Scala) or `True` (Python) if the columns get too wide for better display.
If you want more or fewer results, change the first number.

## Scala

If you want to return a set of results, the counterpart of `.take(10)` with RDDs is `.head(10)`.
So, something like (in Scala):

```scala
RecordLoader.loadArchives("src/test/resources/warc/example.warc.gz", sc).extractValidPagesDF()
  // more transformations here...
  .head(10)
```

In the Scala console, the results are automatically assigned to a variable, like the following:

```scala
res0: Array[String] = Array(...)
```

Scala automatically numbers the variables, starting at 0, so that the number will increment with each statement.
You can then manipulate the variable, for example `res0(0)` to access the first element in the array.

Don't like the variable name Scala gives you?
You can do something like this:

```scala
val r = RecordLoader.loadArchives("src/test/resources/warc/example.warc.gz", sc).keepValidPages()
  // more transformations here...
  .head(10)
```

Scala assigns the results to `r` is this case, which you can then subsequently manipulate, like `r(0)` to access the first element.

If you want _all_ results, replace `.take(10)` with `.collect()`.
This will return _all_ results to the console.

**WARNING**: Be careful with `.collect()`! If your results contain ten million records, AUT will try to return _all of them_  to your console (on your physical machine).
Most likely, your machine won't have enough memory!

Alternatively, if you want to save the results to disk, replace `.show(20, false)` with the following:

```scala
  .write.csv("/path/to/export/directory/")
```

Replace `/path/to/export/directory/` with your desired location.
Note that this is a _directory_, not a _file_.

If you want to store the results with the intention to read the results back later for further processing, then use Parquet format:

```scala
  .write.parquet("/path/to/export/directory/")
```

Replace `/path/to/export/directory/` with your desired location.
Note that this is a _directory_, not a _file_.

Later, as in a completely separate session, you can read the results back in and continuing processing, as follows:

```
val results = spark.read.parquet("/path/to/export/directory/")

results.show(20, false)
```

Parquet encodes metadata such as the schema and column types, so you can pick up exactly where you left off.
Note that this works even across languages (e.g., export to Parquet from Scala, read back in Python) or any system that supports Parquet.

## Python

TODO: Python basically the same, but with Python syntax. However, we should be explicit and lay out the steps.
