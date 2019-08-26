# Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [DataFrames: Collection Analysis](#dataframes-collection-analysis)
  - [Pages](#pages)
  - [Links](#links)
  - [Image Links](#image-links)
  - [Images](#images)
  - [PDFs](#pdfs)
  - [Audio](#audio)
  - [Video](#video)
  - [Spreadsheets](#spreadsheets)
  - [Presentation Program Files (i.e. PowerPoint)](#presentation-program-files-ie-powerpoint)
  - [Word Processor Files (i.e. Word)](#word-processor-files-ie-word)
  - [Plain Text Files](#plain-text-files)
- [Using DataFrames to Count Domains](#using-dataframes-to-count-domains)
- [Using DataFrames to Count Crawl Dates](#using-dataframes-to-count-crawl-dates)
- [Using DataFrames to List URLs](#using-dataframes-to-list-urls)
- [Turn Your WARCs into Temporary Database Table](#turn-your-warcs-into-temporary-database-table)
- [Implementing at Scale](#implementing-at-scale)

# Introduction

PySpark is a valuable tool for exploring and analyzing data at scale. It is slightly different from other Python programs in that it relies on Apache Spark's underlying Scala and Java code to manipulate datasets. You can read more about this in the [Spark documentation](http://spark.apache.org/docs/2.4.3/api/python/pyspark.html).

Of notable difference between PySpark and the Scala `spark-shell`, the latter proves challenging when pasting code to execute in the shell.

There are two ways around this. The first workaround is to create a new Python file with your script, and use `spark-submit`. For example, you might create a script with your text editor, save it as `file.py`, and then run it using the following.

```bash
spark-submit --jars /path/to/aut-0.18.0-fatjar.jar --driver-class-path /path/to/aut-0.18.0-fatjar.jar --py-files /path/to/aut.zip /path/to/custom/python/file.py
```

An easier method is to use the interactive, browser-based [Jupyter Notebooks](https://jupyter.org/) to work with the Archives Unleashed Toolkit (AUT). You can see it in action below.

![Jupyter Notebook in Action](https://user-images.githubusercontent.com/3834704/63434418-09c6bf00-c3f3-11e9-8b9f-64671cc6a2a5.png)

Jupyter Notebooks are a great tool and we use it for all of our script prototyping. Once we want to use it on more than one WARC file, though, we find it's best to shift over to `spark-submit`. Our advice is that once it is working on one file in the Notebook, and you want to start crunching your big data, move back to Spark Submit. 

# Getting Started

To get Jupyter running, you will need to install the following. First, you will require a version of Python 3.7+ installed. We suggest using [Anaconda Distribution](https://www.anaconda.com/distribution).

For ease of use, you may want to consider using a virtual environment:

```bash
virtualenv python ~/.venv_path
. ~/.venv_path/bin/activate
```

If for some reason you are missing dependencies, install them with `conda install` or `pip install`.

Next, you will need to download the following AUT release files:

- [`aut-0.18.0-fatjar.jar`](https://github.com/archivesunleashed/aut/releases/download/aut-0.18.0/aut-0.18.0-fatjar.jar)
- [`aut.zip`](https://github.com/archivesunleashed/aut/releases/download/aut-0.18.0/aut.zip)

With the dependencies downloaded, you are ready to launch your Jupyter Notebook.

```bash
PYSPARK_DRIVER_PYTHON=jupyter PYSPARK_DRIVER_PYTHON_OPTS=notebook /path/to/spark/bin/pyspark --jars /path/to/aut-0.18.0-fatjar.jar --driver-class-path /path/to/aut-0.18.0-fatjar.jar --py-files /path/to/aut.zip
```

A Jupyter Notebook _should_ automatically load in your browser at <http://localhost:8888>. You may be asked for a token upon first launch, which just offers a bit of security. The token is available in the load screen and will look something like this:

```
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

Create a new notebook by clicking “New” (near the top right of the Jupyter homepage) and select “Python 3” from the drop down list.

The notebook will open in a new window. In the first cell enter:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "src/test/resources/warc/")

pages = archive.pages()
pages.printSchema()
```

Then hit <kbd>Shift</kbd>+<kbd>Enter</kbd>, or press the play button.

If you receive no errors, and see the following, you are ready to begin working with your web archives!

![](https://user-images.githubusercontent.com/218561/63203995-42684080-c061-11e9-9361-f5e6177705ff.png)

# DataFrames: Collection Analysis

An additional benefit of using PySpark is its support of DataFrames, which visually presents data in a tabular form and enables effective filtering. In this section, we will use DataFrames as a tool to provide an overview of a collection’s content.

For these examples, we are going to use some [AUT sample data](https://github.com/archivesunleashed/aut-resources/archive/master.zip). Click the previous link, download it, and extract the zip file.

With the 0.18.0 release, AUT has the following DataFrames available for collections analysis:

- `audio`
- `images`
- `image_links`
- `links`
- `pages`
- `pdfs`
- `presentation_program`
- `spreadsheets`
- `text_files`
- `video`
- `word_processor`

## Pages

Create a DataFrame with crawl_date, url, mime_type_web_server, and content:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/aut-resources-master/Sample-Data/*gz")

df = archive.pages()
df.show()
```

![](https://user-images.githubusercontent.com/218561/63376195-3c24dd80-c35b-11e9-908b-9987294a5016.png)

## Links

Create a DataFrame with crawl_date, source, destination, and anchor text (that's the text that you click on to use the hyperlink):

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/aut-resources-master/Sample-Data/*gz")

df = archive.links()
df.show()
```

![](https://user-images.githubusercontent.com/218561/63376625-43002000-c35c-11e9-9e97-371311e87df7.png)

## Image Links

Create a DataFrame with source page, and image url:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/aut-resources-master/Sample-Data/*gz")

df = archive.image_links()
df.show()
```

![](https://user-images.githubusercontent.com/218561/63376736-8195da80-c35c-11e9-98b9-20cb0d823d2a.png)

## Images

Create a DataFrame with image url, filename, extension, mime_type_web_servr, mime_type_tika, width, height, md5, and raw bytes:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/aut-resources-master/Sample-Data/*gz")

df = archive.images()
df.show()
```

![](https://user-images.githubusercontent.com/218561/63376836-bbff7780-c35c-11e9-9333-9cf2d53dfefb.png)

## PDFs

Create a DataFrame with PDF url, filename, extension, mime_type_web_servr, mime_type_tika, md5, and raw bytes:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/aut-resources-master/Sample-Data/*gz")

df = archive.pdfs()
df.show()
```

![](https://user-images.githubusercontent.com/218561/63376931-ec471600-c35c-11e9-9f6e-c37202ce545d.png)

## Audio

Create a DataFrame with audio url, filename, extension, mime_type_web_servr, mime_type_tika, md5, and raw bytes. :

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/aut-resources-master/Sample-Data/*gz")

df = archive.audio()
df.show()
```

![](https://user-images.githubusercontent.com/218561/63377022-1dbfe180-c35d-11e9-892e-dec8266a6928.png)

## Video

Create a DataFrame with crawl_date, url, mime_type_web_server, and content:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/aut-resources-master/Sample-Data/*gz")

df = archive.video()
df.show()
```

![](https://user-images.githubusercontent.com/218561/63377104-4cd65300-c35d-11e9-9589-147e0146924f.png)

## Spreadsheets

Create a DataFrame with presentation program url, filename, extension, mime_type_web_servr, mime_type_tika, md5, and raw bytes:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/aut-resources-master/Sample-Data/*gz")

df = archive.spreadsheets()
df.show()
```

## Presentation program files (i.e. PowerPoint)

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/aut-resources-master/Sample-Data/*gz")

df = archive.presentation_program()
df.show()
```

## Word processor files (i.e. Word)

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/aut-resources-master/Sample-Data/*gz")

df = archive.word_processor()
df.show()
```

## Plain text files

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/path/to/aut-resources-master/Sample-Data/*gz")

df = archive.text_files()
df.show()
```

# Using DataFrames to Count Domains

Using the `extract_domain` function, and `pyspark.sql.functions`, we can count domains using any of the above DataFrames.

For example, you can run the following to see the top 10 domains:

```python
from aut import *
from pyspark.sql.functions import desc

archive = WebArchive(sc, sqlContext, "/home/nruest/Downloads/aut-resources-master/Sample-Data/*gz")

df = archive.pages()
df.select(extract_domain("url").alias("Domain")).groupBy("Domain").count().sort(desc("count")).show(n=10)
```

![](https://user-images.githubusercontent.com/218561/63378499-54e3c200-c360-11e9-89f8-d3ef0958e87e.png)

# Using DataFrames to Count Crawl Dates

You can do this for a few other commands as well. For example, by crawl date:

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/home/nruest/Downloads/aut-resources-master/Sample-Data/*gz")

df = archive.pages()
df.select(extract_domain("crawl_date").alias("Crawl Date")).groupBy("Crawl Date").count().show()
```

![](https://user-images.githubusercontent.com/218561/63378654-b441d200-c360-11e9-9c9a-e202f5378495.png)

# Using DataFrames to List URLs

Finally, you can compile a list of the URLs in a collection with the following command:

```
from aut import *

archive = WebArchive(sc, sqlContext, "/home/nruest/Downloads/aut-resources-master/Sample-Data/*gz")

df = archive.pages()
df.select("url").rdd.flatMap(lambda x: x).take(10)
```

![](https://user-images.githubusercontent.com/218561/63378775-f5d27d00-c360-11e9-8cc1-7b4085cc1e94.png)

# Turn Your WARCs into a Temporary Database Table

Using any of the above DataFrames, you can begin to integrate [Spark SQL](https://spark.apache.org/docs/2.4.3/sql-programming-guide.html) commands.

```python
from aut import *

archive = WebArchive(sc, sqlContext, "/home/nruest/Downloads/aut-resources-master/Sample-Data/*gz")

df = archive.pages()

df.createOrReplaceTempView("warc") # create a table called "warc"

dfSQL = spark.sql('SELECT * FROM warc WHERE url LIKE "%ndp.ca%" ORDER BY crawl_date DESC')

dfSQL.show(5)
```

![](https://user-images.githubusercontent.com/218561/63379025-742f1f00-c361-11e9-9b42-512e7fd3c643.png)

# Implementing at Scale

Now that you've seen what's possible, try using your own files. We recommend the following:

1. Write your scripts in a Jupyter notebook based on one WARC or ARC file, and see if the results are what you might want to do.
2. Once you're ready to run it at scale, copy the notebook out of the Notebook and into a text editor.
3. You may want to swap the `path` variable to include an entire directly - i.e. `path = "/path/to/warcs/*.gz"` rather than just pointing to one file.
4. Use the Spark-Submit command to execute the script. 

Spark-Submit has more fine-tuned commands around the amount of memory you are devoting to the process. Please read the documentation [here](https://spark.apache.org/docs/latest/submitting-applications.html).

As a reminder, `spark-submit` syntax looks like:

```bash
spark-submit --jars /path/to/aut-0.18.0-fatjar.jar --driver-class-path /path/to/aut-0.18.0-fatjar.jar --py-files /path/to/aut.zip /path/to/custom/python/file.py
```

Where `file.py` is the Python script that you've written.