---
id: usage
title: Usage
---

## The Toolkit with Spark Submit

The Toolkit offers a variety of extraction jobs with
[`spark-submit`](https://spark.apache.org/docs/latest/submitting-applications.html)
. These extraction jobs have a few configuration options.

The extraction jobs have a basic outline of:

```shell
spark-submit --class io.archivesunleashed.app.CommandLineAppRunner PATH_TO_AUT_JAR --extractor EXTRACTOR --input INPUT DIRECTORY --output OUTPUT DIRECTORY
```

More information on using the Toolkit with `spark-submit` can be found in
[The Toolkit with spark-submit](aut-spark-submit-app.md) section of the documentation.

## The Toolkit with Spark Shell

The Toolkit only supports the `--jar` option.

```shell
spark-shell --help

  --jars JARS                 Comma-separated list of jars to include on the driver
                              and executor classpaths.
```

### With an UberJar

Release version:

```shell
spark-shell --jars /path/to/aut-0.80.0-fatjar.jar
```

HEAD (built locally):

```shell
spark-shell --jars /path/to/aut/target/aut-0.80.1-SNAPSHOT-fatjar.jar
```

## The Toolkit with PySpark

To run PySpark with the Toolkit loaded, you will need to
provide PySpark with the Java/Scala artifact, as well as the Python bindings.
The Java/Scala artifact can be provided with `--jars` as
described above. The Python bindings can be
[downloaded](https://github.com/archivesunleashed/aut/releases/download/aut-0.80.0/aut-0.80.0.zip)
, or [built locally](#building-locally) (the zip file will be found in
the `target` directory.

In each of the examples below, `/path/to/python` is listed. If you are unsure
where your Python is, it can be found with `which python`.

### With an UberJar

Release version:

```shell
export PYSPARK_PYTHON=/path/to/python; export PYSPARK_DRIVER_PYTHON=/path/to/python; /path/to/spark/bin/pyspark --py-files aut-0.80.0.zip --jars /path/to/aut-0.80.0-fatjar.jar
```

HEAD (built locally):

```shell
export PYSPARK_PYTHON=/path/to/python; export PYSPARK_DRIVER_PYTHON=/path/to/python; /path/to/spark/bin/pyspark --py-files aut.zip --jars /path/to/aut-0.80.1-SNAPSHOT-fatjar.jar
```

## The Toolkit with Jupyter

To run a [Jupyter Notebook](https://jupyter.org/install) with the Archives
Unleashed Toolkit loaded, you will need to provide PySpark the Java/Scala
artifact, and the Python bindings. The Java/Scala artifact can be provided
with `--jars` as described above. The Python bindings can be
[downloaded](https://github.com/archivesunleashed/aut/releases/download/aut-0.80.0/aut-0.80.0.zip)
, or [built locally](#Introduction) (the zip file will be found in
the `target` directory.

### With an UberJar

Release version:

```shell
export PYSPARK_DRIVER_PYTHON=jupyter; export PYSPARK_DRIVER_PYTHON_OPTS=notebook; /path/to/spark/bin/pyspark --py-files aut-0.80.0.zip --jars /path/to/aut-0.80.0-fatjar.jar
```

HEAD (built locally):

```shell
export PYSPARK_DRIVER_PYTHON=jupyter; export PYSPARK_DRIVER_PYTHON_OPTS=notebook; /path/to/spark/bin/pyspark --py-files aut.zip --jars /path/to/aut-0.80.1-SNAPSHOT-fatjar.jar
```

A Jupyter Notebook _should_ automatically load in your browser at
<http://localhost:8888>. You may be asked for a token upon first launch, which
just offers a bit of security. The token is available in the load screen and
will look something like this:

```shell
[I 19:18:30.893 NotebookApp] Writing notebook server cookie secret to /run/user/1001/jupyter/notebook_cookie_secret
[I 19:18:31.111 NotebookApp] JupyterLab extension loaded from /home/nruest/bin/anaconda3/lib/python3.7/site-packages/jupyterlab
[I 19:18:31.111 NotebookApp] JupyterLab application directory is /home/nruest/bin/anaconda3/share/jupyter/lab
[I 19:18:31.112 NotebookApp] Serving notebooks from local directory: /home/nruest/Projects/au/aut
[I 19:18:31.112 NotebookApp] The Jupyter Notebook is running at:
[I 19:18:31.112 NotebookApp] http://localhost:8888/?token=87e7a47c5a015cb2b846c368722ec05c1100988fd9dcfe04
[I 19:18:31.112 NotebookApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
[C 19:18:31.140 NotebookApp]

    To access the notebook, open this file in a browser:
        file:///run/user/1001/jupyter/nbserver-9702-open.html
    Or copy and paste one of these URLs:
        http://localhost:8888/?token=87e7a47c5a015cb2b846c368722ec05c1100988fd9dcfe04
```

Create a new notebook by clicking "New" (near the top right of the Jupyter
homepage) and select "Python 3" from the drop-down list.

The notebook will open in a new window. In the first cell enter:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "src/test/resources/warc/")

webpages = archive.webpages()
webpages.printSchema()
```

Then hit <kbd>Shift</kbd>+<kbd>Enter</kbd>, or press the play button.

If you receive no errors, and see the following, you are ready to begin working
with your web archives!

![](https://user-images.githubusercontent.com/218561/63203995-42684080-c061-11e9-9361-f5e6177705ff.png)

## The Toolkit with Docker

The Toolkit offers a [Docker image](https://hub.docker.com/r/archivesunleashed/docker-aut)
that can be used with Spark and PySpark. These images are great for learning
how the Toolkit works, and quick prototyping. Images are available for [each
release](https://hub.docker.com/r/archivesunleashed/docker-aut/tags),
and `latest` corresponds to the `main` branch.

To run the latest verion of the Toolkit with `spark-shell`:

```shell
docker run --rm -it archivesunleashed/docker-aut
```

More information on using the `docker-aut` can be found
[here](https://github.com/archivesunleashed/docker-aut).
