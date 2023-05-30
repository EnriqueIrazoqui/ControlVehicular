import React from 'react'
import { NavLink } from 'react-router-dom'
import "../../styles/header.css"

const HeaderNav = () => {
  const scrollToHeader = () => {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('toggle-btn').style.visibility = 'hidden';
  };

  const closeToHeader = () => {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('toggle-btn').style.visibility = 'visible';
  };

const close1 = () => {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('toggle-btn').style.visibility = 'visible';
  };

const close2 = () => {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('toggle-btn').style.visibility = 'visible';
  };

  return (
    <div>
    <header className="header">
    <div className="superior-bar">
        <p className="tittle-TEC">Tecnologico Superior de Jalisco</p>
    </div> 
    
    <div id="sidebar" className="sidebar" >
        <div onClick={scrollToHeader} id="toggle-btn" className="toggle-btn">
        <span  id="menu" className="menu">&#9776;</span>
    </div>
      <ul>
    <div onClick={closeToHeader} id="close" className="close">
                <span id="close" className="close">&#x2715;</span>
    </div>
      <nav>
        <li className="logo"> <img src={""} alt="logo"/> </li>
        <li onClick={close1} className='enlace' id='enlace'> <NavLink to="/IndexVehiculos"> Vehiculos</NavLink></li>
        <li onClick={close2} className='enlace1' id='enlace1'> <NavLink to="/IndexReportes">Reportes y bitacora</NavLink></li>
      </nav>
      </ul>
    </div>
    </header>
    </div>
  )
}

export default HeaderNav
