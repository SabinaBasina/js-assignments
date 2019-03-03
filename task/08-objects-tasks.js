
/** ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    var r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  Rectangle.prototype.getArea = function () {
    return this.width * this.height;
  };
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    var r = fromJSON(Rectangle.prototype, '{"width":10, "height":20}');
 *
 */
function fromJSON(proto, json) {
  return Object.setPrototypeOf(JSON.parse(json), proto);
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class and
 * pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy and
 * implement the functionality
 * to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple, clear
 * and readable as possible.
 *
 * @example
 *
 *  var builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify() =>
 *    '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify() =>
 *    'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify() =>
 *      'div#main.container.draggable + table#data ~ tr:nth-of-type(even) td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

class Selectors{
  constructor(){
    this._element = [];
    this._id = [];
    this._class = [];
    this._attr = [];
    this._pseudoClass = [];
    this._pseudoElement = [];
    this.order = [];
  }

  element(value){
    if(this._element.length > 0) {
      throw Error('Element, id and pseudo-element should ' 
        + 'not occur more then one time inside the selector');
    }
    this.order.push(0);
    if(this.order.some(e=>e>0)){
      throw new Error('Selector parts should be arranged in the following order'
        +': element, id, class, attribute, pseudo-class, pseudo-element');
    }
    this._element.push(value);
    return this;
  }

  id(value){
    if(this._id.length > 0) {
      throw Error('Element, id and pseudo-element should ' 
      + 'not occur more then one time inside the selector');
    }
    this.order.push(1);
    if(this.order.some(e=>e>1)){
      throw new Error('Selector parts should be arranged in the following order'
        +': element, id, class, attribute, pseudo-class, pseudo-element');
    }
    this._id.push(value);
    return this;
  }

  class(value){
    this.order.push(2);
    if(this.order.some(e=>e>2)){
      throw new Error('Selector parts should be arranged in the following order'
        +': element, id, class, attribute, pseudo-class, pseudo-element');
    }
    this._class.push(value);
    return this;
  }

  attr(value){
    this.order.push(3);
    if(this.order.some(e=>e>3)){
      throw new Error('Selector parts should be arranged in the following order'
        +': element, id, class, attribute, pseudo-class, pseudo-element');
    }
    this._attr.push(value);
    return this;
  }

  pseudoClass(value){
    this.order.push(4);
    if(this.order.some(e=>e>4)){
      throw new Error('Selector parts should be arranged in the following order'
        +': element, id, class, attribute, pseudo-class, pseudo-element');
    }
    this._pseudoClass.push(value);
    return this;
  }

  pseudoElement(value){
    if(this._pseudoElement.length > 0) {
      throw Error('Element, id and pseudo-element should ' 
        + 'not occur more then one time inside the selector');
    }
    this.order.push(5);
    if(this.order.some(e=>e>5)){
      throw new Error('Selector parts should be arranged in the following order'
        +': element, id, class, attribute, pseudo-class, pseudo-element');
    }
    this._pseudoElement.push(value);
    return this;
  }

  getElement(){
    return this._element.map(e => `${e}`).join('');
  }

  getId(){
    return this._id.map(e => `#${e}`).join('');
  }

  getClass(){
    return this._class.map(e => `.${e}`).join('');
  }

  getAttr(){
    return this._attr.map(e => `[${e}]`).join('');
  }

  getPseudoClass(){
    return this._pseudoClass.map(e => `:${e}`).join('');
  }

  getPseudoElement(){
    return this._pseudoElement.map(e => `::${e}`).join('');
  }

  stringify() {
    return this.getElement() + this.getId() + this.getClass() + 
      this.getAttr() + this.getPseudoClass() + this.getPseudoElement();
  }

}

class Combine{
  constructor() {
    this._selectors = [];
    this._combinators = [];
    this.result = '';
  }

  selectors(selector1, selector2){
    this._selectors.push(selector1, selector2);
  }

  combinators(combinator){
    this._combinators.push(` ${combinator} `);
  }

  stringify() {
    this._combinators.forEach((e, i) => this.result = 
      this._selectors[i].stringify() + e + this._selectors[i+1].stringify());
    return this.result;
  }

}

const cssSelectorBuilder = {

  element(value) {
    return new Selectors().element(value);
  },

  id(value) {
    return new Selectors().id(value);
  },

  class(value) {
    return new Selectors().class(value);
  },

  attr(value) {
    return new Selectors().attr(value);
  },

  pseudoClass(value) {
    return new Selectors().pseudoClass(value);
  },

  pseudoElement(value) {
    return new Selectors().pseudoElement(value);
  },

  combine(selector1, combinator, selector2) {
    const comb = new Combine();
    comb.selectors(selector1, selector2);
    comb.combinators(combinator);
    return comb;
  }
};

module.exports = {
  Rectangle: Rectangle,
  getJSON: getJSON,
  fromJSON: fromJSON,
  cssSelectorBuilder: cssSelectorBuilder
};
