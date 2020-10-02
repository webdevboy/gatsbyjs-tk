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
    const { title, layouts, fbPost } = this.props;
    return (
      <Layout theme="light" isFrontPage={false}>
        <SEO title={title || 'Untitled'} />
        {layouts.map((layout, index) => (
          <PageLayouts key={index} layoutData={layout} fbPost={fbPost} updateParallaxState={this.updateParallaxState} />
        ))}
      </Layout>
    )
  }
}

export default withController(DefaultPage);