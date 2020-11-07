const searchBtn = document.querySelectorAll(".searchBtn");

const audiKeyWords = ['audi', 'audia5', 'audi-a5', 'a5']
const bmw = ['bmw', 'bmwm2', 'bmwm3', 'bmw-m8', 'bmw-m2', 'bmw-m3', 'bmw-m8']
const vw = ['vw', 'volkswagen', 'volkswagenTiguan', 'volkswagen-Tiguan']

searchBtn.forEach(currentBtn => {
  currentBtn.addEventListener("click",()=> {
    const input = document.querySelector("[data-nav-input]").value;   
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
        console.log("not valid")
      }
    }
  })
});
