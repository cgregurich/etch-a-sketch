"use strict"

function createGrid(cellCount){
  if (cellsMatrix.length > 0) clearGrid();
  for (let r=0; r<cellCount; r++){
    let rowDiv = createRowDiv();
    let matrixRow = [];
    myGrid.appendChild(rowDiv);
    for (let c=0; c<cellCount; c++){
      let cell = createCell(calculateCellSize(GRID_WIDTH_PIXELS, cellCount, CELL_BORDER_SIZE_PIXELS), r, c);
      cells.push(cell);
      matrixRow.push(cell);
      rowDiv.appendChild(cell);
    }
    cellsMatrix.push(matrixRow);
  }
  cells.forEach((cell) => applyCellEventListeners(cell));
  document.addEventListener("keypress", (event) => keyPressed(event));
}

function clearGrid(){
  Array.from(myGrid.children).forEach((child) => myGrid.removeChild(child));
  cellsMatrix = [];
}

function createRowDiv(){
  const rowDiv = document.createElement("div");
  rowDiv.style.display = "flex";
  return rowDiv;
}

function createCell(cellSize, row, col){
  const cell = document.createElement("div");
  cell.style.border = "1px solid black";
  cell.style.height = `${cellSize}px`;
  cell.style.width = `${cellSize}px`;
  return styleCellBorder(cell, row, col);
}

function styleCellBorder(cell, row, col){
  // Applies thicker border around the grid
  if (row == 0){
    cell.style.borderTopWidth = "3px";
  }
  if (row == gridCellCount - 1){
    cell.style.borderBottomWidth = "3px";
  }
  if (col == 0){
    cell.style.borderLeftWidth = "3px";
  }
  if (col == gridCellCount - 1){
    cell.style.borderRightWidth = "3px";
  }
  return cell;
}

function mouseOnGridEvent(e){
  if (e instanceof MouseEvent && e.buttons != 1) return;
  // e.target.style.backgroundColor = color;
  colorCells(e.target);
}

function colorCells(center){
  const coords = getCoordsOfCell(center);
  const row = coords[0];
  const col = coords[1];

  // Assumes grid is square
  const startRow = row - (brushSize - 1);
  const endRow = row + (brushSize - 1);
  const startCol = col - (brushSize - 1);
  const endCol = col + (brushSize - 1);
  for (let r=startRow; r<=endRow; r++){
    for (let c=startCol; c<=endCol; c++){
      const cell = cellsMatrix[r]?.[c];
      if (cell) cell.style.backgroundColor = color;
      
    }
  }
}

function getCoordsOfCell(cell){
  for (let r=0; r<cellsMatrix.length; r++){
    for (let c=0; c<cellsMatrix[r].length; c++){
      if (cell == cellsMatrix[r][c]) return [r, c];
    }
  }
  return null;
}

function keyPressed(e){
  if (e.code == "Space"){
    e.preventDefault();
    clearBoard();
  }
}

function clearBoard(){
  cells.forEach((cell) => cell.style.backgroundColor="white");
}

function applyCellEventListeners(cell){
  cell.addEventListener("mouseover", (event) => mouseOnGridEvent(event));
  cell.addEventListener("mousedown", (event) => mouseOnGridEvent(event));
}

function calculateNumberOfCells(screenSize, cellSize, borderSize){
  const cellCount = Math.floor((screenSize-2 * borderSize)/(cellSize + 2 * borderSize));
  return cellCount;
}

function calculateCellSize(gridWidth, cellCount, borderSize){
  const cellSize = Math.floor((gridWidth - 2*borderSize*cellCount - 2*borderSize) / cellCount);
  return cellSize;
}

function brushSizeClicked(div){ 
  brushDivs.forEach((div) => {
    div.classList.remove("selected");
  })
  div.classList.add("selected");
  brushSize = div.innerText;
}

function changeSizeClicked(e){
  gridCellCount = getSizeFromUser();
  createGrid(gridCellCount);
}

function getSizeFromUser(){
  let size = -1;
  while (size < 1 || size > MAX_SIZE){
    size = prompt("Enter new grid size");
    if (size < 1 || size > MAX_SIZE){
      alert("Size must be between 1-64");
    }
  }
  return size;
}

let gridCellCount = 16;
const GRID_WIDTH_PIXELS = 500; 
const CELL_SIZE_PIXELS = 25;
const CELL_BORDER_SIZE_PIXELS = 1;
const MAX_SIZE = 100;
const myGrid = document.querySelector(".grid");
let cells = [];
let cellsMatrix = [];
createGrid(16); // start with 16 cells
let brushSize = 1;
let color = "purple";
let cellBorders = true;

// Brush selector
let brushDivs = document.querySelectorAll(".brush");
brushDivs.forEach((div) => div.addEventListener("click", () => brushSizeClicked(div)));

const changeSizeBtn = document.querySelector(".change-size");
changeSizeBtn.addEventListener("click", changeSizeClicked);

const toggleBordersBtn = document.querySelector(".toggle-borders");
toggleBordersBtn.addEventListener("click", toggleBorders);

function toggleBorders(){
  cellBorders = !cellBorders;

  if (cellBorders){
    applyCellBorders();
  }
  else {
    removeCellBorders();
  }
}

function applyCellBorders(){

}

function removeCellBorders(){
  for (let r=0; r<gridCellCount; r++){
    for (let c=0; c<gridCellCount; c++){
      let cell = cellsMatrix[r][c];
      cell.style.borderWidth = "0px";
      styleCellBorder(cell, r, c);
    }
  }
}


// how to know if cell should be colored?
// on mouse down, color the cell
// but if mouse is already down, color each cell the mouse enters
// if mouse is down and cursor enters -> color cell
// if mouse is clicked on the cell -> color cell


// try pseudo changing the brush size (when a cell is touched)
// paint the adjacent cells as well!

// make it actually like an etchasketch: use the scroll wheel
// combined with right/left click somehow??

//color palette idea: numbered and colored boxes at the top
// hit the number on the keyboard to switch to a color
// boxes somehow indicate color is chosen



