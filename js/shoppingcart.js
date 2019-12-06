// Köpknappen
const addBtn = document.querySelector("#shoppingcart_buybtn");
addBtn.addEventListener("click", addInfo);

// Visa form-knappen
const totalBtn = document.querySelector("#total__button");
totalBtn.addEventListener("click", ShowForm);

// if (personalSectionWrapper.style.display !== "none") {
//   personalSectionWrapper.style.display = "grid";
// }

function ShowForm() {
  const psWrapper = document.querySelector(".personaldetails-wrapper");
  const SliderOutput = document.querySelector(".qty__sliderout").innerHTML;
  const warningTextBox = document.querySelector(".total__warningtext");

  if (SliderOutput == "") {
    warningTextBox.innerHTML = "Vänligen välj antal personer."
    return false;
  } 
    document.querySelector('#personaldetails-section').scrollIntoView();
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
  const overview__product__img = document.querySelector(
    ".overview__product__img"
  );
  overview__product__img.src = localStorage.getItem("product_img");

  // Hämtar produktpris:
  const totalSpecProductPrice = document.querySelector(
    ".overview__info__total__spec__product_price"
  );
  totalSpecProductPrice.innerHTML = localStorage.getItem("product_price");

  // Hämtar produktbeskrivning:
  const overview__product__desc = document.querySelector(
    ".overview__product__info__desc"
  );
  overview__product__desc.innerHTML = localStorage.getItem("product_desc");

  // Lägger produktpris i totalsumman
  const totalSum = document.querySelector(".total__sum");
  totalSum.innerHTML = localStorage.getItem("product_price");
}

// ---------------- Range Slider-funktion ----------------- //

const rangeSlider = document.querySelector(".qty__slider");
const quantityValue = document.querySelector(".qty__value");

// Sätter range slider-output till 1 som default.
// rangeSliderOutput.innerHTML = rangeSlider.value;

// När man drar range slider-knappen så ändras antal personer-fältet och summan under själva slidern.
rangeSlider.oninput = function() {
  const productQuantity = document.querySelector(
    ".overview__info__total__spec__product_quantity"
  );
  const rangeSliderOutput = document.querySelector(".qty__sliderout");
  rangeSliderOutput.innerHTML = this.value;
  quantityValue.innerHTML = this.value * 100;
  productQuantity.style.display = "none";

  rangeSlider.addEventListener("change", getInfoFromRangeThumb);

  // När man släpper range slider-knappen så sätts pris i total-specen
  function getInfoFromRangeThumb() {
    productQuantity.style.display = "block";
    productQuantity.innerHTML = `${rangeSliderOutput.innerHTML} deltagare: <span class="total__spec__option_price">${quantityValue.innerHTML}</span>`;
    localStorage.setItem("product_quantity_price", quantityValue.innerHTML);
    localStorage.setItem("product_quantity", rangeSliderOutput.innerHTML);
  }
};

// ---------------- Tillvals-funktion --------------------- //
const optionsItemCheckbox = document.querySelectorAll(
  ".overview__info__options__item__input"
);
const optionsItem = document.querySelectorAll(".overview__info__options__item");

for (let i = 0; i < optionsItemCheckbox.length; i++) {
  optionsItemCheckbox[i].addEventListener("change", () => {
    const createLi = document.createElement("li");
    const totalSpec = document.querySelector(".overview__info__total__spec");
    const totalSum = document.querySelector(".total__sum");
    const optionsItemHeader = optionsItem[i].children[0].innerHTML; //
    const optionsItemDesc = optionsItem[i].children[1].innerHTML; // Tänk på att de här är beroende av child-ordningen i .overview__info__options__item
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
      createLi.innerHTML = `${optionsItemHeader}: <span class="total__spec__option_price">${optionsItemPrice}</span>`;

      // Adderar tillvalspriset i Totalsumman.
      // totalSum.innerHTML =
      //   Number(totalSum.innerHTML) + Number(optionsItemPriceSplit[0]);

      // loggar i konsollen
      console.log(
        `Tillval ${i + 1} tillagd i localStorage: option${i +
          1}_name, option${i + 1}_price, option${i + 1}_desc `
      );
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

      // loggar i konsollen
      console.log(`Tillval ${i + 1} borttagen från localStorage`);
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
  const inputs = document.getElementsByClassName("PD__item-input");
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

// ------------------------------ Totalsumman-funktion ------------------------- //

// När något ändras i total__spec (pris-specifikationen innan totalsumman) så uppdateras totalsumman.
const totalSpec = document.querySelector(".overview__info__total__spec");
totalSpec.addEventListener("DOMSubtreeModified", updateTotal);

function updateTotal() {
  let spanSum = 0;
  const allaSpan = document.querySelectorAll(".total__spec__option_price");
  const totalSum = document.querySelector(".total__sum");
  const totalSpecProductPrice = document.querySelector(
    ".overview__info__total__spec__product_price"
  );

  for (let i = 0; i < allaSpan.length; i++) {
    spanSum += Number(allaSpan[i].innerHTML);
  }

  // Lägger samman produktpris från spec med alla spans som har klassen ".overview__info__total__spec__product_price".
  totalSum.innerHTML =
    Number(totalSpecProductPrice.innerHTML) + Number(spanSum);
}

// ---------- TEST-SEKTION -------------
