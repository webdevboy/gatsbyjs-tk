import React, { Component } from "react";
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { withController } from 'react-scroll-parallax';

import { isAuthenticated } from "src/utils/auth";
import replaceAmpersand from 'src/utils/replaceAmpersand';
import Layout from "src/components/Layout";
import SEO from "src/components/seo";
import PostLayouts from "src/components/PostLayouts";
import PageLimitModal from 'src/components/PageLimitModal/PageLimitModal';

const filterCategories = categories => {
  const cats = categories.nodes.length ? categories.nodes : null

  if (!cats) {
    return null
  }

  return cats.filter(
    cat => cat.name !== "Uncategorized" && cat.name !== "Featured"
  )
}


class PostWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLimitModal: false,
    }
  }
  static propTypes = {
    parallaxController: PropTypes.object,
  }
  componentDidMount() {
    this.incAriclesViewedCount();
  }
  componentDidUpdate(prevProps) {
    if(this.props.pageContext.title !== prevProps.pageContext.title) {
      this.incAriclesViewedCount();
    }
  }
  setPageLimitModal = value => this.setState({ pageLimitModal: value });
  incAriclesViewedCount = () => {
    // Increase articles viewed count 
    this.props.parallaxController.update();
    const articlesViewCount = +Cookies.get('articles_view_count') || 1;
    if(articlesViewCount >= 6 && !isAuthenticated()) {
      this.setPageLimitModal(true);
    }
    else {
      Cookies.set('articles_view_count', articlesViewCount ? articlesViewCount + 1 : 1);
    }
  }
  updateParallaxState = () => {
    const { parallaxController } = this.props;
    if(parallaxController) {
      parallaxController.update();
    }
  };
  render() {
    const { pageContext } = this.props;
    const { pageLimitModal } = this.state;
    const { title, components, categories } = pageContext;
    const postHeroObj = pageContext.components.contents.find(c => c.fieldGroupName === "post_Components_Contents_ArticleHero");
    const layouts = components.contents || [];
    return (
      <Layout
        theme={pageContext.themeSelect.themeSelect}
        title={replaceAmpersand(title) || "Untitled"}
        isArticlePage
      >
        <SEO
          title={replaceAmpersand(title) || "Untitled"}
          description={postHeroObj && postHeroObj.byline}
          imageUrl={postHeroObj && (postHeroObj.socialHeroImage && postHeroObj.socialHeroImage.sourceUrl || postHeroObj.heroImage && postHeroObj.heroImage.sourceUrl)}
          articleUrl={typeof window !== "undefined" && window ? window.location.href : null}
          type="article"
        />
        {layouts.filter(l => l.fieldGroupName && l.fieldGroupName !== "post_Components_Contents_CircleThumbnail").map((layout, index) => (
          <PostLayouts
            key={index}
            layoutData={layout}
            categories={filterCategories(categories)}
            theme={pageContext.themeSelect.themeSelect}
            updateParallaxState={this.updateParallaxState}
          />
        ))}
        {pageLimitModal && <PageLimitModal articleUrl={pageContext.url} />}
      </Layout>
    )
  }
}

export default withController(PostWrapper);
