import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
//import styled from 'styled-components';
import axios from 'axios';
import Cards from './Cards';
import { Card, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import JournalForm from './JournalForm';
import './App.css';

export default function JournalEntry({ login }) {
    const [exercises, setExercises] = useState([]);
    const [authorized, setAuthorized] = useState(true);
    const [updateExercise, setUpdateExercise] = useState(false)
    //const [deleteExercise, setDeleteExercise] = useState(0);
    //const [user, setUser] = useState('');
    //const [showForm, setShowForm] = useState();
    //const [mappedOverExercise, setMappedOverExercise] = useState();

    // const Exercise = styled.div`
    //     display: flex;
    //     max-width: 25%;
    //     justify-content: space-around;
    // `;

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     axios.delete(`https://get-hercules.herokuapp.com/api/restricted/exercises/${deleteExercise}`, {headers: {Authorization: token}})
    //         .then(res => {
    //             console.log('Exercise Succesfully Deleted');
    //             setUpdateExercise(true);
    //         })
    //         .catch(err => {
    //             console.log('Error: ', err);
    //             console.log('ID FOR USER: ', deleteExercise);
    //         })
    // }, [deleteExercise]);
    
    useEffect(() => {
        // if(deleteExercise > 0){
        //     axios.delete(`https://get-hercules.herokuapp.com/api/restricted/exercises/${deleteExercise}`, {headers: {Authorization: token}})
        //         .then(res => {
        //             console.log('Exercise Succesfully Deleted');
        //             //setUpdateExercise(true);
        //             setDeleteExercise(0);
        //         })
        //         .catch(err => {
        //             console.log('Error: ', err);
        //             console.log('ID FOR USER: ', deleteExercise);
        //         })
        // }
        const token = localStorage.getItem('token');
        axios.get('https://get-hercules.herokuapp.com/api/restricted/exercises', {headers: {Authorization: token}})
            .then(res => {
                console.log('Exercise Data: ', res);
                setExercises(res.data.exercises);
                setAuthorized(true);
            })
            .catch(err => {
                setAuthorized(false);
                console.log('Error: ', err);
            });
    }, [updateExercise]);

    const deleteItem = (itemNum) => {
        console.log('ItemNum: ', itemNum);
        //setDeleteExercise(itemNum);
        axios.delete(`https://get-hercules.herokuapp.com/api/restricted/exercises/${itemNum}`, {headers: {Authorization: localStorage.getItem('token')}})
            .then(res => {
                console.log('Exercise Succesfully Deleted: ', res);
                //setUpdateExercise(!updateExercise);
            })
            .catch(err => {
                console.log('Error: ', err);
                //console.log('ID FOR USER: ', deleteExercise);
            })
    }

    const getUserExercise = (exerciseObj) => {
        // console.log('userId: ', exerciseObj.userId);
        // console.log('login id: ', login.id);
        //console.log(exerciseObj);
       
            if(`${exerciseObj.userId}` === `${localStorage.getItem('id')}`){    
            return(
                <Cards exercise={exerciseObj} 
                       update={setUpdateExercise} 
                       updateValue={updateExercise} 
                       itemToDelete={deleteItem} />
            )
        }
        
    }

    // function getUser(id) {
    //     const token = localStorage.getItem('token');
    //     axios.get(`https://get-hercules.herokuapp.com/api/restricted/users/${id}`, {headers: {Authorization: token}})
    //         .then(res => {
    //             //console.log('Obtained User', res);
    //             setUser(`${res.data.user.id}`);
    //         })
    //         .catch(err => {
    //             console.log('Error: ', err);
    //         })
    // }

    const checkAuthorization = () => {
        if(authorized){
            return(
                <div>
                    {/* <button onClick={() => setShowForm(!showForm)}>Add Exercise</button> */}
                    {/* <JournalForm show={setShowForm} 
                                    showValue={showForm}
                                    update={setUpdateExercise} 
                                    updateValue={updateExercise} 
                                    login={login} /> */}
                    <JournalForm update={setUpdateExercise} 
                                 updateValue={updateExercise} 
                                 login={login} />
                    <Card.Group className="three column padding">
                        {exercises.map((exercise, i) => (
                            <Card key={i} className="border">
                                <Header>
                                    <h1 className="large">
                                        {exercise.name}
                                    </h1>
                                </Header> 
                                    {getUserExercise(exercise)}
                            </Card>
                            //  <Cards exercise={exercise} 
                            //             update={setUpdateExercise} 
                            //             updateValue={updateExercise} 
                            //             itemToDelete={deleteItem} 
                            //             login={login} />
                        ))}
                    </Card.Group>
                </div>
            )
        }else{
            return <Redirect to='/' />
        }
    };

    return (
        // <Card.Group>
        //     {exercises.map((exercise) => {
        //         return getUserExercise(exercise)
        //     })}
        // </Card.Group>
        checkAuthorization()
    )
}
