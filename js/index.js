const buyBtn = document.querySelectorAll(".productinfo__card-btn");

const productPrices = document.querySelectorAll(".productinfo__card-price");
const productPriceInner = productPrices[0].innerHTML;
const productPriceSplit = productPriceInner.split("kr");

for (let i = 0; i < buyBtn.length; i++) {
  buyBtn[i].addEventListener("click", () => {
    // Produktbild

    // ...Letar efter närmsta div-element till button
    const buyBtnDivParent = buyBtn[i].closest("div");
    // ...Selectar första child i köp-knappens parent.
    const productImgSrc = buyBtnDivParent.firstElementChild.src;

    // Produktpris
    const productPrices = document.querySelectorAll(".productinfo__card-price");
    const productPriceInner = productPrices[i].innerHTML;
    const productPriceSplit = productPriceInner.split("kr");
    const productPrice = productPriceSplit[0];
    
    //Produktnamn
    const productName = document.querySelector(".productinfo__card-name").innerHTML;

    // Sätter bild och produktens pris i localStorage.
    localStorage.setItem("product_img", productImgSrc);
    localStorage.setItem("product_price", productPrice);
    localStorage.setItem("product_name", productName);
    window.document.location = "./shoppingcart.html";
    console.log(productPrice);
  });
}
