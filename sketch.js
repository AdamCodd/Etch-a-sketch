const squareSize = document.getElementById('sizeSlider');
const wrapperSquare = document.getElementById('sketch');
const color = document.getElementById('colorpicker');
const opacitySlide = document.getElementById('opacitySlider');

/* Grid icon button & Grid mode */
let gridMode = false;
const grid = document.getElementById('icon-container');
const gridSquare = document.querySelectorAll('.square');

function gridMaker() {
    const allSquares = document.querySelectorAll('#sketch > div');
    if (gridMode === false) {
        gridSquare.forEach(gridicon => gridicon.style.setProperty('border', '2px solid darkred'));
        allSquares.forEach(square => square.style.setProperty('border', '1px solid black'));
        gridMode = true;
    }
    else if (gridMode === true) {
        allSquares.forEach(square => square.style.setProperty('border', 'none'));
        gridSquare.forEach(gridicon => gridicon.style.setProperty('border', '2px solid black'));
        gridMode = false;
    }
}

grid.addEventListener('click', gridMaker);


const eraseButton = document.getElementById('eraserBtn');
eraseButton.addEventListener('click', () => eraseButton.classList.toggle('active'));

/* Mode rainbow with random color on button and sketch */
let randomMode = false;
const rainbowButton = document.getElementById('rainbowBtn');

function getRandomColor() {
    return "#000000".replace(/0/g, () => (~~(Math.random() * 16)).toString(16));
}
function getRandomDirection() {
    let directions = ['top left', 'top right', 'bottom left', 'bottom right'];
    return directions[Math.floor(Math.random() * directions.length)];
}

function randomColor() {
    if (randomMode === false) {
        randomMode = true;
        rainbowButton.style.color = "#FFFFFF";
        rainbowButton.style.background = 'linear-gradient(to ' + getRandomDirection() + ',' + getRandomColor() + ' 0%,' + getRandomColor() + ' 100%)';
    }
    else if (randomMode === true) {
        randomMode = false;
        rainbowButton.style.color = "#333333";
        rainbowButton.style.background = "#FFFFFF";
    }
}

rainbowBtn.addEventListener('click', randomColor);


const clearButton = document.getElementById('clearBtn');
clearButton.onclick = () => {
    const confirmed = confirm("Your sketch will be deleted. That's fine?");
    if (confirmed) {
        gridMode = false;
        gridSquare.forEach(gridicon => gridicon.style.setProperty('border', '2px solid black'));
        GenerateSquare();
    }
}

let mouseclick = false;
document.body.addEventListener('mousedown', () => mouseclick = true);
document.body.addEventListener('mouseup', () => mouseclick = false);

let fragment = new DocumentFragment();
function GenerateSquare() {
    wrapperSquare.textContent = '';
    let sizeOfSketch = Math.min(64, squareSize.value);
    let calcSize = (wrapperSquare.clientWidth / squareSize.value) + "px";
    for (let i = 1; i <= sizeOfSketch * sizeOfSketch; i++) {
        const square = document.createElement('div');
        square.style.cssText = `height: ${calcSize}; width: ${calcSize};`;
        square.addEventListener('mousedown', Colorchange);
        square.addEventListener('mouseover', Colorchange);

        fragment.appendChild(square);
    }
    wrapperSquare.appendChild(fragment);
}
GenerateSquare();

function Colorchange(event) {
    if (event.type === "mouseover" && !mouseclick) return;
    event.target.style.backgroundColor = `${color.value}`;
    event.target.style.opacity = opacitySlide.value / 100;

    if (eraseButton.classList.contains('active')) {
        event.target.style.backgroundColor = "#FFFFFF";
    }
    else if (randomMode && !eraseButton.classList.contains('active')) {
        event.target.style.backgroundColor = getRandomColor();
    }
}

const sizeTxt = document.querySelector('#sizeSketch p');
squareSize.addEventListener('change', () => {
    GenerateSquare();
    if (gridMode === true) {
        gridMode = false;
        gridMaker();
    }
    sizeTxt.textContent = `${squareSize.value} x ${squareSize.value}`;
});

const opacityTxt = document.querySelector('#opacityRange p');
opacitySlide.addEventListener('change', () => {
    opacityTxt.textContent = `Opacity: ${opacitySlide.value}`;
});