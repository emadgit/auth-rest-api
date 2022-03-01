import request from "supertest";
import app from "../app";
import registerTester from "./registerTester";
import loginTester from "./loginTester";
import refreshTokenTester from "./refreshTokenTester";
import currentUserTester from "./currentUserTester";
import logoutTester from "./logoutTester";

const requestData = {
  email: (Math.random() + 1).toString(36).substring(7) + "@example.com",
  password: "validpass123",
  firstname: "John",
  lastname: "Doe",
  refreshToken: "",
  accessToken: "",
};

registerTester(request, app, requestData);

loginTester(request, app, requestData);

refreshTokenTester(request, app, requestData);

currentUserTester(request, app, requestData);

logoutTester(request, app, requestData);
