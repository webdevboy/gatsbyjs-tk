import i18next from 'i18next';
import convertLinkLocale from './convertLinkLocale';

function getLangLink(linkTo) {
  return convertLinkLocale(linkTo, i18next.language);
}

export default getLangLink;
