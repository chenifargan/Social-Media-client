import React from "react";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

const ChangePassword = () => {
  const navigate = useNavigate();
  const initialValues = {
    oldPassword: "",
    newPassword: "",
  };
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().min(4).max(15).required(),
    newPassword: Yup.string().min(4).max(15).required(),
  });
  const ErrorSpan = ({ children }) => (
    <span style={{ color: "red" }}>{children}</span>
  );
  const changePassword = (data) => {
    console.log(data.newPassword);
    axios
      .put(
        "http://localhost:3001/auth/changepassword",
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert(response.data);
          navigate("/");
        }
      });
  };
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={changePassword}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Old password: </label>
          <ErrorMessage name="oldPassword" component={ErrorSpan} />

          <Field
            id="inputCreatePost"
            name="oldPassword"
            type="password"
            placeholder="(Old password...)"
          />
          <label> New password: </label>
          <ErrorMessage name="newPassword" component={ErrorSpan} />

          <Field
            id="inputCreatePost"
            name="newPassword"
            type="password"
            placeholder="(New password ...)"
          />
          <button type="submit">Change Password</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePassword;
