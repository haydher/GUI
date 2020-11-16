//updates the copyright date
const videoContainer = document.querySelector(".card-container")
const copyright = document.querySelector("#copyright").textContent = new Date().getFullYear();


let firstHeading = document.getElementById("about");
let deviceWidth = window.innerWidth;

const visible = document.querySelector(".visible")
const visibleMobile = document.querySelector(".visible-mobile")

//background scroll effect
window.addEventListener("scroll", ()=>{
  if (deviceWidth > 996){
    let scroll = window.pageYOffset;
    const bg = document.querySelector(".fix-bg");
    const welcomeContainer = document.querySelector(".welcome-container");
    bg.style.top = -(scroll * -.4) + "px"
    welcomeContainer.style.top = -(scroll * -.6) + "px"

    scanDocument(visible);
    }
});

//some elements dont show in mobile until scroll so this overrides
visibleInMobile(visibleMobile);

function isVisible(element) {
  let elementBox = element.getBoundingClientRect();
  let distanceFromTop = -200; 

  if(elementBox.top - window.innerHeight < distanceFromTop)
    return true;
  else 
    return false;
}

function scanDocument(className) {
  let sectionList = document.querySelectorAll('.hidden');
  sectionList.forEach(function(section) {
    if(isVisible(section)) 
      section.classList.remove('hidden');
      section.classList.add(className);
  });
}

function visibleInMobile(className) {
  let sectionList = document.querySelectorAll('.hidden');
  sectionList.forEach(function(section) {
      section.classList.remove('hidden');
      section.classList.add(className);
  });
}

//toggle header navbar hamburger menu in and out
//toggles the hamburger menu menu after li clicked
//first arg: the btn to toggle
//sec arg: the ul bar to trigger
const navBurger = document.querySelector("#navBurger");
const navBarUlSelector = document.querySelector(".navUL");

navBurger.addEventListener("click", function() {
    navBurger.classList.toggle("open");
  if (navBarUlSelector.style.maxHeight){
    navBarUlSelector.style.maxHeight = null;
  } else {
    navBarUlSelector.style.maxHeight = navBarUlSelector.scrollHeight + "px";
  }
});
