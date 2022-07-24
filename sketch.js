const squareSize = document.getElementById('sizeSlider');
const wrapperSquare = document.getElementById('sketch');
const color = document.getElementById('colorpicker');
const opacitySlide = document.getElementById('opacitySlider');

/* Grid icon button & Grid mode */
let gridMode = false;
let grid = document.getElementById('icon-container');
let gridSquare = document.querySelectorAll('.square');
grid.addEventListener('click', () => {
    if (!gridMode) {
        gridMode = true;
        gridSquare.forEach(gridicon => {
            gridicon.style.setProperty('border', '2px solid darkred');
        });
        Gridmode();
    }
    else if (gridMode) {
        gridMode = false;
        gridSquare.forEach(gridicon => {
            gridicon.style.setProperty('border', '2px solid black');
        });
        Gridmode();
    }
});


function Gridmode() {
    if (gridMode) {
        const allSquares = document.querySelectorAll('#sketch > div')
        allSquares.forEach(square =>
            square.style.setProperty('border', '1px solid black'));
    }
    if (!gridMode) {
        const allSquares = document.querySelectorAll('#sketch > div')
        allSquares.forEach(square =>
            square.style.setProperty('border', 'none'));
    }
}

let eraseButton = document.getElementById('eraserBtn');
let eraseclick = false;
eraseButton.addEventListener('click', () => {
    if (!eraseclick) {
        eraseclick = true;
        eraseButton.textContent = "Color mode";
    }
    else if (eraseclick) {
        eraseclick = false;
        eraseButton.textContent = "Erase mode";
    }
});

let rainbowButton = document.getElementById('rainbowBtn');
let randomMode = false;
rainbowBtn.addEventListener('click', () => {
    if (!randomMode) {
        randomMode = true;
        rainbowButton.textContent = "Normal mode";
    }
    else if (randomMode) {
        randomMode = false;
        rainbowButton.textContent = "Random mode";
    }
});

let clearButton = document.getElementById('clearBtn');
clearButton.onclick = () => {
    let confirmed = confirm("Your sketch will be deleted. That's fine?");
    if (confirmed) {
        gridMode = false;
        gridSquare.forEach(gridicon => {
            gridicon.style.setProperty('border', '2px solid black');
        });
        GenerateSquare();
    }
}

let mouseclick = false;
document.body.addEventListener('mousedown', () => { mouseclick = true; });
document.body.addEventListener('mouseup', () => { mouseclick = false; });

let fragment = new DocumentFragment();
function GenerateSquare() {
    wrapperSquare.textContent = '';
    let sizeOfSketch = Math.min(64, squareSize.value);
    let calcSize = (wrapperSquare.offsetHeight / squareSize.value) + "px";
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
    if (event.type === "mouseover" && !mouseclick) return
    event.target.style.backgroundColor = `${color.value}`;
    event.target.style.opacity = opacitySlide.value / 100;
    if (eraseclick) {
        event.target.style.backgroundColor = "#FFFFFF";
    }
    if (randomMode) {
        let red = Math.floor(Math.random() * 255);
        let green = Math.floor(Math.random() * 255);
        let blue = Math.floor(Math.random() * 255);
        event.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }
}

const sizeTxt = document.querySelector('#sizeSketch p');
squareSize.addEventListener('change', () => {
    GenerateSquare();
    sizeTxt.textContent = `${squareSize.value} x ${squareSize.value}`;
});

const opacityTxt = document.querySelector('#opacityRange p');
opacitySlide.addEventListener('change', () => {
    opacityTxt.textContent = `Opacity: ${opacitySlide.value}`;
});