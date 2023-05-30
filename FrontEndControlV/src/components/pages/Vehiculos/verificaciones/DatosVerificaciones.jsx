import { useRef } from 'react';
import "../../../../styles/styles2.css"
import { NavLink,Link } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { Global } from '../../../../Helpers/Global';
import Peticiones from '../../../../Helpers/Peticiones';

const ColoredLine = ({color}) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 3
        }}
    />
  );


const DatosVerificaciones = () => {
    
    const [verificaciones, setVerificaciones] = useState([]);
    useEffect(() =>{
        ConseguirVerificaciones();
    },[])


    const [cargando, setCargando] = useState(true);

    const ConseguirVerificaciones = async() =>{
    const {datos} = await Peticiones(Global.url+"verificaciones", "GET");
        setVerificaciones(datos)
        setCargando(false) 
    }

    const ConseguirVerificaciones1 = async(placas) =>{
       const {datos} = await Peticiones(Global.url+"verificaciones/"+placas, "GET");
            setVerificaciones(datos);
            setCargando(false); 

    }

    const eliminar = async(id) =>{
        let {datos} = await Peticiones(Global.url+"verificaciones/"+id, "DELETE");
        console.log(datos);
        if(datos.ok === true){
            let vehiculosActualizados = verificaciones.filter(verificacion => verificacion.idVerificacion !== id);
            setVerificaciones(vehiculosActualizados);
            alert("La verificacion se elimino correctamente");
        }
        if(datos.ok === false){
            alert("Error en el servidor");
        }
    }

    const valorInput = () =>{
        let busqueda = document.querySelector("#search-id").value;    
        ConseguirVerificaciones1(busqueda);
      }

      const inputRef = useRef(null);

      const Click = () => {
        inputRef.current.value = ''; // Borra el contenido del input
      };
        


  return (
    <div>
            <div className="title-datos-vehiculos">
        <h1 className="title1">Datos de las verificaciones</h1>
        <ColoredLine color="#33179c" />
    </div>

    <div className="contenedor-search">
        <label className="titulo-buscador" htmlFor="search" >Placas del vehiculo</label>

        {/*
           <form onSubmit={busqueda}>
        <input  className="search-input" placeholder="Buscar vehiculo por placas"  size="50" type="text"  ref={inputRef} id="search_id"  name="search"/>
        <input  className="search-button" value="Buscar" type="submit" id="search" name="search_id"/>
        </form>
    */}

        <input  className="search-input" placeholder="Buscar vehiculo por placas"  size="50" type="text" id="search-id" ref={inputRef} name="search_id"/>
        <button className='search-button'  onClick={()  => {
                    valorInput();
                    Click();
            }} >Buscar</button>

        <button className='update-table' onClick={()  => {
                    ConseguirVerificaciones();
                    Click();
            }}> Actualizar tabla</button>
        <NavLink to="/nuevaVerificacion"><button className="boton-agregar" type="button">Agregar verificaciones</button></NavLink>
    </div>
    
    <div className="table-vehiculos">
    <table className="tabla-datos">
            <thead className='hilo'>
                <tr className='cabezera'> 
                    <th className='celda'>Id verificacion</th> 
                    <th className='celda'>Id vehiculo</th> 
                    <th className='celda'>Marca</th>
                    <th className='celda'>Modelo</th>
                    <th className='celda'>Placas</th>
                    <th className='celda'>ID Campus</th>
                    <th className='celda'>FechaPago</th>
                    <th className='celda'>Monto</th>
                    <th className='celda'>Folio</th>
                    <th className='celda'>Actualizar</th>
                    <th className='celda'>Borrar</th> 
                </tr>
            </thead>

        <tbody className='tabla-body'> 

            {cargando ? "Cargando registros....": 
            (
                verificaciones.length >= 1 ?
                (
                    verificaciones.map(verificacion => {
                        return(
                            <tr className='cabezera'key={verificacion.idVerificacion}> 
                            <td className='celda-r'>{verificacion.idVerificacion}</td> 
                            <td className='celda-r'>{verificacion.idVehiculo}</td> 
                            <td className='celda-r'>{verificacion.marca}</td> 
                            <td className='celda-r'>{verificacion.modelo}</td> 
                            <td className='celda-r'>{verificacion.placas}</td> 
                            <td className='celda-r'>{verificacion.idCampus}</td>
                            <td className='celda-r'>{verificacion.fechaPago}</td>
                            <td className='celda-r'>{verificacion.monto}</td>
                            <td className='celda-r'>{verificacion.folio}</td>
                            <td className='celda-r'> <Link to={"/editarVerificacion/"+verificacion.placas}><button className="actualizar"></button></Link></td> 
                            <td className='celda-r'><button onClick={()  => {
                                 var bool=confirm("¿Seguro que quieres eliminar el registro?");
                                 if(bool){
                                    eliminar(verificacion.idVerificacion);
                                 }else{
                                   alert("Se cancelo el borrado");
                                 }
                            }} className="delete"></button></td>    
                            </tr>  
                        );
                    })
                )
                :
                (
                    <h1 className='empty'>No hay registros</h1>
                )
            )
            }
            
        </tbody> 
    </table>
    </div>
    </div>
  )
}

export default DatosVerificaciones
