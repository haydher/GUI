// File: https://cs.uml.edu/~ahaider/guiProjects/hw5/index.html
//  Assignment: Multiplication table using javascript
//  Ali Haider, UMass Lowell Computer Science, ali_haider@student.uml.edu
//  Copyright (c) 2020 by Ali Haider. All rights reserved. May be
//  freely copied or excerpted for educational purposes with credit to the
//  author.
//  Updated by Ali Haider on Nov 4, 2020 at 9:00 pm


$(document).ready(function () {

    $.validator.addMethod('lessThanMin', function(value, element, param) {
      return this.optional(element) || value >= $(param).val();
    } , "Maximum value can't be less than the minimum value.");
  

    $("form").submit(function(e) {
          e.preventDefault();
          makeTable();
    }).validate({
      rules: {
        "minXValue": {
        required: true,
        range: [-150, 150],
        },
        "maxXValue": {
          required: true,
          range: [-150, 150],
        //   lessThanMin: "#minXValue"
        },
        "minYValue": {
          required: true,
          range: [-150, 150]
        },
        "maxYValue": {
          required: true,
          range: [-150, 150],
        //   lessThanMin: "#minYValue"
        }
      },
      messages: {
        minXValue: {
          required: "Please enter a minimum column value. Must be an integer.",
          range: "Number must be between -150 to 150."
        },
        maxXValue: {
          required: "Please enter a minimum column value. Must be an integer.",
          range: "Number must be between -150 to 150."
        },
        minYValue: {
          required: "Please enter a minimum row value. Must be an integer.",
          range: "Number must be between -150 to 150."
        },
        maxYValue: {
          required: "Please enter a minimum row value. Must be an integer.",
          range: "Number must be between -150 to 150."
        },
      },
    });
    
  });


function makeTable(){

    let minXValue = parseInt(document.querySelector(".minXValue").value);
    let maxXValue = parseInt(document.querySelector(".maxXValue").value);
    let minYValue = parseInt(document.querySelector(".minYValue").value);
    let maxYValue = parseInt(document.querySelector(".maxYValue").value);
    const table = document.querySelector("table");
    let swap = document.createTextNode("Swapped numbers because min was greater than max.");

    //deletes the older table if it already exists
    tableOldDelete(table);

    //swap values if min is greater than max
    if(minXValue > maxXValue){
        let temp;
        temp =  maxXValue;
        maxXValue = minXValue;
        minXValue = temp;
        logError(swap);
    }
    if(minYValue > maxYValue){
        let temp;
        temp =  maxYValue;
        maxYValue = minYValue;
        minYValue = temp;
        logError(swap);
    } 

    if(validator(minXValue, maxXValue, minYValue, maxYValue) != 0){
        
        //creats the X header
        tableHeading(minXValue, maxXValue, minYValue, maxYValue, table);
        //makes each row
        colMaker(minXValue, maxXValue, minYValue, maxYValue, table);
    }
    
};


//makes the X header
//creates new TR's in the table
function tableHeading(minXValue, maxXValue, minYValue, maxYValue, table) {
    const newTR = document.createElement("TR");
    document.createElement("TH");

    //creates empty box before start of table in the table
    emptyTH(newTR);

    for(let i = minXValue; i <= maxXValue; i++){
        const newTH = document.createElement("TH");
        const value = document.createTextNode(i);

        newTH.appendChild(value);
        newTR.appendChild(newTH);
    }
    table.appendChild(newTR);
}

//creates empty Col in the table
function emptyTH(newTR) {
    const emptyNode = document.createElement("TH");
    emptyNode.appendChild(document.createTextNode(""));
    newTR.appendChild(emptyNode);
}

//makes the Y / Rows
function colMaker(minXValue, maxXValue, minYValue, maxYValue, table) {
    for(let y = minYValue; y <= maxYValue; y++){
        //creates new TR variable
        const newTR = document.createElement("TR");

        //creates a TH before each new col
        const newTH = document.createElement("TH");
        const value = document.createTextNode(y);
        newTH.appendChild(value);
        newTR.appendChild(newTH);
        table.appendChild(newTR);

        //fills each TR with content
        colTableFiller(newTR, minXValue, maxXValue, minYValue, maxYValue, y);
    }
}

//fills the rows with math answers
function colTableFiller(newTR, minXValue, maxXValue, minYValue, maxYValue, y) {

    let newTD;
    let value;

    for(let x = minXValue; x <= maxXValue; x++)
    {
        let product = x * y;
        value = document.createTextNode(product);
        newTD = document.createElement("TD");
        newTD.appendChild(value);
        newTR.appendChild(newTD);
    }
}

//deletes the older table and creates a new one
function tableOldDelete(table){
    while(table.firstChild){
        table.removeChild(table.firstChild)
    }
}

//checks if the form is valid
function validator(minXValue, maxXValue, minYValue, maxYValue){

    if(isNaN(minXValue) || isNaN(maxXValue) || isNaN(minYValue) || isNaN(maxYValue))
        return 0;
    else if (minXValue < -150 || maxXValue > 150 || minYValue < -150 || maxYValue > 150)
        return 0;
    else
        return 1;
    
}

//logs the error
function logError(errorNode){
    const errorLog = document.querySelector("#errorLog");
    const newP = document.createElement("P");
    clearErrorLog();
    newP.appendChild(errorNode);
    errorLog.appendChild(newP)
}

//clears the error before showing table
function clearErrorLog(){
    const errorLog = document.querySelector("#errorLog");
    while(errorLog.firstChild){
        errorLog.removeChild(errorLog.firstChild)
    }
}

