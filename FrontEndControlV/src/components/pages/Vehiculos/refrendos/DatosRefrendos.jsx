import { useRef } from 'react';
import "../../../../styles/styles2.css"
import { NavLink,Link } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { Global } from '../../../../Helpers/Global';
import Peticiones from '../../../../Helpers/Peticiones';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 3
        }}
    />
  );

const DatosRefrendos = () => {
    const [refrendos, setRefrendos] = useState([]);
    useEffect(() =>{
        ConseguirVerificaciones();
    },[])

    const [cargando, setCargando] = useState(true);

    const ConseguirVerificaciones = async() =>{
        const {datos} = await Peticiones(Global.url+"refrendos", "GET");
        setRefrendos(datos)
            setCargando(false) 
    }

    const ConseguirVerificaciones1 = async(placas) =>{
       const {datos} = await Peticiones(Global.url+"refrendos/"+placas, "GET");
       setRefrendos(datos);
            setCargando(false); 

    }

    const eliminar = async(id) =>{
        //alert(id);
        let {datos} = await Peticiones(Global.url+"refrendos/"+id, "DELETE");
        console.log(datos);
        if(datos.ok === true){
            let vehiculosActualizados = refrendos.filter(refrendo => refrendo.idRefrendo !== id);
            setRefrendos(vehiculosActualizados);
            alert("El refrendo se elimino correctamente");
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

    const download = () =>{
        const doc = new jsPDF()

        doc.autoTable({
            margin: { top: 10 },
            theme: 'plain',
            html: '#tabla' })

        doc.save('refrendos.pdf')
    }
        
  return (
    <div>
          <div className="title-datos-vehiculos">
        <h1 className="title1">Datos de refrendos</h1>
        <ColoredLine color="#33179c" />
    </div>

    <div className="contenedor-search">
        <label className="titulo-buscador" htmlFor="search" >Placas del vehiculo</label>

        <input  className="search-input" placeholder="Buscar vehiculo por placas"  size="50" type="text" id="search-id" ref={inputRef} name="search_id"/>
        <button className='search-button'  onClick={()  => {
                    valorInput();
                    Click();
            }} >Buscar</button>

        <button className='update-table' onClick={()  => {
                    ConseguirVerificaciones();
                    Click();
            }}> Actualizar tabla</button>
        <NavLink to="/nuevoRefrendo"><button className="boton-agregar" type="button"> Agregar refrendo</button></NavLink>

        <button className='update-table' onClick={()  => {
                    download();
            }}>Descargar PDF</button>
    </div>
    
    <div className="table-vehiculos">
    <table className="tabla-datos" id="tabla">
            <thead className='hilo'>
                <tr className='cabezera'> 
                    <th className='celda'>Id refrendo</th> 
                    <th className='celda'>Id vehiculo</th> 
                    <th className='celda'>Marca</th>
                    <th className='celda'>Modelo</th>
                    <th className='celda'>Placas</th>
                    <th className='celda'>ID Campus</th>
                    <th className='celda'>Monto</th>
                    <th className='celda'>Fecha de contratacion</th>
                    <th className='celda'>Fecha de vencimiento</th>
                </tr>
            </thead>

        <tbody className='tabla-body'> 

            {cargando ? "Cargando registros....": 
            (
                refrendos.length >= 1 ?
                (
                    refrendos.map(refrendo => {
                        return(
                            <tr className='cabezera'key={refrendo.idRefrendo}> 
                            <td className='celda-r'>{refrendo.idRefrendo}</td> 
                            <td className='celda-r'>{refrendo.idVehiculo}</td> 
                            <td className='celda-r'>{refrendo.marca}</td> 
                            <td className='celda-r'>{refrendo.modelo}</td> 
                            <td className='celda-r'>{refrendo.placas}</td> 
                            <td className='celda-r'>{refrendo.idCampus}</td>
                            <td className='celda-r'>{refrendo.monto}</td>
                            <td className='celda-r'>{refrendo.fechaInicio}</td>
                            <td className='celda-r'>{refrendo.fechaVencimiento}</td>
                            <td className='celda-r'> <Link to={"/editarRefrendo/"+refrendo.placas}><button className="actualizar">Actualizar</button></Link></td> 
                            <td className='celda-r'><button onClick={()  => {
                                     var bool=confirm("¿Seguro que quieres eliminar el registro?");
                                     if(bool){
                                        eliminar(refrendo.idRefrendo);
                                     }else{
                                       alert("Se cancelo el borrado");
                                     }
                            }} className="delete">Eliminar</button></td>    
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

export default DatosRefrendos
