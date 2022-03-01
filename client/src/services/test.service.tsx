import { render } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

const r = (Component: React.FC<any>, props?: any) => {
  return render(
    <MemoryRouter>
      <Component {...props} />
    </MemoryRouter>
  );
};

export const testUser = {
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@example.com",
  accessToken: "fake-access-token",
  refreshToken: "fake-refresh-token",
};

export default r;
