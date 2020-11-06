const greetingsQuery = document.querySelector("#greeting");
const userSignQuery = document.querySelector("#userSign");
const tilesQuery = document.querySelector("#tiles");
const subTotalQuery = document.querySelector("#subTotal");
const shippingQuery = document.querySelector("#shipping");
const grandTotalQuery = document.querySelector("#grandTotal");
// Create variables for the welcome message
const greet = "Howdy ";
const name = "Molly";
const message = ", please check your order:";
// Concatenate the three variables above to create the welcome message
const welcome =  greet + name + message;

// Create variables to hold details about the sign
const sign = "Montague House";
const tiles = sign.length;
const subTotal = tiles * 5; //$5 for each tile
const shipping = 7;
const grandTotal = subTotal + shipping;

greetingsQuery.innerHTML = welcome;
userSignQuery.append(sign);
tilesQuery.append(tiles);
subTotalQuery.append(subTotal);
shippingQuery.append(shipping);
grandTotalQuery.append(grandTotal);
