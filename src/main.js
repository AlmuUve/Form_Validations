/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

const creditCard = document.querySelector("#cardNumber");
const cvc = document.querySelector("#cvc");

const amount = document.querySelector("#amount");

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");

const city = document.querySelector("#city");
const community = document.querySelector("#community");
const postalCode = document.querySelector("#postalCode");

const message = document.querySelector("#message");

const submitCheck = document.querySelector("#checkForm");
const submitMessage = document.querySelector("#divMessage");

window.onload = function() {
  checkCreditCard(creditCard);
  checkCVC(cvc);
  checkAmount(amount);

  checkFirstAndLastName(firstName);
  checkFirstAndLastName(lastName);

  checkCity(city);
  checkCommunity(community);
  checkPostalCode(postalCode);

  //MESSAGE
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

console.log(submitCheck);

// SUBMIT
submitCheck.addEventListener("submit", function(event) {
  event.preventDefault();
  let allCheckInputs = document.querySelectorAll(
    ".form-control, #message, #community"
  ); ///re-do selector
  let checkValueInput = false;
  for (let value of allCheckInputs) {
    if (value.classList.contains("border-success")) {
      checkValueInput = true;
    } else {
      checkValueInput = false;
    }
  }
  if (checkValueInput == true) {
    var createP = document.createElement("p");
    var createMessage = document.createTextNode("Lo conseguiste");
    createP.appendChild(createMessage); // Tengo que agregar contenido al h1
    submitMessage.appendChild(createP);
    submitMessage.classList.remove("d-none");
    submitMessage.classList.add("alert-success");
    console.log("holaaaa");
  } else {
    var createPerror = document.createElement("p");
    var createMessageerror = document.createTextNode("No Lo conseguiste");
    createPerror.appendChild(createMessageerror); // Tengo que agregar contenido al h1
    submitMessage.appendChild(createPerror);
    submitMessage.classList.remove("d-none");
    submitMessage.classList.add("alert-danger");
    console.log("hola");
  }
});

//CREDIT CARD
function checkCreditCard(input) {
  input.addEventListener("focusout", () => {
    let check =
      luhnChk(input.value) &&
      input.value.length >= 12 &&
      input.value.length <= 19;
    getC(input, check);
  });
}
//CVC
function checkCVC(input) {
  input.addEventListener("focusout", () => {
    let check = parseInt(input.value).toFixed() === input.value;
    getC(input, check);
  });
}
//AMOUNT
function checkAmount(input) {
  input.addEventListener("focusout", () => {
    let check =
      parseFloat(input.value) > 1000 &&
      parseFloat(input.value) < Number.MAX_SAFE_INTEGER - 1 &&
      parseFloat(parseFloat(input.value).toFixed(2)) ===
        parseFloat(input.value);
    getC(input, check);
  });
}
//FIRST AND LAST NAME
function checkFirstAndLastName(input) {
  input.addEventListener("focusout", () => {
    let myREGEXonlyletters = /^[a-zA-Z\s]*$/;
    let check =
      input.value.length > 0 &&
      input.value.length < 150 &&
      myREGEXonlyletters.test(input.value);
    getC(input, check);
  });
}
//CITY
function checkCity(input) {
  let cities = ["madrid", "barcelona"];
  input.addEventListener("focusout", () => {
    let myCity = input.value;
    let validCity = cities.includes(myCity.toLowerCase());
    if (validCity == true) {
      input.value = myCity.toLowerCase();

      input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
      input.classList.remove("border-danger");
      input.classList.add("border-success");
    } else {
      input.classList.remove("border-success");
      input.classList.add("border-danger");
    }
  });
}
//COMMUNITY
function checkCommunity(input) {
  input.addEventListener("focusout", () => {
    let check = input.value != 0;
    getC(input, check);
  });
}
//POSTALCODE
function checkPostalCode(input) {
  let postalCodeList = ["09004", "09003"];
  input.addEventListener("focusout", () => {
    let check = postalCodeList.includes(input.value);
    getC(input, check);
  });
}

// GET COLORS
function getC(input, boolean) {
  if (boolean === true) {
    input.classList.remove("border-danger");
    input.classList.add("border-success");
    return true;
  } else {
    input.classList.remove("border-success");
    input.classList.add("border-danger");
    return false;
  }
}

const luhnChk = (function(arr) {
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
