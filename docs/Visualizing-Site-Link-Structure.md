# Visualizing Site-Link Structure with D3.js

We have a built in link visualizer, built in D3.js. It looks like this:

![Example of the D3.js visualizer](https://raw.githubusercontent.com/web-archive-group/WAHR/master/images/d3js-example.png)

You can find it in `warcbase/vis/link-vis`. This page shows you two things: how you can load in sample data and visualize it, and then how you can replace the sample data with your own.

## Using Sample Data

To test it out, navigate to the `warcbase/vis/link-vis` directory on your command line. You can then complete the following steps:

1. Create a new directory labelled `data`, which will have the full path of ``warcbase/vis/link-vis/data`. 
2. Copy the `graph.json` file from the [warcbase-resources](https://github.com/lintool/warcbase-resources) directory into `data`.
3. Run `python -m SimpleHTTPServer 4321` from your `warcbase/vis/link-vis` directory.

You can then navigate to [localhost:4321](http://localhost:4321) in your browser.

## Generating Your Own Data

The visualizer requires your data to be in a particular format. We are currently working on documenting this process.