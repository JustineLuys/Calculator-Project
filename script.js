const lowerScreen = document.querySelector('.lower-screen');
const upperScreen = document.querySelector('.upper-screen');
const calculator = document.querySelector('.calculator');
const numbers = document.querySelectorAll('.numbers');
const equalButton = document.querySelector('.equal');
const deleteButton = document.querySelector('.delete');
const clearButton = document.querySelector('.clear');

let operationSymbol;
let string = '';
let firstNumber;
let secondNumber;
let answer = false;
let isOperatorClicked = false;

function add(x, y = 0) {
    result = x + y;
    upperScreen.textContent = result.toFixed(2);
    firstNumber = result
    secondNumber = null;
}

function subtract(x, y = 0) {
    result = x - y;
    upperScreen.textContent = result.toFixed(2);
    firstNumber = result;
    secondNumber = null;
}

function multiply(x, y = 1) {
    result = x * y;
    firstNumber = result
    upperScreen.textContent = result.toFixed(2);
    secondNumber = null;
}

function divide(x, y = 1) {
    if (y === 0) {
        alert(`You can't divide by 0!`);
        upperScreen.textContent = '';
    } else if (x === 0) {
        result = x / y;
        upperScreen.textContent =  result;
        firstNumber = result;
        secondNumber = null;
    } else {
        (x === 0) 
        result = x / y;
        upperScreen.textContent =  result.toFixed(2);
        firstNumber = result;
        secondNumber = null;
    }
}

function operate(firstNum, operator, secondNum) {
    switch (operator) {
        case '+':
            add(firstNum, secondNum);
            break;
        case '-':
            subtract(firstNum, secondNum);
            break;
        case '*':
            multiply(firstNum, secondNum);
            break;  
        case '/':
            divide(firstNum, secondNum);
            break;
    }
}
const dot = document.querySelector('.dot');

function addDot(e) {
    lowerScreen.textContent += e.target.textContent;
    e.target.disabled = true;
}
dot.addEventListener('click', addDot);

function keyboardAddDot(e) {
    lowerScreen.textContent += e.key;
    dot.disabled = true;
}


equalButton.addEventListener('click', (e) => {
    if (!isOperatorClicked) {
        upperScreen.textContent = firstNumber;
        lowerScreen.textContent = firstNumber;
    } else {
        if (secondNumber === null) {
            lowerScreen.textContent = '';
        } else {
            operate(firstNumber, operationSymbol, secondNumber);
        } 
    }
    dot.disabled = false;
});


function clearDisplay(e) {
    lowerScreen.textContent = ''; 
    upperScreen.textContent = '0';
    firstNumber = null;
    secondNumber = null;
    isOperatorClicked = false;
    dot.disabled = false;
}
function deleteNumber(e) {
    const length = lowerScreen.textContent.length;
    if (!isOperatorClicked) {
        lowerScreen.textContent = lowerScreen.textContent.slice(0, length - 1);
        firstNumber = parseFloat(lowerScreen.textContent);
    } else {
        lowerScreen.textContent = lowerScreen.textContent.slice(0, length - 1);
        secondNumber = parseFloat(lowerScreen.textContent);
    }
    if (!lowerScreen.textContent.includes('.')) {
        dot.disabled = false;
    }
} 

function displayData(str1, str2) {
    lowerScreen.textContent = str1;
    upperScreen.textContent = str2;
}

function mouseNumber(e) {
    e.target.blur();
    if (!isOperatorClicked) {
        lowerScreen.textContent += e.target.textContent;
        firstNumber = parseFloat(lowerScreen.textContent);
    } else {
        lowerScreen.textContent += e.target.textContent;
        secondNumber = parseFloat(lowerScreen.textContent);
    }
}

function keyboardNumber(e) {
    if (!isOperatorClicked) {
        lowerScreen.textContent += e.key;
        firstNumber = parseFloat(lowerScreen.textContent);
    } else {
        lowerScreen.textContent += e.key;
        secondNumber = parseFloat(lowerScreen.textContent);
    }
}

function operatorButtons(e){
    if (e.target.className === 'btn operator') {
        if (!isOperatorClicked) {
            operationSymbol = e.target.textContent;
            isOperatorClicked = true;
            dot.disabled = false;
            displayData(' ', firstNumber + operationSymbol);
        } else {
            if (secondNumber === null) {
                operate(firstNumber, operationSymbol);
            } else {
                operate(firstNumber, operationSymbol, secondNumber);
            }
            operationSymbol = e.target.textContent;
            displayData(' ', result + ' ' + operationSymbol);
        } 
    }
}

function keyboardOperator(e) {
    if (!isOperatorClicked) {
        operationSymbol = e.key;
        isOperatorClicked = true;
        dot.disabled = false;
        displayData(' ', firstNumber + operationSymbol);
    } else {
        
        if (secondNumber === null) {
            operate(firstNumber, operationSymbol);
        } else {
            operate(firstNumber, operationSymbol, secondNumber);
        }
        operationSymbol = e.key;
        displayData(' ', result + ' ' + operationSymbol);
    } 
}

document.body.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (parseInt(key) >= 0 && parseInt(key) < 10) {
        keyboardNumber(e);
    }
    switch (key) {
        case 'enter':
            if (!isOperatorClicked) {
                upperScreen.textContent = firstNumber;
                lowerScreen.textContent = firstNumber;
            } else {
                if (secondNumber === null) {
                    lowerScreen.textContent = '';
                } else {
                    operate(firstNumber, operationSymbol, secondNumber);
                } 
            }
            dot.disabled = false;
            break;
        case 'backspace':
            deleteNumber(e);
            break;
        case 'escape':
            clearDisplay(e);
            break;
        case '/':
            keyboardOperator(e);
            break;
        case '-':
            keyboardOperator(e);
            break;
        case '*':
        keyboardOperator(e);
        break;
        case '+':
        keyboardOperator(e);
        break;
        case '.':
        keyboardAddDot(e);
        break;
    }
});


deleteButton.addEventListener('click', deleteNumber);
clearButton.addEventListener('click', clearDisplay);
calculator.addEventListener('click', operatorButtons);
numbers.forEach(number => number.onclick = mouseNumber);