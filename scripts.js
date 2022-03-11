varObject = {
    selectedColor: '#000000',
    selectedMode: 'hover',
    selectedColorMode: 'normal',
    mouseDown: false
}

let colorPicker = document.querySelector('#colorPicker');
let selectableOne = document.querySelectorAll('.selectableOne');
let selectableTwo = document.querySelectorAll('.selectableTwo');

let hoverButton = document.querySelector('#hoverDraw');
let clickButton = document.querySelector('#clickDraw');
let colorButton = document.querySelector('#color');
let grayButton = document.querySelector('#gray');
let rainbowButton = document.querySelector('#rainbow');
let eraserButton = document.querySelector('#eraser');
let clearButton = document.querySelector('#clear');
let slider = document.querySelector('#range');

colorPicker.value = '#000000';
slider.value = 50;

createDrawingArea(32);

function createDrawingArea(numberOfPixels) {
    let drawArea = document.querySelector('.drawing-area');

    let width = drawArea.getBoundingClientRect().width;
    let height = drawArea.getBoundingClientRect().height;

    if (width == 0) {
        width = 100;
    }
    if (height == 0) {
        height = 100;
    }

    let pixelSize = width / numberOfPixels;

    for (let i = 0; i < height; i += Number(pixelSize)) {
        let pixelRow = document.createElement('div');

        pixelRow.style.height = '' + pixelSize + 'px';
        pixelRow.style.width = '100%';
        pixelRow.style.margin = '0';
        pixelRow.style.padding = '0';
        pixelRow.style.display = 'flex';
        pixelRow.style.flexDirection = 'row';
        pixelRow.style.alignItems = 'center';

        pixelRow.classList.add('pixelRow');

        let newRow = drawArea.appendChild(pixelRow);

        for (let j = 0; j < width; j += Number(pixelSize)) {
            let pixel = document.createElement('div');

            pixel.classList.add('pixel');

            pixel.style.width = '' + pixelSize + 'px';
            pixel.style.height = '' + pixelSize + 'px';
            pixel.style.margin = '0';
            pixel.style.padding = '0';

            pixel.classList.add('pixel');
            pixel.style.opacity = 0;

            newRow.append(pixel);
        }
    }

    let pixels = document.querySelectorAll('.pixel');

    pixels.forEach(pix => {
        pix.addEventListener('mouseover', () => {
            if (varObject.selectedMode == 'hover') {
                draw(pix, drawArea);
            }

            if (varObject.selectedMode == 'click' && varObject.mouseDown > 0) {
                draw(pix, drawArea);
            }
        });

        pix.addEventListener('click', () => {
            if (varObject.selectedMode == 'click') {
                draw(pix, drawArea);
            }
        });
    });
}

function draw(pix, drawArea) {
    if (varObject.selectedColorMode == 'normal') {
        pix.style.opacity = 1;
        pix.style.backgroundColor = varObject.selectedColor;
    } else if (varObject.selectedColorMode == 'opacity') {
        let color = 'black';
        let opacityChange = 0.1;
        pix.style.backgroundColor = color;
        if (pix.style.opacity < 1) {
            pix.style.opacity = Number(pix.style.opacity) + Number(opacityChange);
        }
    } else if (varObject.selectedColorMode == 'rainbow') {
        pix.style.opacity = 1;
        let randomR = Math.random() * 255;
        let randomG = Math.random() * 255;
        let randomB = Math.random() * 255;
        pix.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})`;
    } else if (varObject.selectedColorMode == 'eraser') {
        let erasedColor = drawArea.style.backgroundColor;
        pix.style.backgroundColor = erasedColor;
        pix.style.opacity = 0;
    }
}

function selectButton(e, selectableSet) {
    selectableSet.forEach(button => {
        if (button == e.target) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });
}


function clear() {
    let pixelRows = document.querySelectorAll('.pixelRow');

    pixelRows.forEach((pixelRow) => {
        pixelRow.querySelectorAll('.pixel').forEach((pixel) => pixel.remove());
        pixelRow.remove();
    });
}

function selectColorMode(newMode) {
    varObject.selectedColorMode = newMode;
    return varObject.selectedColorMode;
}

function selectMode(newMode) {
    varObject.selectedMode = newMode;
    return varObject.selectedMode;
}

function selectColor(newColor) {
    varObject.selectedColor = newColor;
    return varObject.selectedColor;
}

hoverButton.addEventListener('click', () => {
    selectMode('hover');
});

clickButton.addEventListener('click', () => {
    selectMode('click');
});

colorButton.addEventListener('click', () => {
    selectColorMode('normal');
});

grayButton.addEventListener('click', () => {
    selectColorMode('opacity');
});

rainbowButton.addEventListener('click', () => {
    selectColorMode('rainbow');
});

eraserButton.addEventListener('click', () => {
    selectColorMode('eraser');
});

clearButton.addEventListener('click', () => {
    clear();
    createDrawingArea(slider.value);
});

slider.addEventListener('change', () => {
    clear();
    createDrawingArea(slider.value);
});

colorPicker.addEventListener('change', (e) => {
    selectColor(e.target.value);
});

selectableOne.forEach(button => {
    button.addEventListener('click', (e) => {
        selectButton(e, selectableOne);
    });
})

selectableTwo.forEach(button => {
    button.addEventListener('click', (e) => {
        selectButton(e, selectableTwo);
    });
})

document.body.onmousedown = () => {
    varObject.mouseDown = true;
    return varObject.mouseDown;
};

document.body.onmouseup = () => {
    varObject.mouseDown = false;
    return varObject.mouseDown;
};

module.exports = {
    varObject,
    createDrawingArea,
    draw,
    selectButton,
    clear,
    selectMode,
    selectColorMode,
    selectColor
}