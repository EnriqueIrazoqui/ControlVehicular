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

const IndexReportes = () => {
  return (
    <div className="tittle-vehiculo">
      <div>
        
      </div>
    <h1 className="tittle-1">Panel bitacoras</h1>
    <ColoredLine color="#33179c" />
    <ul className="enlaces">
        <li className='lista'><NavLink to="/PrestamoSalida" className='boton'>Prestamo salida</NavLink></li>
        <li className='lista'><NavLink to="/PrestamoEntrada" className='boton'>Prestamo entrada</NavLink></li>
    </ul>
    </div>
  )
}

export default IndexReportes
