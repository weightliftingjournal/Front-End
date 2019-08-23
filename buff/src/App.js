import React, { useState } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Journal from './Journal';

function App() {

    const [workouts, setWorkouts] = useState(['Leg Day', 'Push Day', 'Arms Day']);

    const deleteWorkout = (workoutArr) =>{
      setWorkouts(workoutArr);
    }

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
