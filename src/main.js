const row = 5;
const column = 5;
let pattern = "1, 2, 4, 8, 16, 32, 64, 128, 256, 512";

const grid = new array(row).fill(new array(column));
const guessButton = document.querySelector('#guessButton');
let guessNumber = 1;

//Resets the pattern daily
const reset = () => {
    guessNumber = 1;
}

//Draws the grid
const drawGrid = (row, column) => {
    for (let i = 0; i < row; i++){
        for (let j = 0; j < column; j++){
            let gridBox = document.createElement("div");
            gridBox.class = "tile";
            grid.push(gridBox);
            document.querySelector("#grid").appendChild(gridBox);
        }
    }
}

//temporary
const temporaryGrid = (column) => {
    for (let i = 0; i < column; i++){
        let textbox = document.createElement("input");
        textbox.type = "text";
        textbox.id = `tile${i}`;
    }
}

//Checks if the user response matches the last 5 numbers in the pattern
const checkAnswer = () => {
    let answer = pattern.split(',');
    tile = document.querySelector(`tile${guessNumber}`)
    let guess = tile.split(",");
    for(let i = 0; i < answer.length / 2; i++){
        if (guess[i] != answer[answer.length / 2 + i]){
            return false;
        }
    }
    return true;
}

const init = () => {
    temporaryGrid(column);
    guessButton.addEventListener('click', function() {
        checkAnswer();
        guessNumber++;
    });
    
}

window.onload = init;