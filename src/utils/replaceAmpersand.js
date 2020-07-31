const ampersandCodes = ['&amp;', '&#x26;', '&#38;', '&#038;'];

const replaceAmpersand = string => {
  console.log(string)
  if(!string) return null;
  let newString = string;
  ampersandCodes.forEach(code => {
    if(string.indexOf(code) !== -1) {
      newString = string.replace(code, '&');
    }
  });
  return newString;
}

export default replaceAmpersand;
