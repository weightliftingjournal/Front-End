import React, { useState, useEffect } from 'react'
import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';
import CardsForm from './CardsForm';

export default function Cards({ exercise, update, updateValue, itemToDelete, login }) {
    const { name, reps, sets, weight } = exercise;
    const [form, setForm] = useState(false);
    //const [refresh, setRefresh] = useState(exercise)

    const Header = styled(Card.Header)`
        font-size: 3.0rem;
    `;

    const switchToForm = () => {
        if(form){
            return (
                <Card>
                    <CardsForm exercise={exercise} change={setForm} update={update} updateValue={updateValue} />
                </Card>
            )
        }else{
            return(
                // <Card key={exercise.id}>
                //     <Header>
                //         {refresh.name}
                //     </Header>
                //     <Card.Content>
                //         Reps: {refresh.reps}
                //     </Card.Content>
                //     <Card.Content>
                //         Sets: {refresh.sets}
                //     </Card.Content>
                //     <Card.Content>
                //         Weight: {refresh.weight}
                //     </Card.Content>
                //     <Card.Content extra>
                //         <Button onClick={() => setForm(!form)}>Edit</Button>
                //         <Button onClick={() => itemToDelete(refresh.id)}>Delete</Button>
                //         <p>{refresh.id}</p>
                //     </Card.Content>
                // </Card>
                <Card key={exercise.id}>
                    <Header>
                        {name}
                    </Header>
                    <Card.Content>
                        Reps: {reps}
                    </Card.Content>
                    <Card.Content>
                        Sets: {sets}
                    </Card.Content>
                    <Card.Content>
                        Weight: {weight}
                    </Card.Content>
                    <Card.Content extra>
                        <Button onClick={() => setForm(!form)}>Edit</Button>
                        <Button onClick={() => itemToDelete(exercise.id)}>Delete</Button>
                        <p>{exercise.id}</p>
                    </Card.Content>
                </Card>
            )
        }
    };

    return (
        switchToForm()
    )
}
