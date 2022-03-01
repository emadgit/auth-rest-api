export default (request: any, app: any, requestData: any) => {  
  describe("Refresh Token", () => {
    it("should return new access token", async () => {
      const res = await request(app)
        .post('/api/refresh-token')
        .set({ 'x-refresh': requestData.refreshToken })
        .send();
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("accessToken");
    });

    it("should return 401 error for invalid refresh token", async () => {
      const res = await request(app)
        .post('/api/refresh-token')
        .set({ 'x-refresh': "invalid refresh token" })
        .send();
      
      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toEqual("Could not refresh access token");
    });

  });
}
