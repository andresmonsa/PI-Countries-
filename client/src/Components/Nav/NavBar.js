import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'
// import Logo from '../../logoHenry.png'


export default function NavBar(props) {
    return (
        <nav>
            <ul className="searchBar-ul">
                {/* <ol> <img src={portal} alt="Portal" className='portal' /></ol> */}
              
                <div>
            <NavLink
                activeStyle={{ color: '#b3b3b3', fontWeight: 'bold' }}
                className="Link" to='/home' >
                <span>Home</span>
            </NavLink>
            </div>
            <div>
            <NavLink
                 activeStyle={{ color: '#b3b3b3', fontWeight: 'bold' }}
                className="Link" to='/add' >Add Activity
                </NavLink>
            </div>
            <div>
            <NavLink
                 activeStyle={{ color: '#b3b3b3', fontWeight: 'bold' }}
                className="Link" to='/about' >About
            </NavLink>
            </div>

            </ul>
        </nav>
    )
}