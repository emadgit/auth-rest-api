import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import * as AuthService from "./services/auth.service";
import IUser from './types/user.type';

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";

import EventBus from "./common/EventBus";

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const navigate = useNavigate();

  const logOut = () => {
    AuthService.logout(() => {
      setCurrentUser(undefined);
      navigate("/login");
    });
  };

  const updateLogin = () => {
    setCurrentUser(AuthService.getCurrentUser());
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", logOut);
    EventBus.on("updateLogin", updateLogin);

    return () => {
      EventBus.remove("logout", logOut);
      EventBus.remove("updateLogin", updateLogin);
    };
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Authentication App
        </Link>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {`${currentUser.firstname} ${currentUser.lastname}`}
              </Link>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={logOut}>
                Logout
              </button>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Register
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
