import InventoryPage from '../support/pages/InventoryPage';
import CartPage from '../support/pages/CartPage';

describe('Carrinho de Compras', () => {
    let users;

    before(() => {
        cy.fixture('users').then((data) => {
            users = data;
        });
    });

    beforeEach(() => {
        cy.login(users.valid_user.username, users.valid_user.password);
    });

    it('Deve validar correspondência de dados do produto no carrinho', () => {
        let title, price;

        cy.get('#item_4_title_link').invoke('text').then((text) => { title = text; });
        InventoryPage.getItemPrice(0).invoke('text').then((text) => { price = text; });

        InventoryPage.addToCart('sauce-labs-backpack');
        InventoryPage.goToCart();

        cy.get('.inventory_item_name').should(($el) => {
            expect($el.text()).to.eq(title);
        });
        cy.get('.inventory_item_price').should(($el) => {
            expect($el.text()).to.eq(price);
        });
    });

    it('Deve remover um item pelo carrinho', () => {
        InventoryPage.addToCart('sauce-labs-backpack');
        InventoryPage.goToCart();

        CartPage.cartItems.should('have.length', 1);
        CartPage.removeFromCart('sauce-labs-backpack');
        CartPage.cartItems.should('have.length', 0);
    });

    it('Deve retornar à vitrine ao clicar em Continue Shopping', () => {
        InventoryPage.addToCart('sauce-labs-backpack');
        InventoryPage.goToCart();

        CartPage.continueShopping();
        cy.url().should('include', '/inventory.html');
        cy.get('.title').should('have.text', 'Products');
    });
});
