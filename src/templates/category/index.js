import React from "react";
import { ParallaxProvider } from 'react-scroll-parallax';

import Layout from "src/components/Layout";
import SEO from "src/components/seo";
import CategoryLayouts from "src/components/CategoryLayouts";


const Category = ({ pageContext }) => {
  const { name } = pageContext;

  return (
    <div className="category-page-wrapper">
      <ParallaxProvider>
        <Layout>
          <SEO title={name || "Untitled"} />
          <CategoryLayouts categoryData={pageContext} />
        </Layout>
      </ParallaxProvider>
    </div>
  )
}

export default Category
