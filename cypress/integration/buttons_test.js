describe('Buttons respond to presses', () => {
    before(() => {
        cy.visit('https://makxks.github.io/etch-a-sketch/');
    });
    it('.should set the style of the drawing mode button when selected', () => {
        cy.get('#hoverDraw').click();
        cy.get('#hoverDraw').should('have.class', 'selected');
        cy.get('#clickDraw').should('not.have.class', 'selected');

        cy.get('#clickDraw').click();
        cy.get('#clickDraw').should('have.class', 'selected');
        cy.get('#hoverDraw').should('not.have.class', 'selected');
    });
    it('.should set the style of the drawing color mode button when selected', () => {
        cy.get('#color').click();
        cy.get('#color').should('have.class', 'selected');
        cy.get('#gray').should('not.have.class', 'selected');
        cy.get('#rainbow').should('not.have.class', 'selected');
        cy.get('#eraser').should('not.have.class', 'selected');

        cy.get('#gray').click();
        cy.get('#gray').should('have.class', 'selected');
        cy.get('#color').should('not.have.class', 'selected');
        cy.get('#rainbow').should('not.have.class', 'selected');
        cy.get('#eraser').should('not.have.class', 'selected');

        cy.get('#rainbow').click();
        cy.get('#rainbow').should('have.class', 'selected');
        cy.get('#gray').should('not.have.class', 'selected');
        cy.get('#color').should('not.have.class', 'selected');
        cy.get('#eraser').should('not.have.class', 'selected');

        cy.get('#eraser').click();
        cy.get('#eraser').should('have.class', 'selected');
        cy.get('#rainbow').should('not.have.class', 'selected');
        cy.get('#gray').should('not.have.class', 'selected');
        cy.get('#color').should('not.have.class', 'selected');
    });
})