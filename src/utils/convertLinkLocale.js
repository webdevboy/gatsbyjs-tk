import supportedLngs from '../locales/supportedLngs.json';

function convertLinkLocale(url, languageCode) {
  let clearedUrl = url;
  for(let i = 0; i < supportedLngs.length; i++) {
    if(clearedUrl.split('/').indexOf(supportedLngs[i]) !== -1) {
      clearedUrl = clearedUrl.replace(`/${supportedLngs[i]}`, '');
    }
  }
  
  if(languageCode !== 'en') {
    if(clearedUrl === '/') {
      return `/${languageCode}`;
    }
    else {
      return `/${languageCode}${clearedUrl}`;
    }
  }
  else {
    return clearedUrl;
  }
}

export default convertLinkLocale;
