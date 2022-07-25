const squareSize = document.getElementById('sizeSlider');
const wrapperSquare = document.getElementById('sketch');
const color = document.getElementById('colorpicker');
const opacitySlide = document.getElementById('opacitySlider');

/* Mobile detection & events */
window.mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};


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
        eraseButton.classList.toggle('active');
    }
    else if (eraseclick) {
        eraseclick = false;
        eraseButton.classList.toggle('active');
    }
});

/* Mode rainbow with random color on button and sketch */

let rainbowButton = document.getElementById('rainbowBtn');
let randomMode = false;

function getRandomColor() {
    return "#000000".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
    });
}
function getRandomDirection() {
    var directions = ['top left', 'top right', 'bottom left', 'bottom right'];
    return directions[Math.floor(Math.random() * directions.length)];
}

rainbowBtn.addEventListener('click', () => {
    if (!randomMode) {
        randomMode = true;
        rainbowButton.style.color = "#FFFFFF";
        rainbowButton.style.background = 'linear-gradient(to ' + getRandomDirection() + ',' + getRandomColor() + ' 0%,' + getRandomColor() + ' 100%)';
        console.log(rainbowButton.style.background);
        console.log("RandomMode: " + randomMode);
    }
    else if (randomMode) {
        randomMode = false;
        rainbowButton.style.color = "#333333";
        rainbowButton.style.background = "#FFFFFF";
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
    let calcSize = (wrapperSquare.clientWidth / squareSize.value) + "px";
    for (let i = 1; i <= sizeOfSketch * sizeOfSketch; i++) {
        const square = document.createElement('div');
        square.style.cssText = `height: ${calcSize}; width: ${calcSize};`;
        square.addEventListener('mousedown', Colorchange);
        if (window.mobileCheck()) {
            square.addEventListener('touchmove', Colorchange, { passive: true });
        }
        else if (!window.mobileCheck()) {
            square.addEventListener('mouseover', Colorchange);
        }

        fragment.appendChild(square);
    }
    wrapperSquare.appendChild(fragment);
}
GenerateSquare();

function Colorchange(event) {
    if (event.type === "mouseover" && !mouseclick) return;
    if (event.type === "touchmove" && !mouseclick) return;
    event.target.style.backgroundColor = `${color.value}`;
    event.target.style.opacity = opacitySlide.value / 100;
    if (eraseclick) {
        event.target.style.backgroundColor = "#FFFFFF";
    }
    if (randomMode && !eraseclick) {
        event.target.style.backgroundColor = getRandomColor();
    }
}

const sizeTxt = document.querySelector('#sizeSketch p');
squareSize.addEventListener('change', () => {
    GenerateSquare();
    Gridmode();
    sizeTxt.textContent = `${squareSize.value} x ${squareSize.value}`;
});

const opacityTxt = document.querySelector('#opacityRange p');
opacitySlide.addEventListener('change', () => {
    opacityTxt.textContent = `Opacity: ${opacitySlide.value}`;
});