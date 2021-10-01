const PRECEDENCEVALUES = {
    '(': 0,
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '^': 3,
    ')': 5
};

String.prototype.isNumber = function() {
    if (Number(this)) {return true}
    else {return false};
}

function Parser(string) {
    let infixExpression = [];
    let current_number = [];
    for (let i = 0; i < string.length; i++) {
        if (string[i] != '+' && string[i] != '-' && string[i] != '*' && string[i] != '/' && string[i] != '(' && string[i] != ')' || string[i] == '.') {
            current_number.push(string[i]);
        } else {
            if (current_number.length > 0) infixExpression.push(current_number.join(''));
            current_number = [];
            infixExpression.push(string[i]);
        };
    } return infixExpression;
}


function ConvertInfixToPostfix(infix) {
    let postfixStack = [];
    let operandStack = [];
    let infixStack = infix;
        while (infixStack.length > 0) {
            if (infixStack[0].isNumber()) {
                postfixStack.push(infixStack[0]);
                infixStack.splice(0,1);
            } else if (infixStack[0] != '(' && infixStack[0] != ')') {
                if (operandStack.length == 0) {
                    operandStack.push(infixStack[0]);
                    infixStack.splice(0,1);
                } else {
                    while (PRECEDENCEVALUES[infixStack[0]] <= PRECEDENCEVALUES[operandStack[0]]) {
                        postfixStack.push(operandStack.pop());
                        if (operandStack.length === 0);
                        break;
                    }
                
                    
                }
            } else {

            }
        } while (operandStack.length > 0) {
            postfixStack.push(operandStack.pop());
        };
        return [operandStack, postfixStack];
}

// function Solver(math_expression) {}
test_case = '1+2+3+4'
test_case2 = '11+2453+314+4'
test_case3 = '.1+0.2+3.+4'
test_case4 = '(4+5+6)*(4/4)'

console.log(test4 = (Parser(test_case4)));
// console.log(ConvertInfixToPostfix(test4));
let test_array = [];
console.log(test_array[0]);

