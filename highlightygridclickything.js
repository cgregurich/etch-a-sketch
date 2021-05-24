"use strict";

function createGrid(gridSize){
  const myDiv = document.querySelector(".my-div");
  let matrix = [];
  for (let r=0; r<gridSize; r++){
    let matrixRow = [];
    let divRow = createDivRow();
    for (let c=0; c<gridSize; c++){
      let cell = createCell();
      divRow.appendChild(cell);
      matrixRow.push(cell);
    }
    myDiv.appendChild(divRow);
    matrix.push(matrixRow);
  }
  return matrix;
}

function findCenterCell(){
  let centerIndex = Math.floor(matrix.length/2);
  return matrix[centerIndex][centerIndex];
}

function colorCenterCell(){
  const centerCell = findCenterCell();
}

function createDivRow(){
  const divRow = document.createElement("div");
  divRow.style.display = "flex";
  return divRow;
}

function createCell(){
  const SIZE = 25;
  const cell = document.createElement("div");
  cell.style.border = "1px solid black";
  cell.style.height = `${SIZE}px`;
  cell.style.width = `${SIZE}px`;
  return cell;
}

function initBrushOptions(){
  const brushOptions = document.querySelectorAll(".brush");
  brushOptions.forEach((div) => {
    div.addEventListener("click", () => brushOptionClicked(div));
  });
}

function brushOptionClicked(brushOption){
  const brushOptions = document.querySelectorAll(".brush");
  brushOptions.forEach((brushOption) => {
    brushOption.classList.remove("selected");
  })
  brushOption.classList.add("selected");
  brushSize = brushOption.innerText;
  clearMarkedCells();
  clearGrid();
}

function clearMarkedCells(){
  markedCells = new Set();
}

function clearGrid(){
  matrix.forEach(row => {
    row.forEach(cell => {
      if (!markedCells.has(cell)){
        cell.style.backgroundColor = "white";
      } 
    });
  });
}

function initMouseFunctionality(){
  matrix.forEach((row) => {
    row.forEach((cell) => {
      cell.addEventListener("mouseover", () => onMouseEvent(cell));
      cell.addEventListener("mousedown", () => onMouseEvent(cell, true))
    });
  });
}

function onMouseEvent(cell, isPermanent=false){
  clearGrid(); 
  colorCells(cell, isPermanent);
}

function getRowColOfCell(cellArg){
  for (let r=0; r<matrix.length; r++){
    for (let c=0; c<matrix[r].length; c++){
      if (cellArg == matrix[r][c]) return [r, c];
    }
  }
  return "couldn't find it";
}

function colorCells(center=findCenterCell(), isPermanent=false){
  // coordinates in the matrix (and on the grid) of the cell 
  // at the center of the event
  let coords = getRowColOfCell(center);
  let row = coords[0];
  let col = coords[1];

  let startRow = row - (brushSize - 1);
  let endRow = row + (brushSize - 1);
  let startCol = col - (brushSize - 1);
  let endCol = col + (brushSize - 1);

  for (let r=startRow; r<=endRow; r++){
    for (let c=startCol; c<=endCol; c++){
      let cell = matrix[r]?.[c];
      if (cell) {
        cell.style.backgroundColor = "yellow";
        if (isPermanent) markedCells.add(cell);
      }
    }
  }
}

function getBrushSize(){
  return document.querySelector(".selected").innerText;
}


let brushSize = getBrushSize();
const matrix = createGrid(21);
let markedCells = new Set();
colorCenterCell(matrix);
initBrushOptions();
initMouseFunctionality();

