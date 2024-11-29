describe("Login Functionality", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/");
    });

    it("Should log in and redirect to the home page", () => {
        cy.get('input[placeholder="Wpisz swój email"]').type("admin@test.com");
        cy.get('input[placeholder="Wpisz swoje hasło"]').type("12345678");
        cy.get('button').contains("ZALOGUJ SIĘ").click();

        cy.get('.Toastify__close-button').click();

        cy.url().should("include", "/chat");
    });

    it('should log in and show appropriate toast', () => {
        cy.get('input[placeholder="Wpisz swój email"]').type("admin@test.com");
        cy.get('input[placeholder="Wpisz swoje hasło"]').type("12345678");
        cy.get('button').contains("ZALOGUJ SIĘ").click();

        cy.get('.Toastify__toast-body') // Lokalizuje ciało toastu
            .children('div')
            .eq(1)
            .should('contain', 'Auth success'); // Sprawdza, czy zawiera oczekiwany tekst

        cy.get('.Toastify__close-button').click();
    });

    it('Should not log in and show appropriate toast after wrong email', () => {
        cy.get('input[placeholder="Wpisz swój email"]').type("nie_admin@test.com");
        cy.get('input[placeholder="Wpisz swoje hasło"]').type("12345678");
        cy.get('button').contains("ZALOGUJ SIĘ").click();

        cy.get('.Toastify__toast-body') // Lokalizuje ciało toastu
            .children('div')
            .eq(1)
            .should('contain', 'INVALID_CREDENTIALS'); // Sprawdza, czy zawiera oczekiwany tekst

        cy.get('.Toastify__close-button').click();
    });

    it('Should not log in and show appropriate toast after wrong password', () => {
        cy.get('input[placeholder="Wpisz swój email"]').type("admin@test.com");
        cy.get('input[placeholder="Wpisz swoje hasło"]').type("haslo_nie_dla_admina");
        cy.get('button').contains("ZALOGUJ SIĘ").click();

        cy.get('.Toastify__toast-body') // Lokalizuje ciało toastu
            .children('div')
            .eq(1)
            .should('contain', 'INVALID_CREDENTIALS'); // Sprawdza, czy zawiera oczekiwany tekst

        cy.get('.Toastify__close-button').click();
    });

    it('Should not log in and show appropriate toast after passing only email', () => {
        cy.get('input[placeholder="Wpisz swój email"]').type("admin@test.com");
        cy.get('button').contains("ZALOGUJ SIĘ").click();

        cy.get('.Toastify__toast-body') // Lokalizuje ciało toastu
            .children('div')
            .eq(1)
            .should('contain', 'Invalid input data'); // Sprawdza, czy zawiera oczekiwany tekst

        cy.get('.Toastify__close-button').click();
    });

    it('Should not log in and show appropriate toast after passing only password', () => {
        cy.get('input[placeholder="Wpisz swoje hasło"]').type("haslo_nie_dla_admina");
        cy.get('button').contains("ZALOGUJ SIĘ").click();

        cy.get('.Toastify__toast-body') // Lokalizuje ciało toastu
            .children('div')
            .eq(1)
            .should('contain', 'Invalid input data'); // Sprawdza, czy zawiera oczekiwany tekst

        cy.get('.Toastify__close-button').click();
    });

    it('Should not log in and show appropriate toast after not passing any credentials', () => {
        cy.get('button').contains("ZALOGUJ SIĘ").click();

        cy.get('.Toastify__toast-body') // Lokalizuje ciało toastu
            .children('div')
            .eq(1)
            .should('contain', 'Invalid input data'); // Sprawdza, czy zawiera oczekiwany tekst

        cy.get('.Toastify__close-button').click();
    });

    it('Should log in as guest', () => {
        cy.get('a').contains("Kontynuuj jako gość").click();

        cy.get('a.ant-dropdown-link').click();

        cy.get('span.ant-dropdown-menu-title-content')
            .should('contain', 'Zaloguj się');
    });
});