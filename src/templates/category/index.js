import React, { useState, useEffect, useRef } from "react";
import { ParallaxProvider } from 'react-scroll-parallax';

import Layout from "src/components/Layout";
import SEO from "src/components/seo";
import CategoryLayouts from "src/components/CategoryLayouts";
import SmoothScroll from 'src/utils/smoothScroll';

const Category = ({ pageContext }) => {
  const { name } = pageContext;
  const pageScroll = useRef(null);
  const [pageScrollState, setPageScrollState] = useState(null);

  useEffect(() => {
    new SmoothScroll(pageScroll.current, 120, 12);
    setPageScrollState(pageScroll.current);
  }, []);

  return (
    <div className="page-scroll" ref={pageScroll}>
      <ParallaxProvider scrollContainer={pageScrollState}>
        <Layout pageScroll={pageScroll}>
          <SEO title={name || "Untitled"} />
          <CategoryLayouts categoryData={pageContext} />
        </Layout>
      </ParallaxProvider>
    </div>
  )
}

export default Category
