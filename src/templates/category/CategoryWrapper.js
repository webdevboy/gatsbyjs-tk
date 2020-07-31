import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withController } from 'react-scroll-parallax';

import replaceAmpersand from 'src/utils/replaceAmpersand';
import Layout from "src/components/Layout";
import SEO from "src/components/seo";
import CategoryLayouts from "src/components/CategoryLayouts";


class Category extends Component {
  static propTypes = {
    parallaxController: PropTypes.object,
  }
  updateParallaxState = () => this.props.parallaxController.update();
  render() {
    const { pageContext } = this.props;
    const { name } = pageContext;
    return (
      <div className="category-page-wrapper">
        <Layout>
          <SEO title={replaceAmpersand(name) || "Untitled"} />
          <CategoryLayouts categoryData={pageContext} updateParallaxState={this.updateParallaxState} />
        </Layout>
      </div>
    )
  }
}

export default withController(Category);
