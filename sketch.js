const squareSize = document.getElementById('sizeSlider');
const wrapperSquare = document.getElementById('sketch');
const color = document.getElementById('colorpicker');

squareSize.value = Math.min(64, squareSize.value);
let calcSize = (wrapperSquare.offsetHeight / squareSize.value) + "px";

let mouseclick = false;
window.addEventListener('mousedown', () => { mouseclick = true; });
window.addEventListener('mouseup', () => { mouseclick = false; });

function GenerateSquare() {
    wrapperSquare.textContent = '';
    let calcSize = (wrapperSquare.offsetHeight / squareSize.value) + "px";
    for (let i = 1; i <= squareSize.value * squareSize.value; i++) {
        const square = document.createElement('div');
        square.style.cssText = `height: ${calcSize}; width: ${calcSize};`;
        square.style.setProperty('border', '1px solid black');
        square.addEventListener('mousedown', Colorchange);
        square.addEventListener('mouseover', Colorchange);
        wrapperSquare.appendChild(square);
    }
}
GenerateSquare();


function Colorchange(event) {
    if (event.type === "mouseover" && !mouseclick) return
    event.target.style.backgroundColor = `${color.value}`;
}


squareSize.addEventListener('input', () => {
    setTimeout(GenerateSquare, 600);
    sizeSketch.firstElementChild.textContent = `${squareSize.value} x ${squareSize.value}`;
});