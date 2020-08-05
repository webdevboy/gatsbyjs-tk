// import {guessLanguage} from 'guessLanguage';
const guessLanguage = require('guessLanguage');

const parseStringByLanguagues = (string, callback) => {
  const stringArraybBySpace = string.split(' ');
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
    guessLanguage.guessLanguage.detect(item, language => {
      callback(`<span class="${language === 'zh' ? 'chinese' : 'english'}">${item}</span>`);
    });
  });
}

export default parseStringByLanguagues;
