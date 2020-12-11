let letters = `{"pieces": [
	{"letter":"A", "value":1,  "amount":9},
	{"letter":"B", "value":3,  "amount":2},
	{"letter":"C", "value":3,  "amount":2},
	{"letter":"D", "value":2,  "amount":4},
	{"letter":"E", "value":1,  "amount":12},
	{"letter":"F", "value":4,  "amount":2},
	{"letter":"G", "value":2,  "amount":3},
	{"letter":"H", "value":4,  "amount":2},
	{"letter":"I", "value":1,  "amount":9},
	{"letter":"J", "value":8,  "amount":1},
	{"letter":"K", "value":5,  "amount":1},
	{"letter":"L", "value":1,  "amount":4},
	{"letter":"M", "value":3,  "amount":2},
	{"letter":"N", "value":1,  "amount":6},
	{"letter":"O", "value":1,  "amount":8},
	{"letter":"P", "value":3,  "amount":2},
	{"letter":"Q", "value":10, "amount":1},
	{"letter":"R", "value":1,  "amount":6},
	{"letter":"S", "value":1,  "amount":4},
	{"letter":"T", "value":1,  "amount":6},
	{"letter":"U", "value":1,  "amount":4},
	{"letter":"V", "value":4,  "amount":2},
	{"letter":"W", "value":4,  "amount":2},
	{"letter":"X", "value":8,  "amount":1},
	{"letter":"Y", "value":4,  "amount":2},
	{"letter":"Z", "value":10, "amount":1},
	{"letter":"_", "value":0,  "amount":2}
  ]
}`

let newLetters = JSON.parse(letters)

// array to hold the images to show
let lettersArr = [];

// go thru the json and get each "letter"
for(let i = 0; i < newLetters.pieces.length; i++){
  // get the amount of the letters and push them into the array. the arry should have 100 values
  for(let j = 0; j < newLetters.pieces[i].amount; j++)
    // push the letter into the array based on its amount
    lettersArr.push(`imgs/${newLetters.pieces[i].letter.toLowerCase()}.jpg`)
 
} 
// reloads the page / restart the game
document.querySelector(".reset").addEventListener("click",()=>{
  location.reload();
})


// get the src of the current img
let currImgSrc = "";
// check if img was moved successfully
let dropped = true;
// get the id of the element where the img was dragged from
let parent;
// gets the value of the tile from the src of img
let letterValue = "a";
// checks if the img was dragged out of the box
let draggedOver = false;
// check if there are siblings for the tiles (to check for random spaces between words)
let siblings = false;
// the user score
let userScore = 0;

const currentWord = document.querySelector(".currentWord")
const score = document.querySelector(".score")

// get the rack stack
const restockBtn = document.querySelector(".restock")
const rackBox = document.querySelectorAll(".rack > .empty")
const clearBoardTiles = document.querySelectorAll(".dropBox")





// keep getting the updated values
setInterval(() => {
  // select the fill element (our image)
  let fill = document.querySelectorAll(".fill");

  fill.forEach(currImg => {
    // dragStart event listens when dragging has been started
    currImg.addEventListener("dragstart", dragStart);
    // dragEnd listens for when u let go of the object
    currImg.addEventListener("dragend", dragEnd);
  });

  // select all the boxes 
  const empty = document.querySelectorAll(".empty");

  // goes thru each of our box
  empty.forEach(emptyBox => {
    emptyBox.addEventListener("dragover", dragOver);
    emptyBox.addEventListener("dragenter", dragEnter);
    emptyBox.addEventListener("dragleave", dragLeave);
    emptyBox.addEventListener("drop", dragDrop);
  });

}, 100);


function dragStart(){
  // console.log("start")

  // add class hold (a border around the img), so we know we are holding it
  this.classList.add("hold");

  // get the src of the current img
  currImgSrc = this.children[0].src
  // gets the parent element so if the drag wasnt successful then undo the img
  parent = this.parentElement

  // remove the element once moved
  setTimeout(()=> (parent.textContent = ""), 0);

}

// drag end listens for the end of the list
function dragEnd(){
  console.log("end")
  // add the img back if u stop dragging it 
  this.classList.add("fill")
  if(dropped == false || draggedOver == false){
    newImgMaker(parent)
    errorLog("errInvalid")
  }
}


// listens for when the img is on this particular box
function dragOver(e){
  console.log("dragOver")

  // prevent the default behaviour of dragover otherwise dragDrop() wouldnt work
  e.preventDefault();
  draggedOver = true;
}


// checks when img enters the div
function dragEnter(){
  console.log("dragEnter")
  this.classList.add("hovered")
}

// keeps the original siblings, avoids take out the middle tile
let parentPrevious, parentNext;
// checks when img leaves the div
function dragLeave(){
  console.log("dragLeave")

  // check if user is moving tile from between two other tiles leaving empty space
  if(!this.classList.contains("first") && !this.classList.contains("rackLetters") )
    parentPrevious = this.previousSibling.previousSibling.childNodes.length;

  if(!this.classList.contains("last") && !this.classList.contains("rackLetters") )
    parentNext = this.nextSibling.nextSibling.childNodes.length;


  // if the image is dragged out of the box then set it to false so it doesnt make the img disappear
  draggedOver = false;
  this.classList.remove("hovered")
}


let previous, next;

// checks when img is dropped in the div
function dragDrop(){
  console.log("dragDrop")
  this.classList.remove("hovered")

  const checkSib = document.querySelectorAll(".dropBox")
  siblings = [...checkSib].some(getSiblings)

  // check for spaces
  if(!this.classList.contains("first")
   && this.classList.contains("dropBox"))
    previous = this.previousSibling.previousSibling.childNodes.length;
 
  if(!this.classList.contains("last")
   && this.classList.contains("dropBox"))
    next = this.nextSibling.nextSibling.childNodes.length;
  moveTileValidate(this)

 
}

function moveTileValidate(elem){
  // if the box already contains an img then dont append
  if(elem.childNodes.length < 1 && draggedOver === true ){

    //  once the tile has been placed. it should not be moved around
    if(parent.classList.contains("undraggable")){
      dropped = false;
      draggedOver = false;
      errorLog("errUndraggable")
      return;
    }


      // check if the dropped box is the same box not the rack, if so take the value of the word
    if(elem.classList.contains("dropBox") && (previous == 1 || next == 1 || siblings == false)){
      clearErrorLog()
      newImgMaker(elem);
      elem.classList.add("undraggable")
      
      siblings == true

      // get the letter value from the img src
      letterValue = currImgSrc.substring(currImgSrc.indexOf("imgs/") + 5, currImgSrc.indexOf(".jpg"));
      updateUserScore(letterValue, elem)
    } 
    
    
    else if(parentPrevious == 1 && parentNext == 1 ){
      dropped = false;
      draggedOver = false;
      newImgMaker(parent);
      errorLog("errParentSiblings")
    }


    // if user bring letter back to stack allow it
    else if(elem.classList.contains("rackLetters")){
      newImgMaker(elem);
      // get the letter value from the img src
      letterValue = currImgSrc.substring(currImgSrc.indexOf("imgs/") + 5, currImgSrc.indexOf(".jpg"));
      updateUserScore(letterValue, elem)
    } 
    // if it wasnt a valid play and it was not the rack then reset the letter
    else{
      dropped = false;
      draggedOver = false;
      newImgMaker(parent);
      errorLog("errNoSiblings")
    }

    // if drag was successful
    dropped = true;
    draggedOver = true;
  }
  // if the box already contains img then dont add
  else{
    dropped = false;
    draggedOver = false;
    errorLog("errTileExists")
  }
}

// checks if siblings exist for the game board 
function getSiblings(elem){
  if(elem.childNodes.length == 1)
    return true;
  return false;
} 


// adds the word to the total score and restock the user hands
const sbmWord = document.querySelector(".checkWord")
const totalScore = document.querySelector(".totalScore")
let tempUserScore = 0;
sbmWord.addEventListener("click", ()=>{
  tempUserScore = tempUserScore + userScore
  totalScore.textContent = tempUserScore
  stockRack()
})

// // get the rack stack
// const restockBtn = document.querySelector(".restock")
// const rackBox = document.querySelectorAll(".rack > .empty")
// const clearBoardTiles = document.querySelectorAll(".dropBox")

// restocks the rack of images
restockBtn.addEventListener("click", stockRack)
// call it once before the game starts
stockRack()
// get random images each time page loads
function stockRack(){

  rackBox.forEach(box => {
    
    // const rand = lettersArr[Math.floor(Math.random() * lettersArr.length)];
    const index = Math.floor(Math.random() * lettersArr.length)
    const rand = lettersArr[index]
    // console.log({ index, randomLetter })
    
    // add img on the tack
    if(box.children[0] == undefined){
      newImgMaker(box, rand)
    
      // take the words out of the array once they are on the stack
      lettersArr.splice(index, 1);

      // update the remaining letters for the user
      document.querySelector(".remainingLetters").textContent = lettersArr.length;
    } 
  });

  // clear the board if user wishes to get more tiles
  clearBoardTiles.forEach(element => {
    if(element.childElementCount >= 0){
      element.innerHTML = ""
      userScore = 0;
      score.innerHTML = userScore
      currentWord.innerHTML = "-"
    }
  });
}

// gets the current img and moves it
function newImgMaker(box, img = currImgSrc){
  // every time the block is moved, it makes a new img and deletes the old one
  const newDiv = document.createElement("div")
  const newImg = document.createElement("img")
  
  newDiv.classList.add("fill")
  newDiv.setAttribute('draggable', true);

  newImg.src = img;

  newDiv.append(newImg)
  box.append(newDiv)
}


function updateUserScore(letter, element){


  for(let i = 0; i < newLetters.pieces.length; i++){
    // get the letter from the JSON file
    if(newLetters.pieces[i].letter === letter.toUpperCase()){

      // if the tile has not been moved from original spot, then dont add score
      if(element == parent)
       return;

        // if the selected letter is placed on doubleScore, then score is doubled
      if(element.classList.contains("doubleScore")){
        userScore = userScore + (newLetters.pieces[i].value * 2);
      
      }
      // else if its just a regular box, then only add the original value
      else if(!element.classList.contains("doubleScore")
       && element.classList.contains("dropBox")){
        userScore = userScore + newLetters.pieces[i].value;
       }      

      // if the tile is brought back from the table and it was from doubleScore
      // then take out respected amount of score
      if(parent.classList.contains("doubleScore") 
        && element.classList.contains("rackLetters"))
        userScore = userScore - (newLetters.pieces[i].value * 2);

      // if it was on anyother block then just take out original value
      else if(element.classList.contains("rackLetters") 
        && !parent.classList.contains("doubleScore"))
        userScore = userScore - newLetters.pieces[i].value;
    
      // update the values for the user
      currentWord.textContent = letter.toUpperCase()
      score.textContent = userScore;
    }
  }
}

// logs the errors
const err = document.querySelector("#err");
function errorLog(errType = "errDefault"){
  
  const errDefault = "There was an error moving the tile"
  const errUndraggable = "The tile can't be moved once placed on the board. Please submit the word to clear the board."
  const errNoSiblings = "The tile couldn't be placed. The letter needs to be next to an existing tiles."
  const errParentSiblings = "The tile can't be moved from the middle of the tiles. Please move the words next to it first."
  const errInvalid = "The tile couldn't move successfully. Please place the tiles in the correct place."
  const errTileExists = "The block already contains a tile. Please place the tile in an empty block"
  const errNoRestock = "Can not restock the hand if board still has tiles, please submit the current word before stocking."

  clearErrorLog();
  switch(errType){
    case "errUndraggable":
      err.textContent = errUndraggable;
      break;
    case "errNoSiblings":
      err.textContent = errNoSiblings;
      break;
    case "errParentSiblings":
      err.textContent = errParentSiblings;
      break;
    case "errTileExists":
      err.textContent = errTileExists;
      break;
    case "errNoRestock":
      err.textContent = errNoRestock;
      break;
    case "errInvalid":
      err.textContent = errInvalid;
      break;
    case "errDefault":
      err.textContent = errDefault;
      break;

  }
}

function clearErrorLog(){
  err.innerHTML = ""
}

