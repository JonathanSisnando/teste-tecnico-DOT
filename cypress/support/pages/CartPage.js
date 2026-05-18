class CartPage {
    get checkoutButton() { return cy.get('[data-test="checkout"]'); }
    get continueShoppingButton() { return cy.get('[data-test="continue-shopping"]'); }
    get cartItems() { return cy.get('.cart_item'); }

    removeFromCart(itemDashedName) {
        cy.get(`[data-test="remove-${itemDashedName}"]`).click();
    }

    goToCheckout() {
        this.checkoutButton.click();
    }

    continueShopping() {
        this.continueShoppingButton.click();
    }
}

export default new CartPage();
