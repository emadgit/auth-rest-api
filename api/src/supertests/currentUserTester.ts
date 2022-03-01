export default (request: any, app: any, requestData: any) => {  
  const { email, password, firstname, lastname } = requestData;

  describe("Current User", () => {
    it("should return current user info", async () => {
      const res = await request(app)
        .post('/api/me')
        .set({ 'x-access-token': requestData.accessToken })
        .send();

      expect(res.statusCode).toEqual(200);
      expect(res.body.email).toEqual(email);
      expect(res.body.firstname).toEqual(firstname);
      expect(res.body.lastname).toEqual(lastname);
    });

    it("should return error for invalid access-token", async () => {
      const res = await request(app)
        .post('/api/me')
        .set({ 'x-access-token': "invalid-access-token" })
        .send();

      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toEqual("Token Expired!");
    });

  });
}
