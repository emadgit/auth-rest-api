export default (request: any, app: any, requestData: any) => {
  const { email, password, firstname, lastname } = requestData;

  describe('Register', () => {
    const userInfo = {
      firstname,
      lastname,
      email,
      password
    };
    it('should register a new test user and return proper response', async () => {
      const res = await request(app)
        .post('/api/register')
        .send(userInfo);

      expect(res.statusCode).toEqual(201);
      expect(res.body.email).toEqual(email);
      expect(res.body.firstname).toEqual(firstname);
      expect(res.body.lastname).toEqual(lastname);
      expect(res.body).toHaveProperty("accessToken");
      expect(res.body).toHaveProperty("refreshToken");
      expect(res.body.message).toEqual("Register successful");

      // set for later use
      requestData.refreshToken = res.body.refreshToken;
      requestData.accessToken = res.body.accessToken;
    });

    it('should prevent from registering previous email again and respond with 403 error', async () => {
      const res = await request(app)
        .post('/api/register')
        .send(userInfo);

      expect(res.statusCode).toEqual(403);
      expect(res.body.message).toEqual("The email address you have entered is already registered");
    });

    it('should prevent from registering user with invalid inputs and respond with 400 error', async () => {
      const userInfo = {
        firstname: "",
        lastname: "",
        email: "invalid-email",
        password: "invalid-password"
      };
      const res = await request(app)
        .post('/api/register')
        .send(userInfo);

      const expectedErrors = [
        "Invalid email",
        "Fullname must have more than 5 characters",
        "The password must contain at least 1 number"
      ];
      expect(res.statusCode).toEqual(400);
      const returnedErrors = res.body.map((b: any) => b.message);
      expect(expectedErrors.filter((err: string) => !returnedErrors.find((err1: string) => err1 === err)).length).toEqual(0);
      expect(returnedErrors.filter((err: string) => !expectedErrors.find((err1: string) => err1 === err)).length).toEqual(0);
    });

    it('should prevent from registering user with no inputs and respond with 400 error', async () => {
      const userInfo = {};
      const res = await request(app)
        .post('/api/register')
        .send(userInfo);

      const expectedErrors = [
        "Email is required",
        "Firstname is required",
        "Lastname is required",
        "Password is required"
      ];
      expect(res.statusCode).toEqual(400);
      const returnedErrors = res.body.map((b: any) => b.message);
      expect(expectedErrors.filter((err: string) => !returnedErrors.find((err1: string) => err1 === err)).length).toEqual(0);
      expect(returnedErrors.filter((err: string) => !expectedErrors.find((err1: string) => err1 === err)).length).toEqual(0);
    });

    it('should prevent from registering user with long inputs and respond with 400 error', async () => {
      const userInfo = {
        firstname: "AVeryLongFirstNameAVeryLongFirstNameAVeryLongFirstNameAVeryLongFirstNameAVeryLongFirstNameAVeryLongFirstName",
        lastname: "AVeryLongLastNameAVeryLongLastNameAVeryLongLastNameAVeryLongLastNameAVeryLongLastNameAVeryLongLastName",
        email,
        password: "inpass1"
      };
      const res = await request(app)
        .post('/api/register')
        .send(userInfo);

      const expectedErrors = [
        "Firstname is too long",
        "Lastname is too long",
        "Password must contain at least 8 characters"
      ];
      expect(res.statusCode).toEqual(400);
      const returnedErrors = res.body.map((b: any) => b.message);
      expect(expectedErrors.filter((err: string) => !returnedErrors.find((err1: string) => err1 === err)).length).toEqual(0);
      expect(returnedErrors.filter((err: string) => !expectedErrors.find((err1: string) => err1 === err)).length).toEqual(0);
    });

  });
}
