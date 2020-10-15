import React from "react"
import {
  // PageHero,
  TopArticlesHome,
  FullscreenArticle,
  Chefs,
  SociallyConnected,
  IndividualArticle,
  Ad,
  TastingNotes,
  Spacer,
  EventsComponent,
  FullwidthCopy,
  EventPageComponent,
  DestionationBanner,
  DestionationSubNavigation,
  DestinationIntroduction,
} from "src/components"
import {
  AboutTitle,
  AboutMain,
  AboutColumns,
} from 'src/components/AboutComponents';

const PageLayouts = ({ layoutData, theme, fbPost, containerIsScrollable, updateParallaxState }) => {
  const layoutType = layoutData && layoutData.fieldGroupName || "No field group name found";
  // Default component
  const Default = () => (
    <div>
      In PageLayouts the mapping of this component is missing: {layoutType}
    </div>
  );
  const Empty = () => <></>;

  // Mapping the fieldGroupName(s) to our components
  const layouts = {
    page_Components_Contents_FullscreenArticle: FullscreenArticle,
    // page_Components_Contents_HomepageHero: PageHero,
    page_Components_Contents_HomepageHero: Empty,
    page_Components_Contents_TopArticles: TopArticlesHome,
    page_Components_Contents_DestinationBanner: DestionationBanner,
    page_Components_Contents_DestionationSubNavigation: DestionationSubNavigation,
    page_Components_Contents_DestinationIntroduction: DestinationIntroduction,
    page_Components_Contents_Chefs: Chefs,
    page_Components_Contents_SociallyConnected: SociallyConnected,
    page_Components_Contents_IndividualArticle: IndividualArticle,
    page_Components_Contents_Ad: Ad,
    page_Components_Contents_TastingNotes: TastingNotes,
    page_Components_Contents_Spacer: Spacer,
    page_Components_Contents_Event: EventsComponent,
    page_Components_Contents_FullwidthCopy: FullwidthCopy,
    page_Components_AboutContents_AboutTitle: AboutTitle,
    page_Components_AboutContents_AboutMain: AboutMain,
    page_Components_AboutContents_AboutColumns: AboutColumns,
    page_Components_EventContents_EventPageComponent: EventPageComponent,
    default: Default,
  }

  // If layout type is not existing in our mapping, it shows our Default instead.
  const ComponentTag = layouts[layoutType]
    ? layouts[layoutType]
    : layouts["default"]

  return <ComponentTag {...layoutData} theme={"light"} type={"page"} fbPost={fbPost} containerIsScrollable={containerIsScrollable} updateParallaxState={updateParallaxState} />
}

export default PageLayouts;
