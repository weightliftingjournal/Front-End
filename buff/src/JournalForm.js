import React from 'react'
import { withFormik, Form, Field } from 'formik';
import styled from 'styled-components';
import axios from 'axios';
// import 'semantic-ui-css/semantic.min.css';
// import { Form } from 'semantic-ui-react';

const formStyle = {
    margin: 'auto auto'
};

export default function JournalForm({ show, showValue, update, updateValue, login }) {
    const ModalContainer = styled.div`
        position: fixed;
        z-index: 1;
        background: rgba(0, 0, 0, 0.5);
    `;  

    const showExerciseForm = () => {
        if(showValue){
            return <FormFormik update={update} 
                               show={show} 
                               updateValue={updateValue} 
                               login={login} />
        }
    }
    
    return (
        <ModalContainer>
            {showExerciseForm()}
        </ModalContainer>
    )
}

function CreationForm(){
    return(
        <Form style={formStyle}>
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
    );
}

const FormFormik = withFormik({
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
        values.userId = props.login.id;
        axios.post(`https://get-hercules.herokuapp.com/api/restricted/exercises/`, 
        values,
        {headers: {Authorization: token}})
            .then(res => {
                console.log('Post successful');
                console.log('JOURNAL-FORM-DATA: ', res);
                //props.change(false);
                props.show(false);
                props.update(!props.updateValue);
            })
            .catch(err => {
                console.log('ERROR: ', err);
                console.log('User Exercise: ', props.exercise);
                //console.log('Input User Exercise: ', userValues);
            });
    }
})(CreationForm);
