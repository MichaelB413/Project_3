import React from 'react';
import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
        <div className="title">
            <h1>Gambler'$ Credit Union</h1>
            <div className="subtitle">
            <h3>"If We Don't Get Ya Today, We'll Get Ya Tomorrow"</h3>
        </div>
        </div>
        
        
        <ul className="row"> 
            <li className="logIn">
                <Link to="/logIn">Log In</Link>
            </li> 
        </ul>
        <ul className="row2">
            <li className="createAccount">
                <Link to="/createAccount">Create Account</Link>
            </li>
        </ul>

        <div className="info">
            <p className="about">
                <Link to="/about">About</Link>
            </p>
            <p className="getHelp">
                <Link to="/getHelp">Get Help</Link>
            </p>
            <p className="contact">
                <Link to="/contact">Contact</Link>
            </p> 
        </div>
        </>
    );
}

export default Home;