import { navFunction } from "./navigation.js";
navFunction();


const form = document.querySelector("#form");
const inputNameJs = document.querySelector(".inputNameJs");
const inputEmailJs = document.querySelector(".inputEmailJs");
const inputSubjectJs = document.querySelector(".inputsubjectJs");
const inputTextareaJs = document.querySelector(".inputJs-textArea");

const inputHighLight = document.querySelector(".input-highlight");
const inputHighLight2 = document.querySelector(".input-highlight2");
const inputHighLight3 = document.querySelector(".input-highlight3");

const nameLabelJs = document.querySelector(".nameLabel");
const emailLabelJs = document.querySelector(".emailLabel");
const subjectLabelJs = document.querySelector(".subjectLabel");

const inputNameError = document.querySelector(".inputJs-error-name");
const inputEmailError = document.querySelector(".inputJs-error-email");
const inputSubjectError = document.querySelector(".inputJs-error-subject");
const textareaError = document.querySelector(".inputJs-error-textarea");

const regexEmail =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const regexSubject = /^[a-zA-Z]{15,}/;
const regexTextarea = /^[a-zA-Z]{25,}/;
const regexName = /^[a-zA-Z]{2,}/;

inputNameJs.addEventListener("focus", () => {
  nameLabelJs.classList.add("active");
  inputHighLight.classList.add("active");
});

inputNameJs.addEventListener("blur", () => {
  if (inputNameJs.value === "") {
    nameLabelJs.classList.remove("active");
    inputHighLight.classList.remove("active");
    inputNameError.style.display = "none";
    return;
  }
});

inputNameJs.addEventListener("keyup", () => {
  const testedName = regexName.test(inputNameJs.value);
  if (!testedName) {
    inputNameError.style.display = "block";
    inputHighLight.style.backgroundColor = "red";
    return;
  }

  inputNameError.style.display = "none";
  inputHighLight.style.backgroundColor = "green";
});

inputEmailJs.addEventListener("focus", () => {
  emailLabelJs.classList.add("active");
  inputHighLight2.classList.add("active");
});

inputEmailJs.addEventListener("blur", () => {
  if (inputEmailJs.value === "") {
    emailLabelJs.classList.remove("active");
    inputHighLight2.classList.remove("active");
    inputEmailError.style.display = "none";
    return;
  }
});

inputEmailJs.addEventListener("keyup", () => {
  const testedEmail = regexEmail.test(inputEmailJs.value);

  if (!testedEmail) {
    inputEmailError.style.display = "block";
    inputHighLight2.style.backgroundColor = "red";
  } else if (testedEmail) {
    inputEmailError.style.display = "none";
    inputHighLight2.style.backgroundColor = "green";
  }
});

inputSubjectJs.addEventListener("focus", () => {
  subjectLabelJs.classList.add("active");
  inputHighLight3.classList.add("active");
});

inputSubjectJs.addEventListener("blur", () => {
  if (inputSubjectJs.value === "") {
    subjectLabelJs.classList.remove("active");
    inputHighLight3.classList.remove("active");
    inputSubjectError.style.display = "none";
    return;
  }
});

inputSubjectJs.addEventListener("keyup", () => {
  const testedSubject = regexSubject.test(inputSubjectJs.value);

  if (!testedSubject) {
    inputSubjectError.style.display = "block";
    inputHighLight3.style.backgroundColor = "red";
  } else if (testedSubject) {
    inputSubjectError.style.display = "none";
    inputHighLight3.style.backgroundColor = "green";
  }
});

inputSubjectJs.addEventListener("keyup", () => {
  const testedSubject = regexSubject.test(inputSubjectJs.value);

  if (!testedSubject) {
    inputSubjectError.style.display = "block";
    inputHighLight3.style.backgroundColor = "red";
  } else if (testedSubject) {
    inputSubjectError.style.display = "none";
    inputHighLight3.style.backgroundColor = "green";
  }
});

inputTextareaJs.addEventListener("keyup", () => {
  const testedMessage = regexTextarea.test(inputTextareaJs.value);

  if (!testedMessage) {
    textareaError.style.display = "block";
    inputTextareaJs.style.border = "2px solid red";
  } else if (testedMessage) {
    textareaError.style.display = "none";
    inputTextareaJs.style.border = "2px solid green";
  }
});


const confirmPopUp = document.querySelector(".modalItems");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (inputNameJs.value === "") {
    alert("Please enter your name");
    return;
  }
  if (inputEmailJs.value === "") {
    alert("Please enter your email");
    return;
  }
  if (inputSubjectJs.value === "") {
    alert("Please enter a subject");
    return;
  }
  if (inputTextareaJs.value === "") {
    alert("Please enter a message");
    return;
  } else {
    confirmPopUp.classList.add("active")
  }
});
