// TODO: write your code here!
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const counter = document.querySelector("#counter");
const submit = document.querySelector("#submit");

let counterTotal = 1;
let priceTotal = 150;


plus.addEventListener("click", (event) => {
  console.log("plus has been clicked");
  counterTotal = counterTotal +1;
  priceTotal = priceTotal +150;
  counter.innerText = counterTotal.toString();
  submit.value = `Pay ${priceTotal}€`;
  console.log(counterTotal);
});

minus.addEventListener("click", (event) => {
  console.log("minus has been clicked");
    if (counterTotal <= 1) {
      event.preventDefault();  
    } else{
        counterTotal = counterTotal -1;
        counter.innerText = counterTotal.toString();
        priceTotal = priceTotal -150;
        counter.innerText = counterTotal.toString();
        submit.value = `Pay ${priceTotal}€`;
        console.log(counterTotal);
    }
});