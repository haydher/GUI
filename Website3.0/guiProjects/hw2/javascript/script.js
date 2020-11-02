let darkModeImgTracker = "dark";

const logo = document.querySelector(".logo");
const darkModeImg = document.querySelector(".darkModeImg");
const toggleImg = document.querySelector(".darkModeToggle");
const toggleBG = document.querySelector(".darkActive");
const dMbPh = document.querySelectorAll (".dMbPh");
const dMpH = document.querySelectorAll (".dMpH");

toggleImg.addEventListener("click", function() {

    if(darkModeImgTracker == "dark")
    {
        logo.src = "images/logoDarkMode.svg";
        darkModeImg.src = "images/sun.svg";
        darkModeImgTracker = "light";
        toggleImg.classList.add("darkActive");
        dMbPh.forEach(element => {
            // now you have an individual element. do whatever you want to it
            element.classList.add("darkModeBody");

        });

        dMpH.forEach(element => {
            element.classList.add("darkMode");
        });
    }
    else{
        darkModeImg.src = "images/darkMode.svg";
        darkModeImgTracker = "dark";
        toggleImg.classList.remove("darkActive");
        dMbPh.forEach(element => {
            // now you have an individual element. do whatever you want to it
            element.classList.remove("darkModeBody");

        });

        dMpH.forEach(element => {
            element.classList.remove("darkMode");
        });


    }
})
