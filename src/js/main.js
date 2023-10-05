import "../css/style.css";
const BASE_URL = "https://be-semarang-20-production.up.railway.app/api";
// import "./router"

// Validation Form
const contactForm = document.querySelector("#contact-form");
const fullNameInput = document.querySelector("#fullname-input");
const emailInput = document.querySelector("#email-input");
const companyInput = document.querySelector("#company-input");
const messageInput = document.querySelector("#message-input");

const fullnameError = document.querySelector("#fullname-error");
const companyError = document.querySelector("#company-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");

const templateError = (message) =>
  `<span class="text-xs text-primary">${message}</span>`;

const sendContact = async ({ name, email, company_name, message }) => {
  const sendData = await fetch(`${BASE_URL}/contact-us`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      company_name,
      message,
    }),
  });

  const response = await sendData.json();
  if (response.code == 201) {
    alert("Pesan Anda sudah dikirim, akan kami tinjau setelah ini!");
    fullNameInput.value = null;
    emailInput.value = null;
    companyInput.value = null;
    messageInput.value = null;
  }
};

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  if (fullNameInput.value.trim() === "") {
    fullnameError.innerHTML = templateError("Full name is required");
    isValid = false;
  } else {
    fullnameError.innerHTML = "";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value)) {
    emailError.innerHTML = templateError("Invalid email address");
    isValid = false;
  } else {
    emailError.innerHTML = "";
  }

  if (companyInput.value.trim() === "") {
    companyError.innerHTML = templateError("Company name is required");
    isValid = false;
  } else {
    companyError.innerHTML = "";
  }

  if (messageInput.value.trim() === "") {
    messageError.innerHTML = templateError("Message is required");
    isValid = false;
  } else {
    messageError.innerHTML = "";
  }

  if (isValid) {
    sendContact({
      name: fullNameInput.value,
      email: emailInput.value,
      company_name: companyInput.value,
      message: messageInput.value,
    });
    console.log("hoo");
  } else {
    console.log("hehe");
  }
});
