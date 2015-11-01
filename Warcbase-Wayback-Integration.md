Warcbase comes with a browser exposed as a REST API that conforms to Wayback's schema of `collection/YYYYMMDDHHMMSS/targetURL`. Here's how you start the browser:

```
$ setenv CLASSPATH_PREFIX "/etc/hbase/conf/"
$ sh target/appassembler/bin/WarcBrowser -port 8080
```

You can now use `http://myhost:8080/` to browse the archive. For example:

+ `http://myhost:8080/mycollection/*/http://mysite.com/` will give you a list of available versions of `http://mysite.com/`.
+ `http://myhost:8080/mycollection/19991231235959/http://mysite.com/` will give you the record of `http://mysite.com/` just before Y2K.

Note that this API serves up raw records, so the HTML pages don't look pretty, and images don't render properly (since the browser gets confused by record headers). So how do you actually navigate through the archive? This is where Wayback/Warcbase integration comes in.

As it turns out, the Wayback code has the ability separate rendering/browsing from data storage. More details can be found in this [technical overview](https://github.com/iipc/openwayback/wiki/Technical-overview). In short, we can customize a Wayback instance to point at the Warcbase REST API, and have the Wayback fetch records from HBase. This is accomplished by custom implementations of `ResourceIndex` and `ResourceStore` in [here](https://github.com/lintool/warcbase/tree/master/src/main/java/org/warcbase/wayback).

Here's how to install the integration:

1. Make sure you already have Wayback installed. See this [installation guide](https://github.com/iipc/openwayback/wiki/How-to-install) and [configuration guide](https://github.com/iipc/openwayback/wiki/How-to-configure).
2. Add the Warcbase jar to the Wayback's WAR deployment. In a standard setup, you would copy `warcbase-0.1.0-SNAPSHOT.jar` to the `TOMCAT_ROOT/webapps/ROOT/WEB-INF/lib/`.
3. Replace the `BDBCollection.xml` configuration in `TOMCAT_ROOT/webapps/ROOT/WEB-INF/` with the version in [`src/main/resources/`](https://github.com/lintool/warcbase/tree/master/src/main/resources).
4. Open up `BDBCollection.xml` and specify the correct `HOST`, `PORT`, and `TABLE`.
5. Shutdown and restart Tomcat.

Now navigate to your Wayback as before. Enjoy browsing your web archive!
