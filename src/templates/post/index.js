import React from "react"

import Layout from "src/components/Layout"
import SEO from "src/components/seo"
import PostLayouts from "src/components/PostLayouts"

const Post = ({ pageContext }) => {
    const { title, components } = pageContext

    const layouts = components.contents || []

    return (
        <Layout theme={pageContext.themeSelect.themeSelect}>
            <SEO title={title || "Untitled"} />
            {console.log(layouts)}
                {layouts.map((layout, index) => {
                return (
                    <PostLayouts
                        key={index}
                        layoutData={layout}
                        theme={pageContext.themeSelect.themeSelect}
                    />
                )
            })}
        </Layout>
    )
}

export default Post
