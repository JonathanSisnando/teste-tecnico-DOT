class CheckoutPage {
    get firstNameInput() { return cy.get('[data-test="firstName"]'); }
    get lastNameInput() { return cy.get('[data-test="lastName"]'); }
    get postalCodeInput() { return cy.get('[data-test="postalCode"]'); }
    get continueButton() { return cy.get('[data-test="continue"]'); }
    get cancelButton() { return cy.get('[data-test="cancel"]'); }
    get errorMessage() { return cy.get('[data-test="error"]'); }

    get subtotalLabel() { return cy.get('.summary_subtotal_label'); }
    get taxLabel() { return cy.get('.summary_tax_label'); }
    get totalLabel() { return cy.get('.summary_total_label'); }
    get finishButton() { return cy.get('[data-test="finish"]'); }
    get itemPrices() { return cy.get('.inventory_item_price'); }

    get completeHeader() { return cy.get('.complete-header'); }
    get backHomeButton() { return cy.get('[data-test="back-to-products"]'); }

    fillInformation(firstName, lastName, zip) {
        if(firstName) this.firstNameInput.type(firstName);
        if(lastName) this.lastNameInput.type(lastName);
        if(zip) this.postalCodeInput.type(zip);
    }

    continueCheckout() {
        this.continueButton.click();
    }

    cancelCheckout() {
        this.cancelButton.click();
    }

    finishCheckout() {
        this.finishButton.click();
    }
}

export default new CheckoutPage();
