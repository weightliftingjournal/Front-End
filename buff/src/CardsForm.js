import React from 'react'
//import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
//import styled from 'styled-components';
import { withFormik, Form, Field } from 'formik';
import axios from 'axios';

function CardsForm(){
    return(
        <Form>
            <Field component='input' 
                   placeholder='exercise name' 
                   name='name' />
            <Field component='input'
                   type='number'
                   placeholder='Reps' 
                   name='reps' />
            <Field component='input' 
                   type='number'
                   placeholder='Sets' 
                   name='sets' />
            <Field component='input' 
                   type='number'
                   placeholder='Weight' 
                   name='weight' />
            <button type='submit'>Submit</button>
        </Form>
    )
}

const CardsFormik = withFormik({
    mapPropsToValues({ name, reps, sets, weight }){
        return({
            name: name || '',
            reps: reps || 0,
            sets: sets || 0,
            weight: weight || 0
        })
    },
    handleSubmit(values, { props }){
        const token = localStorage.getItem('token');
        //const userValues = {...values };
        // userValues.journalId = props.exercise.userId;
        // userValues.userId = props.exercise.userId;
        axios.put(`https://get-hercules.herokuapp.com/api/restricted/exercises/${props.exercise.id}`, 
        values,
        {headers: {Authorization: token}})
            .then(res => {
                console.log('Put successful');
                console.log('CARDS-FORM-DATA: ', res);
                props.change(false);
                props.update(!props.updateValue);
            })
            .catch(err => {
                console.log('ERROR: ', err);
                console.log('User Exercise: ', props.exercise);
                //console.log('Input User Exercise: ', userValues);
            });
    }
})(CardsForm);

export default CardsFormik;