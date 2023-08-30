// DOM Elements
const squareSize = document.getElementById('sizeSlider');
const wrapperSquare = document.getElementById('sketch');
const color = document.getElementById('colorpicker');
const opacitySlide = document.getElementById('opacitySlider');
const grid = document.getElementById('icon-container');
const eraseButton = document.getElementById('eraserBtn');
const rainbowButton = document.getElementById('rainbowBtn');
const clearButton = document.getElementById('clearBtn');

const sizeTxt = document.querySelector('#sizeSketch p');
const opacityTxt = document.querySelector('#opacityRange p');

let gridMode = false;
let randomMode = false;
let mouseclick = false;

// Utility Functions
const getRandomColor = () => "#000000".replace(/0/g, () => (~~(Math.random() * 16)).toString(16));
const getRandomDirection = () => ['top left', 'top right', 'bottom left', 'bottom right'][Math.floor(Math.random() * 4)];

// Event Listeners
document.body.addEventListener('mousedown', () => mouseclick = true);
document.body.addEventListener('mouseup', () => mouseclick = false);

// Event Functions
const gridMaker = () => {
    const borderStyle = gridMode ? 'none' : '1px solid black';
    const iconColor = gridMode ? '2px solid black' : '2px solid darkred';
    document.querySelectorAll('#sketch > div').forEach(square => square.style.border = borderStyle);
    document.querySelectorAll('.square').forEach(gridicon => gridicon.style.border = iconColor);
    gridMode = !gridMode;
};

const randomColor = () => {
    randomMode = !randomMode;
    rainbowButton.style.color = randomMode ? "#FFFFFF" : "#333333";
    rainbowButton.style.background = randomMode ? `linear-gradient(to ${getRandomDirection()}, ${getRandomColor()} 0%, ${getRandomColor()} 100%)` : "#FFFFFF";
};

const clearSketch = () => {
    if (confirm("Your sketch will be deleted. That's fine?")) {
        gridMode = false;
        document.querySelectorAll('.square').forEach(gridicon => gridicon.style.border = '2px solid black');
        GenerateSquare();
    }
};

const Colorchange = (event) => {
    if (event.type === "mouseover" && !mouseclick) return;
    const target = event.target;
    if (eraseButton.classList.contains('active')) {
        target.style.backgroundColor = "#FFFFFF";
    } else {
        target.style.backgroundColor = randomMode ? getRandomColor() : color.value;
    }
    target.style.opacity = opacitySlide.value / 100;
};

const GenerateSquare = () => {
    const fragment = new DocumentFragment();
    const sizeOfSketch = Math.min(64, squareSize.value);
    const calcSize = `${wrapperSquare.clientWidth / squareSize.value}px`;
    for (let i = 0; i < sizeOfSketch ** 2; i++) {
        const square = document.createElement('div');
        square.style.cssText = `height: ${calcSize}; width: ${calcSize};`;
        square.addEventListener('mousedown', Colorchange);
        square.addEventListener('mouseover', Colorchange);
        fragment.appendChild(square);
    }
    wrapperSquare.textContent = '';
    wrapperSquare.appendChild(fragment);
};

// Initial setup and Event Attachments
GenerateSquare();
grid.addEventListener('click', gridMaker);
eraseButton.addEventListener('click', () => eraseButton.classList.toggle('active'));
rainbowButton.addEventListener('click', randomColor);
clearButton.addEventListener('click', clearSketch);

// Size and Opacity control
squareSize.addEventListener('change', () => {
    GenerateSquare();
    gridMaker();
    sizeTxt.textContent = `${squareSize.value} x ${squareSize.value}`;
});

opacitySlide.addEventListener('change', () => {
    opacityTxt.textContent = `Opacity: ${opacitySlide.value}`;
});
