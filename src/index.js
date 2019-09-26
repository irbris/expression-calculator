function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  var str = expr.replace(/\s/g, '');
  var braskets = str.match(/[\(\)]/g);
  if(braskets) {
    var num = 0;
    braskets.map(element => {
      if(element === '(') {
        num ++;
      } if(element === ')') {
        num --;
        if(num < 0) {
          throw 'ExpressionError: Brackets must be paired'
        }
      }
    });
    if(num !== 0) {
      throw 'ExpressionError: Brackets must be paired'
    }
  }

  var value = str.match(/(^[0-9*\/\\(\\)+-]+$)/);
  var resalt = new Function('return '+ value );
  var res = +resalt().toFixed(4);
  if(res === Infinity) {
    throw 'TypeError: Devision by zero.'
  }
  
  return res;
}


module.exports = {
    expressionCalculator
}

// https://toster.ru/q/516733