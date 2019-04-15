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

//Check localStorage for game info
if(localStorage.getItem('playerName') !== null)
{
	gameBoard.style.visibility = 'visible';
	nameSelection.parentNode.removeChild(nameSelection);
	theGame = new RandomEquationGame();
	scoreboard.innerHTML = localStorage.getItem('playerScore');
}
else
{
	FName.focus();
	gameBoard.style.visibility ='hidden';
}

//Helper methods
function randomInt(max)
{
	return Math.floor(Math.random() * Math.floor(max));
}

//Event functions
function skip()
{
	theGame.refreshGame();
}

function reset()
{
	localStorage.clear();
	//reload the page to start over again.
	location.reload();
}

function submitAnswer()
{
	if(isNaN(guessInput.value))
	{
		messageBox.innerHTML = 'Please enter a number';
		return;
	}

	theGame.evaluate(Number(guessInput.value));
}

function submitName()
{
	gameBoard.style.visibility = 'visible';
	nameSelection.parentNode.removeChild(nameSelection);
	theGame = new RandomEquationGame(fName.value, lName.value);
}


//Event bindings
skipBtn.onclick = skip;
resetBtn.onclick = reset;
submitBtn.onclick = submitAnswer;
submitNameBtn.onclick = submitName;

//Initializing RandomEquationGame constructor and prototype methods.
function RandomEquationGame()
{
	if(arguments.length === 2)
	{
		this.playerName = arguments[0] + " " + arguments[1];
		localStorage.setItem('playerName', this.playerName);
		this.score = 0;
		localStorage.setItem('playerScore', this.score);
		this.totalGuesses = 0;
		localStorage.setItem('totalGuesses', this.totalGuesses);
		this.operands = ['+', '-', '*', '/'];
		nameBox.innerHTML = this.playerName;
		this.beginGame();
	}
	else
	{
		this.playerName = localStorage.getItem('playerName');
		this.score = localStorage.getItem('playerScore');
		this.totalGuesses = localStorage.getItem('totalGuesses');
		this.num1 = localStorage.getItem('num1');
		this.num2 = localStorage.getItem('num2');
		this.operands = ['+', '-', '*', '/'];
		nameBox.innerHTML = this.playerName;
		num1.innerHTML = localStorage.getItem('num1');
		num2.innerHTML = localStorage.getItem('num2');
		operand.innerHTML = localStorage.getItem('currentOperand');
	}
	messageBox.innerHTML = 'Good luck!';
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

RandomEquationGame.prototype.evaluate = function(guess)
{
	let theOperand = operand.innerHTML;
	let answer;
	this.totalGuesses += 1;
	localStorage.setItem('totalGuesses', this.totalGuesses);

	switch(theOperand)
	{
		case '+':
			console.log(theGame.add());
			answer = theGame.add();
			break;
		case '-':
			console.log(theGame.subtract());
			answer = theGame.subtract();
			break;
		case '*':
			console.log(theGame.multiply());
			answer = theGame.multiply();
			break;
		case '/':
			console.log(theGame.divide());
			answer = theGame.divide();
			break;
	}

	if(answer === guess)
	{
		this.score += 1;
		localStorage.setItem('playerScore', this.score);
		messageBox.innerHTML = `Congratulations, your guess of ${guess} was correct!`;
		this.refreshGame();
	}
	else if(answer > guess)
	{
		this.score -= 1;
		localStorage.setItem('playerScore', this.score);
		messageBox.innerHTML = `Your guess of ${guess} was too low, try again!`;
	}
	else if(answer < guess)
	{
		this.score -= 1;
		localStorage.setItem('playerScore', this.score);
		messageBox.innerHTML = `Your guess of ${guess} was too high, try again!`;
	}

	scoreboard.innerHTML = this.score;
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

	localStorage.setItem('currentOperand', currentOperand);

	localStorage.setItem('num1', this.num1);
	num1.innerHTML = this.num1;
	
	localStorage.setItem('num2', this.num2);
	num2.innerHTML = this.num2;
}