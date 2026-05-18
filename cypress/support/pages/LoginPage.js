class LoginPage {
    get usernameInput() { return cy.get('[data-test="username"]'); }
    get passwordInput() { return cy.get('[data-test="password"]'); }
    get loginButton() { return cy.get('[data-test="login-button"]'); }
    get errorMessage() { return cy.get('[data-test="error"]'); }

    fillUsername(username) {
        if(username) this.usernameInput.type(username);
    }

    fillPassword(password) {
        if(password) this.passwordInput.type(password);
    }

    submit() {
        this.loginButton.click();
    }
}

export default new LoginPage();
