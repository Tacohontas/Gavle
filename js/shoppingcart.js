document.addEventListener("DOMContentLoaded", function() {
  // DOMContentLoaded = När hela sidan laddats färdigt
  ShowData();
});

const addBtn = document.querySelector(".addDetails");
addBtn.addEventListener("click", addInfo);


// Hämtar produkt (produktens bild) från produkter.html 
function ShowData() {
  const chosenproduct__product__img = document.querySelector(
    ".chosenproduct__product__img"
  );
  chosenproduct__product__img.src = localStorage.getItem("data");
}

// Skickar vidare info från formen där man fyller i företagsuppgifter
function addInfo() {
  const businessNameValue = document.querySelector("#business_name").value;
  const streetValue = document.querySelector("#street").value;
  const zipValue = document.querySelector("#zip").value;
  const contactNameValue = document.querySelector("#contact_name").value;
  const contactPhoneValue = document.querySelector("#contact_phone").value;
  const contactEmailValue = document.querySelector("#contact_email").value;
  const messageValue = document.querySelector("#message").value;

  // Lagrar ovanstående i localstorage.
  localStorage.setItem("business_name", businessNameValue);
  localStorage.setItem("street", streetValue);
  localStorage.setItem("zip", zipValue);
  localStorage.setItem("contact_name", contactNameValue);
  localStorage.setItem("contact_phone", contactPhoneValue);
  localStorage.setItem("contact_email", contactEmailValue);
  localStorage.setItem("message", messageValue);

  window.document.location = "../html/invoice.html";
}
