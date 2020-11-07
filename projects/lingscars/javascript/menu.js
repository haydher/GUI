const menuSearchBtn = document.querySelector("#menuSearch");

menuSearchBtn.addEventListener("click",()=> {

  const input = document.querySelector("[data-menu-input]").value;   
  const inputValue = input.toLowerCase().trim().replace(/\s/g,''); 
 
  if(inputValue.length > 0){
    if(audiKeyWords.indexOf(inputValue) > -1){
      location.replace("audi/audi.html")
    } else if(bmw.indexOf(inputValue) > -1){
      location.replace("bmw.html")
    } else if(vw.indexOf(inputValue) > -1){
      location.replace("vw.html")
    } 
    else{
      location.replace("404.html")
    }
  }
})
