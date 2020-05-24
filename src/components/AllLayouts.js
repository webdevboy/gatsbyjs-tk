import React from "react"
import Hero from "../layouts/Hero"

const AllLayouts = ({ layoutData }) => {
  const layoutType = layoutData.fieldGroupName

  /**
   * Default component
   */
  const Default = () => (
    <div>
      In AllLayouts the mapping of this component is missing: {layoutType}
    </div>
  )

  /**
   * Mapping the fieldGroupName(s) to our components
   */
  const layouts = {
    // WordPress_Post_Components_Contents_ArticleHero: Hero,
    post_Components_Contents_ArticleHero: Hero,
    page_default: Default,
  }

  console.log(layouts[layoutType])

  /**
   * If layout type is not existing in our mapping, it shows our Default instead.
   */
  const ComponentTag = layouts[layoutType]
    ? layouts[layoutType]
    : layouts["page_default"]

  return <ComponentTag {...layoutData} />
}

export default AllLayouts
