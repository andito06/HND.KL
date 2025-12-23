const display = document.getElementById("display");
const historyEl = document.getElementById("history");
const themeToggle = document.getElementById("theme-toggle");

let current = "";

// update display
function updateDisplay() {
  display.value = current;
}

// add history
function addHistory(exp, result) {
  const item = document.createElement("div");
  item.textContent = `${exp} = ${result}`;

  item.onclick = () => {
    current = result.toString();
    updateDisplay();
  };

  historyEl.prepend(item);
}

// calculate
function calculate(exp) {
  exp = exp.replace(/÷/g, "/").replace(/×/g, "*").replace(/−/g, "-");
  return eval(exp);
}

// button click
document.querySelectorAll(".buttons button").forEach(btn => {
  btn.onclick = () => {
    const v = btn.textContent;

    try {
      if (v === "C") current = "";
      else if (v === "⌫") current = current.slice(0, -1);
      else if (v === "=") {
        const res = calculate(current);
        addHistory(current, res);
        current = res.toString();
      }
      else if (v === "√") current = Math.sqrt(eval(current)).toString();
      else if (v === "x²") current = Math.pow(eval(current), 2).toString();
      else if (["sin","cos","tan"].includes(v)) {
        const r = eval(current) * Math.PI / 180;
        current = Math[v](r).toString();
      }
      else if (v === "log") current = Math.log10(eval(current)).toString();
      else if (v === "π") current += Math.PI;
      else if (v === "e") current += Math.E;
      else current += v;
    } catch {
      current = "Error";
    }

    updateDisplay();
  };
});

// keyboard support
document.addEventListener("keydown", e => {
  const k = e.key;

  if (!isNaN(k) || "+-*/.".includes(k)) current += k;
  else if (k === "Enter") {
    const res = calculate(current);
    addHistory(current, res);
    current = res.toString();
  }
  else if (k === "Backspace") current = current.slice(0, -1);

  updateDisplay();
});

// clear history
document.getElementById("clear-history").onclick = () => {
  historyEl.innerHTML = "";
};

// theme toggle
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
};

updateDisplay();
