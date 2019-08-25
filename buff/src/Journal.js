import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

export default function Journal({ userLogin, getRegion }) {
    const [allWorkOuts, setAllWorkouts] = useState([]);
    const [users, setUsers] = useState();

    const Workout = styled.div`
        max-width: 25%;
        height: 100px;
        background: red;
    `;

    useEffect(() => {
        axios.get(`https://weight-lift-be.herokuapp.com/api/restricted/users`)
          .then(res => {
            console.log('User Data: ', res);
            //setAllWorkouts(res.data.journals);
          })
          .catch(err => {
            console.log('ERROR: ', err);
          });
      }, []);

      useEffect(() => {
        axios.get(`https://weight-lift-be.herokuapp.com/api/restricted/journals/`)
          .then(res => {
            console.log('Journal Data: ', res);
            setAllWorkouts(res.data.journals);
          })
          .catch(err => {
            console.log('ERROR: ', err);
          });
      }, []);

    //   useEffect(() => {
    //     axios.get(`https://weight-lift-be.herokuapp.com/api/restricted/journals/${userLogin.id}`)
    //       .then(res => {
    //         console.log('Res Data: ', res);
    //         //setWorkouts(res.data.journals);
    //       })
    //       .catch(err => {
    //         console.log('ERROR: ', err);
    //       });
    //   }, [userLogin.id]);

    const deleteWorkout = (indexToDelete) =>{
        const tempArry = [...allWorkOuts];
        tempArry.splice(indexToDelete, 1);
        setAllWorkouts(tempArry);
    };

    const handleClick = (workoutRegion) => {
        getRegion(workoutRegion);
    }

    const getUserWorkout = (workoutObj, index) => {
        if(`${workoutObj.userId}` === `${userLogin.id - 6}`){
            return(
                <NavLink to={`/entry/${userLogin.id - 6}`}>
                    <Workout onClick={() => handleClick(workoutObj.region)}>
                        <button onClick={() => deleteWorkout(index)}>-</button>
                        <h1>{workoutObj.region}</h1>
                    </Workout>
                </NavLink>
            )
        }
    }

    return (
        <div>
            {allWorkOuts.map((workout, index) => {
                return(
                // <NavLink to={``}></NavLink>
                // <Workout>
                //     <button onClick={() => deleteWorkout(index)}>-</button>
                //     <h1>{workout.region}</h1>
                // </Workout>
                    getUserWorkout(workout, index)
                )
            })}
        </div>
    )
}
