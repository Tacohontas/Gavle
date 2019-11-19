const buyBtn = document.querySelectorAll(".productinfo__card-btn");


for (let i = 0; i < buyBtn.length; i++) {

    buyBtn[i].addEventListener("click", () => {
        const buyBtnDivParent = buyBtn[i].closest("div"); // Letar efter närmsta div-element till button
        const data = buyBtnDivParent.firstElementChild.src; // Selectar första child i köp-knappens parent.
        console.log(data)
        localStorage.setItem("data", data);
        window.document.location = "./shoppingcart.html";
    });
}