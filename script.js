// ===== AMBIL ELEMEN =====
const display = document.getElementById("display");
const historyBox = document.getElementById("history");
const clearHistoryBtn = document.getElementById("clear-history");
const themeToggle = document.getElementById("theme-toggle");
const buttons = document.querySelectorAll(".buttons button");

let current = "";

// ===== DISPLAY =====
function updateDisplay() {
  display.value = current;
}

// ===== HISTORY =====
function addHistory(exp, result) {
  const div = document.createElement("div");
  div.textContent = `${exp} = ${result}`;
  div.onclick = () => {
    current = result.toString();
    updateDisplay();
  };
  historyBox.prepend(div);
}

// ===== CALCULATE =====
function calculate(exp) {
  let safe = exp
    .replace(/÷/g,"/")
    .replace(/×/g,"*")
    .replace(/−/g,"-")
    .replace(/π/g,"Math.PI")
    .replace(/\be\b/g,"Math.E")
    .replace(/sin\(/g,"Math.sin(")
    .replace(/cos\(/g,"Math.cos(")
    .replace(/tan\(/g,"Math.tan(")
    .replace(/log\(/g,"Math.log10(")
    .replace(/√\(/g,"Math.sqrt(");

  return eval(safe);
}

// ===== BUTTON CLICK =====
buttons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    const v = btn.textContent;

    try {
      if (v==="C") current="";
      else if (v==="⌫") current=current.slice(0,-1);
      else if (v==="="){
        const r = calculate(current);
        addHistory(current,r);
        current = r.toString();
      }
      else if (["sin","cos","tan","log","√"].includes(v)){
        current += v+"(";
      }
      else if (v==="x²"){
        current += "**2";
      }
      else{
        current += v;
      }
    } catch {
      current="Error";
    }

    updateDisplay();
  });
});

// ===== KEYBOARD =====
document.addEventListener("keydown",e=>{
  try{
    if(!isNaN(e.key) || "+-*/().".includes(e.key)){
      current+=e.key;
    }
    else if(e.key==="Enter"){
      const r = calculate(current);
      addHistory(current,r);
      current=r.toString();
    }
    else if(e.key==="Backspace"){
      current=current.slice(0,-1);
    }
  }catch{
    current="Error";
  }
  updateDisplay();
});

// ===== CLEAR HISTORY =====
clearHistoryBtn.addEventListener("click",()=>{
  historyBox.innerHTML="";
});

// ===== THEME =====
themeToggle.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});

updateDisplay();
