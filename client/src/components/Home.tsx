import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";

const Home: React.FC = () => {
  const [user, setUser] = useState<Object|null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        {user ? (
          <>
            <h3>You are logged in!</h3>
            <p>Visit your profile <Link to={"/profile"}>here</Link></p>
          </>
        ) : (
          <>
            <h3>You are not authenticated!</h3>
            <p>Please <Link to={"/login"}>login</Link> or <Link to={"/register"}>register</Link> to use this awesome app!</p>
          </>
        )}
      </header>
    </div>
  );
};

export default Home;
