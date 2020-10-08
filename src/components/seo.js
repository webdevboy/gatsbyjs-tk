/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import convertLinkLocale from 'src/utils/convertLinkLocale';

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

function SEO({ description, lang, meta, title, imageUrl, type, articleUrl, articleLang }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description;
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={entities.decode(title)}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: `Tasting Kitchen, TK, Tasting Kitchen TK`,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: 'og:url',
          content: articleUrl ? `https://tasting-kitchen.com${articleUrl[0] === '/' ? articleUrl : `/${articleUrl}`}` : 'https://tasting-kitchen.com/',
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: type || `website`,
        },
        {
          property: 'og:image',
          content: imageUrl,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        }
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
