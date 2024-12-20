describe("Logout Functionality", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/");
        cy.get('input[placeholder="Wpisz swój email"]').type("admin@test.com");
        cy.get('input[placeholder="Wpisz swoje hasło"]').type("12345678");
        cy.get('button').contains("ZALOGUJ SIĘ").click();
        // close the auth success toast button
        cy.get('.Toastify__toast-container .Toastify__close-button').click();
        cy.url().should("include", "/chat");
    });

    it("Should log out and redirect to the login page", () => {
        cy.get(".ant-dropdown-link").click();
        cy.get("span.ant-dropdown-menu-title-content").contains("Wyloguj się").click();
        cy.url().should("include", "/");
    });
});
