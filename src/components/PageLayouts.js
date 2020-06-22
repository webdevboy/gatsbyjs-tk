import React from "react"
import {
  PageHero,
  TopArticlesHome,
  FullscreenArticle,
  Chefs,
  SociallyConnected,
  IndividualArticle,
  Ad,
  TastingNotes,
  Spacer,
} from "src/components"

const PageLayouts = ({ layoutData, theme }) => {
  const layoutType = layoutData.fieldGroupName || "No field group name found"
  // Default component
  const Default = () => (
    <div>
      In PageLayouts the mapping of this component is missing: {layoutType}
    </div>
  )

  // Mapping the fieldGroupName(s) to our components
  const layouts = {
    page_Components_Contents_FullscreenArticle: FullscreenArticle,
    page_Components_Contents_HomepageHero: PageHero,
    page_Components_Contents_TopArticles: TopArticlesHome,
    page_Components_Contents_Chefs: Chefs,
    page_Components_Contents_SociallyConnected: SociallyConnected,
    page_Components_Contents_IndividualArticle: IndividualArticle,
    page_Components_Contents_Ad: Ad,
    page_Components_Contents_TastingNotes: TastingNotes,
    page_Components_Contents_Spacer: Spacer,
    default: Default,
  }

  // If layout type is not existing in our mapping, it shows our Default instead.
  const ComponentTag = layouts[layoutType]
    ? layouts[layoutType]
    : layouts["default"]

  return <ComponentTag {...layoutData} theme={theme} type={"page"} />
}

export default PageLayouts
