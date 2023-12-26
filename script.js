const container = document.getElementById("grid-container");

let gridsize = 16;
let markerColor = "black";

const validateColor = (markerColor) => {
  var style = new Option().style
  style.color = markerColor.toLowerCase();

  return style.color == markerColor.toLowerCase();
}

const createGrid = (gridsize, markerColor) => {
  container.innerHTML = "";

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  const cellSize = Math.min(containerWidth, containerHeight) / gridsize;

  container.style.gridTemplateColumns = `repeat(${gridsize}, ${cellSize}px)`;
  container.style.gridTemplateRows = `repeat(${gridsize}, ${cellSize}px)`;

  for (let i = 0; i < gridsize ** 2; i++) {
    const gridbox = document.createElement("div");
    gridbox.classList.add("gridItem");

    gridbox.style.width = `${cellSize}px`;
    gridbox.style.height = `${cellSize}px`;

    gridbox.addEventListener("mouseover", function (event) {
      if (validateColor(markerColor)){
        event.target.style.backgroundColor = markerColor;
      } else {
        alert("Invalid Color Option");
        changeColor();
      }
    });

    container.appendChild(gridbox);
  }
};

const resetButton = document.getElementById("btn-reset");
const resetGrid = () => {
  resetButton.addEventListener("click", function () {
    const gridItem = document.querySelectorAll(".gridItem");

    gridItem.forEach(function (gridbox) {
      gridbox.style.backgroundColor = "white";
    });
  });
};

const gridSizeButton = document.getElementById("btn-gridsize");
const changeGridSize = () => {
  gridSizeButton.addEventListener("click", function () {
    let userChangeGrid = parseInt(prompt("Enter a number less than 100"));

    if (!isNaN(userChangeGrid) && userChangeGrid > 0 && userChangeGrid <= 100) {
      gridsize = userChangeGrid;
      createGrid(gridsize, markerColor);
    } else {
      alert("Invalid Grid Size. Enter a valid number < 100");
    }
  });
};

window.addEventListener("resize", function () {
  createGrid(gridsize, markerColor);
});

const changeColorButton = document.getElementById("btn-changecolor");
const changeColor = () => {
  let userColor = prompt("Enter any color");
  createGrid(gridsize, userColor);
};

changeColorButton.addEventListener("click", changeColor);

changeGridSize();
createGrid(gridsize, markerColor);
resetGrid();
changeColor();
