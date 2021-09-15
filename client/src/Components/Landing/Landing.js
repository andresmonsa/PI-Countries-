import React from 'react'
import { Link } from 'react-router-dom'
import landing from './Landing.module.css'

export default function LandingPage () {
  return (
    <div className={landing.Landing}>
      <h1 className={landing.Header}> Welcome! </h1>
      <Link to='/home'>
        <button className={landing.btnEnter}> Enter Site </button>
      </Link>
    </div>
  )
}
