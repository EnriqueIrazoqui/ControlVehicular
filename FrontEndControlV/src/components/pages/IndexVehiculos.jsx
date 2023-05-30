import "../../styles/styles1.css"
import { NavLink } from 'react-router-dom';

const ColoredLine = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 3
      }}
  />
);


const IndexVehiculos = () => {
  return (
    <div className="tittle-vehiculo">
    <h1 className="tittle-1">Panel de vehiculos</h1>
    <ColoredLine color="#33179c" />
    <ul className="enlaces">
        <li className='lista'><NavLink to="/DatosVehiculo" className='boton'>Vehiculos</NavLink></li>
        <li className='lista'><NavLink to="/DatosVerificaciones" className='boton'>Verificaciones</NavLink></li>
        <li className='lista'><NavLink to="/DatosSeguros" className='boton'>Seguros</NavLink></li>
        <li className='lista'><NavLink to="/DatosRefrendos" className='boton'>Refrendos</NavLink></li>
    </ul>
    </div>
  )
}

export default IndexVehiculos
