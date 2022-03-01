/// <reference types="cypress" />

const { waitForDebugger } = require("inspector");

describe("Profile Test", function () {
  it("redirects from profile page to login page", function () {
    cy.visit("/profile");
    cy.contains("h3", "Redirecting to login...");
    cy.url().should("include", "/login");
  });
  it("shows welcome message and then redirects from profile page to login page", function () {
    const fakeUser = {
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      accessToken: "fakeAccessToken",
    };
    cy.get("html").then(() => {
      localStorage.setItem("user", JSON.stringify(fakeUser));
    });
    cy.visit("/profile");
    cy.contains("h3", `Welcome ${fakeUser.firstname} ${fakeUser.lastname}!`);
    cy.url().should("include", "/login");
  });
});
