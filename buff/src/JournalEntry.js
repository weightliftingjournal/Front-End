import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import Cards from './Cards';
import { Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

export default function JournalEntry({ login }) {
    const [exercises, setExercises] = useState([]);

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
            })
            .catch(err => {
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

    return (
        <Card.Group>
            {exercises.map((exercise) => {
                return getUserExercise(exercise)
            })}
        </Card.Group>
    )
}
