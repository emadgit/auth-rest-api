import render, { testUser } from "../services/test.service";
import tokenService from "../services/token.service";
import Home from "./Home";

describe("Home", () => {
  it("renders home successfully", () => {
    const rc = render(Home);
    expect(rc.queryByText("You are not authenticated!")).toBeTruthy();
    expect(rc.queryByText("login", { selector: "p a" })).toHaveAttribute("href", "/login");
    expect(rc.queryByText("register", { selector: "p a" })).toHaveAttribute("href", "/register");
  });

  it("shows logged in message", async () => {
    tokenService.setUser(testUser);
    const rc = render(Home);
    expect(rc.queryByText("You are logged in", { exact: false })).toBeTruthy();
    expect(rc.queryByText("here", { selector: "p a" })).toHaveAttribute("href", "/profile");
  });
});
