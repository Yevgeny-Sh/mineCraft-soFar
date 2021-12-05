let logicObject = { isShovelClicked: false, currentItemInInventory: `` };

const gameBoard = document.querySelector("#game-board");
const inventoryItem = document.querySelector(`.inventory`);
const shovel = document.querySelector(`.shovel`);

shovel.addEventListener(`click`, shovelClick);
inventoryItem.addEventListener(`click`, inventoyDirtClickHandle);
inventoryItem.addEventListener(`click`, inventoyGrassClickHandle);

crerateInitialWorld();

function crerateInitialWorld() {
  createSky();
  createGrassRow(16);
  createDirtRow(17);
  createDirtRow(18);
  createDirtRow(19);
  createCloudItem(10, 10);
  createCloudItem(5, 7);
}

function createDirtElement(xAxis, yAxis) {
  let index = "x:" + xAxis + "_y:" + yAxis;
  let item = document.getElementById(index);
  item.className = `dirt-item`;
}
function createGrassElement(xAxis, yAxis) {
  let index = "x:" + xAxis + "_y:" + yAxis;
  let item = document.getElementById(index);
  item.className = `grass-item`;
}
function createStoneElement(xAxis, yAxis) {
  let index = "x:" + xAxis + "_y:" + yAxis;
  let item = document.getElementById(index);
  item.className = `stone-item`;
}

function createDirtRow(xAxis) {
  for (let i = 0; i < 20; i++) {
    createDirtElement(xAxis, i);
  }
}
function createGrassRow(xAxis) {
  for (let i = 0; i < 20; i++) {
    createGrassElement(xAxis, i);
  }
}

function shovelClick() {
  logicObject.isShovelClicked = true;
  paintBoardAfterShovelPicked();
}

//this isnt good enough
//need more logic after shovel picked..
//so..
//i need to recreate world after shovel click
//meaning i need to attach new listerners to all elemnts
function paintBoardAfterShovelPicked() {
  let dirtItems = document.querySelectorAll(".dirt-item,.grass-item");
  dirtItems.forEach((element) => {
    element.addEventListener(`click`, addToInventory);
  });
  dirtItems.forEach((element) => {
    element.addEventListener(`click`, hideDirtElement);
  });
}

function addToInventory(event) {
  clickedItem = event.target;
  let clickedItemClass = clickedItem.getAttribute(`class`);

  logicObject.currentItemInInventory = clickedItemClass;
  inventoryItem.className = clickedItemClass;
}
function hideDirtElement(event) {
  let clickedDivElement = event.target;
  if (
    clickedDivElement.classList.contains(`dirt-item`) ||
    clickedDivElement.classList.contains(`grass-item`)
  ) {
    //clickedDivElement.style.visibility = "hidden";
    clickedDivElement.className = `sky-item`;
    //doesnt seem to work
    clickedDivElement.addEventListener(`click`, skyClickHandle);
  }
}

function inventoyDirtClickHandle(event) {
  if (event.target.classList.contains(`dirt-item`)) {
    let clickedItem = event.target;
    //let clickedItemClass = clickedItem.getAttribute(`class`);
    clickedItem.classList.remove(`dirt-item`);
    logicObject.currentItemInInventory = ``;
  }
}
function inventoyGrassClickHandle(event) {
  if (event.target.classList.contains(`grass-item`)) {
    let clickedItem = event.target;
    //let clickedItemClass = clickedItem.getAttribute(`class`);
    clickedItem.classList.remove(`grass-item`);
    logicObject.currentItemInInventory = ``;
  }
}

//lets create sky
function createSky() {
  for (let i = 0; i < 20; i++) {
    const row = document.createElement("div");
    document.querySelector("#game-board").appendChild(row);
    for (let j = 0; j < 20; j++) {
      const column = document.createElement("div");
      column.id = `x:` + j + `_` + `y:` + i;
      column.className = "sky-item";
      column.addEventListener(`click`, skyClickHandle);
      row.appendChild(column);
    }
  }
}
function skyClickHandle(event) {
  if (logicObject.currentItemInInventory) {
    event.target.className = logicObject.currentItemInInventory;
  }
}
function createCloudItem(xAxis, yAxis) {
  let index = "x:" + xAxis + "_y:" + yAxis;
  let item = document.getElementById(index);
  item.className = `cloud-item`;
}
