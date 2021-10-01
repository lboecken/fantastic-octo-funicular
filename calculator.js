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

Array.prototype.isNumber = function() {
    if (Number(this)) {return true}
    else {return false};
}

function Parser(string) {
    let String = '(' + string + ')';
    let infixExpression = [];
    let current_number = [];
    for (let i = 0; i < String.length; i++) {
        if (String[i] != '+' && String[i] != '-' && String[i] != '*' && String[i] != '/' && String[i] != '(' && String[i] != ')' || String[i] == '.') {
            if (String[i] === 'N') {
                current_number.push('-')
            } else {       
            current_number.push(String[i]);
            }
        } else {
            if (current_number.length > 0) infixExpression.push(current_number.join(''));
            current_number = [];
            infixExpression.push(String[i]);
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
                if (PRECEDENCEVALUES[operandStack.at(-1)] >= PRECEDENCEVALUES[infixStack[0]]) postfixStack.push(operandStack.pop());
                operandStack.push(infixStack[0]);
                infixStack.splice(0,1);
        } else if (infixStack[0] == '(') {
            operandStack.push(infixStack[0]);
            infixStack.splice(0,1);
        } else if (infixStack[0] == ')') {
            while (operandStack.at(-1) != '(') {
                postfixStack.push(operandStack.pop());
            }
            operandStack.pop();
            infixStack.splice(0,1);
        }
    } while (operandStack.length > 0) {postfixStack.push(operandStack.pop())};
return postfixStack;
} 

function PostfixSolver(postfixexpression) {
    let PostfixStack = [];
    while (postfixexpression.length > 0) {
        if (postfixexpression[0].isNumber()) {
            PostfixStack.push(postfixexpression[0]);
            postfixexpression.splice(0,1);
        } else {
            const num1 = Number(PostfixStack.at(-2));
            const num2 = Number(PostfixStack.at(-1));
            PostfixStack.pop();
            PostfixStack.pop();
            const operand = postfixexpression.shift();
            PostfixStack.push(ApplyOperand(num1, num2, operand));
        }
    } return PostfixStack;
}

function ApplyOperand(num1, num2, operand) {
    console.log[num1, num2, operand]
    switch (operand) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num1 / num2;
        case '^': return num1 ^ num2;
    }
}



test_case = '1+2+3+4'
test_case2 = '11+2453+314+4'
test_case3 = '.1+0.2+3.+4'
test_case4 = '((4+N5+6)*(4/N2)*5)'

test4 = Parser(test_case4);
console.log(test4_conv = ConvertInfixToPostfix(test4));
console.log(answer = PostfixSolver(test4_conv));
