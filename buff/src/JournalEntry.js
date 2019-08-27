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
    }, []);

    const getUserExercise = (exerciseObj) => {
        if(`${exerciseObj.userId}` === `${login.id}`){
            return(
                <Cards exercise={exerciseObj} />
            )
        }
    }

    const checkAuthorization = () => {
        if(authorized){
            return(
                <Card.Group>
                    {exercises.map((exercise) => {
                        return getUserExercise(exercise)
                    })}
                </Card.Group>
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
