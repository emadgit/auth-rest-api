export default (request: any, app: any, requestData: any) => {  
  const { email, password, firstname, lastname } = requestData;

  describe("Logout", () => {
    it("should logout", async () => {
      const res = await request(app)
        .post('/api/logout')
        .set({ 'x-access-token': requestData.accessToken })
        .send();

      expect(res.statusCode).toEqual(204);
    });

    it("should show error for trying to return logged out user info", async () => {
      const res = await request(app)
        .post('/api/me')
        .set({ 'x-access-token': requestData.accessToken })
        .send();

      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toEqual("Token Expired!");
    });

  });
}
