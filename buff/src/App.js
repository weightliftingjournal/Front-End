import React, { useState, useEffect } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Journal from './Journal';
import axios from 'axios';

function App() {

    const [workouts, setWorkouts] = useState([]);
    //const [workoutData, setWorkoutData] = useState([]);
    //const [login, setLogin] = useState({username: 'sammy', password: 'password'});


    const deleteWorkout = (workoutArr) =>{
      setWorkouts(workoutArr);
    }

    useEffect(() => {
      axios.get('https://weight-lift-be.herokuapp.com/api/restricted/journals')
        .then(res => {
          console.log('Res Data: ', res);
          setWorkouts(res.data.journals);
        })
        .catch(err => {
          console.log('ERROR: ', err);
        });
    }, []);

    // useEffect(() => {
    //   axios.post('https://get-hercules.herokuapp.com/api/auth/login', login)
    //     .then(res => {
    //       console.log('Res Data: ', res);
    //     })
    //     .catch(err => {
    //       console.log('ERROR: ', err);
    //     });
    // }, []);

  return (
    <div className="App">
      <Route path='/journal' 
             render={(props) => (
             <Journal {...props} workouts={workouts} deleteItem={deleteWorkout} />
             )} />
    </div>
  );
}

export default App;
