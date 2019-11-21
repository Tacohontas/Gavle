function ShowDataInvoice() {
  const nameDiv = document.querySelector(".namediv"); // Döp en variabel till en selector som väljer platsen du vill stoppa in info.
  const phoneDiv = document.querySelector(".phonediv");

  // syntaxen här är:
  // variabelnamn.innerHTML = localStorage.getItem("namnet du satt på ditt item");
  nameDiv.innerHTML = localStorage.getItem("namn");
  phoneDiv.innerHTML = localStorage.getItem("telefon");
}

// När HELA sidan laddats klart så körs ShowDataInvoice-funktionen:
document.addEventListener("DOMContentLoaded", function() {
  ShowDataInvoice();
});
