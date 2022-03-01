import render, { testUser } from "../services/test.service";
import tokenService from "../services/token.service";
import Profile from "./Profile";

describe("Profile", () => {
  it("renders profile successfully", async () => {
    const rc = render(Profile);
    expect(rc.queryByText("Redirecting to login...")).toBeTruthy();
  });

  it("shows welcome message to the logged in test user", async () => {
    tokenService.setUser(testUser);
    const rc = render(Profile);
    expect(rc.queryByText("Welcome Ali Doe!")).toBeTruthy();
  });
});
