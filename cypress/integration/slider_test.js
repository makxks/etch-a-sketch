describe('Buttons respond to presses', () => {
    before(() => {
        cy.visit('https://makxks.github.io/etch-a-sketch/');
    });
    beforeEach(() => {
        cy.get('#clear').click();
    });
    it.only('.should change the number of "pixels" on slider change', () => {
        cy.get('#range')
            .invoke('val', 2)
            .trigger("change")

        cy.get('.pixel').should(($pixels) => {
            expect($pixels.length).to.be.below(7);
            //Non-square drawing area can lead to fractional pixels
        });

        cy.get('#range')
            .invoke('val', 100)
            .trigger('change')

        cy.get('.pixel').should(($pixels) => {
            expect($pixels.length).to.be.above(9999);
            //Non-square drawing area can lead to fractional pixels
        });
    })
})