import React from 'react';
import { useState } from 'react'
import './ReturnPopup.css'
import { Link, useParams } from 'react-router-dom'

function ReturnPopup(props) {
    
    return (props.trigger) ? (
        <div className='return-popup'>
            <div className='popup-inner'>
                <div>Are you sure you want to leave?</div>
                <p>99% of gamblers quit before they win big!</p>
                <Link id='return-link' to='/'>Return Home</Link>
                <button type='button' id='keep-gambling-btn' onClick={() => props.setTrigger(false)}>Let's keep gambling!</button>
                { props.children }
            </div>
        </div>
    ) : '';
}

export default ReturnPopup;