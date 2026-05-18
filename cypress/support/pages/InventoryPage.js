class InventoryPage {
    get cartBadge() { return cy.get('.shopping_cart_badge'); }
    get cartLink() { return cy.get('.shopping_cart_link'); }
    get inventoryItems() { return cy.get('.inventory_item'); }

    addToCart(itemDashedName) {
        cy.get(`[data-test="add-to-cart-${itemDashedName}"]`).click();
    }

    removeFromCart(itemDashedName) {
        cy.get(`[data-test="remove-${itemDashedName}"]`).click();
    }

    goToCart() {
        this.cartLink.click();
    }
    
    getItemPrice(index) {
        return cy.get('.inventory_item_price').eq(index);
    }
}

export default new InventoryPage();
