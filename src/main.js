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
    if (myCreditCardNum.length >= 12 && myCreditCardNum.length <= 19) {
      check = luhnChk(myCreditCardNum);
    }
    if (check == true) {
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
    if (parseInt(myCvcNum).toFixed() === myCvcNum) {
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
    console.log(myAmountNum);
    let convertedAmount = parseFloat(myAmountNum);
    console.log(convertedAmount);
    if (
      convertedAmount > 1000 &&
      convertedAmount < Number.MAX_SAFE_INTEGER - 1 &&
      parseFloat(convertedAmount.toFixed(2)) === convertedAmount
    ) {
      amount.classList.remove("border-danger");
      amount.classList.add("border-success");
    } else {
      amount.classList.remove("border-success");
      amount.classList.add("border-danger");
    }
  });
  //FIRST NAME --- PASAR A FUNCION
  let firstName = document.querySelector("#firstName");
  firstName.addEventListener("focusout", () => {
    let myFirstName = firstName.value;
    let myREGEXonlyletters = /^[a-zA-Z\s]*$/;
    if (
      myFirstName.length < 150 &&
      myFirstName.length > 0 &&
      myREGEXonlyletters.test(myFirstName)
    ) {
      firstName.classList.remove("border-danger");
      firstName.classList.add("border-success");
    } else {
      firstName.classList.remove("border-success");
      firstName.classList.add("border-danger");
    }
  });
  //LASTNAME // MAKE FUNCTION WITH FIRSTNAME
  let lastName = document.querySelector("#lastName");
  let myREGEXonlyletters = /^[a-zA-Z\s]*$/;
  lastName.addEventListener("focusout", () => {
    let mylastName = lastName.value;
    if (
      mylastName.length < 150 &&
      mylastName.length > 0 &&
      myREGEXonlyletters.test(myLastName)
    ) {
      lastName.classList.remove("border-danger");
      lastName.classList.add("border-success");
    } else {
      lastName.classList.remove("border-success");
      lastName.classList.add("border-danger");
    }
  });
  //CITY
  let city = document.querySelector("#city");
  let cities = ["madrid", "barcelona"];
  city.addEventListener("focusout", () => {
    let myCity = city.value;
    let validCity = cities.includes(myCity.toLowerCase());
    if (validCity == true) {
      city.value = myCity.toLowerCase();

      city.value = city.value.charAt(0).toUpperCase() + city.value.slice(1);
      city.classList.remove("border-danger");
      city.classList.add("border-success");
    } else {
      city.classList.remove("border-success");
      city.classList.add("border-danger");
    }
  });
  //COMMUNITIES
  let community = document.querySelector("#community");
  community.addEventListener("focusout", () => {
    let myCommunity = community.value;
    if (myCommunity == 0) {
      community.classList.remove("border-success");
      community.classList.add("border-danger");
    } else {
      community.classList.remove("border-danger");
      community.classList.add("border-success");
    }
  });
  //POSTALCODE
  let postalCode = document.querySelector("#postalCode");
  let postalCodeList = ["09004", "09003"];
  postalCode.addEventListener("focusout", () => {
    let myPostalCode = postalCode.value;
    console.log(myPostalCode);
    let validPostalCode = postalCodeList.includes(myPostalCode);
    if (validPostalCode == true) {
      postalCode.classList.remove("border-danger");
      postalCode.classList.add("border-success");
    } else {
      postalCode.classList.remove("border-success");
      postalCode.classList.add("border-danger");
    }
  });
  //MESSAGE
  let message = document.querySelector("#message");
  message.addEventListener("focusout", () => {
    let myMessage = message.value;
    let myREGEXmessage = /^[0-9A-Za-zñáéíóúÑÁÉÍÓÚüÜ;\.:'\s\-,!¡¿?)(&%#_çÇ$]/;
    let insults = [
      "mierda",
      "imbecil",
      "idiota",
      "gilipollas",
      "pene",
      "puta",
      "puto",
      "gilipollas"
    ];
    let regex = "";

    if (
      myMessage.length < 500 &&
      myMessage.length > 0 &&
      myREGEXmessage.test(myMessage)
    ) {
      message.classList.remove("border-danger");
      message.classList.add("border-success");
    } else {
      message.classList.remove("border-success");
      message.classList.add("border-danger");
    }
    for (var i = 0; i < insults.length; i++) {
      regex = new RegExp("(^|\\s)" + insults[i] + "($|(?=\\s))", "gi");
      myMessage = myMessage.replace(regex, function($0, $1) {
        return $1 + "#4@!@";
      });
    }
    message.value = myMessage;
  });
};
