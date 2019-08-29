import React from 'react'
import { withFormik, Form, Field } from 'formik';
//import styled from 'styled-components';
import axios from 'axios';
import { Button, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
// import { Form } from 'semantic-ui-react';

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

const formName = {
    height: '100px',
    fontWeight: 'bold',
    fontSize: '80px',
    border: 'none'
};

const formSubmit = {
    margin: '0 auto',
    maxWidth: '20%',
    height: '50px',
    fontSize: '30px',
    textAlign: 'center',
    paddingBottom: '50px'
}


export default function JournalForm({ update, updateValue, login }) {
    // const ModalContainer = styled.div`
    //     position: fixed;
    //     z-index: 1;
    //     background: rgba(0, 0, 0, 0.5);
    // `;  

    // const showExerciseForm = () => {
    //     if(showValue){
    //         return (

    //         <FormFormik update={update} 
    //                     updateValue={updateValue} 
    //                     login={login} />
    //         )
    //     }
    // }
    
    return (
        <Modal trigger={<Button className='big'>Add Exercise</Button>}>
            <Modal.Header style={formName}>Add an Exercise</Modal.Header>
            <Modal.Content>
                <FormFormik update={update} 
                            updateValue={updateValue} 
                            login={login} />
            </Modal.Content>
        </Modal>
        // <ModalContainer>
        //     {showExerciseForm()}
        // </ModalContainer>
    )
}

function CreationForm(){
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
            <Button type='submit' style={formSubmit}>Submit</Button>
        </Form>
    );
}

const FormFormik = withFormik({
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
        values.userId = localStorage.getItem('id');
        axios.post(`https://get-hercules.herokuapp.com/api/restricted/exercises/`, 
        values,
        {headers: {Authorization: token}})
            .then(res => {
                console.log('Post successful');
                console.log('JOURNAL-FORM-DATA: ', res);
                //props.change(false);
                //props.show(false);
                props.update(!props.updateValue);
            })
            .catch(err => {
                console.log('ERROR: ', err);
                console.log('User Exercise: ', props.exercise);
                //console.log('Input User Exercise: ', userValues);
            });
    }
})(CreationForm);
