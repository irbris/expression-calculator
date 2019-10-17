function eval() {
  // Do not use eval!!!
  return;
}

const calculateTwoNumber = {
  '*': (a, b) => a * b,
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '/': (a, b) => a / b
};

const checkBrackets = (expr) => {
  const braskets = expr.match(/[\(\)]/g);
  if(braskets) {
    let num = 0;
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
};

const parseString = (expr) => {
  const operandList = expr.split(/(?<=[-+*/()])|(?=[-+*/()])/g)
          .map(el => isNaN(parseInt(el)) ? el : parseInt(el));
  return operandList;
}

const calculateParseString = (expr) => {
  let result = null;
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === '/' && expr[i + 1] === 0) {
      throw 'TypeError: Division by zero.'
    } 
    if (expr[i] === '/' || expr[i] === '*') {
      result = calculateTwoNumber[expr[i]](expr[i - 1], expr[i + 1])
      expr.splice(i - 1, 3, result);
      i -= 1;
    }
  }
  result = expr[0];
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === '+' || expr[i] === '-') {
      result = calculateTwoNumber[expr[i]](expr[i - 1], expr[i + 1])
      expr.splice(i - 1, 3, result);
      i -= 1;
    }
  }
  return result;
};

const calculateWithBrackets = (expr) => {
  let openingBrasket = null;
  let closingBrasket = null;

  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === '(') {
      openingBrasket = i;
    } else if (expr[i] === ')') {
      closingBrasket = i;
      const res = calculateParseString(expr.splice(openingBrasket + 1, closingBrasket - openingBrasket - 1));
      expr.splice(openingBrasket, 2, res);
      openingBrasket = null;
      closingBrasket = null;
      i = 0;
    } 
  }
  return calculateParseString(expr);
};

function expressionCalculator(expr) {
  checkBrackets(expr);
  let exprNoSpace = expr.replace(/\s/g, '');
  let exprToString = parseString(exprNoSpace);
  let exprCalc = calculateWithBrackets(exprToString); 
  return exprCalc;
}

module.exports = {
  expressionCalculator
}