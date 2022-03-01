/// <reference types="cypress" />
describe("Home Test", function () {
  it("Opens the home page successfully", function () {
    cy.visit("/");
    cy.contains("h3", "You are not authenticated!");
    cy.contains("p a", "login");
    cy.contains("p a", "register");
  });

  it("shows you are logged in for authenticated user", function () {
    const fakeUser = {
      firstname: "John",
      lastname: "Doe",
      email: "john.doe@example.com",
      accessToken: "fakeAccessToken",
    };
    cy.get("html").then(() => {
      localStorage.setItem("user", JSON.stringify(fakeUser));
    });
    cy.visit("/");
    cy.contains("h3", `You are logged in!`);
  });
});
