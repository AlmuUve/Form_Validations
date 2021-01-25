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
  //  let checkValueInput = false;
  checkCreditCard(creditCard);
  checkCVC(cvc);
  checkAmount(amount);

  checkFirstAndLastName(firstName);
  checkFirstAndLastName(lastName);

  checkCity(city);
  checkCommunity(community);
  checkPostalCode(postalCode);

  checkMessage(message);

  // SUBMIT
  submitCheck.addEventListener("submit", function(event) {
    event.preventDefault();
    let allCheckInputs = document.querySelectorAll(
      ".form-control, #message, #community"
    );
    let checkValueInput = true;
    for (let value of allCheckInputs) {
      checkValueInput &= value.classList.contains("is-valid");
    }
    if (checkValueInput) {
      submitMessage.textContent = ""; //this cleans previous cards from the generate cards div
      let createMessageSuccess = document.createElement("p");
      let createMessage = document.createTextNode("We go it! Thanks.");
      createMessageSuccess.appendChild(createMessage);
      submitMessage.appendChild(createMessageSuccess);
      submitMessage.classList.remove("alert-danger");
      submitMessage.classList.remove("d-none");
      submitMessage.classList.add("alert-success");
    } else {
      submitMessage.textContent = ""; //this cleans previous cards from the generate cards div
      let createMessageError = document.createElement("p");
      let createMessage = document.createTextNode(
        "Some fields missing or incorrect!!"
      );
      createMessageError.appendChild(createMessage);
      submitMessage.appendChild(createMessageError);
      submitMessage.classList.remove("d-none");
      submitMessage.classList.add("alert-danger");
    }
  });
};

//CREDIT CARD
const checkCreditCard = input => {
  input.addEventListener("focusout", () => {
    let check =
      luhnChk(input.value) &&
      input.value.length >= 12 &&
      input.value.length <= 19;
    getC(input, check);
  });
};
const luhnChk = (function(arr) {
  //this a Luhn algorithm to check credit card
  return function(ccNum) {
    let length = ccNum.length,
      bit = 1,
      sum = 0,
      value;
    while (length) {
      value = parseInt(ccNum.charAt(--length), 10);
      sum += (bit ^= 1) ? arr[value] : value;
    }
    return sum && sum % 10 === 0;
  };
})([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]);
//CVC
const checkCVC = input => {
  input.addEventListener("focusout", () => {
    let check = parseInt(input.value).toFixed() === input.value;
    getC(input, check);
  });
};
//AMOUNT
const checkAmount = input => {
  input.addEventListener("focusout", () => {
    let check =
      parseFloat(input.value) > 1000 &&
      parseFloat(input.value) < Number.MAX_SAFE_INTEGER - 1 &&
      parseFloat(parseFloat(input.value).toFixed(2)) ===
        parseFloat(input.value);
    getC(input, check);
  });
};
//FIRST AND LAST NAME
const checkFirstAndLastName = input => {
  input.addEventListener("focusout", () => {
    let myREGEXonlyletters = /^[a-zA-Z\s]*$/; // only letters
    let check =
      input.value.length > 0 &&
      input.value.length < 150 &&
      myREGEXonlyletters.test(input.value);
    getC(input, check);
  });
};
//CITY
const checkCity = input => {
  let cities = ["madrid", "barcelona"];
  input.addEventListener("focusout", () => {
    let myCity = input.value;
    let validCity = cities.includes(myCity.toLowerCase());
    if (validCity == true) {
      // we fix input of city to show it with first letter capitalized and the rest in lowercase
      input.value = myCity.toLowerCase();

      input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    }
  });
};
//COMMUNITY
const checkCommunity = input => {
  input.addEventListener("focusout", () => {
    let check = input.value != 0;
    getC(input, check);
  });
};
//POSTALCODE
const checkPostalCode = input => {
  let postalCodeList = ["09004", "09003"];
  input.addEventListener("focusout", () => {
    let check = postalCodeList.includes(input.value);
    getC(input, check);
  });
};
//MESSAGE
const checkMessage = input => {
  input.addEventListener("focusout", () => {
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

    let check = input.value.length < 500 && input.value.length > 0;
    getC(input, check);
    let regex = "";
    for (let i = 0; i < insults.length; i++) {
      // this loop changes bad words into special characters
      regex = new RegExp("(^|\\s)" + insults[i] + "($|(?=\\s))", "gi");
      input.value = input.value.replace(regex, function($0, $1) {
        return $1 + "#4@!@";
      });
    }
    message.value = input.value;
  });
};
// GET COLORS
const getC = (input, boolean) => {
  if (boolean === true) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    return false;
  }
};
