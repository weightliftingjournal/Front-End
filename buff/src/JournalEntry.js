import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Cards from './Cards';
import { Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

export default function JournalEntry({ login }) {
    const [exercises, setExercises] = useState([]);
    const [authorized, setAuthorized] = useState(true);
    const [updateExercise, setUpdateExercise] = useState(false)
    const [deleteExercise, setDeleteExercise] = useState();
    //const [mappedOverExercise, setMappedOverExercise] = useState();

    const Exercise = styled.div`
        display: flex;
        max-width: 25%;
        justify-content: space-around;
    `;
    
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

    // const deleteItem = (itemNum) => {
    //     console.log('ItemNum: ', itemNum);
    //     //setDeleteExercise(itemNum);
    //     axios.delete(`https://get-hercules.herokuapp.com/api/restricted/exercises/${itemNum}`, {headers: {Authorization: localStorage.getItem('token')}})
    //         .then(res => {
    //             console.log('Exercise Succesfully Deleted: ', res);
    //             window.location.reload();
    //         })
    //         .catch(err => {
    //             console.log('Error: ', err);
    //             console.log('ID FOR USER: ', deleteExercise);
    //         })
    // }

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.delete(`https://get-hercules.herokuapp.com/api/restricted/exercises/${deleteExercise}`, {headers: {Authorization: token}})
            .then(res => {
                console.log('Exercise Succesfully Deleted');
                setUpdateExercise(!updateExercise);
            })
            .catch(err => {
                console.log('Error: ', err);
                console.log('ID FOR USER: ', deleteExercise);
            })
    }, [deleteExercise]);

    const getUserExercise = (exerciseObj) => {
        if(`${exerciseObj.userId}` === `${login.id}`){
            return(
                <Cards exercise={exerciseObj} 
                       update={setUpdateExercise} 
                       updateValue={updateExercise} 
                       itemToDelete={setDeleteExercise} />
            )
        }
    }

    const checkAuthorization = () => {
        if(authorized){
            if(exercises.length === 0){
                return <div>loading</div>
            }else{
                return(
                    <Card.Group>
                        {exercises.map((exercise) => (
                            //  <Cards exercise={exercise} 
                            //             update={setUpdateExercise} 
                            //             updateValue={updateExercise} 
                            //             itemToDelete={deleteItem} 
                            //             login={login} />
                            getUserExercise(exercise)
                        ))}
                    </Card.Group>
                )
            }
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
