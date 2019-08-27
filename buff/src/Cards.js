import React from 'react'
import { Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';

export default function Car({ exercise }) {
    const { name, reps, sets, weight } = exercise;

    const Header = styled(Card.Header)`
        font-size: 3.0rem;
    `;
    return (
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
        </Card>
    )
}
