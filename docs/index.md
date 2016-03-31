# Warcbase

Warcbase is an open-source platform for managing web archives built on [Hadoop](https://hadoop.apache.org/) and [HBase](https://hbase.apache.org/). The platform provides a flexible data model for storing and managing raw content as well as metadata and extracted knowledge. Tight integration with Hadoop provides powerful tools for analytics and data processing via [Spark](http://spark.apache.org/). For more information on the project and the team behind it, visit our [about page](./about/).

Our documentation can be accessed by clicking the drop-down menu above labelled User Guide.

## Getting Started
You can [download Warcbase here](https://github.com/lintool/warcbase). The easiest way would be to follow our [Getting Started tutorial](./Getting-Started/). For a conceptual and practical introduction to the command line, please see Ian Milligan and James Baker's "Introduction to the Bash Command Line" at the [*Programming Historian*](http://programminghistorian.org/lessons/intro-to-bash).

## Using Warcbase
If you've just arrived, you're probably interested in using [**Spark to analyze your web archive collections**](./Analyzing-Web-Archives-with-Spark/): gathering collection statistics, textual analysis, network analysis, etc.

If you want to explore web archives using other means, we have walkthroughs to use the SHINE front end on Solr indexes generated using Warcbase. See [this SHINE walkthrough](./Shine-Installing-Shine-Frontend-on-OS-X/) and this [building Lucene indexes](./Building-Lucene-Indexes-Using-Hadoop/) walkthrough.

# About Warcbase
Warcbase is an open-source platform for managing web archives built on Hadoop and HBase. The platform provides a flexible data model for storing and managing raw content as well as metadata and extracted knowledge. Tight integration with Hadoop provides powerful tools for analytics and data processing via Spark.

There are two main ways of using Warcbase:

+ The first and most common is to analyze web archives using [Spark](http://spark.apache.org/).
+ The second is to take advantage of HBase to provide random access as well as analytics capabilities. Random access allows Warcbase to provide temporal browsing of archived content (i.e., "wayback" functionality).

You can use Warcbase without HBase, and since HBase requires more extensive setup, it is recommended that if you're just starting out, play with the Spark analytics and don't worry about HBase.

Warcbase is built against CDH 5.4.1:

+ Hadoop version: 2.6.0-cdh5.4.1
+ HBase version: 1.0.0-cdh5.4.1
+ Spark version: 1.3.0-cdh5.4.1

The Hadoop ecosystem is evolving rapidly, so there may be incompatibilities with other versions.

You are currently in our documentation.

Supporting files can be found in the [warcbase-resources repository](https://github.com/lintool/warcbase-resources).

## Project Team

Warcbase is brought to you by a team of researchers at the University of Waterloo, including:

- **Jimmy Lin**, David R. Cheriton Chair, David R. Cheriton School of Computer Science
- **Ian Milligan**, Assistant Professor, Department of History
- **Alice Zhou**, Undergraduate Research Assistant, David R. Cheriton School of Computer Science
- **Jeremy Wiebe**, PhD Candidate, Department of History

## License

Licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0).

## Acknowlegments

This work is supported in part by the National Science Foundation and by the Mellon Foundation (via Columbia University). Any opinions, findings, and conclusions or recommendations expressed are those of the researchers and do not necessarily reflect the views of the sponsors.
