import React from "react"
import PostHero from "./PostHero"
import Quote from "src/components/Quote"

const PostLayouts = ({ layoutData }) => {
  const layoutType = layoutData.fieldGroupName

  /**
   * Default component
   */
  const Default = () => (
    <div>
      In PostLayouts the mapping of this component is missing: {layoutType}
    </div>
  )

  /**
   * Mapping the fieldGroupName(s) to our components
   */
  const layouts = {
    post_Components_Contents_ArticleHero: PostHero,
    post_Components_Contents_Quote: Quote,
    default: Default,
  }

  /**
   * If layout type is not existing in our mapping, it shows our Default instead.
   */
  const ComponentTag = layouts[layoutType]
    ? layouts[layoutType]
    : layouts["default"]

  return <ComponentTag {...layoutData} />
}

export default PostLayouts
