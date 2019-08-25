import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from 'axios';

export default function JournalEntry({ userLogin, region }) {
    
    useEffect(() => {
        axios.get('https://weight-lift-be.herokuapp.com/api/restricted/exercises')
            .then(res => {
                console.log('Exercise Data: ', res);
            })
            .catch(err => {
                console.log('Error: ', err);
            });
    }, []);

    return (
        <div>
            <h1>ENTRY</h1>          
        </div>
    )
}
