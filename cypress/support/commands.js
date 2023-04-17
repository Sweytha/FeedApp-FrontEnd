// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const APP_URL = Cypress.env("appUrl");
const BACKEND_URL = Cypress.env("backendUrl");

//login in the front end
Cypress.Commands.add("login", (credentials) => {

    //http://localhost:3000/user/login
    cy.visit(`${APP_URL}/user/login`);

    cy.get("#username").type(credentials.username);
    cy.get("#password").type(credentials.password).type("{enter}");
});

//valid login from the server 
Cypress.Commands.add("loginServerResponseCheck", (credentials) => {
    cy.request({
        method: "POST",
        url: `${BACKEND_URL}/user/login`,
        body: {
            username: credentials.username,
            password: credentials.password,
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
    });
});

Cypress.Commands.add("InvalidloginServerResponseCheck", (credentials) => {
    cy.request({
        method: "POST",
        url: `${BACKEND_URL}/user/login`,
        body: {
            username: credentials.username,
            password: credentials.password,
        },
        failOnStatusCode: false // don't fail the test if the response is an error
    }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq('Username or Password is Incorrect. Please try again');
    });
});