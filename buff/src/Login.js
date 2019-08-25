import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="background">
      <div className="login-form">
        <h2>Please Login Below</h2>
        <div className="form-container">
          <Form className="some-form">
            <h4>Username</h4>
            <Field
              component="input"
              type="email"
              name="username"
              placeholder="enter username"
            />
            <h4>Password</h4>
            <Field
              component="input"
              type="password"
              name="password"
              placeholder="enter password"
            />

            <button type="submit">Submit</button>
          </Form>
        </div>
        <h2>
          No Accout? <span>Sign up!</span>
        </h2>
      </div>
    </div>
  );
};

const LoginForm = withFormik({
  mapPropsToValues(values) {
    return {
      username: values.username || "",
      password: values.password || ""
    };
  }
})(Login);

export default LoginForm;