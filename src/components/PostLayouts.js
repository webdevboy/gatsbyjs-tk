import React from "react"
import {
  PostHero,
  Quote,
  CopyColumns,
  PhotoBackground,
  PhotoLayout,
} from "src/components"

const PostLayouts = ({ layoutData, theme }) => {
  const layoutType = layoutData.fieldGroupName || "No field group name found"

  console.log(layoutData)

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
    post_Components_Contents_Columns: CopyColumns,
    post_Components_Contents_LargePhoto: PhotoBackground,
    post_Components_Contents_ImageLayouts: PhotoLayout,
    default: Default,
  }

  /**
   * If layout type is not existing in our mapping, it shows our Default instead.
   */
  const ComponentTag = layouts[layoutType]
    ? layouts[layoutType]
    : layouts["default"]

  return <ComponentTag {...layoutData} theme={theme} type={"post"} />
}

export default PostLayouts
