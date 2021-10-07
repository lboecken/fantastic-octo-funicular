initializeCalculator();
// using multiple classes for html
// implementing string.split for parsing the intial expression.
//clean up CSS & HTML 


//Initializes calculator

function getInput() {
    return document.getElementById('input').innerText; 
}
function getOutput() {
    return document.getElementById('output').innerText;
}

function setInput(input) {
    document.getElementById('input').innerText = input;
}    
function setOutput(output) {
    document.getElementById('output').innerText = output;
}

function initializeCalculator() {
    const memory = initializeMemory();
    initializeControlButtons(memory);
    initializeButtons();
}

function initializeMemory() {
    let memory = [];
    let memoryIndex = 0;

    document.getElementById('previous').addEventListener('click', () => {
        try {
            setInput(memory[memoryIndex][0]); 
            setOutput(memory[memoryIndex][1]);
        } catch {
            memoryIndex = 0;
            setInput(memory[memoryIndex][0]); 
            setOutput(memory[memoryIndex][1]);
        } finally {
            memoryIndex++;
        }
    })
    
    document.getElementById('next').addEventListener('click', () => {
        try {
            setInput(memory[memoryIndex][0]); 
            setOutput(memory[memoryIndex][1]);
        } catch {
            memoryIndex = memory.length-1;
            setInput(memory[memoryIndex][0]); 
            setOutput(memory[memoryIndex][1]);
        } finally {
            memoryIndex--;
        }
    })
return memory;    
}

function initializeControlButtons(memory) {
    document.getElementById('clearentry')
    .addEventListener('click', () => {setInput(''); setOutput(''); });
    
    document.getElementById('delete').addEventListener('click', () => {
        setInput(getInput().slice(0, -1))});
    
    document.getElementById('equals')
    .addEventListener('click', () => {
        setOutput(prepExpressionAndCalculate(getInput()));
        memory.unshift([getInput(), getOutput()]);
    })

    document.getElementById('allclear').addEventListener('click', () => {
        setInput('');
        setOutput('');
        memory = [];
    })   
}

function initializeButtons() {
    for (element of document.querySelectorAll('.MainButtons')) {
        element.addEventListener('click', (e) => {
            setInput(getInput() + e.target.value);
        })
    }
}


//calculates expressions

function prepExpressionAndCalculate(string) {
    console.log(string);
    const parsedExpression = expressionParser(string);
    const convertedExpression = convertInfixtoPostfix(parsedExpression);
    const solvedExpression = solvePostfixExpression(convertedExpression);
    return solvedExpression
}

function expressionParser(string) {
    const operators = getOperatorsInfo();
    const infixString = '(' + string + ')';
    let infixExpression = [];
    let currentNumber = [];
    for (let i = 0; i < infixString.length; i++) {
        if (Object.keys(operators).every(e => e != infixString[i])|| infixString[i] == '.') {
            if (infixString[i] === '-') {
                currentNumber.push('-')
            } else {       
                currentNumber.push(infixString[i]);
            }
        } else {
            if (currentNumber.length > 0) infixExpression.push(currentNumber.join(''));
            currentNumber = [];
            infixExpression.push(infixString[i]);
        };
    } return infixExpression;
}

function convertInfixtoPostfix(infix) {
    const operators = getOperatorsInfo();
    const postfixStack = [];
    const operandStack = [];
    const infixStack = infix;
    while (infixStack.length > 0) {
        if (Number(infixStack[0]) ? true : false) {
            postfixStack.push(infixStack[0]);
            infixStack.splice(0,1);
        } else if (infixStack[0] != '(' && infixStack[0] != ')') {
                if (operators[operandStack.at(-1)].precedence >= 
                    operators[infixStack[0]].precedence) 
                    postfixStack.push(operandStack.pop());
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

function solvePostfixExpression(postfixExpression) {
    let postfixStack = [];
    while (postfixExpression.length > 0) {
        if (Number(postfixExpression[0]) ? true : false) {
            postfixStack.push(postfixExpression[0]);
            postfixExpression.splice(0,1);
        } else {
            console.log(postfixStack);
            const num1 = Number(postfixStack.at(-2));
            const num2 = Number(postfixStack.at(-1));
            postfixStack.pop();
            postfixStack.pop();
            const operand = postfixExpression.shift();
            postfixStack.push(applyOperand(num1, num2, operand));
        }
    } 
console.log(postfixStack)
return postfixStack;
}
    
function applyOperand(num1, num2, operand) {
    const operators = getOperatorsInfo();
    return operators[operand].operate(num1, num2)
}

function getOperatorsInfo() {
    const operators = {
        '*' : {
            'precedence': 2,
            'name' : 'multiplication',
            operate(num1, num2){return num1 * num2;},
        },
        '/': {
            'precedence': 2,
            'name' : '/',
            operate(num1, num2){return num1 / num2;},
        },
        '+': {
            'precedence': 1,
            'name' : 'addition',
            operate(num1, num2){return num1 + num2;},
        },
        '—': {
            'precedence': 1,
            'name' : 'subtraction',
            operate(num1, num2){return num1 - num2;},
        },
        '^': {
            'precedence': 3,
            'name' : 'exponentiation',
            operate(num1, num2){return num1 ** num2;},
        },
        '(': {
            'precedence': 0,
            'name' : 'leftParentheses',
            'operation' : null,
        },
        ')': {
            'precedence': 4,
            'name' : ')',
            'operation' : null, 
        },
        'sqrt': {}
    }
    return operators
}


