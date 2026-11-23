let currentOperand = "0";
let previuosOperand = "";
let operation = undefined;

const numDisplay = document.getElementById("numOperand");
const prevDisplay = document.getElementById("prevOperand");

function appendNumber (number) {
    if (number === "." && currentOperand.includes (".")) return;
    if (currentOperand === "0" && number !== ".") {
        currentOperand = number;
    } else {
        currentOperand += number;
    };
    updateDisplay();
};

function chooseOperator (op) {
    if (currentOperand === "") return ;
    if (previuosOperand !== "") {
        calculate();
    };
    operation = op;
    previuosOperand = currentOperand;
    currentOperand = "";
    updateDisplay();
};

function calculate () {
    let result;
    const prev = parseFloat(previuosOperand);
    const curr = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(curr)) return;
    switch (operation) {
        case "+":
            result = prev + curr;
            break;

            case "-":
                result = prev - curr;
                break;

            case "×":
                result = prev * curr;
                break;

            case "÷":
                result = curr === 0 ? "wrong!" : prev / curr;
                break;

            case "%": 
                result = prev % curr ;
                break;

            default:
                return;
    };

    currentOperand = typeof result === "number" ? parseFloat(result.toFixed(8).toString()): result;
    operation = undefined;
    previuosOperand = "";
    updateDisplay();
};

function clearAll () {
    currentOperand = "0";
    previuosOperand = "";
    operation = undefined;

    updateDisplay();
};

function deleteLast () {
    if (currentOperand.length === 1) {
        currentOperand = "0";
    } else {
        currentOperand = currentOperand.slice(0, -1);
    };

    updateDisplay();
};

function updateDisplay() {
    numDisplay.textContent = currentOperand;

    prevDisplay.textContent = previuosOperand ? `${previuosOperand} ${operation}`: "";
};

document.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
    if (e.key === ".")appendNumber(".");
    if (e.key === "+")  chooseOperator("+");  
    if (e.key === "-")  chooseOperator("-"); 
    if (e.key === "*")  chooseOperator("×"); 
    if (e.key === "/") { e.preventDefault(); chooseOperator("÷"); }
    if (e.key === "%")  chooseOperator("%"); 
    if (e.key === "Enter" || e.key === "=") calculate();
    if (e.key === "Backspace") deleteLast();
    if (e.key === "Escape" ) clearAll();
});


