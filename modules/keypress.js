import { inputDigit, inputDecimal, handleOperator, calculate, resetCalculator, updateDisplay } from "./calc-operations.js";

const keypressNumAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const keypressOperatorAllowed = ['/', '*', '-', '+', '=', 'Enter'];

// regex implementation


export const keypress = (event) => {
    let keyPressed = event.key;

    if (keypressNumAllowed.includes(keyPressed)) {
        inputDigit(keyPressed);
    }

    if (keypressOperatorAllowed.includes(keyPressed)) {
        handleOperator(keyPressed);
    }

    if (keyPressed === "Backspace") {
        resetCalculator();
    }

    if (keyPressed === ".") {
        inputDecimal(keyPressed);
    }

    updateDisplay();
}