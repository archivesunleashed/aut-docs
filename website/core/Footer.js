/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a
              href={`
                dependencies`}>
              Getting Started
            </a>
            <a
              href={`
                collection-analysis`}>
              Generating Results
            </a>
            <a
              href={`filters-rdd`}>
              Filtering results
            </a>
            <a
              href={`
                aut-spark-submit-app`}>
              Standard Derivatives
            </a>
            <a
              href={`
                df-results`}>
              What to do with Results
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a
              href="https://archivesunleashed.org/get-involved/#newsletter-subscription"
              target="_blank">
              Newsletter
            </a>
            <a href="http://slack.archivesunleashed.org/">Project Slack</a>
            <a href="https://archivesunleashed.org/events/">Events</a>
            <a href="https://zenodo.org/communities/wahr/">Datasets</a>
          </div>
          <div>
            <h5>More</h5>
            <a href="https://news.archivesunleashed.org/">Project News</a>
            <a href="https://github.com/">GitHub</a>
            <a
              href="https://twitter.com/unleasharchives"
              target="_blank">
              Twitter
            </a>
            <a
               href="https://www.youtube.com/channel/UC4Sq0Xi6UWhYK2VbmAzFhAw"
               target="_blank">
               YouTube
            </a>
          </div>
        </section>
        <section className="sitemap">
          <img alt="Andrew W. Mellon Foundation" className="footer_img" alt="Andrew W. Mellon Foundation" src={`${baseUrl}img/mellon.svg`} />
          <img alt="University of Waterloo" className="footer_img" alt="University of Waterloo" src={`${baseUrl}img/waterloo.png`} />
          <img alt="York University" className="footer_img" alt="York University" src={`${baseUrl}img/york.png`} />
        </section>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
