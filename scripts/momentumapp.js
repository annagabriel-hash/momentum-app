/* ***************************************************************
****************************************************************** */

/*\
|*| 				VARIABLES
\*/

/* ***************************************************************
****************************************************************** */
const quotes = ["You miss 100% of the shots you don't take.", "No pressure, no diamonds", "Whether you think you can or you think you can't, you're right.", "Live as if you were to die tomorrow. Learn as if you were to live forever.", "That which does not kill us makes us stronger.", "Be yourself; everyone else is already taken.", "Strive not to be a success, but rather to be of value."];
const toDoItems = [];
/* ====================
			DOM elements
==================== */
// || All Sections
const getSections = document.querySelectorAll(".tab");
// || Section: Time 
const newTime = document.getElementById("time");
// || Section: Input Name 
const getInputName = document.querySelector("#input-name");
// || Section: Main Focus 
const getMainFocusInput = document.querySelector("#main-focus-input");
const getMainFocusText = document.querySelector("#main-focus-text");
const getMainFocusClose = document.querySelector("#close");
// || Section: To Do
let btnNewToDo = document.querySelector("#btn-newtodo");
const newToDoInput = document.querySelector("#newToDo");
const getToDoAppBtn = document.querySelector("#todo-app");
// || Footer: Quote 
const getNewQte = document.querySelector("#newQuote");
const getQteBtn = document.querySelector("#quoteBtn");

/* ***************************************************************
****************************************************************** */

/*\				
|*| 				FUNCTIONS
\*/

/* ***************************************************************
****************************************************************** */

// Get current time and input to time section
function getCurrentTime() {
	let timeStamp = new Date();
	timeStampMin = timeStamp.getMinutes();
	if (timeStampMin < 10) {
		timeStampMin = "0" + timeStampMin;
	}
	timeStamp = `${timeStamp.getHours()}:${timeStampMin}`;
	// Add timeStamp to html
	newTime.innerText = timeStamp;
}

/* Generate random number
Required arguments: length of array
Pass the length of the array to generate numbers from 1 to the array.length */
function randomNum(arrNum) {
	return Math.floor(Math.random() * arrNum) + 1;
}

/* Function for add new quote and display in quote section (footer)
Required arguments: string quote */
function newQuote(quote) {
	quotes.push(quote);
	document.querySelector(".quote q").innerText = quote;
}

/* ********************
        TO DO
******************** */

/* Function to remove todoItems in HTML and in the array
This removes the todo item from HTML */
function removeToDo() {
	// Remove todo div element
	let removedtoDo = this.parentElement.querySelector(".custom-checkbox-label").innerText;
	this.parentElement.remove();

	// Remove todo from array
	let index = toDoItems.indexOf(removedtoDo);
	// This removes one item from the array based on an index
	toDoItems.splice(index, 1);

	// Displays the newtodo button if there are no todo items
	if (toDoItems.length === 0) {
		document.querySelector(".emptytodo").style.display = "block";
		btnNewToDo.style.visibility = "visible";
	}
}

/* Function to adds todoItems in HTML and in the array
Require arguments: string toDo item */
function addToDo(newToDo) {
	// Add newtodo to array todo list
	toDoItems.push(newToDo);
	document.querySelector(".emptytodo").style.display = "none";
	/* =========================
			Create elements
	========================= */
	// Create list
	const newLi = document.createElement("li");
	newLi.classList.add("todo-items");
	// Create label
	const newLbl = document.createElement("label");
	newLbl.classList.add("container-custom-checkbox");
	// Create input button
	const newInput = document.createElement("input");
	newInput.classList.add("container-custom-checkbox");
	newInput.setAttribute("type", "checkbox");
	// Create span
	const newSpan1 = document.createElement("span");
	newSpan1.classList.add("custom-checkbox");
	const newSpan2 = document.createElement("span");
	newSpan2.classList.add("custom-checkbox-label");
	newSpan2.innerText = newToDo;
	// Create trash bin
	const newBin = document.createElement("button");
	newBin.classList.add("bin");
	newBin.innerHTML = "&#9986";
	newBin.addEventListener("click", removeToDo);
	// Append elements to HTML
	newLi.appendChild(newLbl);
	newLi.appendChild(newBin);
	newLbl.appendChild(newInput);
	newLbl.appendChild(newSpan1);
	newLbl.appendChild(newSpan2);

	// Insert elements to HTML
	document.querySelector("#list-todo").appendChild(newLi);
}

/* ***************************************************************
****************************************************************** */

/*\
|*| 			GENERATE TO HTML
\*/

/* ***************************************************************
****************************************************************** */

/* ***********************************
        SHOW/HIDE ELEMENTS UPON LOAD
**************************************/

// || Section: Time
// Generate time
getCurrentTime();
// Hide elements upon loading of webpage
// || Section: Input Name 
getSections[0].classList.toggle("d-hidden");
// || Section: Input Main Focus 
getSections[2].classList.toggle("d-hidden");
// || Section: Main Focus 
document.querySelector(".section-main-focus").classList.toggle("d-hidden");
// || Section: To Do App
document.querySelector(".section-to-do").classList.toggle("d-hidden");
// || Footer: Input Quote
getNewQte.parentElement.classList.toggle("d-hidden");
// || Footer: Quote
document.querySelector(".quote q").innerText = quotes[randomNum(quotes.length) - 1];


/* ***************************************************************
****************************************************************** */

/*\
|*| 			HTML LOOPS
\*/

/* ***************************************************************
****************************************************************** */

/* ***********************
        GENERATE TIME
**************************/
// Sets current time every 25 seconds
setInterval(() => {
	getCurrentTime();
}, 25000);
/* *******************************
        GENERATE RANDOM QUOTE
**********************************/
// Generates random quote every 20 seconds
setInterval(() => {
	document.querySelector(".quote q").innerText = quotes[randomNum(quotes.length) - 1];
}, 20000);


/* ***************************************************************
****************************************************************** */

/*\
|*| 			EVENT LISTENER
\*/

/* ***************************************************************
****************************************************************** */

// Upon input and entering of name, input for main focus will be displayed
getInputName.addEventListener("change", function () {
	// Display main-focus section
	for (const element of getSections) {
		element.classList.toggle("d-hidden");
	}
	// Set name to the greeting
	document.querySelector("#name-top").innerText = `${getInputName.value}.`;
	// Reset the input name
	getInputName.value = "";
	getMainFocusInput.focus();
});

// Upon input of main focus, main focus to do will be displayed
getMainFocusInput.addEventListener("change", function () {
	// Hide main focus input
	document.querySelector(".section-main-focus").classList.toggle("d-hidden");
	// Set input of main focus to main focus to do
	getMainFocusText.innerText = getMainFocusInput.value;
	// Reset the input of main focus
	getMainFocusInput.value = "";
	// Display main focus to do
	getSections[2].classList.toggle("d-hidden");
});

// Upon clicking the main focus exit button, main focus input will be displayed
getMainFocusClose.addEventListener("click", function () {
	// Hide main focus to do
	document.querySelector(".section-main-focus").classList.toggle("d-hidden");
	// Display main focus input
	getSections[2].classList.toggle("d-hidden");
	getMainFocusInput.focus();
});

// Upon clicking the todo app button, todo app will display
getToDoAppBtn.addEventListener("click", function () {
	document.querySelector(".section-to-do").classList.toggle("d-hidden");
});

// Upon clicking the quote add button, input quote will be displayed
getQteBtn.addEventListener("click", function () {
	// Display input quote
	getNewQte.parentElement.classList.toggle("d-hidden");
	getNewQte.focus();
});

// Upon inputing the quote, the quote will be added to the array of quotes and displayed in the quote section (footer)
getNewQte.addEventListener("change", function () {
	newQuote(getNewQte.value);
	// Reset the input quote
	getNewQte.value = "";
	// Display quote in the footer area
	getNewQte.parentElement.classList.toggle("d-hidden");
});

/* ********************
        TO DO
******************** */

// Upon clicking of the newtodo button, newtodo input element will be focus
btnNewToDo.addEventListener("click", function () {
	newToDoInput.focus();
	btnNewToDo.style.visibility = "hidden";
});
// Upon input(change and enter) of new to do, newtodo will be displayed and added into array
newToDoInput.addEventListener("change", function () {
	addToDo(newToDoInput.value.trim());
	// Reset input of newtodo
	newToDoInput.value = "";
});
