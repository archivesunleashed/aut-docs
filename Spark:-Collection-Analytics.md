You may want to learn what top-level domains you have in a given ARC, WARC, or directory of them. In the Spark Notebook, the following command will generate an interactive visualization.

```
val r = 
RecordLoader.loadArc(arcdir, 
sc) 
.keepValidPages() 
.map(r => ExtractTopLevelDomain(r.getUrl)) 
.countItems() 
.take(10) 
```

If you are using WARC files, change `loadArc` to `loadWarc`. If you want to see more than ten results, change the variable in the last line. 

Here is a sample output from a 5GB collection of Canadian political party ARCs:

![Spark notebook showing pie chart output](https://raw.githubusercontent.com/ianmilligan1/WAHR/master/images/Spark-Notebook.png)