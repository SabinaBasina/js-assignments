/**
 * Takes two strings including only letters from a to z.
 * Returns a new sorted string containing distinct letters.
 *
 * @param {string} value1
 * @param {string} value2
 * @return {string}
 *
 * @example
 *   'azy', 'bk' => 'abkyz'
 *   'zxxlal','laxk'    => 'aklxz'
 *   'abcdefghijklmnop',  'lmnopqrstuvwxyz'  => 'abcdefghijklmnopqrstuvwxyz'
 */
function distinctLettersString(value1, value2) {
  let value = value1 + value2;
  value = [...value].filter((el, i) => [...value].indexOf(el) === i);
  return value.sort().join('');
}


/**
 * Takes a string with any characters.
 * Returns an object containing appearence of every distinct letters in lower case.
 *
 * @param {string} value
 * @return {Object}
 *
 * @example
 *  'Who you are, Buddy?' => { a:1, d:2, e:1, h:1, o:2, r:1, u:2, y:2 }
 *
 */

function lowerLetters(value) {
  let str;
  let count;
  const result = {};
  const re = RegExp(/[a-z]/);
  while(re.test(value)){
    count = 0;
    str = value.match(re);
    [...value].forEach(e => e === str[0] ? count++ : '');
    result[str[0]] = count;    
    value = [...value].filter(e => e !== str[0] ).join('');
  }
  return result;
}

/**
 * Write a function that will convert a string into title case, given an optional
 * list of exception (minor words). The list of minor words will be given as a
 * string with each word separated by a space. Your function should ignore the
 * case of the minor words string - it should behave in the same way even if the
 * case of the minor word is changed
 *
 * @param {string} the original string to be converted
 * @param {string} list of minor words that must always be lowercase except for
 *                  the first word in the string
 * @return {string}
 *
 * @example
 *    'a clash of KINGS', 'a an the of'  =>  'A Clash of Kings'
 *    'THE WIND IN THE WILLOWS', 'The In'  => 'The Wind in the Willows'
 *    'the quick brown fox'  => 'The Quick Brown Fox'
 */

function titleCaseConvert(title, minorWords) {
  title = title.toLowerCase().split(' ');
  if(minorWords){
    minorWords = minorWords.toLowerCase().split(' ');
    for(let i = 0; i<title.length; i++){
      if((!minorWords.some(e => e===title[i]) || title.indexOf(title[i])===0)){
        title[i] = title[i].replace(/^\w/, l => l.toUpperCase());
      }
    }
    return title.join(' ');
  }else{
    return title.map(e => e.replace(/^\w/, l => l.toUpperCase())).join(' ');
  }
}

/**
 * Your job is to create a calculator which evaluates expressions in Reverse Polish
 * notation (https://en.wikipedia.org/wiki/Reverse_Polish_notation). Empty expression
 * should evaluate to 0. Expression without operation returns the last number.
 *
 * @param {string} RPN string, each number and operation separated by a space
 *
 * @return {Number}
 *
 * @example
 *  ''  =>  0  // empty expression returns 0
 *  '1 2 3'  =>  3  // expression without operation returns the last number
 *  '4 2 +'  =>  6  // 4 + 2
 *  '2 5 * 2 + 3 /'  =>  4   //  ((5 * 2) + 2) / 3
 *  '5 1 2 + 4 * + 3 -'  =>  14   // 5 + ((1 + 2) * 4) -3
 */

function calcRPN(expr) {
  const re = RegExp(/\+|-|\*|\//);
  const arr = expr.split(' ');
  for(let i =0; i< arr.length; i++){
    if(re.test(arr[i])){
      arr.splice(i-2, 3, eval(`${arr[i-2]}${arr[i]}${arr[i-1]}`));
      i -= 2;
    }    
  }
  return arr[arr.length-1];
}

module.exports = {
  distinctLettersString,
  lowerLetters,
  titleCaseConvert,
  calcRPN
};