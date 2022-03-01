export default (request: any, app: any, requestData: any) => {
  const { email, password, firstname, lastname } = requestData;

  describe('Login', () => {
    const userInfo = {
      email,
      password
    };
    it('should login and return proper response', async () => {
      const res = await request(app)
        .post('/api/login')
        .send(userInfo);

      expect(res.statusCode).toEqual(200);
      expect(res.body.email).toEqual(email);
      expect(res.body).toHaveProperty("accessToken");
      expect(res.body).toHaveProperty("refreshToken");
      expect(res.body).toHaveProperty("firstname");
      expect(res.body).toHaveProperty("lastname");
      expect(res.body.message).toEqual("Login successful");
    });

    it('should return error for invalid credentials', async () => {
      const res = await request(app)
        .post('/api/login')
        .send({ email: "non-registered-email@gmail.com", password: "example-password" });

      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toEqual("Invalid email or password");
    });

    it('should return error for invalid inputs', async () => {
      const res = await request(app)
        .post('/api/login')
        .send({ email: "invalid-email", password: "" });

      const expectedErrors = [
        "The email is not valid",
        "Password is required"
      ];
      expect(res.statusCode).toEqual(400);
      const returnedErrors = res.body.map((b: any) => b.message);
      expect(expectedErrors.filter((err: string) => !returnedErrors.find((err1: string) => err1 === err)).length).toEqual(0);
      expect(returnedErrors.filter((err: string) => !expectedErrors.find((err1: string) => err1 === err)).length).toEqual(0);
    });

  });
}
