import LoginPage from '../support/pages/LoginPage';

describe('Login Scenarios', () => {
    let users;

    before(() => {
        cy.fixture('users').then((data) => {
            users = data;
        });
    });

    beforeEach(() => {
        cy.visit('/');
    });

    it('Deve realizar login com sucesso', () => {
        LoginPage.fillUsername(users.valid_user.username);
        LoginPage.fillPassword(users.valid_user.password);
        LoginPage.submit();
        
        cy.url().should('include', '/inventory.html');
    });

    it('Deve exibir erro ao tentar login com credenciais incorretas', () => {
        LoginPage.fillUsername(users.invalid_user.username);
        LoginPage.fillPassword(users.invalid_user.password);
        LoginPage.submit();
        
        LoginPage.errorMessage
            .should('be.visible')
            .and('contain', 'Epic sadface: Username and password do not match any user in this service');
    });

    it('Deve exibir erro ao tentar login com usuário vazio', () => {
        LoginPage.fillPassword(users.valid_user.password);
        LoginPage.submit();
        
        LoginPage.errorMessage
            .should('be.visible')
            .and('contain', 'Epic sadface: Username is required');
    });

    it('Deve exibir erro ao tentar login com senha vazia', () => {
        LoginPage.fillUsername(users.valid_user.username);
        LoginPage.submit();
        
        LoginPage.errorMessage
            .should('be.visible')
            .and('contain', 'Epic sadface: Password is required');
    });
});
