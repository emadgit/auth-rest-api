import { getCurrentUser } from "./auth.service";
import { testUser } from "./test.service";
import tokenService from "./token.service";

describe("Auth Service", () => {
  it("returns null for current user", () => {
    tokenService.removeUser();
    expect(getCurrentUser()).toBeNull();
  });

  it("returns the current user", () => {
    tokenService.setUser(testUser);
    expect(JSON.stringify(getCurrentUser())).toEqual(JSON.stringify(testUser));
  });

});