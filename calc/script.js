let input = "";
let result = "";
let lastNumber = "";
let firstNumber = "";
let secondNumber = "";
let operation = "";

function display(value) {
  if (
    value === "1/x" ||
    value === "x^2" ||
    value === "sqrt" ||
    value === "+/-" ||
    value === "%" ||
    value === "0/1"
  ) {
    if (lastNumber !== "") {
      let parsedNumber = parseFloat(lastNumber);
      if (!isNaN(parsedNumber)) {
        console.log("parsed before" + parsedNumber);
        if (value === "1/x") {
          parsedNumber = 1 / parsedNumber;
        } else if (value === "x^2") {
          parsedNumber = Math.pow(parsedNumber, 2);
        } else if (value === "sqrt") {
          parsedNumber = Math.sqrt(parsedNumber);
        } else if (value === "+/-") {
          parsedNumber = -parsedNumber;
        } else if (value === "%") {
          parsedNumber = parsedNumber / 100;
        } else if (value === "0/1") {
          let bin = 0;
          let rem,
            i = 1,
            step = 1;
          while (parsedNumber != 0) {
            rem = parsedNumber % 2;
            console.log(
              `Step ${step++}: ${parsedNumber}/2, Remainder = ${rem}, Quotient = ${parseInt(
                parsedNumber / 2
              )}`
            );
            parsedNumber = parseInt(parsedNumber / 2);
            bin = bin + rem * i;
            i = i * 10;
          }
          console.log(`Binary: ${bin}`);
          parsedNumber = bin;
        }
        if ((parsedNumber * 1000) / 10 !== 0) {
          parsedNumber = formatNumber(parsedNumber);
        } else if ((parsedNumber * 100) / 10 !== 0) {
          parsedNumber = formatNumber(parsedNumber, 2);
        } else if ((parsedNumber * 10) / 10 !== 0) {
          parsedNumber = formatNumber(parsedNumber, 1);
        }
        input = input.slice(0, input.lastIndexOf(lastNumber)) + parsedNumber;
        lastNumber = parsedNumber;
        console.log("parsed after" + parsedNumber);
        if (operation === "") {
          firstNumber = lastNumber;
        } else {
          secondNumber = lastNumber;
        }
      }
    }
  } else {
    if (!isNaN(parseFloat(value)) || value === ".") {
      lastNumber += value;
      if (operation === "") {
        firstNumber = lastNumber;
      } else {
        secondNumber = lastNumber;
      }
      input += value;
    } else if (
      value === "*" ||
      value === "/" ||
      value === "+" ||
      value === "-"
    ) {
      lastNumber = "";
      operation = value;
      input += value;
    }
  }
  document.getElementById("result").value = input;
  console.log("last number" + lastNumber);
  console.log("first number" + firstNumber);
  console.log("second number" + secondNumber);
  console.log("operation number" + operation);
  console.log("-----");
}

function formatNumber(number) {
  if (Math.floor(number) === number) {
    return number.toFixed(0);
  } else {
    return number.toFixed(3).replace(/\.?0*$/, "");
  }
}

function operationHandler(value) {
  if (secondNumber !== "") {
    calculate();
    display(value);
    console.log("if");
  } else {
    display(value);
    console.log("else");
  }
}

function delete1() {
  if (input.length > 0) {
    const deletedChar = input.slice(-1);
    input = input.slice(0, -1);
    if (!isNaN(parseFloat(deletedChar)) || deletedChar === ".") {
      lastNumber = lastNumber.slice(0, -1);
    } else if (
      deletedChar === "+" ||
      deletedChar === "-" ||
      deletedChar === "*" ||
      deletedChar === "/"
    ) {
      lastNumber = "";
    }
    document.getElementById("result").value = input;
    console.log(lastNumber);
  }
}
function deleteLast() {
  const lastNumberPos = input.search(/[\d.]+$/);
  if (lastNumberPos >= 0) {
    const deletedNumber = input.substring(lastNumberPos).match(/[\d.]+/)[0];
    input = input.substring(0, lastNumberPos);
    document.getElementById("result").value = input;
    const beforeDeletedNumber = input.match(/[\d.]+$/);
    if (beforeDeletedNumber && beforeDeletedNumber.length > 0) {
      lastNumber = beforeDeletedNumber[beforeDeletedNumber.length - 1];
    } else {
      lastNumber = "";
    }
    if (
      input.endsWith("+") ||
      input.endsWith("-") ||
      input.endsWith("*") ||
      input.endsWith("/")
    ) {
      delete1();
      lastNumber = input;
      secondNumber = "";
    } else {
      secondNumber = firstNumber;
    }
    console.log(lastNumber);
  } else {
    input = "";
    result = "";
    document.getElementById("result").value = "0";
    lastNumber = "";
    firstNumber = "";
    secondNumber = "";
    operation = "";
  }
}

function clearScreen() {
  parsedNumber = "";
  input = "";
  result = "";
  lastNumber = "";
  firstNumber = "";
  secondNumber = "";
  operation = "";
  document.getElementById("result").value = "";
}

function calculate() {
  try {
    if (firstNumber !== "" && secondNumber !== "" && operation !== "") {
      const num1 = parseFloat(firstNumber);
      const num2 = parseFloat(secondNumber);
      if (isNaN(num1) || isNaN(num2)) {
        throw new Error("Invalid input");
      }
      if (operation === "+") {
        result = num1 + num2;
      } else if (operation === "-") {
        result = num1 - num2;
      } else if (operation === "*") {
        result = num1 * num2;
      } else if (operation === "/") {
        if (num2 === 0) {
          throw new Error("Division by zero");
        }
        result = num1 / num2;
      } else {
        throw new Error("Invalid operation");
      }
      lastNumber = result;
      result = formatNumber(result);
      document.getElementById("result").value = result;
      input = result;
      firstNumber = result;
      secondNumber = "";
      operation = "";
    }
  } catch (error) {
    document.getElementById("result").value = "Error";
    input = "";
    firstNumber = "";
    secondNumber = "";
    operation = "";
  }
  console.log(lastNumber);
}
