/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  var luhnChk = (function(arr) {
    return function(ccNum) {
      var len = ccNum.length,
        bit = 1,
        sum = 0,
        val;
      while (len) {
        val = parseInt(ccNum.charAt(--len), 10);
        sum += (bit ^= 1) ? arr[val] : val;
      }
      return sum && sum % 10 === 0;
    };
  })([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]);
  //"4024007118169068";
  //CREDIT CARD
  let creditCard = document.querySelector("#cardNumber");
  creditCard.addEventListener("focusout", () => {
    let myCreditCardNum = creditCard.value;
    let check = false;
    if (myCreditCardNum.length > 12 && myCreditCardNum.length < 19) {
      check = luhnChk(myCreditCardNum);
      creditCard.classList.remove("border-danger");
      creditCard.classList.add("border-success");
    } else {
      creditCard.classList.remove("border-success");
      creditCard.classList.add("border-danger");
    }
  });
  //CVC
  let cvc = document.querySelector("#cvc");
  cvc.addEventListener("focusout", () => {
    let myCvcNum = cvc.value;
    if (
      myCvcNum.length > 2 &&
      myCvcNum.length < 5 &&
      isNaN(myCvcNum) == false
    ) {
      cvc.classList.remove("border-danger");
      cvc.classList.add("border-success");
    } else {
      cvc.classList.remove("border-success");
      cvc.classList.add("border-danger");
    }
  });
  //AMOUNT
  let amount = document.querySelector("#amount");
  amount.addEventListener("focusout", () => {
    let myAmountNum = amount.value;
    let convertToNum = this.parseInt(myAmountNum);
    if (
      myAmountNum > 1000 &&
      myAmountNum < Number.MAX_SAFE_INTEGER - 1 &&
      isNaN(myAmountNum) == false
    ) {
      amount.classList.remove("border-danger");
      amount.classList.add("border-success");
    } else {
      amount.classList.remove("border-success");
      amount.classList.add("border-danger");
    }
  });
};
