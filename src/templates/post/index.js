import React, { useState, useEffect, useRef } from "react"
import Cookies from 'js-cookie';
import cx from 'classnames';
import { TweenMax, Power2 } from 'gsap';

import { isAuthenticated, isBrowser } from "src/utils/auth"
import Layout from "src/components/Layout"
import SEO from "src/components/seo"
import PostLayouts from "src/components/PostLayouts"
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

const Post = ({ pageContext }) => {
  const { title, components, categories } = pageContext;
  const pageScroll = useRef(null);
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
    const scrollTime = 1.2;
    const scrollDistance = 400;
    let wheelListener1 = null;
    let wheelListener2 = null;
    const moveScroll = event => {
      if(pageScroll && pageScroll.current && pageScroll.current.classList.contains('scrollable')) {
        event.preventDefault(); 
        const delta = event.wheelDelta / 120 || -event.detail / 3;
        const scrollTop = pageScroll.current.scrollTop;
        const finalScroll = scrollTop - parseInt(delta * scrollDistance);
        TweenMax.to(pageScroll.current, scrollTime, { scrollTop : finalScroll, ease: Power2.easeOut, overwrite: 5 });
      }
    }

    if(window) {
      wheelListener1 = window.addEventListener("mousewheel", moveScroll, { passive: false });
      wheelListener2 = window.addEventListener("DOMMouseScroll", moveScroll, { passive: false });
    }

    if(document) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'initial';
      if(wheelListener1) {
        window.removeEventListener(wheelListener1);
      }
      if(wheelListener2) {
        window.removeEventListener(wheelListener2);
      }
    }
  }, []);

  const layouts = components.contents || []

  return (
    <div className="page-scroll" ref={pageScroll}>
      <Layout
        theme={pageContext.themeSelect.themeSelect}
        title={title}
        isArticlePage
        pageScroll={pageScroll}
      >
        <SEO title={title || "Untitled"} />
        <div className={cx({ blurred: pageLimitModal })}>
          {layouts.map((layout, index) => (
            <PostLayouts
              key={index}
              layoutData={layout}
              categories={filterCategories(categories)}
              theme={pageContext.themeSelect.themeSelect}
              pageScroll={pageScroll}
            />
          ))}
        </div>
        {pageLimitModal && <PageLimitModal />}
      </Layout>
    </div>
  )
}

export default Post
