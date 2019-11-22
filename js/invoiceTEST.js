function ShowDataInvoice() {
  // Döp en variabel till en queryselector som väljer platsen du vill stoppa in infon i.

  // Section1
  const businessNameDiv = document.querySelector(".business_name_div");
  const streetDiv = document.querySelector(".street_div");
  const zipDiv = document.querySelector(".zip_div");
  const contactNameDiv = document.querySelector(".contact_name_div");
  const contactPhoneDiv = document.querySelector(".contact_phone_div");
  const contactEmailDiv = document.querySelector(".contact_email_div");
  const messageDiv = document.querySelector(".message_div");

  // Section2
  const dateDiv = document.querySelector(".date_div");
  const invoiceNumberDiv = document.querySelector(".invoicenumber_div");

  /* Här skriver vi in våran hämtade data från shoppingcart.html till div-boxar i den nuvarande html-filen. 
  
  syntaxen här är:
  variabelnamn.innerHTML = localStorage.getItem("namnet du satt på ditt localStorage-item");
  
  */
  businessNameDiv.innerHTML = localStorage.getItem("business_name");
  streetDiv.innerHTML = localStorage.getItem("street");
  zipDiv.innerHTML = localStorage.getItem("zip");
  contactNameDiv.innerHTML = localStorage.getItem("contact_name");
  contactPhoneDiv.innerHTML = localStorage.getItem("contact_phone");
  contactEmailDiv.innerHTML = localStorage.getItem("contact_email");
  messageDiv.innerHTML = localStorage.getItem("message");

  // Generera dagens datum.
  thisYear = new Date().getFullYear();
  thisMonth = new Date().getMonth() + 1; // +1 för att 0 = Januari.
  thisDate = new Date().getDate();
  dateDiv.innerHTML = `${thisYear} - ${thisMonth} - ${thisDate}`;

  // Randomisera fakturanummer
  // (Genererar nu ett nummer mellan 100000-900000)
  invoiceNumberDiv.innerHTML = Math.floor(Math.random() * 900000) + 100000;
}

// När HELA sidan laddats klart så körs ShowDataInvoice-funktionen:
document.addEventListener("DOMContentLoaded", function() {
  ShowDataInvoice();
});

// En Tillbaka-knapp för att komma tillbaks till shoppingcart (bara för att göra det lättare för oss att gå fram och tillbaka)
const returnBtn = document.querySelector(".tillbakabtn");
returnBtn.addEventListener("click", tillbakaTillShoppingcart);

function tillbakaTillShoppingcart() {
  window.document.location = "./shoppingcart.html";
}
