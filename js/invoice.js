function ShowDataonInvoice() {
    //section 1 - datum, fakturanr, förfallodatum
    const datum = document.querySelector(".invoice__num-date");
    const fakturanr = document.querySelector(".invoice__num-invnr");
    const ffdatum = document.querySelector(".invoice__num-ff");

    //section 2 - Adress, kontakt
    const fnamn = document.querySelector(".invoice__adress-fnamn");
    const gata = document.querySelector(".invoice__adress-gata");
    const postnr = document.querySelector(".invoice__adress-postnr");
    const pers = document.querySelector(".invoice__adress-pers");
    const tel = document.querySelector(".invoice__adress-tel");
    const mail = document.querySelector(".invoice__adress-mail");

    //section 3 - Produkt, tillval, meddelande
    const produkt = document.querySelector(".invoice__spec-produkt");
    const tillval = document.querySelector(".invoice__spec-tillval");
    const med = document.querySelector(".invoice__spec-med");

    //section 4 - pris på produkt och tillval
    const produktsumma = document.querySelector(".invoice__sum-produkt");
    const tillvalsumma = document.querySelector(".invoice__sum-tillval");

    //section 5 - Total summa ex moms
    const totalsumma = document.querySelector(".invoice__total-total");

    //Dagens datum
    thisYear = new Date().getFullYear();
    thisMonth = new Date().getMonth() +1;
    thisDate = new Date().getDate();
    datum.innerHTML = `${thisYear} - ${thisMonth} - ${thisDate}`;
    
    //Fakturanummer
    fakturanr.innerHTML = Math.floor(Math.random() * 900000) + 100000;

    //Förfallodatum
    thisYear = new Date().getFullYear();
    thisMonth = new Date().getMonth() +1;
    thisDate = new Date().getDate();
    ffdatum.innerHTML = `${thisYear} - ${thisMonth} - ${thisDate}`;

    //Hämta företagsinfo ifylld i varukorgen
    fnamn.innerHTML = localStorage.getItem("business_name");
    gata.innerHTML = localStorage.getItem("street");
    postnr.innerHTML = localStorage.getItem("zip");
    pers.innerHTML = localStorage.getItem("contact_name");
    tel.innerHTML = localStorage.getItem("contact_phone");
    mail.innerHTML = localStorage.getItem("contact_email");

    //Hämta produkt och tillval info från varukorgen
    med.innerHTML = localStorage.getItem("message");
}

document.addEventListener("DOMContentLoaded", function () {
    ShowDataonInvoice();
});

// En Tillbaka-knapp för att komma tillbaks till shoppingcart (bara för att göra det lättare för oss att gå fram och tillbaka)
const returnBtn = document.querySelector(".invoice__back");
returnBtn.addEventListener("click", tillbakaTillShoppingcart);

function tillbakaTillShoppingcart() {
  window.document.location = "./shoppingcart.html";
}


//Det här funka ej.. 
/* const printbtn = document.querySelector(".invoice__print");
const doc = new jsPDF();

function PrintInvoice() {
  

  doc.fromHTML(document.querySelector(".invoice")).html(), 15, 15, {
    "width": 170,
  };
  
  doc.save("test.pdf");

};

printbtn.addEventListener("click", PrintInvoice);
*/