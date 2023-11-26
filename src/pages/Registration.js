import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Helpers/AuthContext";

function Registration() {
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(15).required(),
  });
  const ErrorSpan = ({ children }) => (
    <span style={{ color: "red" }}>{children}</span>
  );
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response) => {
      localStorage.setItem("accessToken", response.data.token);
      setAuthState({
        username: response.data.username,
        id: response.data.id,
        status: true,
      });
      navigate("/");
    });
  };
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>User Name: </label>
          <ErrorMessage name="username" component={ErrorSpan} />

          <Field
            id="inputCreatePost"
            name="username"
            placeholder="(User name ...)"
          />
          <label> Password: </label>
          <ErrorMessage name="password" component={ErrorSpan} />

          <Field
            id="inputCreatePost"
            name="password"
            type="password"
            placeholder="(Password ...)"
          />
          <button type="submit">Register User</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
