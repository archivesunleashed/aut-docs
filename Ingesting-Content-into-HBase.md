You can find some sample data [here](https://archive.org/details/ExampleArcAndWarcFiles). Ingesting data into Warcbase is fairly straightforward:

```
$ setenv CLASSPATH_PREFIX "/etc/hbase/conf/"
$ sh target/appassembler/bin/IngestFiles \
    -dir /path/to/warc/dir/ -name archive_name -create
```

Command-line options:

+ Use the `-dir` option to specify the directory containing the data files.
+ Use the `-name` option to specify the name of the archive (will correspond to the HBase table name).
+ Use the `-create` option to create a new table (and drop the existing table if a table with the same name exists already). Alternatively, use `-append` to add to an existing table.

An example on one OS X machine:

```
$ export CLASSPATH_PREFIX="/usr/local/Cellar/hbase/0.98.6.1/libexec/conf/"
$ sh target/appassembler/bin/IngestFiles -dir ~/desktop/WARC-directory/ -name webarchives1 -create -gz
```

That should do it. The data should now be in Warcbase.