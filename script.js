let randomNumber = Math.floor(Math.random() * 11); //parseInt(Math.random() * 11) also brings integer

const userInput = document.querySelector("#guessField");
const submit = document.querySelector("#subt");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");
// const inputMsg = document.querySelector('#inputMsg')

const p = document.createElement("p");

let prevGuess = []; //to show the user what num hi guessed
let numGuess = 1; //attempts he/she did, 4 pohochte hi 'submit' disable

let playGame = true;

if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    console.log(guess);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  //validates if the value is an 'int' as well as is between 0-10

  if (isNaN(guess)) {
    alert("Enter a valid number");
  } else if (guess < 0 || guess > 10) {
    alert("Enter a number between 0 and 10");
  } else {
    prevGuess.push(guess);
    if (numGuess === 5) {
      displayGuess(guess);
      displayMessage(`Game over. Random number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  //if value is equal to random num, display you won
  //if value is lower than random num, display low
  //if value is higher than random num, display high

  if(guess === randomNumber){
    displayMessage(`You guessed it right!`)
    endGame()
  }else if(guess < randomNumber){
    displayMessage(`Number is low`)
  }else if(guess > randomNumber){
    displayMessage(`Number is high`)
  }
}

function displayGuess(guess) {
  //cleans the value for next input
  //updates the 'previous guess'
  //updates the 'remaining guess'

  userInput.value = ''
  guessSlot.innerHTML += `${guess} `
  numGuess++
  remaining.innerHTML = `${5 - numGuess}`
}

function displayMessage(message) {
  //pass and print the msg in 'lowOrHi'
  lowOrHi.innerHTML = `<h2>${message}</h2>`
}

function endGame() {
    userInput.value = ''  //cleans the input field
    userInput.setAttribute('disabled', '')
    p.classList.add('button')
    p.innerHTML = `<h2 id="newGame">Start New Game</h2>`
    p.style.backgroundColor = "white"
    p.style.color = "black"
    startOver.appendChild(p)
    playGame = false
    newGame()
}

function newGame() {
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click', function(e){
        randomNumber = Math.floor(Math.random() * 11)
        prevGuess = []
        numGuess = 1
        guessSlot.innerHTML = ''
        remaining.innerHTML = `${11 - numGuess}`
        userInput.removeAttribute('disabled')
        startOver.removeChild(p)
        playGame = true
    })
}
