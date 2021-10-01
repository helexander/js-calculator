// TO DO
// ------
// using reduce array method to accumulate functions
// resetting input when user presses an operator button

// --prev-val
// input bar
// A C Delete 
// 7 8 9 +
// 4 5 6 -
// 1 2 3 *
// 0 0 . /
// =====

// prev val
// curr input val
// +  -  x  /
// 7  8  9  =
// 4  5  6  =
// 1  2  3  =
// 0  . AC  =

// Object that helps keep track of the values

const calculator = {
    displayValue: "0", // holds a string value that represents the input of the user or the result of the operation
    firstOperand: null, // stores the first operand
    waitingForSecondOperand: false, // if both first operand and an operation has been selected, it would result to true
    operator: null // stores the operator
};

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    // When waiting on second operator is true, the displayValue would then be overwritten with the digit that was clicked
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        // Overwriting the 'displayValue' if the current value is '0'
        // If not, append to it
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }


    console.log(calculator);
}

function inputDecimal(dot) {

    // if decimal point is clicked after selecting an operator, it gets appended to the first operand instead of being part of the second
    // bug fix: performing an operation on the decimal value, resetting the waitingForSecondOperand to false as the operation has been performed
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.'
        calculator.waitingForSecondOperand = false;
        return;
    }

    // If the displayValue property DOES NOT contain a decimal point yet
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    // Destructure properties on the calculator object
    const { firstOperand, displayValue, operator } = calculator;

    const inputValue = parseFloat(displayValue);

    // checks to see if an operator already exists and if waitingForSecondOperand is set to true
    // if its true, the value of the operator property would be replaced with the new operator and the function exits so that no calculations would be performed
    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    // verifying that firstOperand is null and inputValue has a defined value
    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    }
    // if the operator property has been assigned an operator, invoke the calculate function
    // result would then be displayed to user
    // value of firstOperand is also updated so it may be used again in the next calculation
    else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    // setting waiting for second operand to be true, indicating that the first operand contains a value
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;

    console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === "+") {
        return firstOperand + secondOperand;
    } else if (operator === "-") {
        return firstOperand - secondOperand;
    } else if (operator === "*") {
        return firstOperand * secondOperand;
    } else if (operator === "/") {
        return firstOperand / secondOperand;
    }

    // If the operator is "=", it will be returned as it is
    return secondOperand;
}

// sets all properties of the calculator object to its original values
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}


function updateDisplay() {
    const currInput = document.querySelector(".calculator-screen");
    currInput.value = calculator.displayValue;
}

updateDisplay();

// Handling key presses
const keys = document.querySelector(".calculator-keys");
keys.addEventListener('click', (event) => {
    // Accessing the clicked element through destructuring the target from event
    const { target } = event;

    // Checking if the clicked element is a button
    if (!target.matches('button')) {
        alert("Please click on a valid number");
        return;
    }

    if (target.classList.contains("operator")) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains("decimal")) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains("all-clear")) {
        resetCalculator();
        updateDisplay();
        return;
    }

    inputDigit(target.value);
    updateDisplay();

});
