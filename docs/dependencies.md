---
id: dependencies
title: Dependencies
---

## Java

The Toolkit requires Java 11.

For macOS: You can find information on Java
[here](https://java.com/en/download/help/mac_install.xml). We recommend
[OpenJDK](https://adoptopenjdk.net/). The easiest way is to install
with [homebrew](https://brew.sh) and then:

```bash
brew cask install adoptopenjdk/openjdk/adoptopenjdk8
```

If you run into difficulties with homebrew, installation instructions can be
found [here](https://adoptopenjdk.net/).

On Debian based system you can install Java using `apt`:

```bash
apt install openjdk-11-jdk
```

Before `spark-shell` can launch, `JAVA_HOME` must be set. If you receive an
error that `JAVA_HOME` is not set, you need to point it to where Java is
installed. On Linux, this might be
`export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64` or on macOS it might be
`export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-11.0.5.jdk/Contents/Home`.

## Python

The Toolkit requires Python 3.7.3+

If you would like to use the Archives Unleashed Toolkit with PySpark and
Jupyter Notebooks, you'll need to have a modern version of Python installed.
We recommend using the
[Anaconda Distribution](https://www.anaconda.com/distribution).
This _should_ install Jupyter Notebook, as well as the PySpark bindings. If
it doesn't, you can install either with `conda install` or `pip install`.

## Apache Spark

The Toolkit requires Apache Spark 3.0.0+

Download and unzip [Apache Spark](https://spark.apache.org) to a location of
your choice.

```bash
curl -L "https://archive.apache.org/dist/spark/spark-3.0.0/spark-3.0.0-bin-hadoop2.7.tgz" > spark-3.0.0-bin-hadoop2.7.tgz
tar -xvf spark-3.0.0-bin-hadoop2.7.tgz
```
