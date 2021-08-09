import React from 'react';
import {Link} from 'react-router-dom';
import './Landing.css'

export default function LandingPage () {
    return (
        <div className='Landing'>
            <h1 className='Header'> Wellcome! </h1>
            <Link to='/home'>
                <button> Ingresar </button>
            </Link>
        </div>
    )
}