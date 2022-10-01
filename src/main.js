const row = 5;
const column = 5;
let pattern = "1, 2, 4, 8, 16, 32, 64, 128, 256, 512";

const grid = new array(row).fill(new array(column));

//Resets the pattern daily
const reset = () => {

}

//Draws the grid
function drawGrid() {
    for (let i = 0; i < row; i++){
        for (let i = 0; i < column; i++){
            let gridBox = document.createElement("div");
            gridBox.class = "tile";
            grid.push(gridBox);
            document.querySelector("#grid").appendChild(gridBox);
        }
    }
}

const init = () => {
    drawGrid;
}

window.onload = init;