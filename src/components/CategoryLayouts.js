import React from "react"
import { Ad } from "src/components"

const CategoryLayouts = ({ layoutData }) => {
  const layoutType = layoutData && layoutData.fieldGroupName || "No field group name found";
  // Default component
  const Default = () => (
    <div>
      In CategoryLayouts the mapping of this component is missing: {layoutType}
    </div>
  );

  // Mapping the fieldGroupName(s) to our components
  const layouts = {
    category_Categorycomponents_Components_Ad: Ad,
    default: Default,
  }

  // If layout type is not existing in our mapping, it shows our Default instead.
  const ComponentTag = layouts[layoutType]
    ? layouts[layoutType]
    : layouts["default"]

  return (
    <ComponentTag {...layoutData} type={"category"} />
  )
}

export default CategoryLayouts
