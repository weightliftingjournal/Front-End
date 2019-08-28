import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import JournalEntry from './JournalEntry';

export default function Journal(props) {

    return (
        <div>
            <JournalEntry login={props.userLogin} />
        </div>
    )
}
