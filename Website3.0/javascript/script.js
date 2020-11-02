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

//checks if mobile user so hide cards
window.addEventListener("load", hideCards());
function hideCards(){

    const cardCount = document.querySelectorAll(".visible > .card");
    let deviceWidth = window.innerWidth;
    if(deviceWidth < 762){
        for(let i = 0; i < cardCount.length; i++){
            if(i >= 3)
                cardCount[i].style.display = "none";
            else
                cardCount[i].style.display = "block";
        }
    }
}































// // //hides the plus icon on card hover on mobile
// function hidePlusBtn(deviceWidth) {
//     // let hideBtn = document.querySelectorAll(".btnContianer");
//     // for(let i = 0; i < hideBtn.length; i++){
//     //     console.log(hideBtn[i])
//     //     if(deviceWidth < 764){
//     //         hideBtn[i].style.display = "none"
//     //     }
//     //     else{
//     //         hideBtn[i].style.display = "flex"
//     //     }
//     // }
// }




// //toggle hamburger menu in and out
// const hamburgerTgl = document.querySelectorAll(".hamburger");

// //proj container to toggle
// const projUlSelector = document.querySelector(".projUL");

// //calls the hamburger btn function but lets u choose which menu to toggle
// let projHamburger = btnToggle(projUlSelector);



// //changes the class on li's and their background
// //also toggles the proj container's content
// //header is the li clicked
// function onClick(evt, header) {

//     const liClassToggle = document.querySelectorAll(".liClass");
//     const projects = document.querySelectorAll(".projects");
//     const liHeader = document.querySelector("#" + header);

//     for (let i = 0; i < liClassToggle.length; i++) {
//         liClassToggle[i].classList.remove("active");
//     }

//     for (let i = 0; i < projects.length; i++) {
//         projects[i].classList.remove("visible");
//     }

//     liHeader.classList.add("visible");

//     evt.currentTarget.classList.add("active");
//     btnToggle(projUlSelector)
// }


// // toggles the menu on mobile
// function btnToggle(ulSelector){
//     for (let i = 0; i < hamburgerTgl.length; i++) {
        
//         toggleProjMenu(hamburgerTgl[i], ulSelector);
        
//         hamburgerTgl[i].addEventListener("click", function() {
//             toggleProjMenu(hamburgerTgl[i], ulSelector);
//             console.log(hamburgerTgl[i])
//         });
//     }
// }



// //toggles the hamburger menu menu after li clicked
// //first arg: the btn to toggle
// //sec arg: the ul bar to trigger
// function toggleProjMenu(togglerBtn, ulSelector) {
//     togglerBtn.classList.toggle("open");
//     if (ulSelector.style.maxHeight){
//       ulSelector.style.maxHeight = null;
//     } else {
//       ulSelector.style.maxHeight = ulSelector.scrollHeight + "px";
//     }
// }































// window.onscroll = function() {test()};
// function test(){
    //
    //     let mainPageSelector = document.querySelector(".aboutPic");
    //
    //     let clientHeight = mainPageSelector.clientHeight;
    //     console.log("clientHeight: ",clientHeight);
    //
    //     let offsetHeight = mainPageSelector.offsetHeight;
    //     console.log("offsetHeight", offsetHeight);
    //
    //     let scrollHeight = mainPageSelector.scrollHeight;
    //     console.log("scrollHeight", scrollHeight);
    // }




// get all the liClass
// const liClassToggle = document.querySelectorAll('.liClass');

//go thry all of them one at a time
// for (let i = 0; i < liClassToggle.length; i++) {
//     console.log("i click loop", i)
//
//     //if the li thats clicked then do this
//     liClassToggle[i].addEventListener("click", function() {
//         console.log("i click loop", i)
//         //go thry all of the li lists and change class to liClass
//         for (let i = 0; i < liClassToggle.length; i++) {
//
//           if(liClassToggle[i].classList.contains("active")){
//               liClassToggle[i].classList.remove("active");
//           }
//
//         }
//
//         //add the class liClass and Active to the seleted element
//         liClassToggle[i].className = 'liClass active';
//     });
// }










//
//
// const liClassToggle = document.querySelectorAll('.liClass');
//
// // go thry all of them one at a time
// for (let i = 0; i < liClassToggle.length; i++) {
//     liClassToggle[i].onclick = function() {
//
//         if(liClassToggle[i].classList.contains("persoanlHeader"))
//             changeClass("perosnalProjects");
//
//
//         if(liClassToggle[i].classList.contains("guiHeader"))
//             changeClass("GUI");
//     };
// }
//
// function changeClass(projectDiv) {
//     const projects = document.querySelectorAll('.projects');
//
//     for (let i = 0; i < projects.length; i++) {
//         if(!projects[i].classList.contains(projectDiv))
//             projects[i].classList.remove("visible");
//          else
//             projects[i].classList.add("visible");
//     }
// }




//
// function changeClass(projectToggle) {
//     console.log("function called")
//     for (let i = 0; i < projects.length; i++) {
//         if(!projects[i].classList.contains(projectToggle))
//         {
//             console.log("removing class tab", projects[i]);
//             console.log("removing class from PP")
//             projects[i].classList.remove("visible");
//             console.log("class should be removed", projects[i]);
//         } else{
//             console.log("adding class from GUI")
//             projects[i].classList.add("visible");
//             console.log("class should be added", projects[i]);
//         }
//     }
// }



//
// const guiHeader = document.querySelector('.guiHeader');
// const persoanlHeader = document.querySelector('.persoanlHeader');
// const projects = document.querySelectorAll('.projects');

// persoanlHeader.addEventListener("click", () => {
//     for (let i = 0; i < projects.length; i++) {
//         if(projects[i].classList.contains("perosnalProjects"))
//             projects[i].style.display = "none";
//     }
// });
