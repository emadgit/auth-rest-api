import { testUser } from "./test.service";
import tokenService from "./token.service";

describe("Token Service", () => {
  it("returns undefined for access token", () => {
    tokenService.removeUser();
    expect(tokenService.getLocalAccessToken()).toBeUndefined();
  });

  it("returns registered fake-access-token", () => {
    tokenService.setUser(testUser);
    expect(tokenService.getLocalAccessToken()).toEqual(testUser.accessToken);
  }); 

  it("returns undefined for refresh token", () => {
    tokenService.removeUser();
    expect(tokenService.getLocalRefreshToken()).toBeUndefined();
  });

  it("returns registered fake-refresh-token", () => {
    tokenService.setUser(testUser);
    expect(tokenService.getLocalRefreshToken()).toEqual(testUser.refreshToken);
  }); 

});