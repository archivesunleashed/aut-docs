One popular digital humanities tool is [Gephi](http://gephi.github.io/). You can quickly use it to convert output into a dynamic, date-ordered visualization to see how link structures have changed over time.

<h3>Step One: Convert Site Link Structure into GDF Format</h3>

Use the included `pig2gdf.py` program. Usage is as follows:

```
pig2gdf.py usage:
$ ./pig2gdf.py <file> > <OUTPUT>
```

Example usage:
```
./pig2gdf.py part-m-00000 > political-links.csv
```

<h3>Step Two: Import into Gephi</h3>

You now want to take it into Gephi. Start Gephi (<a href="http://ianmilligan.ca/2014/07/15/getting-gephi-running-on-os-x-mavericks/">if you have trouble running it, this tutorial might help</a>). Open the GDF file that you just generated. Click OK.

Now visit the 'Data Laboratory' panel and do the following. Select the 'edges' table so it looks like this.

<a href="https://ianmilli.files.wordpress.com/2015/06/screen-shot-2015-06-05-at-11-44-38-am.png"><img src="https://ianmilli.files.wordpress.com/2015/06/screen-shot-2015-06-05-at-11-44-38-am.png?w=660" alt="Screen Shot 2015-06-05 at 11.44.38 AM" width="660" height="433" class="aligncenter size-large wp-image-2663" /></a>

Click on the 'Merge Columns' button and do this:

<a href="https://ianmilli.files.wordpress.com/2015/06/screen-shot-2015-06-05-at-11-45-14-am.png"><img src="https://ianmilli.files.wordpress.com/2015/06/screen-shot-2015-06-05-at-11-45-14-am.png?w=660" alt="Screen Shot 2015-06-05 at 11.45.14 AM" width="660" height="429" class="aligncenter size-large wp-image-2664" /></a>

Make sure to parse dates as <strong>yyyymm</strong>.

The final step is to click on 'nodes' in the upper left, click 'copy data to other column,' select 'id,' and copy to 'label.'

<a href="https://ianmilli.files.wordpress.com/2015/06/screen-shot-2015-06-05-at-11-47-00-am.png"><img src="https://ianmilli.files.wordpress.com/2015/06/screen-shot-2015-06-05-at-11-47-00-am.png?w=660" alt="Screen Shot 2015-06-05 at 11.47.00 AM" width="660" height="429" class="aligncenter size-large wp-image-2665" /></a>

<h3>Step Three: Explore your Data</h3>

You'll now notice that you have the option to enable a dynamic timeslider at the bottom of your Gephi window. 

While a full tutorial in Gephi visualization is outside the scope of this document, you may want to use the following to expand the link nodes. Select the 'overview' tab to see a preview of the node structure. Under layout, use the 'Force Atlas' visualization to move the nodes. 

<a href="https://ianmilli.files.wordpress.com/2015/06/screen-shot-2015-06-05-at-11-49-02-am.png"><img src="https://ianmilli.files.wordpress.com/2015/06/screen-shot-2015-06-05-at-11-49-02-am.png?w=660" alt="Screen Shot 2015-06-05 at 11.49.02 AM" width="660" height="433" class="aligncenter size-large wp-image-2666" /></a>