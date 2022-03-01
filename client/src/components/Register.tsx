import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import IUser from "../types/user.type";
import { getCurrentUser, register } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import eventBus from "../common/EventBus";

const Register: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: IUser = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if(user && user.accessToken) { 
      navigate("/");
      setLoading(true);
      setMessage("You are already logged in!");
    }
  }, [navigate]);


  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .test(
        "len",
        "The firstname must be between 1 and 100 characters.",
        (val: any) =>
          val &&
          val.toString().length &&
          val.toString().length <= 100
      )
      .required("The firstname field is required!"),
    lastname: Yup.string()
      .test(
        "len",
        "The lastname must be between 1 and 100 characters.",
        (val: any) =>
          val &&
          val.toString().length &&
          val.toString().length <= 100
      )
      .required("The lastname field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("The email field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 8 and 40 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 8 &&
          val.toString().length <= 40
      )
      .test(
        "val",
        "The password must contain at least 1 number and 1 letter.",
        (val: any) =>
          val &&
          /[a-zA-Z]/.test(val.toString()) &&
          /[0-9]/.test(val.toString())
      )
      .required("The password field is required!"),
  });

  const handleRegister = (formValue: IUser) => {
    const { firstname, lastname, email, password } = formValue;
    setLoading(true);
    setMessage("");

    if(firstname.length + lastname.length < 5){
      setMessage("Fullname must have at least 5 characters");
      return;
    }

    register(firstname, lastname, email, password).then(
      (response) => {
        navigate("/profile");
        eventBus.dispatch("updateLogin");
      },
      (error) => {
        let data = error.response?.data;
        data = typeof data[0] === "undefined" ? data : { message: data.map((dt: { message: string }) => "- " + dt.message).join(". \n") };
        const resMessage = data?.message || error.message || error.toString();

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
          onSubmit={handleRegister}
        >
          <Form>
            <div>
              <div className="form-group">
                <label htmlFor="firstname"> Firstname </label>
                <Field name="firstname" type="text" className="form-control" />
                <ErrorMessage
                  name="firstname"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastname"> Lastname </label>
                <Field name="lastname" type="text" className="form-control" />
                <ErrorMessage
                  name="lastname"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email"> Email </label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password"> Password </label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                />
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
                  <span>Register</span>
                </button>
              </div>
            </div>

            {message && (
              <div className="form-group">
                <div
                  className={"alert alert-danger"}
                  role="alert"
                >
                  <pre>
                    {message}
                  </pre>
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
