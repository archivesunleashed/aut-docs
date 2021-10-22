/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary');

const Container = CompLibrary.Container;

const CWD = process.cwd();

const versions = require(`${CWD}/versions.json`);

function Versions(props) {
  const {config: siteConfig} = props;
  const latestVersion = versions[0];
  const repoUrl = `https://github.com/archivesunleashed/aut`;
  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer versionsContainer">
        <div className="post">
          <header className="postHeader">
            <h1>{siteConfig.title} Versions</h1>
          </header>
          <p>New versions of this project are released every so often.</p>
          <h3 id="latest">Current version (Stable)</h3>
          <table className="versions">
            <tbody>
              <tr>
                <th>{latestVersion}</th>
                <td>
                  {/* You are supposed to change this href where appropriate
                        Example: href="<baseUrl>/docs(/:language)/:id" */}
                  <a
                    href={`${siteConfig.baseUrl}${siteConfig.docsUrl}/${
                      props.language ? props.language + '/' : ''
                    }home`}>
                    Documentation
                  </a>
                </td>
                <td>
                  <a href={`${repoUrl}/releases/tag/aut-${latestVersion}`} target="_blank">Release Notes</a>
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            This is the version that is configured automatically when you first
            install this project.
          </p>
          <h3 id="rc">Pre-release versions</h3>
          <table className="versions">
            <tbody>
              <tr>
                <th>main</th>
                <td>
                  {/* You are supposed to change this href where appropriate
                        Example: href="<baseUrl>/docs(/:language)/next/:id" */}
                  <a
                    href={`${siteConfig.baseUrl}${siteConfig.docsUrl}/${
                      props.language ? props.language + '/' : ''
                    }next/home`}>
                    Documentation
                  </a>
                </td>
                <td>
                  <a href={`${repoUrl}`}>Source Code</a>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 id="archive">Past Versions</h3>
          <p>
            Here you can find documentation for previous versions of Docusaurus.
          </p>
          <table className="versions">
            <tbody>
              {versions.map(
                (version) =>
                  version !== latestVersion && (
                    <tr key={version}>
                      <th>
                        {version === versions[versions.length - 1] ? '<=' : ''}
                        {version}
                      </th>
                      <td>
                        <a
                          href={`${siteConfig.baseUrl}${siteConfig.docsUrl}/${version}/home`}>
                          Documentation
                        </a>
                      </td>
                    </tr>
                  ),
              )}
            </tbody>
          </table>
          <p>
            You can find past versions of this project on{' '}
            <a href="http://github.com/archivesunleashed/aut/releases">GitHub</a>.
          </p>
        </div>
      </Container>
    </div>
  );
}

module.exports = Versions;
