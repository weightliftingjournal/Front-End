import React from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

function Register({ errors, touched }) {
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
                <h2>Please Sign Up Below</h2>
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
                    <h4>First Name</h4>
                    {touched.firstName && errors.firstName && <p>{errors.firstName}</p>}
                    <Field
                    component="input"
                    type="text"
                    name="firstName"
                    placeholder="enter first name"
                    />
                    <h4>Last Name</h4>
                    {touched.lastName && errors.lastName && <p>{errors.lastName}</p>}
                    <Field
                    component="input"
                    type="input"
                    name="lastName"
                    placeholder="enter last name"
                    />
                    <h4>Email</h4>
                    {touched.email && errors.email && <p>{errors.email}</p>}
                    <Field
                    component="input"
                    type="email"
                    name="email"
                    placeholder="enter email"
                    />

                    <button type="submit">Submit</button>
                </Form>
                </div>
            </div>
        </div>
    )
}

const RegisterFormik = withFormik({
    mapPropsToValues({username, password, firstName, lastName, email}){
        return({
            username: username || '',
            password: password || '',
            firstName: firstName || '',
            lastName: lastName || '',
            email: email || ''
        })
    },
    handleSubmit(values, { props }){
        //console.log('Values Login: ', values);
        axios.post('https://get-hercules.herokuapp.com/api/auth/register', values)
            .then(res => {
                console.log('Posted successfully');
                console.log('Register Info: ', res);
                //props.getLogin(res.data.user);
                //localStorage.setItem('id', res.data.user.id);
                //localStorage.setItem('token', res.data.token);
                props.history.push('/')
            })
            .catch(err => {
                console.log('Post failed: ', err);
            })
    },
    validationSchema: Yup.object().shape({
        username: Yup.string()
                      .required('username required'),
        password: Yup.string()
                      .required('password required'),
        firstName: Yup.string()
                      .required('first name required'),
        lastName: Yup.string()
                      .required('last name required'),
        email: Yup.string()
                      .required('email required')
    })
})(Register);

export default RegisterFormik;