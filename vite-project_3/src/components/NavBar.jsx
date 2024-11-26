import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="NavBar">
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/logIn"></NavLink></li>
                <li><NavLink to="/roulette"></NavLink></li>
            </ul>
        </nav>
    );
};

export default NavBar;