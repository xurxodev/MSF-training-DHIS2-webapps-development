/// <reference types='Cypress' />

context("Training Page", () => {
    before(() => {
        cy.login("est-training");
        cy.visit("/");
    });

    it("should conatin expected title", () => {
        cy.findByRole("heading", { name: /training session 4/i });
    });
});
