// Model: This is the data and logic of the app
class CalculatorModel {
    constructor() {
        this.firstNumber = 0; // the first operand
        this.secondNumber = 0; // the second operand
        this.operator = null; // the arithmetic operator
        this.result = 0; // the result of the calculation
    }

    // This method sets the first number
    setFirstNumber(number) {
        this.firstNumber = number;
    }

    // This method sets the second number
    setSecondNumber(number) {
        this.secondNumber = number;
    }

    // This method sets the operator
    setOperator(operator) {
        this.operator = operator;
    }

    // This method performs the calculation and returns the result
    calculate() {
        switch (this.operator) {
            case "+":
                this.result = this.firstNumber + this.secondNumber;
                break;
            case "-":
                this.result = this.firstNumber - this.secondNumber;
                break;
            case "*":
                this.result = this.firstNumber * this.secondNumber;
                break;
            case "/":
                this.result = this.firstNumber / this.secondNumber;
                break;
            default:
                this.result = 0;
        }
        return this.result;
    }
}

// View: This is the user interface of the app
class CalculatorView {
    constructor() {
        // Get the HTML elements
        this.numberButtons = document.querySelectorAll(".number"); // the number buttons
        this.operatorButtons = document.querySelectorAll(".operator"); // the operator buttons
        this.equalButton = document.querySelector(".equal"); // the equal button
        this.clearButton = document.querySelector(".clear"); // the clear button
        this.display = document.querySelector(".display"); // the display element
    }

    // This method displays a message on the screen
    displayMessage(message) {
        this.display.textContent = message;
    }

    // This method clears the display
    clearDisplay() {
        this.display.textContent = "";
    }

    // This method binds a handler function to the number buttons
    bindNumber(handler) {
        this.numberButtons.forEach(button => {
            button.addEventListener("click", event => {
                handler(event.target.value); // pass the value of the clicked button to the handler
            });
        });
    }

    // This method binds a handler function to the operator buttons
    bindOperator(handler) {
        this.operatorButtons.forEach(button => {
            button.addEventListener("click", event => {
                handler(event.target.value); // pass the value of the clicked button to the handler
            });
        });
    }

    // This method binds a handler function to the equal button
    bindEqual(handler) {
        this.equalButton.addEventListener("click", event => {
            handler(); // call the handler
        });
    }

    // This method binds a handler function to the clear button
    bindClear(handler) {
        this.clearButton.addEventListener("click", event => {
            handler(); // call the handler
        });
    }
}

// Controller: This is the glue between the model and the view
class CalculatorController {
    constructor(model, view) {
        this.model = model; // the calculator model
        this.view = view; // the calculator view
        this.firstNumberEntered = false; // a flag to indicate if the first number has been entered
        this.secondNumberEntered = false; // a flag to indicate if the second number has been entered
        this.operatorEntered = false; // a flag to indicate if the operator has been entered

        // Bind the view events to the controller methods
        this.view.bindNumber(this.handleNumber.bind(this));
        this.view.bindOperator(this.handleOperator.bind(this));
        this.view.bindEqual(this.handleEqual.bind(this));
        this.view.bindClear(this.handleClear.bind(this));
    }

   // This method handles the number input
    handleNumber(number) {
       if (!this.operatorEntered) {
           // If the operator has not been entered, append the number to the first number
           this.model.setFirstNumber(Number(this.model.firstNumber.toString() + number));
           this.firstNumberEntered = true;
           this.view.displayMessage(this.model.firstNumber); // display the number
       } else {
           // If the operator has been entered, append the number to the second number
           this.model.setSecondNumber(Number(this.model.secondNumber.toString() + number));
           this.secondNumberEntered = true;
           this.view.displayMessage(this.model.secondNumber); // display the number
       }
   }


    // This method handles the operator input
    handleOperator(operator) {
        if (this.firstNumberEntered) {
            // If the first number has been entered, set the operator
            this.model.setOperator(operator);
            this.operatorEntered = true;
            this.view.displayMessage(operator); // display the operator
        }
    }

    // This method handles the equal input
    handleEqual() {
        if (this.firstNumberEntered && this.secondNumberEntered && this.operatorEntered) {
            // If the first number, the second number, and the operator have been entered, perform the calculation
            let result = this.model.calculate(); // get the result from the model
            this.view.displayMessage(result); // display the result
        }
    }

    // This method handles the clear input
    handleClear() {
        // Reset the model and the view
        this.model.firstNumber = 0;
        this.model.secondNumber = 0;
        this.model.operator = null;
        this.model.result = 0;
        this.view.clearDisplay();
        this.firstNumberEntered = false;
        this.secondNumberEntered = false;
        this.operatorEntered = false;
    }
}

// Create a new calculator app
let calculator = new CalculatorController(new CalculatorModel(), new CalculatorView());