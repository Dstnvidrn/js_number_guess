// Capture elements
const userInput = document.querySelector('#input');
const resetBtn = document.querySelector('.again');
const checkBtn = document.querySelector('.check');
const numberBox = document.querySelector('.number');
const score = document.querySelector('.score');
const highscoreNum = document.querySelector('.highscore');
const statusText = document.querySelector('.status');

// Game settings/properties 
let currentScore = 0;
let highscore = 0;
let randomNumber = newRandomNumber();

console.log(`Hidden Number: ${randomNumber}`);

highscoreNum.textContent = highscore;
score.textContent = currentScore;

//TODO: On win, numberbox stays glowing
//: WRong number resets highscore
// Numberbox on doesnt return to '?' on new number timer end


// Add eventlistener for "Enter Key press"
window.addEventListener("keypress", enterPress);
// Event Listeners for buttons
resetBtn.addEventListener("click", resetGame);
checkBtn.addEventListener("click", compareResult);

// Create functions

function newRandomNumber() {
   return Math.floor(Math.random() * 10 + 1);
}

function enterPress(event){
    if(event.keyCode === 13) {
        compareResult();
    }
}
function compareResult() {
    const userNumber = Number(userInput.value);
    if (userNumber === randomNumber){
        setWin();        
    } else {
        // statusText.removeAttribute('hidden');
        statusText.textContent = "Try Again..";        
        flashWrong();
    }
}

function resetGame() {
    removeGreenHighlight();
    removeRedHighlight();
    numberBox.textContent = "?";
    statusText.textContent = '';
    checkBtn.style.cursor = 'pointer';
    checkBtn.removeAttribute('disabled');
    score.textContent = 0;
    highscoreNum.textContent = 0;
    currentScore = 0;
    addEventListeners();
    randomNumber = newRandomNumber();
    console.log(`Hidden Number: ${randomNumber}`);
    userInput.value = '';
}

function setWin(){
    addGreenHighlight()
    numberBox.textContent = randomNumber;
    statusText.textContent = "Correct!"
    removeEventListeners();
    score.textContent = ++currentScore;
    newGame();
    if(currentScore > highscore){
        highscore = currentScore;
        highscoreNum.textContent = highscore;
    }

}
function flashWrong() {
    removeGreenHighlight();
    addRedHighlight();
    removeEventListeners();
    score.textContent = 0;
    currentScore = 0;
    setTimeout(() => {        
        removeRedHighlight(); 
        addEventListeners();       
    }, 750);
};

function newGame(){
    let counter = 3;
         
    setTimeout(() => {
        statusText.textContent = `New number in ${counter--}s...`;
        setTimeout(() => {
            statusText.textContent = `New number in ${counter--}s...`;
            setTimeout(() => {
                statusText.textContent = `New number in ${counter--}s...`;
                setTimeout(() => {
                    randomNumber = newRandomNumber();    
                    console.log(`Hidden Number: ${randomNumber}`);
                removeGreenHighlight();
                statusText.textContent = '';
                addEventListeners();
                numberBox.textContent = '?';
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000)
       
}

function addRedHighlight() {
    statusText.classList.add('highlight-red');
    numberBox.classList.add('highlight-red');
}
function removeRedHighlight() {
    statusText.classList.remove('highlight-red');
    numberBox.classList.remove('highlight-red');
}
function addGreenHighlight() {
    statusText.classList.add('highlight-green');
    numberBox.classList.add('highlight-green');
}
function removeGreenHighlight() {
    statusText.classList.remove('highlight-green');
    numberBox.classList.remove('highlight-green');
}

function removeEventListeners() {
    checkBtn.removeEventListener('click', compareResult);
    window.removeEventListener('keypress', enterPress);

}

function addEventListeners() {
    checkBtn.addEventListener('click', compareResult);
    window.addEventListener('keypress', enterPress);
}
