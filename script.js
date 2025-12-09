const display = document.getElementById("display");
const themeToggle = document.getElementById("theme-toggle");

let current = "";
let memory = 0;

// update display
function updateDisplay() {
  display.value = current;
}

// main button logic
document.querySelectorAll(".buttons button").forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (value === "C") {
      current = "";
    } else if (value === "⌫") {
      current = current.slice(0, -1);
    } else if (value === "=") {
      try {
        current = calculate(current);
      } catch {
        current = "Error";
      }
    } else if (value === "√") {
      current = Math.sqrt(eval(current)).toString();
    } else if (value === "x²") {
      current = Math.pow(eval(current), 2).toString();
    } else if (["sin", "cos", "tan", "log"].includes(value)) {
      try {
        let radians = eval(current) * Math.PI / 180;
        if (value === "sin") current = Math.sin(radians).toString();
        if (value === "cos") current = Math.cos(radians).toString();
        if (value === "tan") current = Math.tan(radians).toString();
        if (value === "log") current = Math.log10(eval(current)).toString();
      } catch {
        current = "Error";
      }
    } else if (value === "π") {
      current += Math.PI;
    } else if (value === "e") {
      current += Math.E;
    } else if (value === "÷") {
      current += "/";
    } else if (value === "×") {
      current += "*";
    } else if (value === "−") {
      current += "-";
    } else if (btn.id === "mplus") {
      if (!isNaN(Number(current))) memory += Number(current);
    } else if (btn.id === "mminus") {
      if (!isNaN(Number(current))) memory -= Number(current);
    } else if (btn.id === "mr") {
      current += memory.toString();
    } else if (btn.id === "mc") {
      memory = 0;
    } else {
      current += value;
    }
    updateDisplay();
  });
});

// kalkulasi aman
function calculate(exp) {
  exp = exp.replace(/÷/g, "/").replace(/×/g, "*").replace(/−/g, "-");
  return eval(exp).toString();
}

// theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

updateDisplay();
