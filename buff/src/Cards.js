import React, { useState } from 'react'
import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';
import CardsForm from './CardsForm';

export default function Cards({ exercise, update, updateValue }) {
    const { name, reps, sets, weight } = exercise;
    const [form, setForm] = useState(false);

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
                <Card>
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
                        <Button>Delete</Button>
                    </Card.Content>
                </Card>
            )
        }
    };

    return (
        switchToForm()
    )
}
