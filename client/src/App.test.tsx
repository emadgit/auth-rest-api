import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import tokenService from "./services/token.service";

describe("App", () => {
  it("renders app successfully", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('Login').closest('a')).toHaveAttribute('href', '/login');
    expect(screen.getByText('Register').closest('a')).toHaveAttribute('href', '/register');
  });

  it("shows relevent data based on the logged user", () => {
    tokenService.setUser({
      email: "test@gmail.com",
      firstname: "Tester",
      lastname: "Man",
      accessToken: "fakeAccessToken",
      refreshToken: "fakeRefreshToken"
    });
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText('Tester Man').closest('a')).toHaveAttribute('href', '/profile');
    expect(screen.getByText('Logout').closest('button'));
    expect(screen.getByText('You are logged in!')).toBeTruthy();
  });

});
