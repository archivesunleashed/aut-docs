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
            'Are you a researcher or web archivist looking to understand your web ' +
            'archive collections better? No matter the size, gigabytes, terabytes, ' +
            'or petabytes, the Archives Unleashed Toolkit can help!\n\n' +
            'Our documentation, based on a cookbook approach, provides a series ' +
            'of "recipes" for addressing a number of common analysis tasks to ' +
            'provide inspiration for your own analysis. We generally provide examples ' +
            'for resilient distributed datasets (RDD) in Scala, and DataFrames ' +
            'in both Scala and Python. We leave it up to you to choose Scala or ' +
            'Python flavours of Spark!',
            image: `${baseUrl}img/undraw_file_analysis_8k9b.svg`,
            imageAlign: 'left',
            title: 'Analyze Large Web Archives',
          },
        ]}
      </Block>
    );

    const ExtractText = () => (
      <Block background="dark">
        {[
          {
            content:
            'Do you have WARCs or ARCs? Want text? With the Archives Unleashed Toolkit, ' +
            'you can run jobs to extract all the plain text from a web archive. You can ' +
            'also use a variety of filters, including filtering by date, language, ' +
            'keyword, domain, or URL pattern. Soon you\'ll be mining text to your heart\'s content.',
            image: `${baseUrl}img/undraw_body_text_l3ld.svg`,
            imageAlign: 'right',
            title: 'Extract text from your web archives',
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
            'influential? The toolkit allows you to extract site link structures, ' +
            'and organize them by URL pattern or crawl date. We also support ' +
            'seamless exportation to Gephi.',
            image: `${baseUrl}img/undraw_nakamoto_2iv6.svg`,
            imageAlign: 'left',
            title: 'Explore hyperlink networks within a web archive',
          },
        ]}
      </Block>
    );

    const Learn = () => (
      <Block background="dark">
        {[
          {
            content:
            'That\'s not all. We support collection analysis (what can you find within ' +
            'the collection, from URLs to content type), image analysis, as well as ' +
            'the extraction of binary files from PowerPoint files to spreadsheets to ' +
            'PDFs. Don\'t see something that you wish we did? Let us know in a GitHub issue.',
            image: `${baseUrl}img/undraw_instat_analysis_ajld.svg`,
            imageAlign: 'right',
            title: 'Learn about your collections in many other ways',
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
