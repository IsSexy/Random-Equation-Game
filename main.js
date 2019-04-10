//Initializing constant variables
const messageBox = document.querySelector('#messageBox');
const num1 = document.querySelector('#num1');
const num2 = document.querySelector('#num2');
const operand = document.querySelector('#operand');
const scoreboard = document.querySelector('#scoreboard');
const guess = document.querySelector('#guessInput');
const submitBtn = document.querySelector('#submitBtn');
const skipBtn = document.querySelector('#skipBtn');
const resetBtn = document.querySelector('#resetBtn');

//Helper methods
function randomInt(max)
{
	return Math.floor(Math.random() * Math.floor(max));
}

//Event functions
function skip()
{

}

function reset()
{

}

//Event bindings
skipBtn.onclick = skip;
resetBtn.onclick = reset;
submitBtn.onclick = submit;

//Initializing RandomEquationGame constructor and prototype methods.
function RandomEquationGame(first, last)
{
	this.playerName = first + " " + last;
	this.score = 0;
	this.totalGuesses = 0;
}

RandomEquationGame.prototype.beginGame = function()
{
	scoreboard.innerHTML = score;
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

}