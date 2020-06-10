import React from "react"
import { TopArticles } from "src/components"

const CategoryLayouts = ({ layoutData, theme }) => {
    console.log(theme);
    const layoutType = layoutData.fieldGroupName || "No field group name found"

    // Default component
    const Default = () => (
        <div>
            In PageLayouts the mapping of this component is missing: {layoutType}
        </div>
    )

    // Mapping the fieldGroupName(s) to our components
    const layouts = {
        page_Components_Contents_TopArticles: TopArticles,
        default: Default,
    }

    // If layout type is not existing in our mapping, it shows our Default instead.
    const ComponentTag = layouts[layoutType]
        ? layouts[layoutType]
        : layouts["default"]

    return <ComponentTag {...layoutData} theme={theme} type={"category"} />
}

export default CategoryLayouts
