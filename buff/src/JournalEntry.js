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
    const [updateExercise, setUpdateExercise] = useState(false);
    //const [currentCount, setCurrentCount] =useState(46);
    //const [deleteExercise, setDeleteExercise] = useState(0);
    //const [user, setUser] = useState('');
    //const [showForm, setShowForm] = useState();
    //const [mappedOverExercise, setMappedOverExercise] = useState();

    
    useEffect(() => {
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
        // function countDown(){
        //     setCurrentCount(currentCount - 1);
        // }
        //setDeleteExercise(itemNum);
        axios.delete(`https://get-hercules.herokuapp.com/api/restricted/exercises/${itemNum}`, {headers: {Authorization: localStorage.getItem('token')}})
            .then(res => {
                console.log('Exercise Succesfully Deleted: ', res);
                setUpdateExercise(!updateExercise);
                // countDown();
            })
            .catch(err => {
                console.log('Error: ', err);
                //console.log('ID FOR USER: ', deleteExercise);
            });
    }

    const getUserExercise = (exerciseObj, i) => {
        //  console.log('userId: ', exerciseObj.userId);
        //  console.log('login id: ', login.id);
        //console.log(exerciseObj);
       
            if(`${exerciseObj.userId}` === `${localStorage.getItem('id')}`){
            return(
                <Card key={i} className="border">
                    <Header>
                        <h1 className="large">
                            {exerciseObj.name}
                        </h1>
                    </Header> 
                        <Cards exercise={exerciseObj} 
                                update={setUpdateExercise} 
                                updateValue={updateExercise} 
                                itemToDelete={deleteItem} />
                </Card>
                
            )
        }
        
    }

    const checkAuthorization = () => {
        if(authorized){
            return(
                <div>
                    <JournalForm update={setUpdateExercise} 
                                 updateValue={updateExercise} 
                                 login={login} />
                    <Card.Group className="three column padding">
                        {exercises.map((exercise, i) => (
                            getUserExercise(exercise, i)
                        ))}
                    </Card.Group>
                </div>
            )
        }else{
            return <Redirect to='/' />
        }
    };

    return (
        checkAuthorization()
    )
}
