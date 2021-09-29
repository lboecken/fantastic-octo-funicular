function Parser(string) {
    let math_expression = [];
    let current_number = [];
    for (let i = 0; i < string.length; i++) {
        if (string[i] != '+' && string[i] != '-' && string[i] != '*' && string[i] != '/' || string[i] == '.') {
            current_number.push(string[i]);
            console.log('if went through');
        } else {
            math_expression.push(current_number.join(''));
            current_number = [];
            math_expression.push(string[i]);
            console.log('else went through');
        };
    } return math_expression;
}

function ApplyOperand(num1, num2, operand) {
    switch (operand) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num1 / num2;
    }
}



test_case = '1+2+3+4'
test_case2 = '11+2453+314+4'
test_case3 = '.1+0.2+3.+4'


console.log(Parser(test_case));
console.log(Parser(test_case2));
console.log(Parser(test_case3));

function Solver(math_expression) {
    for (let i = 0; math_expression.length; i++) {
        try {}
    }
}