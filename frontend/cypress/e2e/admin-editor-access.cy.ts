describe("Admin editor access functionality", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/");
        cy.get('input[placeholder="Wpisz swój email"]').type("admin@test.com");
        cy.get('input[placeholder="Wpisz swoje hasło"]').type("12345678");
        cy.get('button').contains("ZALOGUJ SIĘ").click();
        // close the auth success toast button
        cy.get('.Toastify__toast-container .Toastify__close-button').click();
        cy.url().should("include", "/chat");
    });

    it('should navigate to the documents page when documents link is clicked', () => {

        cy.get('[data-cy="documents-link"]').click();
        cy.url().should('include', '/documents');
        // check if can come back to chat page
        cy.get('[data-cy="chatbot-link"]').click();
        cy.url().should('include', '/chat');


    });
});