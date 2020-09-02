/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStaticQuery, graphql, Link } from "gatsby";

import './footer.scss';

function MenuEn() {
  const date = new Date();

  const { t, i18n } = useTranslation('footer');
  const { wordpress } = useStaticQuery(graphql`
    query {
      wordpress {
        generalSettings {
          url
        }
        menus(where: {location: FOOTER}) {
          nodes {
            name
            menuItems {
              nodes {
                id
                label
                url
              }
            }
          }
        }
      }
    }
  `);
  const getUrlPath = url => {
    return url.replace(wordpress.generalSettings.url, "");
  }
  return wordpress &&
  wordpress.menus &&
  wordpress.menus.nodes &&
  wordpress.menus.nodes.length > 0 &&
  wordpress.menus.nodes[0].menuItems &&
  wordpress.menus.nodes[0].menuItems.nodes ? (
    <>
      {wordpress.menus.nodes[0].menuItems.nodes.map(node => {
        if (node.url.includes('mailto')) {
          return (
            <a key={node.id} target="_blank" href={getUrlPath(node.url)}>{node.label}</a>
          )
        } else {
          return (
            <Link key={node.id} to={getUrlPath(node.url.replace(/\/$/, ''))}>{node.label}</Link>
          )
        }
      })}
    </>
  )
  :
  null
}

export default MenuEn;
