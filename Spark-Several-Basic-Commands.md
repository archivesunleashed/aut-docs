We have several basic commands that you will see again and again in these scripts.

# Filtering

`.keepValidPages()`: This keeps only pages that are encoded as text/html, end with htm or html file extensions, do not have a null crawldate, and are not a robots.txt file. When doing text or link analysis, you want to work with the HTML pages themselves.

`.keepMimeTypes()`: This allows you to specify a file type that you're interested in keeping. The opposite command is `.discardMimeTypes`.

`.keepDate()`: This command allows you to specify a specific date that you are interest in keeping. If you were dealing with a large number of WARCs and only wanted to keep files from October 10th 2005, you would pass `.keepDate("20051010")`. The opposite command is `.discardDate()`.

`.keepDomains()`: This command allows you to specify a specific domain that you are interested in keeping. If you were dealing with a large number of WARCs and only wanted to keep domains from the Green Party of Canada, you would pass `.keepDomains(Set("greenparty.ca"))`. The opposite command is `.keepDomains()`.

`.keepUrls()`: This is a similar command to above but on URLs not just domains. The opposite command is `.discardUrls()`.