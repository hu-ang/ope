var expression = {num1:"", num2:"", operator:""};

//handle input into the calculator
function calculate(keyID) {
    let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1];
    let operators = ["div", "mul", "addeq", "sub"];
    let display = "";
    //if clear key is pressed, erase everything
    if (keyID === "c") {
        expression.num1 = "";
        expression.num2 = "";
        expression.operator = "";
    }
    //if a number was pressed and there's no operator yet then we are
    //still working on the first number (handle duplicate decimals) 
    else if (nums.includes(keyID) && expression.operator === "") {
        if (-1 === keyID && !expression.num1.includes(".")) {
            expression.num1 = expression.num1.concat(".");
        }
        else if (-1 === keyID && expression.num1.includes(".")){
            //do nothing, multiple decimals not allowed
        }
        else if (expression.num1.length >= 10) {
            //stop adding so many digits please
        }
        else if (expression.num1 === "0") {
            expression.num1 = keyID.toString();
            console.log("hello" + keyID.toString())
        }
        else{
            expression.num1 = expression.num1.concat(keyID);
        }
        display = expression.num1;

    }
    //if an operator was pressed and we don't have one add it
    else if (operators.includes(keyID) && expression.operator === "") {
        expression.operator = keyID;
        display = expression.num1;
    }
    //if an operator was pressed but we dont have a second number yet
    //but we already have an operator, allow operator change
    else if (operators.includes(keyID) && expression.num2 === "") {
        expression.operator = keyID;
        display = expression.num1;
    }
    //if a number was pressed and there's an operator then we are
    //working on the second number (handle duplicate decimals)
    else if (nums.includes(keyID) && expression.operator !== "") {
        if (-1 === keyID && !expression.num2.includes(".")) {
            expression.num2 = expression.num2.concat(".");
        }
        else if (-1 === keyID && expression.num2.includes(".")){
            //do nothing, multiple decimals not allowed
        }
        else if (expression.num2.length >= 10) {
            //stop adding so many digits please
        }
        else if (expression.num2 === "0") {
            expression.num2 = keyID.toString();
        }
        else{
            expression.num2 = expression.num2.concat(keyID);
        }
        display = expression.num2;
    }
    //if we get another operator evaluate the numbers we have now
    else if (operators.includes(keyID) && expression.operator !== "") {
        let result = 0;
        let evaluate = function () {
            let num1 = Number.parseFloat(expression.num1);
            let num2 = Number.parseFloat(expression.num2);
            if (expression.operator === "div") {
                result = num1 / num2;
            }
            else if (expression.operator === "mul") {
                result = num1 * num2;
            }
            else if (expression.operator === "sub") {
                result = num1 -num2;
            }
            else{
                result = num1 + num2;
            }
        }
        evaluate();
        expression.num1 = result.toString();
        expression.num2 = "";
        expression.operator = keyID;
        display = expression.num1;
    }
    else {alert("You have entered an illegal value!")}
    document.getElementById("display").innerHTML = display;

}