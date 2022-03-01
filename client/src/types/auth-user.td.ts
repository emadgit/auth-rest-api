interface IAuthUser {
  email: string,
  firstname: string,
  lastname: string,
  accessToken: string,
  refreshToken: string
};

export default IAuthUser;