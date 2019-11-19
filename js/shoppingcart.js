function ShowData(){
    const img = document.querySelector(".test")
   
    img.src= localStorage.getItem("data");
  }

  document.addEventListener("DOMContentLoaded", function (){
    ShowData();
  });