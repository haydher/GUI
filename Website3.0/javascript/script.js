//change navBar color on scroll for larger devices
window.onscroll = function() {scrollFunction()};
function scrollFunction() {

    //gets the height of the window of user screen
    //mainPage is 100vh so its 100 window height
    let mainPageSelector = document.querySelector("#mainPage");
    let elementHeight = mainPageSelector.clientHeight;
    
    let deviceWidth = window.innerWidth;

    if (deviceWidth > 992){
        if(document.body.scrollTop > elementHeight || document.documentElement.scrollTop > elementHeight)
            document.querySelector("#navBar").style.background = "#121212";
         else
            document.querySelector("#navBar").style.background = "none";
    }
    else
        document.querySelector("#navBar").style.background = "#121212";
}

//toggle header navbar hamburger menu in and out
const navBurger = document.querySelector("#navBurger");
const navBarUlSelector = document.querySelector(".navUL");

navBurger.addEventListener("click", function() {
    toggleProjMenu(navBurger, navBarUlSelector);
});


//toggle project navbar hamburger menu in and out
const projBurger = document.querySelector("#projBurger");
const projUlSelector = document.querySelector(".projUL");

// //changes the class on li's and their background
// //also toggles the proj container's content
// //header is the li clicked
function onClick(evt, header) {

    const liClassToggle = document.querySelectorAll(".liClass");
    const projects = document.querySelectorAll(".projects");
    const liHeader = document.querySelector("#" + header);

    for (let i = 0; i < liClassToggle.length; i++) {
        liClassToggle[i].classList.remove("active");
    }

    for (let i = 0; i < projects.length; i++) {
        projects[i].classList.remove("visible");
    }

    liHeader.classList.add("visible");

    evt.currentTarget.classList.add("active");
    
    toggleProjMenu(projBurger, projUlSelector);
    
    hideCards();
}

// toggles the menu on mobile
projBurger.addEventListener("click", function() {
    toggleProjMenu(projBurger, projUlSelector);
});


//toggles the hamburger menu menu after li clicked
//first arg: the btn to toggle
//sec arg: the ul bar to trigger
function toggleProjMenu(togglerBtn, ulSelector) {
    togglerBtn.classList.toggle("open");
    if (ulSelector.style.maxHeight){
      ulSelector.style.maxHeight = null;
    } else {
      ulSelector.style.maxHeight = ulSelector.scrollHeight + "px";
    }
}
