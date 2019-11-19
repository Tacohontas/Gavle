/*
const btn = document.querySelector(".productinfo__card-btn");
const data = document.querySelector(".productinfo__card-img").src;
 


btn.addEventListener("click", ()=>{
console.log(data)
localStorage.setItem("data", data);

window.document.location="./shoppingcart.html";
});
*/




const btn = document.querySelectorAll("button");


for(let i = 0; i<btn.length; i++){

btn[i].addEventListener("click", ()=>{
    const data = btn[i].closest("div");
const data2 = data.firstElementChild.src;   
    console.log(data2)
    localStorage.setItem("data", data2);
    window.document.location="./shoppingcart.html";
    });
}