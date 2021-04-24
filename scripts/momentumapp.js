/*\
|*| 				VARIABLES
\*/

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

/*\
|*| 				FUNCTIONS
\*/

// Get current time
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

/* Function for add new quote
Required arguments:quote string */
function newQuote(quote) {
	quotes.push(quote);
	document.querySelector(".quote q").innerText = quote;
}

/* ********************
        TO DO
******************** */

// Function to remove todo

function removeToDo() {
	// Remove todo div element
	let removedtoDo = this.parentElement.querySelector(".custom-checkbox-label").innerText;
	this.parentElement.remove();

	// Remove todo from array
	let index = toDoItems.indexOf(removedtoDo);
	toDoItems.splice(index, 1);

	// Display newtoDo
	if (toDoItems.length === 0) {
		document.querySelector(".emptytodo").style.display = "block";
		btnNewToDo.style.visibility = "visible";
	}
}

function addToDo(newToDo) {
	/* =========================
			Add newtodo to array todo list
	========================= */
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
	// Append elements
	newLi.appendChild(newLbl);
	newLi.appendChild(newBin);
	newLbl.appendChild(newInput);
	newLbl.appendChild(newSpan1);
	newLbl.appendChild(newSpan2);
	/* =========================
			Insert elements to HTML
	========================= */
	document.querySelector("#list-todo").appendChild(newLi);
}

/*\
|*| 			GENERATE TO HTML
\*/

/* ********************************
        SHOW/HIDE ELEMENTS UPON LOAD
***********************************/

// Hide elements upon load
// || Section: Input Name 
getSections[0].classList.toggle("d-hidden");
// || Section: Input Main Focus 
getSections[2].classList.toggle("d-hidden");
// || Section: Main Focus 
document.querySelector(".section-main-focus").classList.toggle("d-hidden");
// || Section: To Do App
document.querySelector(".section-to-do").classList.toggle("d-hidden");
// || Section: Input Quote
getNewQte.parentElement.classList.toggle("d-hidden");

// Upon input of name, main focus will be displayed
getInputName.addEventListener("change", function () {
	// Display main-focus section
	for (const element of getSections) {
		element.classList.toggle("d-hidden");
	}
	document.querySelector("#name-top").innerText = `${getInputName.value}.`;
	getInputName.value = "";
	getMainFocusInput.focus();
});

// Update main focus
getMainFocusInput.addEventListener("change", function () {
	document.querySelector(".section-main-focus").classList.toggle("d-hidden");
	getMainFocusText.innerText = getMainFocusInput.value;
	getMainFocusInput.value = "";
	getSections[2].classList.toggle("d-hidden");
});

// Close main focus
getMainFocusClose.addEventListener("click", function () {
	document.querySelector(".section-main-focus").classList.toggle("d-hidden");
	getSections[2].classList.toggle("d-hidden");
	getMainFocusInput.focus();
});

getToDoAppBtn.addEventListener("click", function () {
	document.querySelector(".section-to-do").classList.toggle("d-hidden");
});

/* ***********************
        GENERATE TIME
**************************/
// Sets current time upon loading of webpage
getCurrentTime();
// Sets current time every minute
setInterval(() => {
	getCurrentTime();
}, 60000);
/* *******************************
        GENERATE RANDOM QUOTE
**********************************/
// Generate random quote upon loading of webpage
document.querySelector(".quote q").innerText = quotes[randomNum(quotes.length) - 1];

setInterval(() => {
	document.querySelector(".quote q").innerText = quotes[randomNum(quotes.length) - 1];
}, 10000);

// Create new Quote
getNewQte.addEventListener("change", function () {
	console.log(getNewQte.value);
	newQuote(getNewQte.value);
	getNewQte.value = "";
	getNewQte.parentElement.classList.toggle("d-hidden");
});
getQteBtn.addEventListener("click", function () {
	getNewQte.parentElement.classList.toggle("d-hidden");
	getNewQte.focus();
});

/* ********************
        TO DO
******************** */
// Focus on new todo

btnNewToDo.addEventListener("click", function () {
	newToDoInput.focus();
	btnNewToDo.style.visibility = "hidden";
});

newToDoInput.addEventListener("change", function () {
	addToDo(newToDoInput.value.trim());
	newToDoInput.value = "";
});
