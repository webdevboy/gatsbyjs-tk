const getIsPageAvailable = (pages, url) => {
  if(pages && pages.length > 0) {
    const page = pages.find(p => {
      const decodedPath = decodeURIComponent(p.path);
      return `${decodedPath}/` === url.replace('https://q13.aa0.myftpupload.com', '');
    });
    return !!page;
  }
  return false;
}

export default getIsPageAvailable;
