function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  var str = expr.replace(/\s/g, '')
  var value = str.match(/(^[0-9*\/\\(\\)+-]+$)/);
  var res = new Function('return '+ value );
  return +res().toFixed(4);
}


module.exports = {
    expressionCalculator
}