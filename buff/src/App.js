import React, { useState, useEffect } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Journal from './Journal';
import Login from './Login';
import axios from 'axios';

function App() {

    
    //const [workoutData, setWorkoutData] = useState([]);
    const [login, setLogin] = useState({});


    // const deleteWorkout = (workoutArr) =>{
    //   setWorkouts(workoutArr);
    // }

    const getLogin = (loginInfo) => {
      setLogin(loginInfo);
    };

    

    // useEffect(() => {
    //   axios.get('https://weight-lift-be.herokuapp.com/api/restricted/users')
    //     .then(res => {
    //       console.log('User Data: ', res);
    //       //setWorkouts(res.data.journals);
    //     })
    //     .catch(err => {
    //       console.log('ERROR: ', err);
    //     });
    // }, []);
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
      <Route path='/' 
             render={(props) => (
             <Login {...props} getLogin={getLogin} />
             )} />
      <Route path='/journal/:id' 
             render={(props) => (
             <Journal {...props}  userLogin={login} />
             )} />
    </div>
  );
}

export default App;
