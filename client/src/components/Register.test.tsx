import render, { testUser } from "../services/test.service";
import tokenService from "../services/token.service";
import Register from "./Register";

describe("Register", () => {
  it("renders register successfully", async () => {
    tokenService.removeUser();
    const rc = render(Register);
    expect(rc.queryByText("", { selector: "input[name=email]" })).toBeTruthy();
  });

  it("does not show form and redirects user to home page", async () => {
    tokenService.setUser(testUser);
    const rc = render(Register);
    expect(rc.queryByText("", { selector: "span.spinner-border" })).toBeTruthy();
    expect(rc.queryByText("You are already logged in", { exact: false, selector: ".alert-danger pre" })).toBeTruthy();
  });

});
