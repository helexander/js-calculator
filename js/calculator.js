import { inputDigit, inputDecimal, handleOperator, calculate, resetCalculator, updateDisplay } from "../modules/calc-operations.js";

// prev val
// curr input val
// +  -  x  /
// 7  8  9  =
// 4  5  6  =
// 1  2  3  =
// 0  . AC  =

// Initial display
updateDisplay();

// Handling key presses
const keys = document.querySelector(".calculator-keys");
keys.addEventListener('click', (event) => {
    // Accessing the clicked element through destructuring the target from event
    const { target } = event;
    const { value } = target;
    // Checking if the clicked element is a button
    if (!target.matches('button')) {
        alert("Please click on a valid number");
        return;
    }

    switch (value) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
            handleOperator(value);
            break;
        case ".":
            inputDecimal(value);
            break;
        case "all-clear":
            resetCalculator();
            break;
        default:
            // checking if the key is an integer
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }

    updateDisplay();

});
