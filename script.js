const lowerScreen = document.querySelector('.lower-screen');
const upperScreen = document.querySelector('.upper-screen');
const calculator = document.querySelector('.calculator');
const numbers = document.querySelectorAll('.numbers');
const equalButton = document.querySelector('.equal');
let operationSymbol;
let string = '';
let firstNumber;
let secondNumber;

let isOperatorClicked = false;

function add(x, y = 0) {
    result = x + y;
    upperScreen.textContent = x + y;
    firstNumber = result;
}

function subtract(x, y = 0) {
    result = x - y;
    upperScreen.textContent =  x - y;
    firstNumber = result;
}

function multiply(x, y = 1) {
    result = x * y;
    upperScreen.textContent =  x * y;
    firstNumber = result;
}

function divide(x, y = 1) {
    result = x / y;
    upperScreen.textContent =  x / y
    firstNumber = result;
}

function operate(firstNum, operator, secondNum) {
    switch (operator) {
        case '+':
            add(firstNum, secondNum);
            break;
        case '-':
            subtract(firstNum, secondNum);
            break;
        case '×':
            multiply(firstNum, secondNum);
            break;  
        case '÷':
            divide(firstNum, secondNum);
            break;
    }
}

calculator.onclick = (e) => {
    if (e.target.className === 'btn operator') {
        isOperatorClicked = true;
        lowerScreen.textContent = '';
        operationSymbol = e.target.textContent;
        upperScreen.textContent = firstNumber + operationSymbol;
    }
};

numbers.forEach(number => number.onclick = (e) => {
    if (!isOperatorClicked) {
        lowerScreen.textContent += e.target.textContent;
        firstNumber = parseInt(lowerScreen.textContent);
    } else {
        lowerScreen.textContent += e.target.textContent;
        secondNumber = parseInt(lowerScreen.textContent);
    }
});

const dot = document.querySelector('.dot');

equalButton.addEventListener('click', (e) => {
    operate(firstNumber, operationSymbol, secondNumber);
    lowerScreen.textContent = '';
});

document.querySelector('.btn.clear').onclick = (e) => {lowerScreen.textContent = ''; upperScreen.textContent = ''};