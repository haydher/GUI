/**********************
Name: Ali Haider     **
Class: GUI           **
Date: Nov 5th        **
In Class assignment 5 *
**********************/

//selecting the ul element
const ulList = document.querySelector("ul");
//making a node for each element
const first = document.createTextNode("kale");
const last = document.createTextNode("cream");

//prepending it before the first element or the first li
ulList.prepend(addLi(first));
//appending it after the last element
ulList.append(addLi(last))

//makes a new li and adds the node to it and returns it to be added in the UL
function addLi(node){
  const newLi = document.createElement("li");
  newLi.appendChild(node);
  return newLi;
}

//add class "cool" to all the li's 
const liList = document.querySelectorAll("li");
for (const li of liList) li.classList.add("cool");

//making the number badge 
//the setAttribute looks ugly but i didnt want to change the css file
const headerCounter = document.querySelector("#page > h2");
const newEM = document.createElement("em");
const badgeCounter = document.createTextNode(liList.length);
newEM.setAttribute("style", "background: black; padding: 2px 8px; border-radius: 20px; font-size: 14px");
newEM.appendChild(badgeCounter);
headerCounter.appendChild(newEM);