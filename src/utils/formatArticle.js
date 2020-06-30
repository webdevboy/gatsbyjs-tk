export const getFormattedArticle = article => {
  if (!article) return null
  const imageObj =
    article.components.contents &&
    article.components.contents.find(content => content.thumbnailImage)
  const imageHeroObj =
    article.components.contents &&
    article.components.contents.find(content => content.fieldGroupName === 'post_Components_Contents_ArticleHero')
  const category = article.categories.nodes.find(
    category => category.name.toLowerCase() !== "featured category"
  )
  const bylineObj =
    article.components.contents &&
    article.components.contents.find(content => content.byline)
  const formattedArticle = {
    imageUrl:
      (imageObj && imageObj.thumbnailImage && imageObj.thumbnailImage.sourceUrl) ||
      (imageHeroObj && imageHeroObj.heroImage && imageHeroObj.heroImage.sourceUrl),
    authors: imageHeroObj && imageHeroObj.authors ? `Photography by ${imageHeroObj.authors}` : null,
    cutline: category ? category.name : "",
    title: imageHeroObj && imageHeroObj.title || article.title,
    byline: bylineObj && bylineObj.byline,
    articleUrl: article.uri,
  }
  return formattedArticle
}
