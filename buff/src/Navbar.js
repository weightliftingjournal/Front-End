import React from 'react'
import { NavLink } from 'react-router-dom';
import './Nav.css';

export default function Navbar() {
    return (
        <div className="navbar">
           <div className="nav-left">
               <a href="#Icon">Buff</a>
           </div>
           <div className="nav-right">
           <a href="https://buff-marketing-webpt9-john.netlify.com/">Home</a>
           <NavLink to='/'>Login</NavLink>
           {/* <a href="#Login">Login</a> */}
           </div>
       </div>
    )
}
