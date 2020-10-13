import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withController } from 'react-scroll-parallax';

import Layout from 'src/components/Layout';
import SEO from 'src/components/seo';
import PageLayouts from 'src/components/PageLayouts';

class DefaultPage extends Component {
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
    const { title, layouts, fbPost, destionationsData, pageUri } = this.props;
    const isDestionationPage = destionationsData && destionationsData.length > 0;
    const destionation = destionationsData && destionationsData.length > 0 && destionationsData[0];
    return (
      <Layout theme="light" isFrontPage={false}>
        <SEO
          title={title || 'Untitled'}
          articleUrl={isDestionationPage ? pageUri : null}
          imageUrl={destionation && destionation.socialImage && destionation.socialImage.sourceUrl}
          description={destionation && destionation.socialDescription}
        />
        {layouts.map((layout, index) => (
          <PageLayouts key={index} layoutData={layout} fbPost={fbPost} updateParallaxState={this.updateParallaxState} />
        ))}
      </Layout>
    )
  }
}

export default withController(DefaultPage);