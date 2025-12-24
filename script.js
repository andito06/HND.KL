const display = document.getElementById("display");
const themeToggle = document.getElementById("theme-toggle");

let current = "";

// ================= DISPLAY =================
function updateDisplay() {
  display.value = current;
}

// ================= HITUNG =================
function calculate(exp) {
  let safe = exp
    .replace(/÷/g, "/")
    .replace(/×/g, "*")
    .replace(/−/g, "-")
    .replace(/π/g, "Math.PI")
    .replace(/\be\b/g, "Math.E")
    .replace(/sin\(/g, "Math.sin(")
    .replace(/cos\(/g, "Math.cos(")
    .replace(/tan\(/g, "Math.tan(")
    .replace(/log\(/g, "Math.log10(")
    .replace(/√\(/g, "Math.sqrt(");

  return eval(safe);
}

// ================= BUTTON =================
document.querySelectorAll(".buttons button").forEach(btn => {
  btn.addEventListener("click", () => {
    const v = btn.textContent;

    try {
      if (v === "C") {
        current = "";
      }
      else if (v === "⌫") {
        current = current.slice(0, -1);
      }
      else if (v === "=") {
        current = calculate(current).toString();
      }
      else if (["sin", "cos", "tan", "log", "√"].includes(v)) {
        current += v + "(";   // ✅ nulis dulu
      }
      else if (v === "x²") {
        current += "**2";
      }
      else if (v === "÷") {
        current += "÷";
      }
      else if (v === "×") {
        current += "×";
      }
      else if (v === "−") {
        current += "−";
      }
      else {
        current += v;
      }
    } catch {
      current = "Error";
    }

    updateDisplay();
  });
});

// ================= KEYBOARD =================
document.addEventListener("keydown", e => {
  const k = e.key;

  try {
    if (!isNaN(k) || "+-*/().".includes(k)) {
      current += k;
    }
    else if (k === "Enter") {
      current = calculate(current).toString();
    }
    else if (k === "Backspace") {
      current = current.slice(0, -1);
    }
  } catch {
    current = "Error";
  }

  updateDisplay();
});

// ================= THEME =================
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});

updateDisplay();