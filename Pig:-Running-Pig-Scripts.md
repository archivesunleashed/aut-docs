Running pig scripts is easy. In your warcbase directory, you can do one of two things.

**If you want to run line-by-line**, which can be handy if debugging a script, you can do so in the grunt shell. Do this by typing `pig`. You can quit the shell by typing `quit`.

**If you want to run the script all at once**, which is preferred if adapting from our cookbooks, you can do so by simply running `pig <name-of-script.pig>`. For example, `pig extract-site-links.pig`.