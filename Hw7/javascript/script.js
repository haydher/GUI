// File: https://cs.uml.edu/~ahaider/guiProjects/hw7/index.html
//  Assignment: Multiplication table using javascript
//  Ali Haider, UMass Lowell Computer Science, ali_haider@student.uml.edu
//  Copyright (c) 2020 by Ali Haider. All rights reserved. May be
//  freely copied or excerpted for educational purposes with credit to the
//  author.
//  Updated by Ali Haider on Nov 25, 2020 at 3:00 am

// range for the numbers
const RangeNeg = -60;
const RangePos = 60;
$(document).ready(function () {

  // dont make the table until all values are entered
  let minXValueBool = false;
  let maxXValueBool = false;
  let minYValueBool = false;
  let maxYValueTBool = false;

  // initialize the tabs
  $(".tabContainer").tabs();

  // make a new tab
  $(".makeNewTab").on("click", function (e) {
    // get the current values of the table
    let minXValue = $(".minXValue").val();
    let maxXValue = $(".maxXValue").val();
    let minYValue = $(".minYValue").val();
    let maxYValue = $(".maxYValue").val();

    // make the table link
    const tableHeader = `[${minXValue},${maxXValue}]x[${minYValue},${maxYValue}]`

    // if table exits, then dont make it again
    if (document.getElementById(tableHeader)) {
      const tableExists = document.createTextNode("Table already exists");
      logError(tableExists)
      return false;
    }
    // if table has not been made yet, then request to make it
    if (minXValueBool != false && maxXValueBool != false &&
      minYValueBool != false && maxYValueTBool != false) {
      clearErrorLog()
      $("#tabList").append(makeTab(tableHeader));

      const tabTableContainer = $("#tabData");
      const currentTable = document.querySelector(".tableContainer table").outerHTML;

      // tabTableContainer.append(makeTabContent(tableHeader, newCurrentTable));
      tabTableContainer.append(
        `<div id='${tableHeader}'>
            <div class='overflow'>${currentTable}</div>
          </div>`
      );
    } else {
      // otherwise make the table
      const tableEmpty = document.createTextNode("Please fill all values");
      logError(tableEmpty)
    }
    // refresh the tabs once they are made
    $(".tabContainer").tabs("refresh");
    e.preventDefault()
  })

  // delete selected tab (got it from jquery website)
  const tabs = $(".tabContainer").tabs();
  tabs.on("click", "span.ui-icon-close", function () {
    dltSingleTab(this) 
    tabs.tabs("refresh");
  });
  // Deletes all selected tabs.
  $(".dltCheckedTabs").on("click", function () {
    deleteSelectedTabs()
    $(".tabContainer").tabs("refresh");
  });

  $('#minColSlider').slider({
    min: RangeNeg,
    max: RangePos,
    slide: function (event, ui) {
      $("#minXValue").val(parseInt(ui.value));
    },
    // couldnt update the table while scrolling, it was causing lag, same for all
    stop: function (event, ui) {
      minXValueBool = true;
      $("#minXValue").val(parseInt(ui.value));
      // only make the table if user has used all inputs
      if (minXValueBool === true && maxXValueBool === true &&
        minYValueBool === true && maxYValueTBool === true) {
        makeTable()
      }
    }
  });

  $('#maxColSlider').slider({
    min: RangeNeg,
    max: RangePos,
    slide: function (event, ui) {
      $("#maxXValue").val(parseInt(ui.value));
    },
    stop: function (event, ui) {
      maxXValueBool = true;
      $("#maxXValue").val(parseInt(ui.value));

      if (minXValueBool === true && maxXValueBool === true &&
        minYValueBool === true && maxYValueTBool === true) {
        makeTable()
      }
    }
  });

  $('#minRowSlider').slider({
    min: RangeNeg,
    max: RangePos,
    slide: function (event, ui) {
      $("#minYValue").val(parseInt(ui.value));
    },
    stop: function (event, ui) {
      minYValueBool = true;
      $("#minYValue").val(parseInt(ui.value));

      if (minXValueBool === true && maxXValueBool === true &&
        minYValueBool === true && maxYValueTBool === true) {
        makeTable()
      }
    }
  });

  $('#maxRowSlider').slider({
    min: RangeNeg,
    max: RangePos,
    slide: function (event, ui) {
      $("#maxYValue").val(parseInt(ui.value));
    },
    stop: function (event, ui) {
      maxYValueTBool = true;
      $("#maxYValue").val(parseInt(ui.value));
      if (minXValueBool === true && maxXValueBool === true &&
        minYValueBool === true && maxYValueTBool === true) {
        makeTable()
      }
    }
  });

  // form validator from hw6, nothing has been changed
  $("form").submit(function (e) {
    e.preventDefault();
    makeTable();
  }).validate({
    rules: {
      "minXValue": {
        required: true,
        range: [-RangeNeg, RangePos],
      },
      "maxXValue": {
        required: true,
        range: [-RangeNeg, RangePos],
      },
      "minYValue": {
        required: true,
        range: [-RangeNeg, RangePos]
      },
      "maxYValue": {
        required: true,
        range: [-RangeNeg, RangePos],
      }
    },
    messages: {
      minXValue: {
        required: "Please enter a minimum column value. Must be an integer.",
        range: `Number must be between ${RangeNeg} to ${RangePos}.`
      },
      maxXValue: {
        required: "Please enter a minimum column value. Must be an integer.",
        range: `Number must be between ${RangeNeg} to ${RangePos}.`
      },
      minYValue: {
        required: "Please enter a minimum row value. Must be an integer.",
        range: `Number must be between ${RangeNeg} to ${RangePos}.`
      },
      maxYValue: {
        required: "Please enter a minimum row value. Must be an integer.",
        range: `Number must be between ${RangeNeg} to ${RangePos}.`
      },
    },
  });
});

// gets the container that holds the display table
let tableContainer = document.querySelector(".tableContainer");

function makeTable() {
  // get all the values in int
  let minXValue = parseInt(document.querySelector(".minXValue").value);
  let maxXValue = parseInt(document.querySelector(".maxXValue").value);
  let minYValue = parseInt(document.querySelector(".minYValue").value);
  let maxYValue = parseInt(document.querySelector(".maxYValue").value);

  //deletes the older table if it already exists
  tableOldDelete(tableContainer);

  //generates the table
  tableGen(minXValue, maxXValue, minYValue, maxYValue)
};

function tableGen(minXValue, maxXValue, minYValue, maxYValue) {
  // make a new table
  const newTable = document.createElement("table")
  let swap = document.createTextNode("Swapped numbers because min was greater than max.");

  //swap values if min is greater than max
  if (minXValue > maxXValue) {
    let temp;
    temp = maxXValue;
    maxXValue = minXValue;
    minXValue = temp;
    logError(swap);
  }
  if (minYValue > maxYValue) {
    let temp;
    temp = maxYValue;
    maxYValue = minYValue;
    minYValue = temp;
    logError(swap);
  }

  // check if input values are correct
  if (validator(minXValue, maxXValue, minYValue, maxYValue) != 0) {
    let x, y;
    let table = "";

    // Create table
    for (y = minYValue - 1; y <= maxYValue; y++) {
      table += "<tr>";
      if (y == minYValue - 1) {
        table += "<th></th>";
        for (x = minXValue; x <= maxXValue; x++) {
          table += "<th>" + x + "</th>";
        }
      } else {
        table += "<td>" + y + "</td>";
        for (x = minXValue; x <= maxXValue; x++) {
          table += "<td>" + x * y + "</td>";
        }
      }
      table += "</tr>";
    }
    // Insert table
    newTable.innerHTML = table;
    tableContainer.append(newTable)
  }
}

// create the tab
function makeTab(tableHeader) {

  const newLI = document.createElement("li")
  const newLink = document.createElement("a")
  const newSpan = document.createElement("span")
  const newInput = document.createElement("input")
  const br = document.createElement("br")

  newLink.className += "tab"
  newLink.href = `#${tableHeader}`
  newLink.textContent = tableHeader

  newSpan.className += "ui-icon-close"
  newSpan.textContent = "x"
  newInput.type = "checkbox";
  newInput.className += "checkBox"

  newLI.append(newLink)
  newLI.append(newSpan)
  newLI.append(br)
  newLI.append(newInput)
  return newLI;
}

//deletes the older table and creates a new one
function tableOldDelete(table) {
  while (table.firstChild) {
    table.removeChild(table.firstChild)
  }
}

//checks if the form is valid
function validator(minXValue, maxXValue, minYValue, maxYValue) {

  if (isNaN(minXValue) || isNaN(maxXValue) || isNaN(minYValue) || isNaN(maxYValue))
    return 0;
  else if (minXValue < RangeNeg || maxXValue > RangePos || minYValue < RangeNeg || maxYValue > RangePos)
    return 0;
  else
    return 1;

}

function dltSingleTab(btn) {
    // gets the text of the link to get the id
    let tableID = btn.closest("li").querySelector("a").text;
    // gets the table id thru link
    let checkedTable = document.getElementById(`${tableID}`)
    // gets a child element to remove the parent
    const child = checkedTable.querySelector(".overflow")
    // remove the checked box element
    btn.parentElement.remove()
    // remove the element with same id
    child.parentElement.remove()
}

function deleteSelectedTabs() {
  // delete multiple tabs element
  // when clicked, find all elements with checkBox class
  const checkBox = document.querySelectorAll(".checkBox");
  checkBox.forEach(checkBoxChecked => {
    // the `href` has the id to the element needed
    let tableID = checkBoxChecked.closest("li").querySelector("a").text;
    // this selects the div i want to remove, the id of the div was taken from the href
    const checkedTable = document.getElementById(`${tableID}`)
    // just some random child element
    const child = checkedTable.querySelector(".overflow")

    if (checkBoxChecked.checked == true) {
      // remove the checked box element
      checkBoxChecked.parentElement.remove()
      // remove the element with same id
      child.parentElement.remove()
    }
  });
}

//logs the error
function logError(errorNode) {
  const errorLog = document.querySelector("#errorLog");
  const newP = document.createElement("P");
  clearErrorLog();
  newP.appendChild(errorNode);
  errorLog.appendChild(newP)
}

//clears the error before showing table
function clearErrorLog() {
  const errorLog = document.querySelector("#errorLog");
  while (errorLog.firstChild) {
    errorLog.removeChild(errorLog.firstChild)
  }
}
