import React from 'react'
import { Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

export default function Car({ exercise }) {
    const { name, reps, sets, weight } = exercise;
    return (
        <Card>
            <Card.Header>
                {name}
            </Card.Header>
            <Card.Content>
                Reps: {reps}
                Sets: {sets}
                Weight: {weight}
            </Card.Content>
        </Card>
    )
}
