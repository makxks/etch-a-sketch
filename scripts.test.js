let scripts;

beforeAll(() => {
    document.body.innerHTML =
        `<section class="etch-a-sketch-container">
            <section class="etch-a-sketch-top">
                <div id="colorPickerMask">
                    <input type="color" id="colorPicker">
                </div>
                <button class="selectableOne selected" id="hoverDraw">Hover Draw</button>
                <button class="selectableOne" id="clickDraw">Click Draw</button>
                <button class="selectableTwo selected" id="color">Color</button>
                <button class="selectableTwo" id="gray">Opacity</button>
                <button class="selectableTwo" id="rainbow">Rainbow</button>
                <button class="selectableTwo" id="eraser">Eraser</button>
                <button id="clear">Clear</button>
                <div id="sliderContainer">
                    <input type="range" min="2" max="100" class="slider" id="range">
                </div>
                <h3>Pixel Size</h3>
            </section>
            <section class="etch-a-sketch-main">
                <section class="drawing-area"></section>
            </section>
        </section>`;
    scripts = require('./scripts');
});

beforeEach(() => {
    document.body.innerHTML =
        `<section class="etch-a-sketch-container">
            <section class="etch-a-sketch-top">
                <div id="colorPickerMask">
                    <input type="color" id="colorPicker">
                </div>
                <button class="selectableOne selected" id="hoverDraw">Hover Draw</button>
                <button class="selectableOne" id="clickDraw">Click Draw</button>
                <button class="selectableTwo selected" id="color">Color</button>
                <button class="selectableTwo" id="gray">Opacity</button>
                <button class="selectableTwo" id="rainbow">Rainbow</button>
                <button class="selectableTwo" id="eraser">Eraser</button>
                <button id="clear">Clear</button>
                <div id="sliderContainer">
                    <input type="range" min="2" max="100" class="slider" id="range">
                </div>
                <h3>Pixel Size</h3>
            </section>
            <section class="etch-a-sketch-main">
                <section class="drawing-area"></section>
            </section>
        </section>`;
});

describe('createDrawingArea()', () => {
    it.each([
        { squares: 10 },
        { squares: 32 }
    ])('.should render the correct number of "pixels" in the drawing area - $squares', ({ squares }) => {
        scripts.createDrawingArea(squares);
        expect(document.body).toMatchSnapshot();
    });
})

describe('draw()', () => {
    it.each([
        { mode: 'normal' },
        { mode: 'opacity' },
        { mode: 'rainbow' },
        { mode: 'eraser' }
    ])('.should draw on the pixels in the chosen mode - $mode', ({ mode }) => {
        scripts.createDrawingArea(100);
        let drawArea = document.querySelector('.drawing-area');
        let pixel = document.querySelector('.pixel');
        scripts.varObject.selectedColorMode = mode;
        scripts.draw(pixel, drawArea);
        expect(pixel.style.backgroundColor).not.toBe('transparent');
    });
})

describe('clear()', () => {
    it('.should remove all pixels and pixel rows', () => {
        scripts.createDrawingArea(100);
        scripts.clear();
        expect(document.body).toMatchSnapshot();
    });
})

describe('selectColorMode()', () => {
    it.each([
        { mode: 'normal', expected: 'normal' },
        { mode: 'opacity', expected: 'opacity' },
        { mode: 'rainbow', expected: 'rainbow' },
        { mode: 'eraser', expected: 'eraser' }
    ])('.should change the colorMode to $mode', ({ mode, expected }) => {
        scripts.selectColorMode(mode);
        expect(scripts.varObject.selectedColorMode).toBe(expected);
    });
})

describe('selectMode()', () => {
    it.each([
        { mode: 'hover', expected: 'hover' },
        { mode: 'click', expected: 'click' }
    ])('.should change the mode to $mode', ({ mode, expected }) => {
        scripts.selectMode(mode);
        expect(scripts.varObject.selectedMode).toBe(expected);
    });
})

describe('selectColor()', () => {
    it.each([
        { color: '#EEEEEE', expected: '#EEEEEE' },
        { color: '#121212', expected: '#121212' },
        { color: '#E05F47', expected: '#E05F47' }
    ])('.should change the selected color to $color', ({ color, expected }) => {
        scripts.selectColor(color);
        expect(scripts.varObject.selectedColor).toBe(expected);
    })
})