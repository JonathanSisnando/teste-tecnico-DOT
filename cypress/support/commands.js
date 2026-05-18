// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import LoginPage from './pages/LoginPage';

Cypress.Commands.add('login', (username, password) => {
    cy.visit('/');
    LoginPage.fillUsername(username);
    LoginPage.fillPassword(password);
    LoginPage.submit();
});