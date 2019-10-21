# What to do with RDD Results

This page answers to question of what to do with Scala RDD results.

Most script snippets in the documentation begin start with `RecordLoader` and end with `take`, as in:

```scala
RecordLoader.loadArchives("src/test/resources/warc/example.warc.gz", sc).keepValidPages()
  // more transformations here...
  .take(10)
```

This "takes" the first 10 results and results it as an array (in the console).
In the console, you'll see the array contents printed out.
If you want more or fewer results, just change the number.

In the Scala console, the results are automatically assigned to a variable, like the following:

```scala
res0: Array[...] = Array(...)
```

Scala automatically numbers the variables, starting at 0, so that the number will increment with each statement.
You can then manipulate the variable, for example `res0(0)` to access the first element in the array.

Don't like the variable name Scala gives you?
You can do something like this:

```scala
val r = RecordLoader.loadArchives("src/test/resources/warc/example.warc.gz", sc).keepValidPages()
  // more transformations here...
  .take(10)
```

Scala assigns the results to `r` is this case, which you can then subsequently manipulate, like `r(0)` to access the first element.

If you want _all_ results, replace `.take(10)` with `.collect()`.
This will return _all_ results to the console.

**WARNING**: Be careful with `.collect()`! If your results contain ten million records, AUT will try to return _all of them_  to your console (on your physical machine).
Most likely, your machine won't have enough memory!

Alternatively, if you want to save the results to disk, replace the `.take(10)` line above with:

```scala
  .saveAsTextFile("/path/to/export/directory/")
```

Replace `/path/to/export/directory/` with your desired location.
Note that this is a _directory_, not a _file_.

