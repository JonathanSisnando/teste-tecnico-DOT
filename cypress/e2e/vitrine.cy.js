import InventoryPage from '../support/pages/InventoryPage';

describe('Vitrine (Produtos)', () => {
    let users;

    before(() => {
        cy.fixture('users').then((data) => {
            users = data;
        });
    });

    beforeEach(() => {
        cy.login(users.valid_user.username, users.valid_user.password);
    });

    it('Deve exibir detalhes do produto corretamente', () => {
        cy.get('#item_4_title_link').click();
        cy.get('.inventory_details_name').should('have.text', 'Sauce Labs Backpack');
        cy.get('.inventory_details_price').should('have.text', '$29.99');
        cy.get('.inventory_details_desc').should('be.visible');
    });

    it('Deve adicionar um item e atualizar o badge do carrinho', () => {
        InventoryPage.addToCart('sauce-labs-backpack');
        
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible').and('have.text', 'Remove');
        InventoryPage.cartBadge.should('have.text', '1');
    });

    it('Deve adicionar múltiplos itens ao carrinho', () => {
        InventoryPage.addToCart('sauce-labs-backpack');
        InventoryPage.addToCart('sauce-labs-bike-light');
        InventoryPage.addToCart('sauce-labs-bolt-t-shirt');
        
        InventoryPage.cartBadge.should('have.text', '3');
    });

    it('Deve remover um item da vitrine e atualizar o badge', () => {
        InventoryPage.addToCart('sauce-labs-backpack');
        InventoryPage.cartBadge.should('have.text', '1');

        InventoryPage.removeFromCart('sauce-labs-backpack');
        InventoryPage.cartBadge.should('not.exist');
    });
});
