import React from "react"
import { TopArticlesCategory } from "src/components"

const CategoryLayouts = ({ categoryData, updateParallaxState }) => {
  return <TopArticlesCategory category={categoryData} updateParallaxState={updateParallaxState} />
}

export default CategoryLayouts
