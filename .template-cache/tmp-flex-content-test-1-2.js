
// This is a temporary generated file. Changes to this file will be overwritten eventually!
import React from "react"

import Layout from "../src/components/Layout"
import SEO from "../src/components/SEO"

// Sections
import Hero from 'src/components/Hero';
import Quote from 'src/components/Quote';

const Post = ({ pageContext }) => {
  const {
    post: { title, components },
  } = pageContext

  const layouts = components.contents || []

  return (
    <Layout>
      {layouts.map((layout, index) => {
        
            if (layout.fieldGroupName === 'post_Components_Contents_ArticleHero') {
              return <Hero {...layout} key={index} />;
            }
          

            if (layout.fieldGroupName === 'post_Components_Contents_Quote') {
              return <Quote {...layout} key={index} />;
            }
          
        })
      }
    </Layout>
  )
}

export default Post
  