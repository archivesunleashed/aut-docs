# Several Basic Spark Commands

We have several basic commands that you will see again and again in these scripts.

# Filtering

`.keepValidPages()`: This keeps only pages that are encoded as text/html, end with htm or html file extensions, do not have a null crawldate, and are not a robots.txt file. When doing text or link analysis, you want to work with the HTML pages themselves.

`.keepMimeTypes()`: This allows you to specify file types that you're interested in keeping. The opposite command is `.discardMimeTypes`.

`.keepDate()`: This command allows you to specify specific dates that you are interest in keeping. If you were dealing with a large number of WARCs and only wanted to keep files from October 10th 2005, you would pass `.keepDate("20051010")`. The opposite command is `.discardDate()`.

`.keepDomains()`: This command allows you to specify specific domains that you are interested in keeping. If you were dealing with a large number of WARCs and only wanted to keep domains from the Green Party of Canada, you would pass `.keepDomains(Set("greenparty.ca"))`. The opposite command is `.discardDomains()`.

`.keepUrls()`: This is a similar command to above but on URLs not just domains. The opposite command is `.discardUrls()`.

`.keepUrlPatterns():` This command allows you to specify URL patterns for records you wish to keep. The patterns must be [regular expression](http://www.tutorialspoint.com/scala/scala_regular_expressions.htm) objects. You can generate a regular expression object by appending `.r` to the end of a string. E.g., `keepUrlPatterns(Set("http://www.archive.org/about/.*".r))` will keep all records with URLs beginning with `http://www.archive.org/about/`. The opposite command is `.discardUrlPatterns()`. (Remember that the dot has special meaning in a regular expression, so if you wished to keep all URLs beginning with `http://www.` you would need to *escape* the dot by specifying `keepUrlPatterns(Set("http://www\\..*".r))`.) If you want to make this case insensitive, use `(?i)`, e.g. `keepUrlPatterns(Set("(?i)http://www.archive.org/about/.*".r))`.

`.keepLanguages()`: This allows you to keep only pages that are written in a specified language. It uses the [ISO 639.2 language codes](https://www.loc.gov/standards/iso639-2/php/code_list.php); currently it supports the following langauges: `da, de, et, el, en, es, fi, fr, hu, is, it, lt, nl, no, pl, pt, ru, sv, th`. If you wanted to keep only pages in French and German, you would do `.keepLanguages(Set("fr", "de"))`. Language detection is somewhat resource-intensive on a large collection, so run your other filters first.

`.keepContent()`: This command allows you to keep only pages that contain a given keyword. The opposite command is `.discardContent()`.
