import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'

export default function LandingPage() {
        return (
            <div className='Landing'>
                <h1 className='Header'> Welcome! </h1>
                <Link to='/home'>
                    <button className='btnEnter'> Enter Site </button>
                </Link>
            </div>
        )
}
