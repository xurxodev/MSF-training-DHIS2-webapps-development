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

    it("should open detail panel with disabled text for disabled org unit", () => {
        cy.expandNode(/ocba/i);
        cy.expandNode(/angola/i);
        cy.expandNode(/zzz_huambo, malaria outbreak_closed/i);

        cy.findByRole("heading", { name: /the selected organisation unit is disabled/i });
    });

    it("should edit a project level 4 org unit successfully", () => {
        cy.expandNode(/ocba/i);
        cy.expandNode(/burkina faso/i);
        cy.expandNode(/covid19, burkina faso/i);

        cy.findByRole("button", { name: /edit/i }).click();
        cy.findByLabelText(/name/i).clear().type("COVID19, BURKINA FASO");
        cy.findByRole("button", { name: /save/i }).click();
        cy.findByText(/project saved/i);
    });
});
