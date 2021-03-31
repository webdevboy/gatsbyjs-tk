import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withController } from 'react-scroll-parallax';

import Layout from 'src/components/Layout';
import SEO from 'src/components/seo';
import PageLayouts from 'src/components/PageLayouts';

class FrontPage extends Component {
  static propTypes = {
    parallaxController: PropTypes.object,
  }
  updateParallaxState = () => {
    const { parallaxController } = this.props;
    if(parallaxController) {
      parallaxController.update()
    }
  };
  render() {
    const { showHero, pageContext, containerRef, title, containerIsScrollable, layouts, homeHeroLoaded, pageScrolled, pageHero } = this.props;
    return (
      <Layout
        theme="light"
        isFrontPage={true}
        heroIsVisible={showHero}
        isFrontPage={pageContext.isFrontPage}
        pageScroll={containerRef}
        homeHeroLoaded={homeHeroLoaded}
        pageScrolled={pageScrolled}
      >
        <SEO title={title || 'Untitled'} imageUrl={pageHero && pageHero.socialImage && pageHero.socialImage.sourceUrl} />
        {layouts.map((layout, index) => (
          <PageLayouts key={index} layoutData={layout} fbPost={pageContext.fbPost} containerIsScrollable={containerIsScrollable} updateParallaxState={this.updateParallaxState} />
        ))}
      </Layout>
    )
  }
}

export default withController(FrontPage);