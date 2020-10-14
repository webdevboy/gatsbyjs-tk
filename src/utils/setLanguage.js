import supportedLngs from 'src/locales/supportedLngs.json';

const setLanguage = (pathname = '', i18n) => {
  const pathnameSplitted = pathname.split('/');
  const lngCode = pathnameSplitted.length > 1 && pathnameSplitted[1];
  const isSupportedLng = supportedLngs.indexOf(lngCode) !== -1;
  if(lngCode && isSupportedLng && i18n && i18n.changeLanguage) {
    i18n.changeLanguage(lngCode);
  }
  else if(i18n && i18n.changeLanguage) {
    i18n.changeLanguage('en');
  }
};

export default setLanguage;
