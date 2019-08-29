import React, { useState } from 'react'
import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
//import styled from 'styled-components';
import CardsForm from './CardsForm';

export default function Cards({ exercise, update, updateValue, itemToDelete }) {
    const { reps, sets, weight } = exercise;
    const [form, setForm] = useState(false);
    //const [refresh, setRefresh] = useState(exercise)

    // const Header = styled(Card.Header)`
    //     font-size: 3.0rem;
    // `;

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
              <>
                    <Card.Content>
                        <p className="white">Reps: {reps}</p>
                    </Card.Content>
                    <Card.Content>
                        <p className="white">Sets: {sets}</p>
                    </Card.Content>
                    <Card.Content>
                        <p className="white">Weight: {weight}</p>
                    </Card.Content>
                    <Card.Content className="center" extra>
                        <Button className="edit" onClick={() => setForm(!form)}>Edit</Button>
                        <Button className="delete" onClick={() => itemToDelete(exercise.id)}>Delete</Button>
                        {/* <p>{exercise.id}</p> */}
                    </Card.Content>
              </>  
                    
                
            )
        }
    };

    return (
        switchToForm()
    )
}
