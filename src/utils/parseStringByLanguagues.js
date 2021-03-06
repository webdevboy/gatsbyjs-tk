const parseStringByLanguagues = (string, callback) => {
  const stringArraybBySpace = string.split(' ');

  // Chinese characters range
  // const chineseRegexp = new RegExp("^[\u4E00-\uFA29]*$");
  const chineseRegexp = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
  
  let stringArray = [];
  stringArraybBySpace.forEach(element => {
    const splittedElements = element.split('：');
    if(splittedElements.length > 1) {
      stringArray.push(chineseRegexp.test(splittedElements[0]) ? `<span class="chinese">${splittedElements[0]}：</span>` : `<span class="english">${splittedElements[0]}：</span>`);
      stringArray.push(chineseRegexp.test(splittedElements[1]) ? `<span class="chinese">${splittedElements[1]}</span>` : `<span class="english">${splittedElements[1]}</span>`);
    }
    else if(splittedElements.length > 0) {
      stringArray.push(chineseRegexp.test(splittedElements[0]) ? `<span class="chinese">${splittedElements[0]}</span>` : `<span class="english">${splittedElements[0]}</span>`);
    }
    else {
      stringArray.push(chineseRegexp.test(element) ? `<span class="chinese">${element}</span>` : `<span class="english">${element}</span>`);
    }
  });
  stringArray.forEach(item => {
    callback(item);
  });
}

export default parseStringByLanguagues;
