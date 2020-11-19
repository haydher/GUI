// selects all the buttons to click
const btn = document.querySelectorAll("button");

// shows what player picked, ex. rock paper or scissor
const player = document.querySelector("#player");
const bot = document.querySelector("#bot");

// player images
const playerImg = document.querySelector(".playerImg");
const botImg = document.querySelector(".botImg");

// score
const playerScore = document.querySelector("#playerScore");
const botScore = document.querySelector("#botScore");

// the title
const tie = document.querySelector("#tie");

// to keep score
let playerI = 0;
let botI = 0;

// bot options array
const botOpt = ["rock", "paper", "scissors"];

// loop to go thru all buttons
btn.forEach(clickBtn => {

  clickBtn.addEventListener("click", ()=> {

    // get a random index from bot array
    const randArr = Math.floor(Math.random() * botOpt.length)
    // lower case the button text
    const lowerCase = (clickBtn.innerHTML).toLocaleLowerCase();

    // gives default img every time user clicks a button
    playerImg.src = `images/player-rock.png`
    botImg.src = `images/rock.png`

    // checks what the user clicked
    if(lowerCase == "rock")
      // does the game rules
      gameRule(lowerCase, botOpt, randArr)
    
    else if(lowerCase == "paper")
      gameRule(lowerCase, botOpt, randArr)
    
    else if(lowerCase == "scissors")
      gameRule(lowerCase, botOpt, randArr)
  })
});


function gameRule(lowerCase, botOpt, randArr){

  // waits a second to update user input
  const updateUserInfo = setInterval(()=> {
    player.textContent = firstLetterCap(lowerCase) ;
    bot.textContent = firstLetterCap(botOpt[randArr]);
    clearInterval(updateUserInfo)
  }, 1000)
 

  // checks all possible TIE outcomes 
  if((lowerCase == "scissors" && botOpt[randArr]  == "scissors") || 
  (lowerCase == "rock" && botOpt[randArr]  == "rock") || 
  (lowerCase == "paper" && botOpt[randArr]  == "paper")){
    
    // if valid, then wait a sec to update, cuase the animation
    let updateGame = setInterval(()=>{
      tie.textContent = "Its a Tie"
      clearInterval(updateGame)
    }, 1000)
    changeImg(lowerCase, botOpt, randArr)
  }

  else if( (lowerCase == "scissors" && botOpt[randArr]  == "rock") || 
  (lowerCase == "paper" && botOpt[randArr]  == "scissors")  || 
  (lowerCase == "rock" && botOpt[randArr]  == "paper") ){
    let updateGame = setInterval(()=>{
      // updates the bot score if user loses
      botI++;
      botScore.textContent = botI;
      tie.textContent = "You Lost"
      clearInterval(updateGame)
    }, 1000)
    changeImg(lowerCase, botOpt, randArr)
  }
  
  else if( (lowerCase == "scissors" && botOpt[randArr]  == "paper") || 
  (lowerCase == "paper" && botOpt[randArr]  == "rock")  || 
  (lowerCase == "rock" && botOpt[randArr]  == "scissors") ){
    let updateGame = setInterval(()=>{
      // update player score when win
      playerI++;
      playerScore.textContent = playerI;
      tie.textContent = "You Won!!!"
      clearInterval(updateGame)
    }, 1000)
    changeImg(lowerCase, botOpt, randArr)
  }
}

// animate / change the image when button clicked
function changeImg(lowerCase, botOpt, randArr){
  
  playerImg.classList.add("animatePlayer");
  botImg.classList.add("animateBot");
  
  imgChange = setInterval(()=>{
    
    playerImg.src = `images/player-${lowerCase}.png`
    botImg.src = `images/${botOpt[randArr]}.png`
    
    playerImg.classList.remove("animatePlayer");
    botImg.classList.remove("animateBot");
    
    clearInterval(imgChange)
  }, 1000);
}

// makes the first letter of what user picked capital 
function firstLetterCap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// reset the game to default
const reset = document.querySelector("#reset");

reset.addEventListener("click", ()=>{
  
  tie.textContent = "Good Luck!";
  
  playerI = 0;
  botI = 0;
  
  playerScore.textContent = playerI
  botScore.textContent = botI

  playerImg.src = `images/player-rock.png`
  botImg.src = `images/rock.png`

  playerImg.classList.remove("animatePlayer");
  botImg.classList.remove("animateBot");

  player.textContent = "None";
  bot.textContent = "None";

})