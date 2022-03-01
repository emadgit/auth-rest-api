import React from "react";

const Container: React.FC<{ message: string }> = ({ message, children }) => {
  return <div className="container">
    <header className="jumbotron">
      <h3>
        <strong>{message}</strong>
      </h3>
    </header>
    {children}
  </div>
};

export default Container;