import React, { useEffect } from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

function Login({ errors, touched }) {
    return (
        <Form>
            {touched.username && errors.username && <p>{errors.username}</p>}
            <Field type='text' 
                   component='input' 
                   placeholder='username' 
                   name='username' />
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Field type='text' 
                   component='input' 
                   placeholder='password' 
                   name='password' />
            <button type='submit'>Submit</button>
        </Form>
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
        axios.post('https://weight-lift-be.herokuapp.com/api/auth/login', values)
            .then(res => {
                console.log('Posted successfully');
                console.log('Login Info: ', res);
                props.getLogin(res.data.user);
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

export default LoginFormik;