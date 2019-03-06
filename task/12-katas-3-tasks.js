
/**
 * Returns true if word occurrs in the specified word snaking puzzle.
 * Each words can be constructed using "snake" path inside a grid with top, left,
 * right and bottom directions.
 * Each char can be used only once ("snake" should not cross itself).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ];
 *   'ANGULAR'   => true   (first row)
 *   'REACT'     => true   (starting from the top-right R adn follow the ↓ ← ← ↓ )
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (first column)
 *   'FUNCTION'  => false
 *   'NULL'      => false
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
  let result;
  let count, m, n, letter, arrResult = [];
  searchStr = searchStr.split('');
  for(let i = 0; i<puzzle.length; i++){
    for(let j = 0; j<puzzle[0].length; j++){
      if(puzzle[i][j] === searchStr[0]){        
        result = true; count = 0; m = i; n = j;
        arrResult.push(`${m}, ${n}`);
        while(result && count < searchStr.length){
          count++;
          letter = searchStr[count];
          if(letter === puzzle[m][n+1]){
            n = n+1;
            result = true;
          } else if(letter === puzzle[m][n-1]){
            n = n-1;
            result = true;
          } else if(letter === (puzzle[m+1] && puzzle[m+1][n])){
            m = m+1;
            result = true;
          } else if (letter === (puzzle[m-1] && puzzle[m-1][n])){
            m = m-1;
            result = true;
          } else {result = false;}  
          if(result){arrResult.push(`${m}, ${n}`);}          
        } 
        if(count === searchStr.length 
          && arrResult.every((e, i) => arrResult.indexOf(e) === i)){
          return true;
        }
        arrResult = [];
      }            	
    }	      
  }
}


/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 *
 * @param {string} chars
 * @return {Iterable.<string>} all posible strings constructed with the chars from
 *    the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {
  const length = chars.length;
  const c = Array(length).fill(0);    
  let k, p, i = 1; 
  chars = chars.split('');
  yield chars.join('');
  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = chars[i];
      chars[i] = chars[k];
      chars[k] = p;
      ++c[i];
      i = 1;
      yield chars.join('');
    } else {
      c[i] = 0;
      ++i;
    }
  }
}


/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units
 * you have already bought, or do nothing.
 * Therefore, the most profit is the maximum difference of all pairs in a sequence
 * of stock prices.
 *
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
function getMostProfitFromStockQuotes(quotes) {
  return quotes.reduce((acc, curr, i) => {
    return acc + (Math.max(...quotes.slice(i)) - curr); 
  }, 0);
}


/**
 * Class representing the url shorting helper.
 * Feel free to implement any algorithm, but do not store link in the key\value stores.
 * The short link can be at least 1.5 times shorter than the original url.
 *
 * @class
 *
 * @example
 *
 *   var urlShortener = new UrlShortener();
 *   var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *   var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 *
 */
function UrlShortener() {
  this.urlAllowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
                          'abcdefghijklmnopqrstuvwxyz' +
                          "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {
  encode(url) {
    throw new Error('Not implemented');
  },

  decode(code) {
    throw new Error('Not implemented');
  }
};

module.exports = {
  findStringInSnakingPuzzle: findStringInSnakingPuzzle,
  getPermutations: getPermutations,
  getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
  UrlShortener: UrlShortener
};
