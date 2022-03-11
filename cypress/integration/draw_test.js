describe('Buttons respond to presses', () => {
    before(() => {
        cy.visit('https://makxks.github.io/etch-a-sketch/');
    });
    beforeEach(() => {
        cy.get('#clear').click();
    });
    it('.should draw on hover in the selected color', () => {
        cy.get('#hoverDraw').click();
        cy.get('#color').click()
        cy.get('#colorPicker')
            .invoke('prop', 'value')
            .then(color => {
                let pixel = cy.get('.drawing-area > :nth-child(2) > :nth-child(2)');
                pixel.trigger('mouseover');
                color = calc(color);
                pixel.should('have.css', 'background-color', color);
            })
    });
    it('.should draw on click in the selected color', () => {
        cy.get('#clickDraw').click();
        cy.get('#color').click()
        cy.get('#colorPicker')
            .invoke('prop', 'value')
            .then(color => {
                let pixel = cy.get('.drawing-area > :nth-child(2) > :nth-child(2)');
                pixel.click();
                color = calc(color);
                pixel.should('have.css', 'background-color', color);
            })
    });
    it('.should draw a random color on hover', () => {
        cy.get('#hoverDraw').click();
        cy.get('#rainbow').click();
        let pixel = cy.get('.drawing-area > :nth-child(2) > :nth-child(2)');
        pixel.trigger('mouseover');
        pixel.should('not.have.css', 'opacity', 0);
    });
    it('.should draw a random color on click', () => {
        cy.get('#clickDraw').click();
        cy.get('#rainbow').click();
        let pixel = cy.get('.drawing-area > :nth-child(2) > :nth-child(2)');
        pixel.trigger('mouseover');
        pixel.should('not.have.css', 'opacity', 0);
    });
    it('.should draw opacity in the selected color on hover', () => {
        cy.get('#hoverDraw').click();
        cy.get('#gray').click();
        let pixel = cy.get('.drawing-area > :nth-child(2) > :nth-child(2)');
        pixel.click();
        pixel.should('have.css', 'background-color', 'rgb(0, 0, 0)');
        pixel.should('have.css', 'opacity', '0.1');
    });
    it('.should draw opacity in the selected color on click', () => {
        cy.get('#clickDraw').click();
        cy.get('#gray').click();
        let pixel = cy.get('.drawing-area > :nth-child(2) > :nth-child(2)');
        pixel.click();
        pixel.should('have.css', 'background-color', 'rgb(0, 0, 0)');
        pixel.should('have.css', 'opacity', '0.1');
    });
    it('.should erase on hover', () => {
        cy.get('#hoverDraw').click();
        cy.get('#color').click()
        cy.get('#colorPicker')
            .invoke('prop', 'value')
            .then(color => {
                let pixel = cy.get('.drawing-area > :nth-child(2) > :nth-child(2)');
                pixel.trigger('mouseover');
                color = calc(color);
                pixel.should('have.css', 'background-color', color);
            })
        cy.get('#eraser').click();
        let pixel = cy.get('.drawing-area > :nth-child(2) > :nth-child(2)');
        pixel.trigger('mouseover');
        pixel.should('have.css', 'opacity', '0');
    });
    it('.should erase on click', () => {
        cy.get('#clickDraw').click();
        cy.get('#color').click()
        cy.get('#colorPicker')
            .invoke('prop', 'value')
            .then(color => {
                let pixel = cy.get('.drawing-area > :nth-child(2) > :nth-child(2)');
                pixel.click();
                color = calc(color);
                pixel.should('have.css', 'background-color', color);
            })
        cy.get('#eraser').click();
        let pixel = cy.get('.drawing-area > :nth-child(2) > :nth-child(2)');
        pixel.click();
        pixel.should('have.css', 'opacity', '0');
    });
})

function calc(hex) {
    var r, g, b, a = "";
    if (hex == "") hex = "000000";
    if (hex.charAt(0) == "#") hex = hex.substring(1, hex.length);
    if (hex.length != 6 && hex.length != 8 && hex.length != 3) {
        alert("Please enter 6 digits color code !");
        return;
    }
    if (hex.length == 3) {
        r = hex.substring(0, 1);
        g = hex.substring(1, 2);
        b = hex.substring(2, 3);
        r = r + r;
        g = g + g;
        b = b + b;
    } else {
        r = hex.substring(0, 2);
        g = hex.substring(2, 4);
        b = hex.substring(4, 6);
    }
    if (hex.length == 8) {
        a = hex.substring(6, 8);
        a = (parseInt(a, 16) / 255.0).toFixed(2);
    }
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
    var css = "rgb(" + r + ", " + g + ", " + b + ")";
    if (hex.length == 8)
        css = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";

    return css;
}