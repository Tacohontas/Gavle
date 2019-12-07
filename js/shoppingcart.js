// Köpknappen
const addBtn = document.querySelector("#checkout__btn");
addBtn.addEventListener("click", addInfo);

// Visa form-knappen
const totalBtn = document.querySelector("#continue__btn");
totalBtn.addEventListener("click", ShowForm);

function ShowForm() {
  const psWrapper = document.querySelector(".customerform-wrapper");
  const SliderOutput = document.querySelector(".slider__qty");
  const warningTextBox = document.querySelector(".continue__warningtext");

  if (SliderOutput.innerText == "") {
    warningTextBox.innerHTML = "Vänligen välj antal personer.";
    return false;
  }
  document.querySelector("#customerform-section").scrollIntoView();
  psWrapper.style.display = "grid";
  warningTextBox.innerHTML = "";
}

// --------- Hämta bild + pris från products-funktion ---------- //

// När hela sidan laddats färdigt: (DOMContentLoaded):
document.addEventListener("DOMContentLoaded", function() {
  ShowData();
});

// Hämtar bild + pris från products.html

function ShowData() {
  // Hämtar produktbild:
  const product__img = document.querySelector(
    ".product__img"
  );
  product__img.src = localStorage.getItem("product_img");

  // Hämtar produktnamn:
  const overview_productName = document.querySelector(".product__header");
  overview_productName.innerHTML = localStorage.getItem("product_name");
  
  // Hämtar produktpris:
  const totalSpecProductPrice = document.querySelector(
    ".total__product-price"
  );
  totalSpecProductPrice.innerHTML = localStorage.getItem("product_price");

  // Hämtar produktbeskrivning:
  const overview__product__desc = document.querySelector(
    ".product__info"
  );
  overview__product__desc.innerHTML = localStorage.getItem("product_desc");

  // Lägger produktpris i totalsumman
  const totalSum = document.querySelector(".total__sum");
  totalSum.innerHTML = localStorage.getItem("product_price");
}

// ---------------- Range Slider-funktion ----------------- //

const rangeSlider = document.querySelector(".slider__input");
const quantityValue = document.querySelector(".slider__output");

// Sätter range slider-output till 1 som default.

// När man drar range slider-knappen så ändras antal personer-fältet och summan under själva slidern.
rangeSlider.oninput = function() {
  const productQuantity = document.querySelector(
    ".total__product-qty"
  );
  const rangeSliderOutput = document.querySelector(".slider__qty");
  rangeSliderOutput.innerHTML = this.value;
  quantityValue.innerHTML = this.value * 100;
  productQuantity.style.display = "none";

  rangeSlider.addEventListener("change", getInfoFromRangeThumb);

  // När man släpper range slider-knappen så sätts pris i total-specen
  function getInfoFromRangeThumb() {
    productQuantity.style.display = "block";
    productQuantity.innerHTML = `${rangeSliderOutput.innerHTML} deltagare: <span class="total__addon-price">${quantityValue.innerHTML}</span>`;
    localStorage.setItem("product_quantity_price", quantityValue.innerHTML);
    localStorage.setItem("product_quantity", rangeSliderOutput.innerHTML);
  }
};

// ---------------- Tillvals-funktion --------------------- //
const optionsItemCheckbox = document.querySelectorAll(
  ".addon__checkbox"
);
const optionsItem = document.querySelectorAll(".addon__info-container");

for (let i = 0; i < optionsItemCheckbox.length; i++) {
  optionsItemCheckbox[i].addEventListener("change", () => {
    const createLi = document.createElement("li");
    const totalSpec = document.querySelector(".total__spec");
    const totalSum = document.querySelector(".total__sum");
    const optionsItemHeader = optionsItem[i].children[0].innerHTML; //
    const optionsItemDesc = optionsItem[i].children[1].innerHTML; // Tänk på att de här är beroende av child-ordningen i .addon__info-container
    const optionsItemPrice = optionsItem[i].children[2].children[0].innerHTML; //

    if (optionsItemCheckbox[i].checked) {
      // Skapa en lista som adderar OptionsItemHeader, Desc och Price på en rad.
      totalSpec.appendChild(createLi);
      // Lägger till id i <li> för att kunna ta bort i else.
      createLi.setAttribute("id", [i]);

      // Set item = Tillvalets pris (t.ex option1_price)
      localStorage.setItem(`option${i + 1}_price`, optionsItemPrice);
      // Set item = Tillvalets namn (t.ex option1_name)
      localStorage.setItem(`option${i + 1}_name`, optionsItemHeader);
      // Set item = Tillvalets beskrivning (t.ex option1_desc)
      localStorage.setItem(`option${i + 1}_desc`, optionsItemDesc);

      // Fyller i Tillvalets namn och pris(i en span), och valuta i spec-listan.
      createLi.innerHTML = `${optionsItemHeader}: <span class="total__addon-price">${optionsItemPrice}</span>`;

      // Adderar tillvalspriset i Totalsumman.
      // totalSum.innerHTML =
      //   Number(totalSum.innerHTML) + Number(optionsItemPriceSplit[0]);

      
    } else {
      // Tar bort elementet med samma ID som skapades i if.
      totalSpec.removeChild(document.getElementById([i]));
      // Subtraherar tillvalspriset i Totalsumman.
      // totalSum.innerHTML =
      //   Number(totalSum.innerHTML) - Number(optionsItemPrice);
      // Tar bort itemets pris , namn och beskrivning så det ej hamnar i fakturan.
      localStorage.removeItem(`option${i + 1}_price`);
      localStorage.removeItem(`option${i + 1}_name`);
      localStorage.removeItem(`option${i + 1}_desc`);
    }
  });
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
  const inputs = document.getElementsByClassName("customerform-input");
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      document.querySelector(".checkout__warningtext").innerHTML =
        "Du måste fylla i alla ovanstående fält.";
      return false;
    }
  }

  // Kollar ifall checkboxen för köpesvillkoren är icheckad:
  if (document.querySelector(".checkbox__input").checked) {
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
    document.querySelector(".checkout__warningtext").innerHTML =
      "Du måste läsa igenom våra köpvillkor innan du går vidare.";
  }
}

// ------------------------------ Totalsumman-funktion ------------------------- //

// När något ändras i total__spec (pris-specifikationen innan totalsumman) så uppdateras totalsumman.
const totalSpec = document.querySelector(".total__spec");
totalSpec.addEventListener("DOMSubtreeModified", updateTotal);

function updateTotal() {
  let spanSum = 0;
  const allaSpan = document.querySelectorAll(".total__addon-price");
  const totalSum = document.querySelector(".total__sum");
  const totalSpecProductPrice = document.querySelector(
    ".total__product-price"
  );

  for (let i = 0; i < allaSpan.length; i++) {
    spanSum += Number(allaSpan[i].innerHTML);
  }

  // Lägger samman produktpris från spec med alla spans som har klassen ".total__product-price".
  totalSum.innerHTML =
    Number(totalSpecProductPrice.innerHTML) + Number(spanSum);
}

// ---------- TEST-SEKTION -------------
