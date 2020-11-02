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