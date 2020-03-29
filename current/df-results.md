# What to do with DataFrame Results

This page answers the question of what to do with Scala or Python DF results.

Most script snippets in the documentation end with `.show(20, false)` (in
Scala) and `.show(20, False)` (in Python).
This prints a table of results with 20 rows and _doesn't_ truncate the columns
(the `false` or `False`).
You can change the second parameter to `true` (Scala) or `True` (Python) if the
columns get too wide for better display.
If you want more or fewer results, change the first number.

## Scala

If you want to return a set of results, the counterpart of `.take(10)` with
RDDs is `.head(10)`.
So, something like (in Scala):

```scala
RecordLoader.loadArchives("/path/to/warcs", sc).webpages()
  // more transformations here...
  .head(10)
```

In the Scala console, the results are automatically assigned to a variable,
like the following:

```scala
res0: Array[String] = Array(...)
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
  .head(10)
```

Scala assigns the results to `r` is this case, which you can then subsequently
manipulate, like `r(0)` to access the first element.

If you want _all_ results, replace `.take(10)` with `.collect()`.
This will return _all_ results to the console.

**WARNING**: Be careful with `.collect()`! If your results contain ten million
records, AUT will try to return _all of them_  to your console (on your
physical machine).
Most likely, your machine won't have enough memory!

Alternatively, if you want to save the results to disk, replace `.show(20,
false)` with the following:

```scala
  .write.csv("/path/to/export/directory/")
```

Replace `/path/to/export/directory/` with your desired location.
Note that this is a _directory_, not a _file_.

Depending on your intended use of the output, you may want to include headers
in the CSV file, in which case:

```scala
  .write.option("header","true").csv("/path/to/export/directory/")
```

If you want to store the results with the intention to read the results back
later for further processing, then use [Parquet](https://parquet.apache.org/)
format (a [columnar storage
format](http://en.wikipedia.org/wiki/Column-oriented_DBMS):

```scala
  .write.parquet("/path/to/export/directory/")
```

Replace `/path/to/export/directory/` with your desired location.
Note that this is a _directory_, not a _file_.

Later, as in a completely separate session, you can read the results back in
and continuing processing, as follows:

```scala
val results = spark.read.parquet("/path/to/export/directory/")

results.show(20, false)
```

Parquet encodes metadata such as the schema and column types, so you can pick
up exactly where you left off.
Note that this works even across languages (e.g., export to Parquet from Scala,
read back in Python) or any system that supports Parquet.

## Python

If you want to return a set of results, the counterpart of `.take(10)` with
RDDs is `.head(10)`.
So, something like (in Python):

```python
WebArchive(sc, sqlContext, "/path/to/warcs").webpages()\
  # more transformations here...
  .select("http_status_code")
  .head(10)
```

In the PySpark console, the results are returned as a List of rows, like the following:

```python
[Row(http_status_code='200'), Row(http_status_code='200'), Row(http_status_code='200'), Row(http_status_code='200'), Row(http_status_code='200'), Row(http_status_code='200'), Row(http_status_code='200'), Row(http_status_code='200'), Row(http_status_code='200'), Row(http_status_code='200')]
```

You can assign the tranformations to a variable, like this:

```python
archive = WebArchive(sc, sqlContext, "/path/to/warcs").webpages()
  # more transformations here...
  .head(10)
```

If you want _all_ results, replace `.head(10)` with `.collect()`.
This will return _all_ results to the console.

**WARNING**: Be careful with `.collect()`! If your results contain ten million
records, TWUT will try to return _all of them_  to your console (on your
physical machine).
Most likely, your machine won't have enough memory!

Alternatively, if you want to save the results to disk, replace `.show(20,
false)` with the following:

```python
archive.write.csv("/path/to/export/directory/")
```

Replace `/path/to/export/directory/` with your desired location.
Note that this is a _directory_, not a _file_.

Depending on your intended use of the output, you may want to include headers
in the CSV file, in which case:

```python
archive.write.csv("/path/to/export/directory/", header='true')
```

If you want to store the results with the intention to read the results back
later for further processing, then use Parquet format:

```python
archive.write.parquet("/path/to/export/directory/")
```

Replace `/path/to/export/directory/` with your desired location.
Note that this is a _directory_, not a _file_.

Later, as in a completely separate session, you can read the results back in
and continuing processing, as follows:

```python
archive = spark.read.parquet("/path/to/export/directory/")

archive.show(20, false)
```

Parquet encodes metadata such as the schema and column types, so you can pick
up exactly where you left off.
Note that this works even across languages (e.g., export to Parquet from Scala,
read back in Python) or any system that supports Parquet.
