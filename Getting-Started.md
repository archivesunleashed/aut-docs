Getting warcbase started is pretty easy! You have two dependencies: you need to have `git` installed, and you need to have Maven installed. On OS X, we recommend [installing homebrew](http://brew.sh/). 

Install dependencies:

```
brew install git
brew install maven
```

Then, in the directory where you want to install warcbase, run the following terminal commands.

First, clone the repo:

```
$ git clone http://github.com/lintool/warcbase.git
```

Second, you can now build Warcbase:

```
$ mvn clean package appassembler:assemble
```

For the impatient, to skip tests:

```
$ mvn clean package appassembler:assemble -DskipTests
```

Finally, to create Eclipse project files (optional):

```
$ mvn eclipse:clean
$ mvn eclipse:eclipse
```

You can then import the project into Eclipse.

What's next? We recommend [connecting your installation to a Spark Notebook](http://lintool.github.io/warcbase-docs/Spark:-Installing-Spark-Notebook-on-a-Cloud-Computer/). Read on!
