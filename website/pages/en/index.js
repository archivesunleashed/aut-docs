/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Archives Unleashed Logo" />
      </div>
    );

    const ProjectTitle = props => (
      <h2 className="projectTitle">
        {props.title}
        <small>{props.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle tagline={siteConfig.tagline} title={siteConfig.title} />
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );


    const TryOut = () => (
      <Block id="try">
        {[
          {
            content:
            'Are you a researcher or web archivist looking to better understand ' +
            'your web archive collections? No matter the size -- gigabytes, terabytes, ' +
            'or petabytes -- the Archives Unleashed Toolkit can help!\n\n ' +
            '[Our documentation](docs/home), based on a cookbook approach, provides a series ' +
            'of "recipes" for addressing a number of common analysis tasks to ' +
            'provide inspiration for your own analysis. We provide examples ' +
            'in [Scala](https://www.scala-lang.org/) and [Python](https://www.python.org/)' +
            ', and we leave it up to you to choose [Spark](https://spark.apache.org/) or PySpark!',
            image: `${baseUrl}img/undraw_file_analysis_8k9b.svg`,
            imageAlign: 'left',
            title: 'Gain Insights on Your Web Archives',
          },
        ]}
      </Block>
    );

    const ExtractText = () => (
      <Block background="dark">
        {[
          {
            content:
            'Do you have WARCs or ARCs and want just the text? With the Toolkit, ' +
            'you can [extract all the text](docs/text-analysis) from a web archive. Combine that with ' +
            'a variety of filters, like filtering by date, language, keyword, ' +
            'domain, or URL pattern, and soon you\'ll be mining text to your ' +
            'heart\'s content.',
            image: `${baseUrl}img/undraw_body_text_l3ld.svg`,
            imageAlign: 'right',
            title: 'Extract Text From Your Web Archives',
          },
        ]}
      </Block>
    );

    const Explore = () => (
      <Block>
        {[
          {
            content:
            'Hyperlinking practice can tell us a lot about web archives: where did ' +
            'people link to for their information? How did these links change over ' +
            'time? Which websites, based on their hyperlinks, were the most ' +
            'influential? The Toolkit allows you to [extract web graphs](docs/link-analysis), ' +
            'and organize them by URL pattern or crawl date. We also support ' +
            'GraphML and GEXF, for use with [Gephi](https://gephi.org/).',
            image: `${baseUrl}img/undraw_nakamoto_2iv6.svg`,
            imageAlign: 'left',
            title: 'Explore Hyperlink Networks in a Web Archive',
          },
        ]}
      </Block>
    );

    const Learn = () => (
      <Block background="dark">
        {[
          {
            content:
            'That\'s not all! You can use the Toolkit for ' +
            '[collection analysis](docs/collection-analysis) to understand ' +
            'top level domain, domain, and subdomain frequency, or understand the ' +
            'distribution of [binary content](docs/binary-analysis) like audio, ' +
            '[images](docs/image-analysis), videos, and documents. You can even extract all those ' +
            'PowerPoint presentations, spreadsheets, and PDFs in your web archive collections!',
            image: `${baseUrl}img/undraw_instat_analysis_ajld.svg`,
            imageAlign: 'right',
            title: 'Learn About the Content in Your Collections',
          },
        ]}
      </Block>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <TryOut />
          <ExtractText />
          <Explore />
          <Learn />
        </div>
      </div>
    );
  }
}

module.exports = Index;
