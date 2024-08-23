import React from 'react' // Importerar react
import { Link } from "react-router-dom"; // Importerar Link-komponenten från react-router-dom för att hantera navigering
import './SideNav.css'; // Importerar css fil 

function SideNav() {
  return (
      // En div som fungerar som sidomeny (sidebar)
    <div className='sidebar'>
      <h2>Chatoline</h2>
      <div className='sidebar-links'>
        <Link to="/logout">Log out</Link> {/* Länk till utloggningssidan */}
      </div>
    </div>
  )
}

export default SideNav;