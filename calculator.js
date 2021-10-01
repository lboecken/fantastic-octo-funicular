// GLOBAL VARIABLES

const PRECEDENCEVALUES = {
    '(': 0,
    '+': 1,
    '—': 1,
    '*': 2,
    '/': 2,
    '^': 3,
    ')': 5
};
const INPUT = document.getElementById('input');
const OUTPUT = document.getElementById('output');
const NUMBERBUTTONS = document.querySelectorAll('.NumberButton');
const OPERATORBUTTONS = document.querySelectorAll('.OperatorButton');
const EQUALS = document.getElementById('equals');
const CLEARENTRY = document.getElementById('clearentry');
const ALLCLEAR = document.getElementById('allclear');
const DELETE = document.getElementById('delete');
const PREVIOUS = document.getElementById('previous');
const NEXT = document.getElementById('next');
let CurrentDisplayValue = INPUT.innerText;
let PreviousProblems = [];
let PreviousProblemsIndex = 0;


// LISTENERS
CLEARENTRY.addEventListener('click', () => {INPUT.innerText= '';});

DELETE.addEventListener('click', () => {INPUT.innerText = INPUT.innerText.slice(0, -1)});

EQUALS.addEventListener('click', () => {
    CurrentDisplayValue = INPUT.innerText;
    OUTPUT.innerText = PrepExpressionAndCalculate(CurrentDisplayValue);
    PreviousProblems.unshift([INPUT.innerText, OUTPUT.innerText]);
    console.log(PreviousProblems);
})
ALLCLEAR.addEventListener('click', () => {
    INPUT.innerText = '';
    OUTPUT.innerText = '';
    PreviousProblems = [];
})

PREVIOUS.addEventListener('click', () => {
    PreviousProblemsIndex++;
    OUTPUT.innerText = PreviousProblems[PreviousProblemsIndex][1];
    INPUT.innerText = PreviousProblems[PreviousProblemsIndex][0];
})

NEXT.addEventListener('click', () => {
    PreviousProblemsIndex--;
    OUTPUT.innerText = PreviousProblems[PreviousProblemsIndex][1];
    INPUT.innerText = PreviousProblems[PreviousProblemsIndex][0];
})

for (element of NUMBERBUTTONS) {
    element.addEventListener('click', (e) => {
        CurrentDisplayValue = INPUT.innerText;
        INPUT.innerText = CurrentDisplayValue + e.target.value
    })
}

for (element of OPERATORBUTTONS) {
    element.addEventListener('click', (e) => {
        let CurrentDisplayValue = INPUT.innerText;
        INPUT.innerText = CurrentDisplayValue + e.target.value
    })
}


// FUNCTIONS FOR CALCULATIONS
String.prototype.isNumber = function() {
    if (Number(this)) {return true}
    else {return false};
}

Array.prototype.isNumber = function() {
    if (Number(this)) {return true}
    else {return false};
}

function PrepExpressionAndCalculate(string) {
    let parsedExpression = Parser(string);
    let convertedExpression = ConvertInfixToPostfix(parsedExpression);
    let solvedExpression = PostfixSolver(convertedExpression);

    function Parser(string) {
        let String = '(' + string + ')';
        let infixExpression = [];
        let current_number = [];
        for (let i = 0; i < String.length; i++) {
            if (String[i] != '+' && String[i] != '—' && String[i] != '*' && String[i] != '/' && String[i] != '(' && String[i] != ')' && String[i] != '^' || String[i] == '.') {
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
        switch (operand) {
            case '+': return num1 + num2;
            case '—': return num1 - num2;
            case '*': return num1 * num2;
            case '/': return num1 / num2;
            case '^': return num1 ** num2;
        }
    }
return solvedExpression
}