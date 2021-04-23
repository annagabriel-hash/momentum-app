/*\
|*| Create Function
\*/

// Function to get the time
function getCurrentTime() {
	// Get current time
	let timeStamp = new Date();
	timeStampMin = timeStamp.getMinutes();
	if (timeStampMin < 10) {
		timeStampMin = "0" + timeStampMin;
	}
	timeStamp = `${timeStamp.getHours()}:${timeStampMin}`;
	// Add timeStamp to html
	const newTime = document.getElementById("time");
	newTime.innerText = timeStamp;
}

// Function to generate random number
// Pass the length of the array to generate numbers from 1 to the array.length
function randomNum(arrNum) {
	return Math.floor(Math.random() * arrNum) + 1;
}

// Function for add new quote
const quotes = ["You miss 100% of the shots you don't take.", "No pressure, no diamonds", "Whether you think you can or you think you can't, you're right.", "Live as if you were to die tomorrow. Learn as if you were to live forever.", "That which does not kill us makes us stronger.", "Be yourself; everyone else is already taken.", "Strive not to be a success, but rather to be of value."];
function newQuote(quote) {
	quotes.push(quote);
	document.querySelector(".quote q").innerText = quote;
}
// Function to hide elements

function hideElem(elem) {
	elem.style.display = "none";
}

// Function to add quote

// Function to add new Todo
// Pass the newToDo string in the function. This string will be
const toDoItems = [];
// Function to remove todo
// this button
// remove parent element
function removeToDo() {
	let removedtoDo = this.parentElement.querySelector(".custom-checkbox-label").innerText;
	this.parentElement.remove();

	// Remove todo from array
	let index = toDoItems.indexOf(removedtoDo);
	toDoItems.splice(index, 1);

	if (toDoItems.length === 0) {
		document.querySelector(".emptytodo").style.display = "block";
		btnNewToDo.style.visibility = "visible";
	}
}

/* ********************
        TO DO
******************** */

let btnNewToDo = document.querySelector("#btn-newtodo");
const newToDoInput = document.querySelector("#newToDo");

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
|*| GENERATE TO HTML
\*/

/* ***********************
        SHOW ELEMENTS
**************************/
const getSections = document.querySelectorAll(".tab");
const getInputName = document.querySelector("#input-name");
const getMainFocusInput = document.querySelector("#main-focus-input");
const getMainFocusText = document.querySelector("#main-focus-text");
const getMainFocusClose = document.querySelector("#close");
getSections[0].classList.toggle("d-hidden");
getSections[2].classList.toggle("d-hidden");

// Show name
getInputName.addEventListener("change", function () {
	getSections[1].classList.toggle("d-hidden");
	getSections[0].classList.toggle("d-hidden");
	getSections[2].classList.toggle("d-hidden");
	document.querySelector("#name-top").innerText = `${getInputName.value}.`;
	getInputName.value = "";
	getMainFocusInput.focus();
});

// Show main focus
document.querySelector(".section-main-focus").classList.toggle("d-hidden");
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

// Show todo app
const getToDoApp = document.querySelector("#todo-app");
document.querySelector(".section-to-do").classList.toggle("d-hidden");

getToDoApp.addEventListener("click", function () {
	document.querySelector(".section-to-do").classList.toggle("d-hidden");
});

/* ***********************
        GENERATE TIME
**************************/
// Sets current time upon loading of webpage
getCurrentTime();
// Sets current time every minute
setInterval(getCurrentTime(), 60000);

/* *******************************
        GENERATE RANDOM QUOTE
**********************************/
// Generate random quote
document.querySelector(".quote q").innerText = quotes[randomNum(quotes.length) - 1];
setInterval(() => {
	document.querySelector(".quote q").innerText = quotes[randomNum(quotes.length) - 1];
}, 10000);

const getNewQte = document.querySelector("#newQuote");
const getQteBtn = document.querySelector("#quoteBtn");
getNewQte.parentElement.classList.toggle("d-hidden");
// Create new Quote
getNewQte.addEventListener("change", function () {
	console.log(getNewQte.value);
	newQuote(getNewQte.value);
	getNewQte.value = "";
	getNewQte.parentElement.classList.toggle("d-hidden");
});
getQteBtn.addEventListener("click", function () {
	getNewQte.parentElement.classList.toggle("d-hidden");
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
