import React from 'react'
import { Link } from "react-router-dom";
import './SideNav.css';

function SideNav() {
  return (
    <div className='sidebar'>
      <h2>Chatoline</h2>
      <div className='sidebar-links'>
        <Link to="/logout">Log out</Link>
      </div>
    </div>
  )
}

export default SideNav;