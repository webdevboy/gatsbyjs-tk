const getIsPageAvailable = (pages, url) => {
  if(pages && pages.length > 0) {
    console.log(pages);
    const page = pages.find(p => {
      const decodedPath = decodeURIComponent(p.path);
      return `${decodedPath}/` === url;
    });
    return !!page;
  }
  return false;
}

export default getIsPageAvailable;
