let size = 3;
let cellValues;
let krestiki = true;

function isRowFilled(row, value){
  if (value === 0) return false;
  return cellValues[row].every((v, i, arr) => v === value);
}

function isColumnFilled(column, value){
  if (value === 0) return false;
  for(let r = 0; r < size; r++){
    if (cellValues[r][column] !== value)
      return false;
  }
  return true;
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
    if (isRowFilled(r, cellValues[r][0]))
      return true;
  }
  //check columns filled with currValue
  for(let c = 0; c < size; c++){
    if (isColumnFilled(c, cellValues[0][c]))
      return true;
  }
  //check first diagonal filled
  if (isDiagonalFilled(false)) return true;
  //check second diagonal filled
  if (isDiagonalFilled(true)) return true;
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
    krestiki = !krestiki;
    console.dir(cellValues);
    //use timeout to allow browser to update image 
    setTimeout(function() {
      if (checkGameFinished()){
        alert("Game is over!");
        // window.location.reload();
        initialize(size, size);
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
      row.className = "tableRow";
      mainTable.appendChild(row);
      for(let c = 0; c < cells; c++) {
        let cell = document.createElement("td");
        cell.className = "tableCell";
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
}

initialize(size, size);