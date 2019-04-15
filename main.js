//Initializing constant variables
const messageBox = document.querySelector('#messageBox');
const num1 = document.querySelector('#num1');
const num2 = document.querySelector('#num2');
const operand = document.querySelector('#operand');
const scoreboard = document.querySelector('#scoreboard');
const guessInput = document.querySelector('#guessInput');
const submitBtn = document.querySelector('#submitBtn');
const skipBtn = document.querySelector('#skipBtn');
const resetBtn = document.querySelector('#resetBtn');
const maxNumber = 100;
const fName = document.querySelector('#FName');
const lName = document.querySelector('#LName');
const gameBoard = document.querySelector('#gameboard');
const nameSelection = document.querySelector('#nameSelection');
const nameBox = document.querySelector('#nameBox');
const submitNameBtn = document.querySelector('#submitName');
let theGame = null;

//Helper methods
function randomInt(max)
{
	return Math.floor(Math.random() * Math.floor(max));
}

function hideGameBoard()
{
	FName.focus();
	gameBoard.style.visibility ='hidden';
}
hideGameBoard();

//Event functions
function skip()
{
}

function reset()
{
	//reload the page to start over again.
	location.reload();
}

function submitAnswer()
{
	guessInput.focus();
	let theOperand = operand.innerHTML;
	switch(theOperand)
	{
		case '+':
			if(guessInput.value === theGame.add()){
			console.log(theGame.add());
			}else{
				messageBox.innerHTML = "wrong";
			}
			break;
		case '-':
			if(guessInput.value === theGame.subtract()){
				console.log(theGame.subtract());
			}else{
				messageBox.innerHTML = "Wrong";
			}
			break;
		case '*':
			if(guessInput.value === theGame.multiply()){
				console.log(theGame.multiply());
			}else{
				messageBox.innerHTML = "Wrong";
			}
			break;
		case '/':
			if(guessInput.value === theGame.divide()){
				console.log(theGame.divide());
			}else{
				messageBox.innerHTML = "Wrong";
			}
			break;
	}
		theGame.refreshGame();
}

function submitName()
{
	gameBoard.style.visibility ='visible';
	nameSelection.parentNode.removeChild(nameSelection);
	theGame = new RandomEquationGame(fName.value, lName.value);
}


//Event bindings
skipBtn.onclick = skip;
resetBtn.onclick = reset;
submitBtn.onclick = submitAnswer;
submitNameBtn.onclick = submitName;

//Initializing RandomEquationGame constructor and prototype methods.
function RandomEquationGame(first, last)
{
	this.playerName = first + " " + last;
	this.score = 0;
	this.totalGuesses = 0;
	this.operands = ['+', '-', '*', '/'];
	nameBox.innerHTML = this.playerName;

	this.beginGame();
}

RandomEquationGame.prototype.beginGame = function()
{
	this.refreshGame();
}

RandomEquationGame.prototype.add = function()
{
	return this.num1 + this.num2;
}

RandomEquationGame.prototype.subtract = function()
{
	return this.num1 - this.num2;
}

RandomEquationGame.prototype.divide = function()
{
	return this.num1 / this.num2;
}

RandomEquationGame.prototype.multiply = function()
{
	return this.num1 * this.num2;
}

RandomEquationGame.prototype.evaluate = function()
{

	return true;
}

RandomEquationGame.prototype.refreshGame = function()
{
	scoreboard.innerHTML = this.score;
	this.num1 = randomInt(maxNumber);
	this.num2 = randomInt(maxNumber);
	operand.innerHTML = this.operands[randomInt(this.operands.length)];
	let currentOperand = operand.innerHTML;
	switch(currentOperand)
	{
		//The division case makes sure the numbers divide evenly, positively and to a whole number.
		case '/':
			if(this.num1 < this.num2)
			{
				let swap = this.num1;
				this.num1 = this.num2;
				this.num2 = swap;
			}
			if(this.num1 % 2 != 0)
			{
				this.num1 += 1;
			}
			while((this.num1 / this.num2) % 1 != 0)
			{
				this.num2 = randomInt(this.num1);
			}
			break;
		//This subtraction cases ensures that we are always using a positive number.	
		case '-':
			if(this.num1 < this.num2)
			{
				let swap = this.num1;
				this.num1 = this.num2;
				this.num2 = swap;
			}
			break;
	}
	num1.innerHTML = this.num1;
	
	num2.innerHTML = this.num2;
}