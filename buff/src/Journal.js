import React, { useState } from 'react'
import styled from 'styled-components';

export default function Journal({workouts, deleteItem}) {
    

    const Workout = styled.div`
        max-width: 25%;
        height: 100px;
        background: red;
    `;

    // const createWorkoutType = () => {
    //     return (<Workout>
    //                 <h1>New Workout</h1>
    //             </Workout>);
    // };
    const deleteWorkout = (indexToDelete) =>{
        const tempArry = [...workouts];
        tempArry.splice(indexToDelete, 1);
        deleteItem(tempArry);
    };

    return (
        <div>
            {workouts.map((workout, index) => {
                return(
                <Workout>
                    <button onClick={() => deleteWorkout(index)}>-</button>
                    <h1>{workout}</h1>
                </Workout>
                )
            })}
        </div>
    )
}
