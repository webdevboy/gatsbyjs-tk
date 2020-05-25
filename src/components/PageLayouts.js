import React from "react"
import HomepageHero from "src/components/HomepageHero"

const AllLayouts = ({ layoutData }) => {
  const layoutType = layoutData.fieldGroupName

  // Default component
  const Default = () => (
    <div>
      In PostLayouts the mapping of this component is missing: {layoutType}
    </div>
  )

  // Mapping the fieldGroupName(s) to our components
  const layouts = {
    page_Components_Contents_HomepageHero: HomepageHero,
    default: Default,
  }

  // If layout type is not existing in our mapping, it shows our Default instead.
  const ComponentTag = layouts[layoutType]
    ? layouts[layoutType]
    : layouts["default"]

  return <ComponentTag {...layoutData} />
}

export default AllLayouts
