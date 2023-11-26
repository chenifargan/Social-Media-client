import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./CSS/CreatePost.css";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Helpers/AuthContext";

function CreatePost() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);
  const initialValues = {
    title: "",
    postText: "",
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title!"),
    postText: Yup.string().required("You must input a text!"),
  });
  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/");
      });
  };
  const ErrorSpan = ({ children }) => (
    <span style={{ color: "red" }}>{children}</span>
  );

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component={ErrorSpan} />
          <Field id="inputCreatePost" name="title" placeholder="(title ...)" />
          <label>Post: </label>
          <ErrorMessage name="postText" component={ErrorSpan} />

          <Field
            id="inputCreatePost"
            name="postText"
            placeholder="(Post ...)"
          />

          <button type="submit">Create Post</button>
          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
