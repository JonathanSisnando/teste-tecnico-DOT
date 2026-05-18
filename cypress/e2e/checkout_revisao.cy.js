import InventoryPage from '../support/pages/InventoryPage';
import CartPage from '../support/pages/CartPage';
import CheckoutPage from '../support/pages/CheckoutPage';

describe('Checkout - Revisão e Finalização', () => {
    let users, checkoutData;

    before(() => {
        cy.fixture('users').then((data) => { users = data; });
        cy.fixture('checkout').then((data) => { checkoutData = data; });
    });

    beforeEach(() => {
        cy.login(users.valid_user.username, users.valid_user.password);
        InventoryPage.addToCart('sauce-labs-backpack');
        InventoryPage.addToCart('sauce-labs-bike-light');
        InventoryPage.goToCart();
        CartPage.goToCheckout();
        CheckoutPage.fillInformation(
            checkoutData.valid_data.firstName, 
            checkoutData.valid_data.lastName, 
            checkoutData.valid_data.postalCode
        );
        CheckoutPage.continueCheckout();
    });

    it('Deve validar o cálculo do subtotal dos itens', () => {
        let somaItens = 0;
        
        CheckoutPage.itemPrices.each(($el) => {
            const preco = parseFloat($el.text().replace('$', ''));
            somaItens += preco;
        }).then(() => {
            CheckoutPage.subtotalLabel.should(($subtotal) => {
                const subtotalSistema = parseFloat($subtotal.text().replace('Item total: $', ''));
                expect(subtotalSistema).to.eq(somaItens);
            });
        });
    });

    it('Deve validar o total da compra (Subtotal + Tax)', () => {
        let subtotalVal, taxVal;

        CheckoutPage.subtotalLabel.invoke('text').then((text) => {
            subtotalVal = parseFloat(text.replace('Item total: $', ''));
        });
        CheckoutPage.taxLabel.invoke('text').then((text) => {
            taxVal = parseFloat(text.replace('Tax: $', ''));
        });

        CheckoutPage.totalLabel.should(($total) => {
            const totalSistema = parseFloat($total.text().replace('Total: $', ''));
            expect(totalSistema).to.eq(subtotalVal + taxVal);
        });
    });

    it('Deve finalizar a compra com sucesso', () => {
        CheckoutPage.finishCheckout();
        
        cy.url().should('include', '/checkout-complete.html');
        CheckoutPage.completeHeader.should('have.text', 'Thank you for your order!');
    });

    it('Deve cancelar a revisão e retornar à vitrine', () => {
        CheckoutPage.cancelCheckout();
        
        cy.url().should('include', '/inventory.html');
        cy.get('.title').should('have.text', 'Products');
    });
});
