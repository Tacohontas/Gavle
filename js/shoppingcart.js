function ShowData() {
  const chosenproduct__product__img = document.querySelector(".chosenproduct__product__img")
  chosenproduct__product__img.src = localStorage.getItem("data");
}

document.addEventListener("DOMContentLoaded", function () { // DOMContentLoaded = När hela sidan laddats färdigt
  ShowData();
});