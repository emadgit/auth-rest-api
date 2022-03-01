import axios from "./axios.service";
import tokenService from "./token.service";

export const register = (firstname: string, lastname: string, email: string, password: string) => {
  return axios
    .post("/register", {
      firstname,
      lastname,
      email,
      password,
    }).then((response) => {
      if (response.data.accessToken) {
        tokenService.setUser(response.data);
      }

      return response.data;
    });
};

export const login = (email: string, password: string) => {
  return axios
    .post("/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        tokenService.setUser(response.data);
      }

      return response.data;
    });
};

export const logout = (then: undefined|CallableFunction = undefined) => {
  const user = getCurrentUser();
  if(!user || !user.accessToken)
    return then && then();
  axios.post("/logout", {}).then((res) => {
    // tokenService.removeUser();
    // if(then)
    //   then();
  }).catch((err) => {
    console.error("Error logging out! The previous session probably remained valid on the server!", err);
    // this problem can be solved by showing active sessions to the user
  });
  tokenService.removeUser();
  if(then)
    then();
};

export const getCurrentUser = () => {
  const user = tokenService.getUser();
  if (user.accessToken) return user;

  return null;
};
