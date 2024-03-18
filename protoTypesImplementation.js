// Prototype-based Object System:

// Define a prototype object called Calculator with methods to perform addition, subtraction, multiplication, and division operations.
// Create instances of the Calculator prototype to perform calculations based on user input.
function Calculator(inputNumber1, inputNumber2) {
  this.inputNumber1 = inputNumber1;
  this.inputNumber2 = inputNumber2;
}
Calculator.prototype.sum = function () {
  return this.inputNumber1 + this.inputNumber2;
};
Calculator.prototype.difference = function () {
  return this.inputNumber1 - this.inputNumber2;
};
Calculator.prototype.multiplication = function () {
  return this.inputNumber1 * this.inputNumber2;
};
Calculator.prototype.division = function () {
  return this.inputNumber1 / this.inputNumber2;
};

// create an instance of the Calculator
let calculatorObjectStatic = new Calculator(50, 10);
console.log("For Static Numbers");
console.log("Sum of two numbers::", calculatorObjectStatic.sum());
console.log("Difference of two numbers::", calculatorObjectStatic.difference());
console.log(
  "Multiplication of two numbers::",
  calculatorObjectStatic.multiplication()
);
console.log("Division of two numbers::", calculatorObjectStatic.division());
//for simplicity I am assuming user wants to perform DMAS operations on 2 numbers
//as we need atleast 2 values to perform these operations
console.log("For Dynamic Numbers");
let inputNumber1 = parseInt(prompt("Please enter first number for DMAS: "));
let inputNumber2 = parseInt(prompt("Please enter first number for DMAS: "));
let calculatorObjectDynamic = new Calculator(inputNumber1, inputNumber2);

console.log("Sum of two numbers::", calculatorObjectDynamic.sum());
console.log(
  "Difference of two numbers::",
  calculatorObjectDynamic.difference()
);
console.log(
  "Multiplication of two numbers::",
  calculatorObjectDynamic.multiplication()
);
console.log("Division of two numbers::", calculatorObjectDynamic.division());
