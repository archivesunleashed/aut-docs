Adapted from: https://wiki.duraspace.org/display/FF/Fedora+Release+Process

## Verify release privileges

To make sure the release goes smoothly, you should ensure that:
  * You have an account with commit access for aut on GitHub.
  * You have an [oss.sonatype.org](https://oss.sonatype.org/) account and have requested to be given permission to publish to the `io.archivesunleashed` groupId by adding a comment to the [Archives Unleased Sonatype Hosting Ticket](https://issues.sonatype.org/browse/OSSRH-33075)
  * Ensure you have a trusted code signing key; [create](https://wiki.duraspace.org/display/FCREPO/Creating+a+Code+Signing+Key) if you haven't before and add it to the [contributor keys](https://github.com/archivesunleashed/aut/wiki/Release-Process#contributor-keys) list below
  * Your maven settings (`~/.m2/settings.xml`) includes the following:
```xml
<settings>
  ...
  <servers>
    ...
    <server>
      <id>sonatype-nexus-snapshots</id>
      <username>your-jira-id</username>
      <password>your-jira-pwd</password>
    </server>
    <server>
      <id>sonatype-nexus-staging</id>
      <username>your-jira-id</username>
      <password>your-jira-pwd</password>
    </server>
    <server>
      <id>github</id>
      <username>your-github-id</username>
      <password>your-github-pwd</password>
    </server>
  </servers>
  ...
</settings>
```

## Steps:
* `git clone git@github.com:archivesunleashed/aut.git`
* `cd aut`
* `git checkout -b release-X.Y.Z` (where X.Y.Z is your version number)
* `mvn release:clean`
* `mvn release:prepare -DreleaseVersion=$CURR -DdevelopmentVersion=$NEXT -DautoVersionSubmodules=true -DpushChanges=false`
* `rm -rf ~/.m2/repository/io/archivesunleashed`
* `git checkout $REPO-$CURR # detached head state`
* `mvn clean install`
* `git push origin --tags`
* `mvn release:perform -DperformRelease -Dgoals=deploy`
* `mvn site-deploy -DskipTests`
* `git checkout release-X.Y.Z`
* `git push origin HEAD:master`

## Example:
* `git clone git@github.com:archivesunleashed/aut.git`
* `cd aut`
* `git checkout -b release-0.9.0`
* `mvn release:clean`
* `mvn release:prepare -DreleaseVersion=0.9.0 -DdevelopmentVersion=0.9.1-SNAPSHOT -DautoVersionSubmodules=true -DpushChanges=false`
* `rm -rf ~/.m2/repository/io/archivesunleashed`
* `git co aut-0.9.0`
* `mvn clean install`
* `git push origin --tags`
* `mvn release:perform -DperformRelease -Dgoals=deploy`
* `mvn site-deploy -DskipTests`
* `git checkout release-0.9.0`
* `git push origin HEAD:master`

## Sonatype

* Login to https://oss.sonatype.org
* Navigate to https://oss.sonatype.org/#stagingRepositories
* Search for 'aut'
* Click Close, then Refresh, then Release

## Contributor Keys

| Name         | Organization           | Address               | Code Signing Key Fingerprint | Key Id |
|--------------|------------------------|-----------------------|---|:-:|
| Nick Ruest   | York University        | ruestn at yorku.ca    | 159493E15691C84D615B7D1B417FAF1A0E1080CD | D4F78790 |