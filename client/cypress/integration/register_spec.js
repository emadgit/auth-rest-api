/// <reference types="cypress" />
describe("Register Test", function () {
  it("Opens the register page and stays in it", function () {
    cy.visit("/register");

    cy.url().should("include", "/register");
  });

  it("Should validate firstname properly", function () {
    const errorSelector = ".alert.alert-danger:contains(firstname)";
    cy.get("[name=firstname]").clear();
    cy.get("button").focus();
    cy.get(errorSelector).should("exist");

    cy.get("[name=firstname]")
      .clear()
      .type(
        "AVeryLongFirstNameAVeryLongFirstNameAVeryLongFirstNameAVeryLongFirstNameAVeryLongFirstNameAVeryLongFirstNameAVeryLongFirstName..."
      );
    cy.get("button").focus();
    cy.get(errorSelector).should("exist");

    cy.get("[name=firstname]").clear().type("Valid Firstname");
    cy.get("button").focus();
    cy.get(errorSelector).should("not.exist");
  });

  it("Should validate lastname properly", function () {
    const errorSelector = ".alert.alert-danger:contains(lastname)";
    cy.get("[name=lastname]").clear();
    cy.get("button").focus();
    cy.get(errorSelector).should("exist");

    cy.get("[name=lastname]")
      .clear()
      .type(
        "AVeryLongLastNameAVeryLongLastNameAVeryLongLastNameAVeryLongLastNameAVeryLongLastNameAVeryLongLastNameAVeryLongLastName..."
      );
    cy.get("button").focus();
    cy.get(errorSelector).should("exist");

    cy.get("[name=lastname]").clear().type("Valid Lastname");
    cy.get("button").focus();
    cy.get(errorSelector).should("not.exist");
  });

  it("Should validate email properly", function () {
    const errorSelector = ".alert.alert-danger:contains(email)";
    cy.get("[name=email]").clear().type("invalid@email");
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

    cy.get("[name=password]").clear().type("lowpass");
    cy.get("button").focus();
    cy.get(errorSelector).should("exist");

    cy.get("[name=password]").clear().type("noNumberPassword");
    cy.get("button").focus();
    cy.get(errorSelector).should("exist");

    cy.get("[name=password]").clear().type("WithNumberValidPass1");
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
