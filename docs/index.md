# Archives Unleashed Toolkit (aut)

<p align="center">
  <img src="https://raw.githubusercontent.com/web-archive-group/WAHR/master/images/cpppig-visualization-small.png" alt="network of the Canadian Political Parties collection"/>
</p>

The Archives Unleashed Toolkit is an open-source platform for managing web archives built on [Hadoop](https://hadoop.apache.org/) and [HBase](https://hbase.apache.org/). The platform provides a flexible data model for storing and managing raw content as well as metadata and extracted knowledge. Tight integration with Hadoop provides powerful tools for analytics and data processing via [Spark](http://spark.apache.org/). For more information on the project and the team behind it, visit our [about page](./about/).

Our documentation can be accessed by using the drop-down menus above.

## Getting Started

The Archives Unleashed Toolkit requires both git and maven to work.  On Mac / OS X, we advise downloading and installing the [Homebrew Package Manager](http://brew.sh).

### Installing Git and Maven  

#### MAC / OS X

With Homebrew Installed, you can install git and maven

```
brew install git
brew install maven
```

#### Windows

Install git using [Git Bash](https://git-for-windows.github.io/). 

[Download a copy of binary zip copy of Maven](https://maven.apache.org/download.cgi) Then follow [these instructions for "Windows Tips"](https://maven.apache.org/install.html). 

Instead of `spark-shell` in subsequent instructions, you will need to call `spark-shell.cmd` instead.

#### Linux

apt-get install git
[Download Maven from Apache](https://maven.apache.org/download.cgi). We have tested using the tar archive.

More detailed instructions on this process are available on the [Getting Started Tutorial](./Getting-Started.md)

### Installing the Archives Unleashed Toolkit

```bash
git clone http://github.com/archivesunleashed/aut.git
cd aut
mvn clean package
```

If it works you should see `BUILD SUCCESS!`.  

If you run into any trouble, you may find the [Getting Started Tutorial](./Getting-Started.md) helpful.

You should now be able to try out the toolkit's many tutorials.

## Using the Archives Unleashed Toolkit

We have prepared a number of tutorials to show what the AUT can do:

* [**Spark to analyze your web archive collections**](./Analyzing-Web-Archives-with-Spark/) for gathering collection statistics, textual analysis, network analysis, etc.

[This SHINE walkthrough](./Shine-Installing-Shine-Frontend-on-OS-X/) and this [building Lucene indexes](./Building-Lucene-Indexes-Using-Hadoop/) walkthrough shows how to use the SHINE front end on Solr indexes generated using aut. 


# About aut
Aut is an open-source platform for managing web archives built on Hadoop and HBase. The platform provides a flexible data model for storing and managing raw content as well as metadata and extracted knowledge. Tight integration with Hadoop provides powerful tools for analytics and data processing via Spark.

There are two main ways of using aut:

+ The first and most common is to analyze web archives using [Spark](http://spark.apache.org/).
+ The second is to take advantage of HBase to provide random access as well as analytics capabilities. Random access allows aut to provide temporal browsing of archived content (i.e., "wayback" functionality).

You can use aut without HBase, and since HBase requires more extensive setup, it is recommended that if you're just starting out, play with the Spark analytics and don't worry about HBase.

AUT is built against CDH 5.4.1:

+ Hadoop version: 2.6.0-cdh5.4.1
+ HBase version: 1.0.0-cdh5.4.1
+ Spark version: 1.3.0-cdh5.4.1

The Hadoop ecosystem is evolving rapidly, so there may be incompatibilities with other versions.

You are currently in our documentation.

<!-- check this link by September 15th -->

Supporting files can be found in the [aut-resources repository](https://github.com/archivesunleashed/aut-resources).

## Project Team

The Archives Unleashed Toolkit is brought to you by a team of researchers at the University of Waterloo, including:

- **Jimmy Lin**, David R. Cheriton Chair, David R. Cheriton School of Computer Science
- **Ian Milligan**, Assistant Professor, Department of History
- **Alice Zhou**, Undergraduate Research Assistant, David R. Cheriton School of Computer Science
- **Jeremy Wiebe**, PhD Candidate, Department of History

## License

Licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

## Acknowlegments

This work is supported in part by the National Science Foundation and by the Mellon Foundation (via Columbia University). Additional support has been forthcoming from the Social Sciences and Humanities Research Council of Canada and the Ontario Ministry of Research and Innovation's Early Researcher Award program.  Any opinions, findings, and conclusions or recommendations expressed are those of the researchers and do not necessarily reflect the views of the sponsors.
