export const getFormattedArticle = article => {
  if (!article) return null
  const imageObj =
    article.components.contents &&
    article.components.contents.find(content => content.thumbnailImage)
  const imageHeroObj =
    article.components.contents &&
    article.components.contents.find(content => content.heroImage)
  const category = article.categories.nodes.find(
    category => category.name.toLowerCase() !== "featured category"
  )
  const bylineObj =
    article.components.contents &&
    article.components.contents.find(content => content.byline)
  const formattedArticle = {
    imageUrl:
      (imageObj && imageObj.thumbnailImage.sourceUrl) ||
      (imageHeroObj && imageHeroObj.heroImage.sourceUrl),
    cutline: category ? category.name : "",
    title: article.title || (imageObj && imageObj.title),
    byline: bylineObj && bylineObj.byline,
    articleUrl: article.uri,
  }
  return formattedArticle
}
