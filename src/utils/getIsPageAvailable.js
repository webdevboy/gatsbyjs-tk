import { GATSBY_WP_ENDPOINT } from 'src/utils/constants';

const getIsPageAvailable = (pages, url) => {
  const convertedUrl = url.replace(GATSBY_WP_ENDPOINT, '');
  if(pages && pages.length > 0) {
    const page = pages.find(p => {
      const decodedPath = decodeURIComponent(p.path);
      return `${decodedPath}/` === convertedUrl;
    });
    return !!page;
  }
  return false;
}

export default getIsPageAvailable;
