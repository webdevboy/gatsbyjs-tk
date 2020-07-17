import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { showHero, pageContext, containerRef, title, containerIsScrollable, layouts, homeHeroLoaded } = this.props;
    return (
      <Layout
        theme="light"
        isFrontPage={true}
        heroIsVisible={showHero}
        isFrontPage={pageContext.isFrontPage}
        pageScroll={containerRef}
        homeHeroLoaded={homeHeroLoaded}
      >
        <SEO title={title || 'Untitled'} />
        {layouts.map((layout, index) => (
          <PageLayouts key={index} layoutData={layout} containerIsScrollable={containerIsScrollable} updateParallaxState={this.updateParallaxState} />
        ))}
      </Layout>
    )
  }
}

export default withController(FrontPage);