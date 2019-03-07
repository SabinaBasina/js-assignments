
/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist
 * in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account
 * that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it
 * into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
  let str1 = ' _     _  _     _  _  _  _  _ '; 
  let str2 = '| |  | _| _||_||_ |_   ||_||_|'; 
  let str3 = '|_|  ||_  _|  | _||_|  ||_| _|'; 
  str1 = str1.split('');  str2 = str2.split(''); str3 = str3.split('');  
  const arr = [], arrBank = [], result = [];
  while(str1.length){
    // eslint-disable-next-line 
    arr.push(`${str1.splice(0, 3).join('')}${str2.splice(0, 3).join('')}${str3.splice(0, 3).join('')}`);
  }
  bankAccount = bankAccount.split('\n');
  let s1 = bankAccount[0], s2 = bankAccount[1], s3 = bankAccount[2];
  s1 = s1.split(''); s2 = s2.split(''); s3 = s3.split('');
  while(s1.length){
    // eslint-disable-next-line 
    arrBank.push(`${s1.splice(0, 3).join('')}${s2.splice(0, 3).join('')}${s3.splice(0, 3).join('')}`);
  }
  arrBank.forEach(bank => 
    arr.forEach((e, i) => bank === e ? result.push(i):''));  
  return Number(result.join(''));
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make
 * sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>
 *      'The String global object',
 *      'is a constructor for',
 *      'strings, or a sequence of',
 *      'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>
 *      'The String',
 *      'global',
 *      'object is a',
 *      'constructor',
 *      'for strings,',
 *      'or a',
 *      'sequence of',
 *      'characters.'
 */
function* wrapText(text, columns) {
  let s = [];
  while(text){
    s = [];
    for(const i of text.split(' ')){
      if(s.join(' ').length < columns){
        s.push(i);
      }
    }
    if(s.join(' ').length > columns) s.pop();
    text = text.split(' ').slice(s.length).join(' ');
    yield s.join(' ');    
  }
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
  StraightFlush: 8,
  FourOfKind: 7,
  FullHouse: 6,
  Flush: 5,
  Straight: 4,
  ThreeOfKind: 3,
  TwoPairs: 2,
  OnePair: 1,
  HighCard: 0
};

function getPokerHandRank(hand) { 
  const m = {'A':14, 'J':11, 'Q':12, 'K':13, '1':10 },
    first = hand.map(card => m[card[0]] || Number(card[0])),
    second = hand.map(card => card[card.length - 1]),
    length = first.filter((e, i) => first.indexOf(e) === i).length,
    count = [];

  first.forEach(e => e === 2 ? first.forEach((e, i) => e === 14 ?
    first.splice(i, 1, 1): '' ): '');
    
  first.sort((a, b) => {return a-b;});

  first.forEach((f, i) => {
    count[i] = 0;
    first.forEach(e => f === e ? count[i]++ : '');
  });

  if(second.filter((e, i) => second.indexOf(e) === i).length === 1){
    if(first.every((e, i) => first[0] === e-i)){
      return PokerRank.StraightFlush;
    }else return PokerRank.Flush;
  }else if(first.every((e, i) => first[0] === e-i)) {
    return PokerRank.Straight;
  }else if(length === 2) {
    if(count.some(e => e === 4)){
      return PokerRank.FourOfKind; 
    }else return PokerRank.FullHouse;    
  }else if(length === 3){
    if(count.some(e => e === 3)){
      return PokerRank.ThreeOfKind;
    }else return PokerRank.TwoPairs;
  }else if(length === 4){
    return PokerRank.OnePair;
  } else return PokerRank.HighCard;
}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +,
 * vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 *
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 *
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+        '+------------+\n'+
 *    '|            |\n'+        '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+   =>   '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+        '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'         '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
  let x, y, width, height;
  let count = 2; 
  figure = figure.split('\n');
  figure = figure.map(arr => arr.split(''));
  while(count > 1){
    count = 0;
    for(let i = 0; i<figure.length; i++){
      if(figure[i].indexOf('+') !== -1){
        x = i; y = figure[i].indexOf('+');
        break;
      }
    }
    width = y + 1; height = x + 1;  
    while(figure[x][width] !== '+'){
      width++;
    }
    while(figure[height][y] !== '+'){
      height++;
    }
    yield ('+')+('-').repeat(width-y-1)+('+')+'\n' 
          +(('|')+' '.repeat(width-y-1)+('|')+'\n').repeat(height-x-1) 
          +('+')+('-').repeat(width-y-1)+('+')+'\n';

    figure[x].splice(y, 1, '-');
    if(figure[x][width+1] === undefined 
      || figure[x][width+1] === ' ') figure[x].splice(width, 1, '-');
    if(figure[height+1][y] === undefined 
      || figure[height+1][y] === ' ') figure[height].splice(y, 1, '-');
    if(figure[height+1][width] === ' ' 
      || figure[height][width+1] === ' ') figure[height].splice(width, 1, '-');

    for(let i = 0; i<figure.length; i++){
      if(figure[i].indexOf('+') !== -1){
        count++;
      }
    }
  }
}

module.exports = {
  parseBankAccount: parseBankAccount,
  wrapText: wrapText,
  PokerRank: PokerRank,
  getPokerHandRank: getPokerHandRank,
  getFigureRectangles: getFigureRectangles
};
