import React, { ReactNode } from "react";
import eventBus from "../common/EventBus";
import * as AuthService from "../services/auth.service";
import Container from "./Profile/Container";
import IAuthUser from "../types/auth-user.td";
import needAuth from "./NeedAuth";

const Profile: React.FC<{ currentUser: IAuthUser, children: ReactNode }> = ({ currentUser }) => {
  return <Container message={`Welcome ${currentUser.firstname} ${currentUser.lastname}!`}>
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong></strong>
          </h3>
        </header>
        <p>
          <strong>Your Token:</strong> {currentUser.accessToken.substring(0, 20) + " ... " + currentUser.accessToken.substring(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Your Email Address:</strong> {currentUser.email}
        </p>
        <p>
          <strong><button className="nav-link" onClick={() => eventBus.dispatch("logout")}>Logout here</button></strong>
        </p>
      </div>
    </Container>
};

export default needAuth(Profile);
