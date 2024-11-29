describe("Register functionality", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/");
        cy.get('button').contains("ZAREJESTRUJ SIĘ").click();

    });

    it("Should successfully register and redirect to login page", () => {
        cy.contains('div.label-container', 'Email')
            .parent() // przejście do elementu nadrzędnego
            .find('input') // znalezienie inputu w ramach nadrzędnego elementu
            .type('mail@mail.com');


        cy.contains('div.label-container', 'Hasło')
            .parent() // przejście do elementu nadrzędnego
            .find('input') // znalezienie inputu w ramach nadrzędnego elementu
            .type('bardzosekretnehaslo');


        cy.contains('div.label-container', 'Powtórz hasło')
            .parent() // przejście do elementu nadrzędnego
            .find('input') // znalezienie inputu w ramach nadrzędnego elementu
            .type('bardzosekretnehaslo');

        cy.get('button').contains("ZAREJESTRUJ SIĘ").click();

        cy.get('.Toastify__toast-body') // Lokalizuje ciało toastu
            .children('div')
            .eq(1)
            .should('contain', 'Registration successful!'); // Sprawdza, czy zawiera oczekiwany tekst

        cy.get('.Toastify__close-button').click();
        cy.url().should("include", "/");
    });

    it("Should not register and show appropriate toast, user already exists", () => {
        cy.contains('div.label-container', 'Email')
            .parent() // przejście do elementu nadrzędnego
            .find('input') // znalezienie inputu w ramach nadrzędnego elementu
            .type('mail@mail.com');


        cy.contains('div.label-container', 'Hasło')
            .parent() // przejście do elementu nadrzędnego
            .find('input') // znalezienie inputu w ramach nadrzędnego elementu
            .type('bardzosekretnehaslo');


        cy.contains('div.label-container', 'Powtórz hasło')
            .parent() // przejście do elementu nadrzędnego
            .find('input') // znalezienie inputu w ramach nadrzędnego elementu
            .type('bardzosekretnehaslo');

        cy.get('button').contains("ZAREJESTRUJ SIĘ").click();

        cy.get('.Toastify__toast-body') // Lokalizuje ciało toastu
            .children('div')
            .eq(1)
            .should('contain', 'Email already exists'); // Sprawdza, czy zawiera oczekiwany tekst
    });
});