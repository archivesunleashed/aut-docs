The following Pig script uses the [Stanford Named Entity Recognizer](http://nlp.stanford.edu/software/CRF-NER.shtml) to extract names of persons, organizations, and from a given collection of extracted texts. These instructions are for running on a Hadoop cluster. We will refer to this script as `extract-entities-from-scrape-text.pig`. See below for instructions on running the script, and processing results.

## Script

```
/*
 * Copyright 2013 Internet Archive
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you
 * may not use this file except in compliance with the License. You
 * may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * permissions and limitations under the License. 
 */

/* Input: Plain text files, each containing text of scrapes on a unique date
 * Output: URL, digest, date, entities
 */

%default I_PARSED_DATA_DIR '/user/jrwiebe/cpp.text-greenparty/*.txt';
%default O_ENTITIES_DIR '/user/jrwiebe/cpp.text-greenparty/entities.gz/';
%default I_NER_CLASSIFIER_FILE 'english.all.3class.distsim.crf.ser.gz';

SET mapred.max.map.failures.percent 10;
SET mapred.reduce.slowstart.completed.maps 0.9

REGISTER 'target/warcbase-0.1.0-SNAPSHOT-fatjar.jar';

DEFINE NER3CLASS org.warcbase.pig.piggybank.NER3ClassUDF('$I_NER_CLASSIFIER_FILE');

Scrapes = LOAD '$I_PARSED_DATA_DIR' AS (date:chararray, url:chararray, content:chararray);

Entities = FOREACH Scrapes GENERATE date, url, NER3CLASS(content) AS entityString;

STORE Entities into '$O_ENTITIES_DIR';  
```

## Setup 
Download the [Stanford Named Entity Recognizer](http://nlp.stanford.edu/software/CRF-NER.shtml) and unzip. Copy the classifier into HDFS:

```
hadoop fs -copyFromLocal stanford-ner-2014-08-27/classifiers/english.all.3class.distsim.crf.ser.gz
```

## Running extract-entities-from-scrape-text.pig:

Set the following as appropriate:

```
export LOCATION_OF_NER_CLASSIFIER_FILE_IN_HDFS=/user/jrwiebe
export DATA_DIR=/user/jrwiebe/cpp.text-greenparty
```

Run the script:

```
pig -Dmapred.cache.files="$LOCATION_OF_NER_CLASSIFIER_FILE_IN_HDFS/english.all.3class.distsim.crf.ser.gz#english.all.3class.distsim.crf.ser.gz" \
-Dmapred.create.symlink=yes -p I_NER_CLASSIFIER_FILE=english.all.3class.distsim.crf.ser.gz -p I_PARSED_DATA_DIR=$DATA_DIR/ \
-p O_ENTITIES_DIR=$DATA_DIR/entities.gz/ extract-entities-from-scrape-text.pig
```

The variable `I_PARSED_DATA_DIR` in the above command statement may refer to a directory or to a set of files

## Copy results to local file system

```
hadoop fs -copyToLocal $DATA_DIR/entities.gz/
```

## Combining and Counting Results

The above script will produce files containing lines like this:
```
200811  greenparty.ca   {PERSON=[Elizabeth, Elizabeth, Elizabeth May, Alison Menard], ORGANIZATION=[Green Party of Canada, Green Party of Canada, Health Care Part, Afghanistan Vision Green Press Conference Green Tax Shift Questions, Green Canada Vert Multimedia About Us Media Elizabeth May Organization Green Values Ecological Wisdom Non-violence Social Justice Sustainability Participatory Democracy Respect for Diversity Our History Members of Parliament Contact Federal Council Shadow Cabinet Staff Provincial Greens Green Member of Parliament International Greens Home, Chisholm Park Rally, Moss Glen Legion, Crystal Drive, Calgary Centre Campaign Team Meeting Start, Green Party of Canada, Green Party of Canada Fund, Green Party of Canada], LOCATION=[Canada, Kingston Peninsula, Riverview, Calgary]}
```

We have a few sample scripts and commands to analyze this data.

### Counting Entity Frequencies for an Entire Data Set

```
combine-entity-results.py entities.gz/
```

[This script](https://github.com/lintool/warcbase/blob/master/src/main/python/combine-entity-results.py) creates files `pers.txt`, `org.txt`, and `loc.txt` in the given directory (e.g. directory entities.gz), listing occurrences of PERSON, ORGANIZATION, and LOCATION entities. Output files will be in same directory as original results unless you specify an output directory as a second parameter.

To get a sorted frequency list:

```
cat loc.txt | sort | uniq -c | sort -nr > loc_freq.txt
```

The results, as you can see below, can be very useful - especially when compared between domains (in this example it's the Green Party) or if (as in the next section) traced over time. 

```
   3904 Vancouver
   3805 Nova Scotia
   3162 Fredericton
   2675 Alberta
   2434 Bali
   2366 Halifax
   2336 Toronto
   1836 London
   1749 Indonesia
   1677 New Glasgow
   1576 Manitoba
   1551 Lethbridge
   1546 Calgary
   1507 Afghanistan
```

### Counting Entity Frequencies by Date

```
combine-entity-results-split-by-date.py entities.gz/ [output-dir]
```

[This script](https://github.com/lintool/warcbase/blob/master/src/main/python/combine-entity-results-split-by-date.py) creates a set of PERSON, ORGANIZATION, and LOCATION files for every scrape date listed in the data. 

To generate frequency lists for these files:
```
#!/bin/bash
for f in *.txt;
do
   output=${f%????} # trims the file extension
   cat $f | sort | uniq -c | sort -nr > ./frequencies/"$output"_freq.txt # sorts it and exports it to a frequency folder
done
```

Your resulting directory will have files like:

```
200510_loc_freq.txt
200510_org_freq.txt
...
200802_loc_freq.txt
```

Each is the counted frequency for a specific scrape. You could then visualize or explore this some other way.