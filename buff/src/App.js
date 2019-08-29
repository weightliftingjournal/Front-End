import React, { useState } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Journal from './Journal';
import Login from './Login';
import NavBar from './Navbar';
import Header from './Header';
import Register from './Register';
// import axios from 'axios';
// import JournalEntry from './JournalEntry';

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
      <NavBar />
      <Header />
      <Route exact path='/' 
             render={(props) => (
             <Login {...props} getLogin={getLogin} />
             )} />
      <Route path='/register' component={Register} />
      <Route path='/journal/:id' 
             render={(props) => (
             <Journal {...props}  userLogin={login} />
             )} />
      {/* <Route path='/entry/:id' 
             render={(props) => (
             <JournalEntry {...props}  userLogin={login} region={workoutRegion} />
             )} /> */}
    </div>
  );
}

export default App;
