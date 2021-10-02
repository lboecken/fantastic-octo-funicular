initializeCalculator();

//Initializes calculator
function initializeCalculator() {
    const display = initializeDisplay();
    const memory = initializeMemory(display[0], display[1]);
    initializeControlButtons(display[0], display[1], memory);
    initializeNumberButtons(display[0]);
    initializeOperatorButtons(display[0]);

}

function initializeDisplay() {
    const inputDisplay = document.getElementById('input');
    const outputDisplay = document.getElementById('output');
    return [inputDisplay, outputDisplay];
}

function initializeMemory(inputDisplay, outputDisplay) {
    let memory = [];
    let memoryIndex = 0;
    const previousButton = document.getElementById('previous');
    const nextButton = document.getElementById('next');
    
    previousButton.addEventListener('click', () => {
        try {
            outputDisplay.innerText = memory[memoryIndex][1];
            inputDisplay.innerText = memory[memoryIndex][0];
        } catch {
            memoryIndex = 0;
            outputDisplay.innerText = memory[memoryIndex][1];
            inputDisplay.innerText = memory[memoryIndex][0];
        } finally {
            memoryIndex++;
        }
    })
    
    nextButton.addEventListener('click', () => {
        try {
            outputDisplay.innerText = memory[memoryIndex][1];
            inputDisplay.innerText = memory[memoryIndex][0];
            console.log(memoryIndex, 'tried');
        } catch {
            memoryIndex = memory.length-1;
            outputDisplay.innerText = memory[memoryIndex][1];
            inputDisplay.innerText = memory[memoryIndex][0];
            console.log(memoryIndex), 'caught';
        } finally {
            memoryIndex--;
            console.log(memoryIndex, 'finally');
        }
    })
return memory;    
}

function initializeControlButtons(inputDisplay, outputDisplay, memory) {
    const equalsButton = document.getElementById('equals');
    const clearEntryButton = document.getElementById('clearentry');
    const allClearButton = document.getElementById('allclear');
    const deleteButton = document.getElementById('delete');
    
    clearEntryButton.addEventListener('click', () => {inputDisplay.innerText= '';});
    
    deleteButton.addEventListener('click', () => {inputDisplay.innerText = inputDisplay.innerText.slice(0, -1)});
    
    equalsButton.addEventListener('click', () => {
        let currentDisplayValue = inputDisplay.innerText;
        outputDisplay.innerText = prepExpressionAndCalculate(currentDisplayValue);
        memory.unshift([inputDisplay.innerText, outputDisplay.innerText]);
    })

    allClearButton.addEventListener('click', () => {
        inputDisplay.innerText = '';
        outputDisplay.innerText = '';
        memory = [];
    })
    
    
}

function initializeNumberButtons(inputDisplay) {
    const numberButtons = document.querySelectorAll('.NumberButton');
    for (element of numberButtons) {
        element.addEventListener('click', (e) => {
            const currentDisplayValue = inputDisplay.innerText;
            inputDisplay.innerText = currentDisplayValue + e.target.value
        })
    }
}

function initializeOperatorButtons(inputDisplay) {
    const operatorButtons = document.querySelectorAll('.OperatorButton');
    for (element of operatorButtons) {
        element.addEventListener('click', (e) => {
            const currentDisplayValue = inputDisplay.innerText;
            inputDisplay.innerText = currentDisplayValue + e.target.value
        })
    }
}


//calculates expressions
String.prototype.isNumber = function() {
    if (Number(this)) {return true}
    else {return false};
}

function prepExpressionAndCalculate(string) {
    const parsedExpression = expressionParser(string);
    const convertedExpression = convertInfixtoPostfix(parsedExpression);
    const solvedExpression = solvePostfixExpression(convertedExpression);
    return solvedExpression
}

function expressionParser(string) {
    let infixString = '(' + string + ')';
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
    const postfixStack = [];
    const operandStack = [];
    const infixStack = infix;
    while (infixStack.length > 0) {
        if (infixStack[0].isNumber()) {
            postfixStack.push(infixStack[0]);
            infixStack.splice(0,1);
        } else if (infixStack[0] != '(' && infixStack[0] != ')') {
                if (operators[operandStack.at(-1)].precedence >= operators[infixStack[0]].precedence) postfixStack.push(operandStack.pop());
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
        if (postfixExpression[0].isNumber()) {
            postfixStack.push(postfixExpression[0]);
            postfixExpression.splice(0,1);
            console.log('am i getting called?')
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
        for (object in operators) {
            if (object == operand) {
                return operators[object].operate(num1, num2)
            }
        }
}

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
}


