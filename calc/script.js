let input = "";
let result = "";
let lastNumber = "";

function formatNumber(number) {
  if (Math.floor(number) === number) {
    return number.toFixed(0);
  } else {
    return number.toFixed(3).replace(/\.?0*$/, "");
  }
}

function display(value) {
  if (
    value === "1/x" ||
    value === "x^2" ||
    value === "sqrt" ||
    value === "+/-" ||
    value === "%"
  ) {
    if (lastNumber !== "") {
      let parsedNumber = parseFloat(lastNumber);
      if (!isNaN(parsedNumber)) {
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
        }

        // Format the parsedNumber based on the number of decimal places
        if ((parsedNumber * 1000) / 10 !== 0) {
          parsedNumber = formatNumber(parsedNumber);
        } else if ((parsedNumber * 100) / 10 !== 0) {
          parsedNumber = formatNumber(parsedNumber, 2);
        } else if ((parsedNumber * 10) / 10 !== 0) {
          parsedNumber = formatNumber(parsedNumber, 1);
        }
        
        input = input.slice(0, input.lastIndexOf(lastNumber)) + parsedNumber;
        lastNumber = parsedNumber;
      }
    }
  } else {
    if (
      !isNaN(parseFloat(value)) ||
      value === "." ||
      value === "*" ||
      value === "/" ||
      value === "+" ||
      value === "-"
    ) {
      input += value;
    }
    if (!isNaN(parseFloat(value)) || value === ".") {
      lastNumber += value;
    } else {
      lastNumber = "";
    }
  }
  document.getElementById("result").value = input;
}

function delete1() {
  input = input.slice(0, -1);
  document.getElementById("result").value = input;
}

function clearLast() {
  input = input.replace(/(\d+(\.\d+)?)[+\-*/]?$/, "");
  document.getElementById("result").value = input;
}

function clearScreen() {
  input = "";
  result = "";
  document.getElementById("result").value = "0";
  lastNumber = "";
}

function calculate() {
  try {
    result = eval(input);
    document.getElementById("result").value = result;
    input = result.toString();
  } catch (error) {
    document.getElementById("result").value = "Error";
    input = "";
  }
}
