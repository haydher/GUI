const welcome = document.querySelector("h3");

const today = new Date();
const hourNow = today.getHours();
let greeting;

if (hourNow < 12) {
    greeting = "Good Morning";
}else if (hourNow >= 12 && hourNow <= 18) {
    greeting = "Good Afternoon";
}else if (hourNow > 18 && hourNow <= 24) {
    greeting = "Good Evening";
}else {
    greeting = "Welcome!";
}

welcome.innerHTML = greeting;
