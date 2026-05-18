import InventoryPage from '../support/pages/InventoryPage';
import CartPage from '../support/pages/CartPage';
import CheckoutPage from '../support/pages/CheckoutPage';

describe('Checkout - Dados do Usuário', () => {
    let users, checkoutData;

    before(() => {
        cy.fixture('users').then((data) => { users = data; });
        cy.fixture('checkout').then((data) => { checkoutData = data; });
    });

    beforeEach(() => {
        cy.login(users.valid_user.username, users.valid_user.password);
        InventoryPage.addToCart('sauce-labs-backpack');
        InventoryPage.goToCart();
        CartPage.goToCheckout();
    });

    it('Deve avançar preenchendo todos os dados corretamente', () => {
        CheckoutPage.fillInformation(
            checkoutData.valid_data.firstName, 
            checkoutData.valid_data.lastName, 
            checkoutData.valid_data.postalCode
        );
        CheckoutPage.continueCheckout();
        
        cy.url().should('include', '/checkout-step-two.html');
        cy.get('.title').should('have.text', 'Checkout: Overview');
    });

    it('Deve exibir erro ao não informar o primeiro nome', () => {
        CheckoutPage.fillInformation(
            checkoutData.missing_first_name.firstName, 
            checkoutData.missing_first_name.lastName, 
            checkoutData.missing_first_name.postalCode
        );
        CheckoutPage.continueCheckout();
        
        CheckoutPage.errorMessage.should('be.visible').and('contain', 'Error: First Name is required');
    });

    it('Deve exibir erro ao não informar o CEP', () => {
        CheckoutPage.fillInformation(
            checkoutData.missing_postal_code.firstName, 
            checkoutData.missing_postal_code.lastName, 
            checkoutData.missing_postal_code.postalCode
        );
        CheckoutPage.continueCheckout();
        
        CheckoutPage.errorMessage.should('be.visible').and('contain', 'Error: Postal Code is required');
    });

    it('Deve cancelar o processo e retornar ao carrinho', () => {
        CheckoutPage.cancelCheckout();
        
        cy.url().should('include', '/cart.html');
        cy.get('.title').should('have.text', 'Your Cart');
    });
});
