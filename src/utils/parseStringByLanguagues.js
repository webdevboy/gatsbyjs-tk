const parseStringByLanguagues = (string, callback) => {
  const stringArraybBySpace = string.split(' ');

  // Chinese characters range
  const chineseRegexp = new RegExp("^[\u4E00-\uFA29]*$");
  let stringArray = [];
  stringArraybBySpace.forEach(element => {
    const splittedElements = element.split('：');
    if(splittedElements.length > 1) {
      stringArray.push(`${splittedElements[0]}：`);
      stringArray.push(splittedElements[1]);
    }
    else if(splittedElements.length > 0) {
      stringArray.push(splittedElements[0]);
    }
    else {
      stringArray.push(element);
    }
  });
  stringArray.forEach(item => {
    callback(`<span class="${chineseRegexp.test(item) ? 'chinese' : 'english'}">${item}</span>`);
  });
}

export default parseStringByLanguagues;
