import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import { Link } from "react-router-dom";

function Login({ errors, touched }) {
    return (
        // <Form>
        //     {touched.username && errors.username && <p>{errors.username}</p>}
        //     <Field type='text' 
        //            component='input' 
        //            placeholder='username' 
        //            name='username' />
        //     {touched.password && errors.password && <p>{errors.password}</p>}
        //     <Field type='text' 
        //            component='input' 
        //            placeholder='password' 
        //            name='password' />
        //     <button type='submit'>Submit</button>
        // </Form>
        <div className="background">
            <div className="login-form">
                <h2>Please Login Below</h2>
                <div className="form-container">
                <Form className="some-form">
                    <h4>Username</h4>
                    {touched.username && errors.username && <p>{errors.username}</p>}
                    <Field
                    component="input"
                    type="input"
                    name="username"
                    placeholder="enter username"
                    />
                    <h4>Password</h4>
                    {touched.password && errors.password && <p>{errors.password}</p>}
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
                No Account? <span>Sign up!</span>
                </h2>
            </div>
        </div>
    )
}

const LoginFormik = withFormik({
    mapPropsToValues({username, password}){
        return({
            username: username || '',
            password: password || ''
        })
    },
    handleSubmit(values, { props }){
        console.log('Values Login: ', values);
        axios.post('https://get-hercules.herokuapp.com/api/auth/login', values)
            .then(res => {
                console.log('Posted successfully');
                console.log('Login Info: ', res);
                props.getLogin(res.data.user);
                localStorage.setItem('token', res.data.token);
                props.history.push(`/journal/${res.data.user.id}`)
            })
            .catch(err => {
                console.log('Post failed: ', err);
            })
    },
    validationSchema: Yup.object().shape({
        username: Yup.string()
                      .required('username required'),
        password: Yup.string()
                      .required('password required')
    })
})(Login);

export default LoginForm;