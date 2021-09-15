import React from 'react'
import { NavLink } from 'react-router-dom'
import navBar from './NavBar.module.css'
import icon from './icon.png'

export default function NavBar (props) {
  return (
    <nav className={navBar.Link}>
      <ul className={navBar.searchBarUl}>
        <ol> <img src={icon} alt='Icon' className={navBar.icon} /></ol>

        <div>
          <NavLink
            activeStyle={{ fontWeight: 'bold' }}
            className={navBar.Link} to='/home'
          >
            <span className={navBar.Item}>Home</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            activeStyle={{ fontWeight: 'bold' }}
            className={navBar.Link} to='/add'
          ><span className={navBar.Item}>Add Activity </span>
          </NavLink>
        </div>

        <div>
          <NavLink
            activeStyle={{ fontWeight: 'bold' }}
            className={navBar.Link} to='/Activities'
          ><span className={navBar.Item}>Activities</span>
          </NavLink>
        </div>
        <div>
          <NavLink
            activeStyle={{ fontWeight: 'bold' }}
            className={navBar.Link} to='/about'
          ><span className={navBar.Item}>About</span>
          </NavLink>
        </div>
      </ul>
    </nav>
  )
}
