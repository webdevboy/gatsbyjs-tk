import React, { useState, useEffect } from "react"
import Cookies from 'js-cookie';
import cx from 'classnames';

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
  const { title, components, categories } = pageContext
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
  }, [pageContext])

  const layouts = components.contents || []

  return (
    <Layout theme={pageContext.themeSelect.themeSelect} title={title}>
      <SEO title={title || "Untitled"} />
      <div className={cx({ blurred: pageLimitModal })}>
        {layouts.map((layout, index) => (
          <PostLayouts
            key={index}
            layoutData={layout}
            categories={filterCategories(categories)}
            theme={pageContext.themeSelect.themeSelect}
          />
        ))}
      </div>
      {pageLimitModal && <PageLimitModal />}
    </Layout>
  )
}

export default Post
