// När hela sidan laddats färdigt: (DOMContentLoaded):
document.addEventListener("DOMContentLoaded", function() {
  ShowData();
});

// Köpknappen
const addBtn = document.querySelector("#shoppingcart_buybtn");
addBtn.addEventListener("click", addInfo);

// Hämtar produkt (produktens bild) från products.html
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

  // Kollar så att alla fält är ifyllda.
  const inputs = document.getElementsByClassName("PD__item__input");
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      document.querySelector(".buy__warningtext").innerHTML =
        "Du måste fylla i alla ovanstående fält.";
      return false;
    }
  }

  // Kollar ifall checkboxen för köpesvillkoren är icheckad:
  if (document.querySelector(".buy__readterms").checked) {
    // Lagrar ovanstående i localstorage.
    localStorage.setItem("business_name", businessNameValue);
    localStorage.setItem("street", streetValue);
    localStorage.setItem("zip", zipValue);
    localStorage.setItem("contact_name", contactNameValue);
    localStorage.setItem("contact_phone", contactPhoneValue);
    localStorage.setItem("contact_email", contactEmailValue);
    localStorage.setItem("message", messageValue);

    window.document.location = "../html/invoiceTEST.html";
  } else {
    document.querySelector(".buy__warningtext").innerHTML =
      "Du måste läsa igenom våra köpvillkor innan du går vidare.";
  }
}
