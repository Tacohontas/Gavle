document.addEventListener("DOMContentLoaded", function() {
  // DOMContentLoaded = När hela sidan laddats färdigt
  ShowData();
});

const addBtn = document.querySelector(".addDetails");
addBtn.addEventListener("click", addInfo);

function ShowData() {
  const chosenproduct__product__img = document.querySelector(
    ".chosenproduct__product__img"
  );
  chosenproduct__product__img.src = localStorage.getItem("data");
}

function addInfo() {
  const formName = document.querySelector("#business_name").value;
  const formPhone = document.querySelector("#contact_phone").value;

  localStorage.setItem("namn", formName);
  localStorage.setItem("telefon", formPhone);

  window.document.location = "../html/invoiceTEST.html";
}
