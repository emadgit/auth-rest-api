/// <reference types="cypress" />
describe("Login Test", function () {
  it("Opens the login page and stays in it", function () {
    cy.visit("/login");

    cy.url().should("include", "/login");
  });

  it("Should validate email properly", function () {
    const errorSelector = ".alert.alert-danger:contains(email)";
    cy.get("[name=email]").clear().type("invalid-email");
    cy.get("button").focus();
    cy.get(errorSelector).should("exist");

    cy.get("[name=email]").clear().type("valid@email.com");
    cy.get("button").focus();
    cy.get(errorSelector).should("not.exist");
  });

  it("Should validate password properly", function () {
    const errorSelector = ".alert.alert-danger:contains(password)";
    cy.get("[name=password]").clear();
    cy.get("button").focus();
    cy.get(errorSelector).should("exist");

    cy.get("[name=password]").clear().type("enteredPassword");
    cy.get("button").focus();
    cy.get(errorSelector).should("not.exist");
  });

  it("should redirect the user to home page if authenticated", function () {
    const fakeUser = {
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      accessToken: "fakeAccessToken",
    };
    cy.get("html").then(() => {
      localStorage.setItem("user", JSON.stringify(fakeUser));
    });
    cy.visit("/login");
    cy.contains("h3", `You are logged in!`);
  });
});
