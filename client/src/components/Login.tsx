import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { getCurrentUser, login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import eventBus from "../common/EventBus";


const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  let navigate = useNavigate();

  const initialValues: {
    email: string;
    password: string;
  } = {
    email: "",
    password: "",
  };

  useEffect(() => {
    const user = getCurrentUser();
    if(user && user.accessToken) { 
      navigate("/");
      setLoading(true);
      setMessage("You are already logged in!");
    }
  }, [navigate]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("This is not a valid email.")
      .required("The email field is required!"),
    password: Yup.string()
      .required("The password field is required!"),
  });

  const handleLogin = (formValue: { email: string; password: string }) => {
    const { email, password } = formValue;

    setMessage("");
    setLoading(true);

    login(email, password).then(
      () => {
        navigate("/profile");
        eventBus.dispatch("updateLogin");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" type="text" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group mt-3">
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
