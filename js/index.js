let size = 3;
let cellValues;
let krestiki = true;

function setStatus(text){
  document.getElementById('pStatus').innerText = text;
}

function markCellAsWinner(r, c){
  let cell = document.getElementById('cell_' + r + '_' + c);
  cell.className  = 'tableCell tableCellWin';
}

function isRowFilled(row, value){
  if (value === 0) return false;
  return cellValues[row].every((v, i, arr) => v === value);
}

function isColumnFilled(column, value){
  if (value === 0) return false;
  return cellValues.every((v, i, arr) => v[column] === value);
}

function isDiagonalFilled(reverse){
  let currValue = reverse ? cellValues[size-1][0] : cellValues[0][0];
  if (currValue === 0) return false;
  let diagonalFilled = true; //optimistic mode ON
  for(let i = 1; i < size; i++){
    let value = reverse ? cellValues[size - 1 - i][i] : cellValues[i][i];
    if (value !== currValue) {
      diagonalFilled = false;
      break;
    };
  }
  return diagonalFilled;
}

function checkGameFinished(){
  //check rows filled with currValue
  for(let r = 0; r < size; r++){
    if (isRowFilled(r, cellValues[r][0])){
      for (let c = 0; c < size; c++){
        markCellAsWinner(r, c);
      }
      return true;
    }
  }
  //check columns filled with currValue
  for(let c = 0; c < size; c++){
    if (isColumnFilled(c, cellValues[0][c])){
      for (let r = 0; r < size; r++){
        markCellAsWinner(r, c);
      }
      return true;
    }
  }
  //check first diagonal filled
  if (isDiagonalFilled(false)) {
    for (let i = 0; i < size; i++){
      markCellAsWinner(i, i);
    }
    return true;
  }
  //check second diagonal filled
  if (isDiagonalFilled(true)) {
    for (let i = 0; i < size; i++){
      markCellAsWinner(size - 1 - i, i);
    }
    return true;
  }

  //check no more moves available
  if (cellValues.every((r, idx, _) => r.every((v, i, arr) => v !== 0))){
    return true;
  }

  return false;
}

function cellClick(ev){
  // console.dir(e.target);
  let id = ev.target.id;
  const parts = id.split("_");
  let r = Number(parts[1]);
  let c = Number(parts[2]);
  if (cellValues[r][c] === 0){
    console.log("clicked on row " + r +" cell " + c);
    if (krestiki){
      ev.target.src = "img/krestik.png";
      cellValues[r][c] = 1;
    }
    else{
      ev.target.src = "img/nolik.png";
      cellValues[r][c] = 2;
    }

    ev.target.parentNode.classList.remove("tableCellEmpty");
    ev.target.parentNode.classList.add("tableCellFilled"); 

    krestiki = !krestiki;
    setStatus((krestiki ? "X" : "O") + " - make your move...");

    console.dir(cellValues);
    //use timeout to allow browser to update image 
    setTimeout(function() {
      if (checkGameFinished()){
        setStatus("Game is over!");
      }
    }, 100);
  }
  else{
    alert("wrong move");
  }
}

function initialize(rows, cells){
  const mainTable = document.getElementById('mainTable');
  // console.dir(mainTable);
  if (mainTable){
    mainTable.innerHTML = ''; //clear table
    cellValues = new Array(rows);
    for(let r = 0; r < rows; r++) {
      cellValues[r] = new Array(cells);
      let row = document.createElement("tr");
      mainTable.appendChild(row);
      for(let c = 0; c < cells; c++) {
        let cell = document.createElement("td");
        cell.id = "cell_" + r + "_" + c;
        cell.className = "tableCell tableCellEmpty";
        row.appendChild(cell);
        let img = document.createElement("img");
        img.className = "cellImage";
        img.src = "img/empty.png";
        cellValues[r][c] = 0;
        img.id = "img_" + r + "_" + c;
        img.onclick = cellClick;
        cell.appendChild(img);
      }
    }
  }
  console.log('initialized');
  setStatus((krestiki ? "X" : "O") + " - make your move...");
}

initialize(size, size);