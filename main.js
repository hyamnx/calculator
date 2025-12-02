let buttons = document.querySelectorAll('button');
let arrBtn = Array.from(buttons);
// console.log(btn);
// console.log(arrBtn);

let inputBox = document.getElementById("inputBox");
// console.log(btn[0].textContent);
// console.log(inputBox.textContent);
// console.log(inputBox.value="hi");


//make a class for number button and operator buttin and id for ce, ac, and equalbtn.---->use data-* in html element.


let firstN = "";
let operator = "";
let secondN = "";
let isSecondN = false;     //(flag ; to get know , if user is typing second or 1st no...// false = typing first number, true = typing second number)
let lastOperatorBtn = null;

// Add event listeners
arrBtn.forEach(btn => {
      btn.addEventListener("click", () => { handleClick(btn) })
      // btn.addEventListener("click", ()=>{handleClick(btn.innerText)})
      // btn.addEventListener("click", (e)=>{handleClick(e.target)})
})

function handleClick(btnVal) {


      // ================= AC ==================
      if (btnVal.id === 'AC') {
            inputBox.value = "0";
            firstN = "";
            secondN = "";
            operator = "";
            isSecondN = false;
            return;
      }

      // if(btnVal.innerText==='0'){
      //       inputBox.value="say hiii"
      // }
      //inputBox.value="say hi"; 


      // ================= CE ==================
      if (btnVal.dataset.type === 'control') {
            inputBox.value = inputBox.value.slice(0, -1);

            if (!isSecondN) {
                  firstN = firstN.slice(0, -1);
            } else {
                  secondN = secondN.slice(0, -1);
            }
            return;
      }


      // ================ DIGITS ================
      /*if (!isNaN(btnVal.innerText) || btnVal.innerText === "." || btnVal.innerText === "00") {

            
            if (!isSecondN) {
                  firstN += btnVal.innerText;  //firstN= firstN+value
                  inputBox.value = firstN;
                  // console.log(inputBox.value);
                  console.log(firstN);
            } else {
                  secondN += btnVal.innerText;
                  inputBox.value = secondN;
                  console.log(secondN);
            }
            return;
      }*/

      if (btnVal.dataset.type === "digit") {
            const val = btnVal.innerText;

            // prevent more than one dot for the current number
            if (val === ".") {
                  const current = isSecondN ? secondN : firstN;
                  if (current.includes(".")) return; // ignore
            }

            // prevent multiple leading zeros like 0000
            if (!isSecondN) {
                  if (firstN === "0" && val !== ".") firstN = val; // replace leading 0
                  else firstN += val;
                  inputBox.value = firstN || "0";
            } else {
                  if (secondN === "0" && val !== ".") secondN = val;
                  else secondN += val;
                  inputBox.value = secondN || "0";
            }

            return;
      }


      // =============== OPERATOR ===============
      if ("operator" === btnVal.dataset.type) {

            // operator = btnVal.innerText;
            operator = btnVal.innerText || btnVal.dataset.op;
            isSecondN = true;
            if (lastOperatorBtn) lastOperatorBtn.classList.remove("operator-active");
            btnVal.classList.add("operator-active");
            lastOperatorBtn = btnVal;
            return;
      }

      // =============== EQUAL ==================
      if (btnVal.id === "equalBtn") {
            // inputBox.value="equal btn pressed";
            cal();
            return;
      }
}



function cal() {
      if (!operator || secondN === "") return;


      const num1 = Number(firstN);
      const num2 = Number(secondN);

      const operation = {
            "+": (a, b) => a + b,
            "-": (a, b) => a - b,
            "×": (a, b) => a * b,
            "÷": (a, b) => a / b
      };

      // handle divide by zero
      if (operator === "/" && num2 === 0) {
            inputBox.value = "Error";
            // reset or keep behavior as you like
            firstN = "";
            secondN = "";
            operator = "";
            isSecondN = false;
            if (lastOperatorBtn) lastOperatorBtn.classList.remove("operator-active");
            return;
      }

      const result = operation[operator](num1, num2);
      console.log(result);

      inputBox.value = result;
      // Prepare for next calculation
      firstN = result.toString();
      secondN = "";
      operator = "";
      isSecondN = false;
      if (lastOperatorBtn) lastOperatorBtn.classList.remove("operator-active");
}

// Keyboard support
document.addEventListener("keydown", (e) => {
      const k = e.key;

      // direct button labels match (digits and dot)
      let btn = [...arrBtn].find(b => b.innerText === k);

      // map keyboard operators to our op buttons
      if (!btn) {
            if (k === "+") btn = [...arrBtn].find(b => b.dataset.op === "+");
            if (k === "-") btn = [...arrBtn].find(b => b.dataset.op === "-");
            if (k === "*") btn = [...arrBtn].find(b => b.dataset.op === "*");
            if (k === "/") btn = [...arrBtn].find(b => b.dataset.op === "/");
            if (k === "Enter") btn = document.getElementById("equalBtn");
            if (k === "Backspace") btn = document.getElementById("CE");
      }

      if (btn) {
            // simulate click
            btn.click();
            e.preventDefault();
      }
});


//if person wants a 3rd number then?
//equal btn pres then show result or numbers okayhh.
//preview all step (cal 2.0)