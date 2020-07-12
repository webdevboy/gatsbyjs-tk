import React, { useState, useEffect, useRef } from "react"
import Cookies from 'js-cookie';
import cx from 'classnames';
import { ParallaxProvider } from 'react-scroll-parallax';
import { TweenMax, Power2 } from 'gsap';

import { isAuthenticated, isBrowser } from "src/utils/auth";
import SmoothScroll from 'src/utils/smoothScroll';
import Layout from "src/components/Layout";
import SEO from "src/components/seo";
import PostLayouts from "src/components/PostLayouts";
import PageLimitModal from 'src/components/PageLimitModal/PageLimitModal';
import useWindow from 'src/hooks/useWindow';


const filterCategories = categories => {
  const cats = categories.nodes.length ? categories.nodes : null

  if (!cats) {
    return null
  }

  return cats.filter(
    cat => cat.name !== "Uncategorized" && cat.name !== "Featured"
  )
}

const Post = ({ pageContext }) => {
  const { title, components, categories } = pageContext;
  const pageScroll = useRef(null);
  const [pageScrollState, setPageScrollState] = useState(null);
  const _window = useWindow();
  const [pageLimitModal, setPageLimitModal] = useState(false);
  useEffect(() => {
    // Increase articles viewed count 
    const articlesViewCount = +Cookies.get('articles_view_count') || 1;
    if(articlesViewCount >= 3 && !isAuthenticated()) {
      setPageLimitModal(true);
    }
    else {
      Cookies.set('articles_view_count', articlesViewCount ? articlesViewCount + 1 : 1);
    }
  }, [pageContext]);
  
  useEffect(() => {
    // new SmoothScroll(pageScroll.current, 120, 12);
    setPageScrollState(pageScroll.current);
  }, []);

  const layouts = components.contents || []
  return (
    
      <div className="page-scroll" ref={pageScroll}>
        <ParallaxProvider scrollContainer={pageScrollState}>
          <Layout
            theme={pageContext.themeSelect.themeSelect}
            title={title}
            isArticlePage
            pageScroll={pageScroll}
          >
            <SEO title={title || "Untitled"} />
            {layouts.map((layout, index) => (
              <PostLayouts
                key={index}
                layoutData={layout}
                categories={filterCategories(categories)}
                theme={pageContext.themeSelect.themeSelect}
                pageScroll={pageScroll}
              />
            ))}
            {pageLimitModal && <PageLimitModal />}
          </Layout>
        </ParallaxProvider>
      </div>
  )
}

export default Post
