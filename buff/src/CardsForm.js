import React from 'react'
//import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
//import styled from 'styled-components';
import { withFormik, Form, Field } from 'formik';
import axios from 'axios';

const formStyle = {
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto auto',
    justifyContent: 'space-between'
};

const removePX = (obj, prop) => {
    //prop must be string
    let tempArr = (obj[prop]).split('');
    tempArr.pop();
    tempArr.pop();
    tempArr = tempArr.join('');
    console.log('tempArr: ', tempArr);
    return tempArr;
}

const formInput = {
    //border: '1px solid black',
    height: Number(removePX(formStyle,'minHeight')) * 0.2 + 'px',
    fontSize: Number(removePX(formStyle,'minHeight')) * 0.1 + 'px'
};

// const formName = {
//     height: '100px',
//     fontWeight: 'bold',
//     fontSize: '80px',
//     border: 'none'
// };

const formSubmit = {
    margin: '0 auto',
    maxWidth: '30%',
    height: '50px',
    fontSize: '30px',
    textAlign: 'center',
    paddingBottom: '50px'
}

function CardsForm(){
    return(
        <Form style={formStyle}>
            <Field component='input' 
                   placeholder='exercise name' 
                   name='name'
                   style={formInput} />
            <Field component='input'
                   placeholder='Reps' 
                   name='reps'
                   style={formInput} />
            <Field component='input' 
                   placeholder='Sets' 
                   name='sets'
                   style={formInput} />
            <Field component='input' 
                   placeholder='Weight' 
                   name='weight'
                   style={formInput} />
            <button type='submit' style={formSubmit}>Submit</button>
        </Form>
    )
}

const CardsFormik = withFormik({
    mapPropsToValues({ name, reps, sets, weight }){
        return({
            name: name || '',
            reps: reps || '',
            sets: sets || '',
            weight: weight || ''
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