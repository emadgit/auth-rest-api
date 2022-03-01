import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import eventBus from "../common/EventBus";
import axios from "../services/axios.service";
import * as AuthService from "../services/auth.service";
import TokenService from "../services/token.service";
import IAuthUser from "../types/auth-user.td";

const needAuth: (Component: React.FC<any>) => React.FC<any> = (Component) => (props): any | {children: ReactNode} => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [currentUser,] = useState<IAuthUser|null>
                          (AuthService.getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if(!currentUser) {
      eventBus.dispatch("updateLogin");
      navigate("/login");
      return;
    }
    axios.post("/me", {}).then(res => {
      if(typeof res.data.email !== "undefined" && (
        res.data.email !== currentUser.email ||
        res.data.firstname !== currentUser.firstname ||
        res.data.lastname !== currentUser.lastname)) {
        TokenService.setUser({...currentUser, ...res.data});
        eventBus.dispatch("updateLogin");
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => setLoading(false));
  }, [currentUser, navigate]);

  return currentUser ? <Component {...props} currentUser={currentUser} loading={loading}>{props.children}</Component> : <h3>Redirecting to login...</h3>;
};

export default needAuth;
