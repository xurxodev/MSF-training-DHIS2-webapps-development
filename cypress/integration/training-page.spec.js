/// <reference types='Cypress' />

context("Training Page", () => {
    before(() => {
        cy.login("est-training");
        cy.visit("/");
    });

    it("should contains expected title", () => {
        cy.findByRole("heading", { name: /training session 4/i });
    });

    it("should open detail panel for operational center level 1 org unit", () => {
        cy.expandNode(/ocba/i);

        cy.findByRole("heading", { name: /operational center/i });
    });

    it("should open detail panel for mission level 2 org unit", () => {
        cy.expandNode(/ocba/i);
        cy.expandNode(/angola/i);

        cy.findByRole("heading", { name: /mission/i });
    });
});
