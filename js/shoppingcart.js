// När hela sidan laddats färdigt: (DOMContentLoaded):
document.addEventListener("DOMContentLoaded", function() {
  ShowData();
});

// Köpknappen
const addBtn = document.querySelector("#shoppingcart_buybtn");
addBtn.addEventListener("click", addInfo);

// Hämtar bild + pris från products.html
function ShowData() {

  // Hämtar produktbild:
  const chosenproduct__product__img = document.querySelector(".chosenproduct__product__img");
  chosenproduct__product__img.src = localStorage.getItem("product_img");

  // Hämtar produktpris:
  const totalSpecProductPrice = document.querySelector(".total__spec__product_price");
  totalSpecProductPrice.innerHTML = "Produktens pris " + localStorage.getItem("product_price") + "kr";

  // Lägger produktpris i totalsumman
  const totalSum = document.querySelector(".total__sum");
  totalSum.innerHTML = localStorage.getItem("product_price");
  

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
  const totalSum = document.querySelector(".total__sum").innerHTML; //totalsumma
 
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
    //Totalsumma också
    localStorage.setItem("total", totalSum);
    window.document.location = "../html/invoice.html";
  } else {
    document.querySelector(".buy__warningtext").innerHTML =
      "Du måste läsa igenom våra köpvillkor innan du går vidare.";
  }



}

// Tillvals-funktion
const optionsItemCheckbox = document.querySelectorAll(
  ".options__item__checkbox"
);
const optionsItem = document.querySelectorAll(".options__item");

for (let i = 0; i < optionsItemCheckbox.length; i++) {
  optionsItemCheckbox[i].addEventListener("change", () => {
    const createLi = document.createElement("li");
    const totalSpec = document.querySelector(".total__spec");
    const totalSum = document.querySelector(".total__sum");
    const optionsItemHeader = optionsItem[i].children[0].innerHTML; //
    const optionsItemDesc = optionsItem[i].children[1].innerHTML; // Tänk på att de här är beroende av child-ordningen i .options__item
    const optionsItemPrice = optionsItem[i].children[2].innerHTML; //
    const optionsItemPriceSplit = optionsItemPrice.split("kr"); // Splitta här på pris-ändelsen.

    if (optionsItemCheckbox[i].checked) {
      // Skapa en lista som adderar OptionsItemHeader, Desc och Price på en rad.
      totalSpec.appendChild(createLi);
      // Lägger till id i <li> för att kunna ta bort i else.
      createLi.setAttribute("id", [i]);

      // Set item = Tillvalets pris (t.ex option1_price)
      localStorage.setItem(`option${i + 1}_price`, optionsItemPriceSplit[0]);
      // Set item = Tillvalets namn (t.ex option1_name)
      localStorage.setItem(`option${i + 1}_name`, optionsItemHeader);
      // Set item = Tillvalets beskrivning (t.ex option1_desc)
      localStorage.setItem(`option${i + 1}_desc`, optionsItemDesc);

      // Fyller i Tillvalets namn och pris i spec-listan.
      createLi.innerHTML = `${optionsItemHeader}: ${optionsItemPrice}`;

      // Adderar tillvalspriset i Totalsumman.
      totalSum.innerHTML =
        Number(totalSum.innerHTML) + Number(optionsItemPriceSplit[0]);

      // loggar i konsollen
      console.log(`Tillval ${i+1} tillagd i localStorage`)
      console.log(`namn = option${i + 1}_name`);
      console.log(`pris = option${i + 1}_price`);
      console.log(`beskrivning = option${i + 1}_desc`);

    } else {
      // Tar bort elementet med samma ID som skapades i if.
      totalSpec.removeChild(document.getElementById([i]));
      // Subtraherar tillvalspriset i Totalsumman.
      totalSum.innerHTML =
        Number(totalSum.innerHTML) - Number(optionsItemPriceSplit[0]);
      // Tar bort itemets pris , namn och beskrivning så det ej hamnar i fakturan.
      localStorage.removeItem(`option${i + 1}_price`);
      localStorage.removeItem(`option${i + 1}_name`);
      localStorage.removeItem(`option${i + 1}_desc`);

      // loggar i konsollen
      console.log(`Tillval ${i+1} borttagen från localStorage`);
    }
  });


}

// ---------- TEST-SEKTION -------------

// Testar funktion:
// Ifall data finns = console.log

function testfunk() {
  if (localStorage.getItem("Tillval1")) {
    console.log("Det finns data!");
  } else {
    console.log("Det finns inte data");
  }
}


// Test: tillval skall bli knapp.
const clicktestDiv = document.querySelector(".clicktest");

 