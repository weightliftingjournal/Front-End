import React, { useState } from 'react'
import styled from 'styled-components';

export default function Journal({workouts}) {
    

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

    return (
        <div>
            {workouts.map(workout => {
                return(
                <Workout>
                    <h1>{workout}</h1>
                </Workout>
                )
            })}
        </div>
    )
}
