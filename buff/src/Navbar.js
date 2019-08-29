import React from 'react'
//import { NavLink } from 'react-router-dom';
import './Nav.css';

export default function Navbar() {
    return (
        <div className="navbar">
           <div className="nav-left">
               <a href="#Icon">Buff</a>
           </div>
           <div className="nav-right">
           <a href="#Home">Home</a>
           <a href="#Login">Login</a>
           </div>
       </div>
    )
}
