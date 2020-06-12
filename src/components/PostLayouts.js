import React from "react"
import {
  PostHero,
  Quote,
  CopyColumns,
  PhotoBackground,
  PhotoLayout,
  FiftyFifty,
  PhotoLayout1X3,
  Spacer,
} from "src/components"

const PostLayouts = ({ layoutData, categories, theme }) => {
  const layoutType = layoutData.fieldGroupName || "No field group name found"

  /**
   * Default component
   */
  const Default = () => (
    <div style={{ color: theme === "light" ? "black" : "white" }}>
      In PostLayouts the mapping of this component is missing: {layoutType}
    </div>
  )

  /**
   * Mapping the fieldGroupName(s) to our components
   */
  const layouts = {
    post_Components_Contents_ArticleHero: PostHero,
    post_Components_Contents_Quote: Quote,
    post_Components_Contents_Columns: CopyColumns,
    post_Components_Contents_LargePhoto: PhotoBackground,
    post_Components_Contents_ImageLayouts: PhotoLayout,
    post_Components_Contents_FiftyFifty: FiftyFifty,
    post_Components_Contents_1x3Layout: PhotoLayout1X3,
    post_Components_Contents_Spacer: Spacer,
    default: Default,
  }

  /**
   * If layout type is not existing in our mapping, it shows our Default instead.
   */
  const ComponentTag = layouts[layoutType]
    ? layouts[layoutType]
    : layouts["default"]

  return (
    <ComponentTag
      {...layoutData}
      categories={categories}
      theme={theme}
      type={"post"}
    />
  )
}

export default PostLayouts
