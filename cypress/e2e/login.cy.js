import { validCredentials, invalidCredentials } from "../fixtures/login.json";


describe("Valid Login Test", () => {
    it("should allow a user to log in with valid credentials", () => {
        cy.login(validCredentials);
        cy.location("pathname").should("include", "/app/dashboard");
    });
});

describe("Valid Login Server Response Test", () => {
    it("should be able to get a valid response from server", () => {
        cy.loginServerResponseCheck(validCredentials);
    });
});

describe("Invalid Login Test", () => {
    it("should not allow a user to log in with invalid credentials", () => {
        cy.login(invalidCredentials);
        cy.get("#messageBadge").should(
            "contain",
            "Username or Password is Incorrect. Please try again"
        );
    });
});

describe("Invalid Login Server Response Test", () => {
    it("check the server response status code and message", () => {
        cy.InvalidloginServerResponseCheck(invalidCredentials);
    });
});