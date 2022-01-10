let selectedColor = '#333';
let selectedMode = 'hover';
let selectedColorMode = 'normal';
let mouseDown = false;

function createDrawingArea(numberOfPixels){
    let drawArea = document.querySelector('.drawing-area');

    let width = drawArea.getBoundingClientRect().width;
    let height = drawArea.getBoundingClientRect().height;

    let pixelSize = width/numberOfPixels;
    
    for(let i=0; i<height; i+=Number(pixelSize)){
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
        for (let j=0; j<width; j+=Number(pixelSize)){
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
            if(selectedMode == 'hover'){
                draw(pix, drawArea);
            }

            if(selectedMode == 'click' && mouseDown > 0){
                draw(pix, drawArea);
            }
        });

        pix.addEventListener('click', () => {
            if(selectedMode == 'click'){
                draw(pix, drawArea);
            }
        });
    });  
}

document.body.onmousedown = () => {
    mouseDown = true;
}

document.body.onmouseup = () => {
    mouseDown = false;
}

function draw(pix, drawArea){
    if(selectedColorMode == 'normal'){
        pix.style.opacity = 1;
        pix.style.backgroundColor = selectedColor;
    }
    else if(selectedColorMode == 'opacity'){
        let color = 'black';
        let opacityChange = 0.1;
        pix.style.backgroundColor = color;
        if(pix.style.opacity < 1){
            pix.style.opacity = Number(pix.style.opacity) + Number(opacityChange);
        }
    }
    else if(selectedColorMode == 'rainbow'){
        pix.style.opacity = 1;
        let randomR = Math.random() * 255;
        let randomG = Math.random() * 255;
        let randomB = Math.random() * 255;
        pix.style.backgroundColor = `rgb(${randomR},${randomG},${randomB})`;
    }
    else if(selectedColorMode == 'eraser'){
        let erasedColor = drawArea.style.backgroundColor;
        pix.style.backgroundColor = erasedColor;
        pix.style.opacity = 0;
    }
}

createDrawingArea(32);


let selectableOne = document.querySelectorAll('.selectableOne');
let selectableTwo = document.querySelectorAll('.selectableTwo');

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

function selectButton(e, selectableSet){
    selectableSet.forEach(button => {
        if(button == e.target){
            button.classList.add('selected');
        }
        else {
            button.classList.remove('selected');
        }
    });
}

let hoverButton = document.querySelector('#hoverDraw');
let clickButton = document.querySelector('#clickDraw');
let colorButton = document.querySelector('#color');
let grayButton = document.querySelector('#gray');
let rainbowButton = document.querySelector('#rainbow');
let eraserButton = document.querySelector('#eraser');
let clearButton = document.querySelector('#clear');
let slider = document.querySelector('#range');

slider.value = 50;

hoverButton.addEventListener('click', () => {
    selectedMode = 'hover';
})

clickButton.addEventListener('click', () => {
    selectedMode = 'click';
})

colorButton.addEventListener('click', () => {
    selectedColorMode = 'normal';
})

grayButton.addEventListener('click', () => {
    selectedColorMode = 'opacity';
})

rainbowButton.addEventListener('click', () => {
    selectedColorMode = 'rainbow';
})

eraserButton.addEventListener('click', () => {
    selectedColorMode = 'eraser';
})

clearButton.addEventListener('click', () => {
    clear();
    createDrawingArea(slider.value);
})

slider.addEventListener('change', () => {
    clear();
    createDrawingArea(slider.value);
})

function clear() {
    let pixelRows = document.querySelectorAll('.pixelRow');

    pixelRows.forEach((pixelRow) => {
        pixelRow.querySelectorAll('.pixel').forEach((pixel) => pixel.remove());
        pixelRow.remove();
    });
}

let colorPicker = document.querySelector('#colorPicker');

colorPicker.value = '#333';

colorPicker.addEventListener('change', (e) => {
    selectedColor = e.target.value;
    console.log(selectedColor);
});