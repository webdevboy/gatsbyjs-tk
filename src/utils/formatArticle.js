export const getFormattedArticle = (article, isHeroImage) => {
  if (!article) return null
  const articleHero =
    article.components.contents &&
    article.components.contents.find(content => content.fieldGroupName === 'post_Components_Contents_ArticleHero');
  const isCircle =
    article.components.contents &&
    article.components.contents.find(
      content => content.fieldGroupName === 'post_Components_Contents_CircleThumbnail'
    );
  const category = article.categories.nodes.find(
    category => category.name.toLowerCase() !== "featured category"
  )
  const bylineObj =
    article.components.contents &&
    article.components.contents.find(content => content.byline)
  const formattedArticle = {
    imageUrl:
      isHeroImage ?
      articleHero.heroImage && articleHero.heroImage.sourceUrl :
      article.featuredImage && article.featuredImage.sourceUrl,
    authors: articleHero && articleHero.authors ? `Photography by ${articleHero.authors}` : null,
    cutline: category ? category.name : "",
    title: articleHero && articleHero.title || article.title,
    byline: bylineObj && bylineObj.byline,
    isCircle: isCircle && isCircle.isFeaturedImageRounded,
    articleUrl: article.uri,
  }
  return formattedArticle
}
