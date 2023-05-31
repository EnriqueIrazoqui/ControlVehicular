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

const DatosServicios = () => {

    const [servicios, setServicios] = useState([]);
    useEffect(() =>{
        ConseguirServicios();
    },[])

    const [cargando, setCargando] = useState(true);

    const ConseguirServicios = async() =>{
    const {datos} = await Peticiones(Global.url+"servicios", "GET");
    /*console.log(datos);*/
    setServicios(datos)
    setCargando(false) 
    }

    const ConseguirVehiculos1 = async(id) =>{
       const {datos} = await Peticiones(Global.url+"servicios/"+id, "GET");
            setServicios(datos);
            setCargando(false); 
    }

    const eliminar = async(id) =>{
        //alert(id);
        let {datos} = await Peticiones(Global.url+"servicios/"+id, "DELETE");
        console.log(datos);
        if(datos.ok === true){
            let vehiculosActualizados = servicios.filter(servicio => servicio.idServicio !== id);
            setServicios(vehiculosActualizados);
            alert("El servicio se elimino correctamente");
        }
        if(datos.ok === false){
            alert("Error en el servidor");
        }
    }

    const valorInput = () =>{
        let busqueda = document.querySelector("#search-id").value;    
        ConseguirVehiculos1(busqueda);
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

        doc.save('servicios.pdf')
    }

  return (
    <div>
        <div className="title-datos-vehiculos">
        <h1 className="title1">Datos de los servicios</h1>
        <ColoredLine color="#33179c" />
    </div>

    <div className="contenedor-search">
        <label className="titulo-buscador" htmlFor="search" >Id del servicio</label>
        <input  className="search-input" placeholder="Buscar servicio por id"  size="50" type="text" id="search-id" ref={inputRef} name="search_id"/>
        <button className='search-button'  onClick={()  => {
                    valorInput();
                    Click();
            }}>Buscar</button>

        <button className='update-table' onClick={()  => {
                    ConseguirServicios();
                    Click();
            }}>Actualizar tabla</button>
        <NavLink to="/NuevoServicio"><button className="boton-agregar" type="button"> Agregar servicio</button></NavLink>

        <button className='update-table' onClick={()  => {
                    download();
            }}>Descargar PDF</button>
    </div>
    
    <div className="table-vehiculos">
    <table className="tabla-datos" id="tabla">
            <thead className='hilo'>
                <tr className='cabezera'> 
                    <th className='celda'>Id servicio</th> 
                    <th className='celda'>Id vehiculo</th> 
                    <th className='celda'>Marca</th>
                    <th className='celda'>Modelo</th>
                    <th className='celda'>Placas</th>
                    <th className='celda'>Id campus</th>
                    <th className='celda'>Descripcion</th>
                    <th className='celda'>Fecha y hora</th>
                    <th className='celda'>Observaciones</th>
                </tr>
            </thead>

        <tbody className='tabla-body'> 

            {cargando ? "Cargando registros....": 
            (
                servicios.length >= 1 ?
                (
                    servicios.map(servicio => {
                        return(
                            <tr className='cabezera'key={servicio.idServicio}> 
                            <td className='celda-r'>{servicio.idServicio}</td> 
                            <td className='celda-r'>{servicio.idVehiculo}</td> 
                            <td className='celda-r'>{servicio.marca}</td> 
                            <td className='celda-r'>{servicio.modelo}</td> 
                            <td className='celda-r'>{servicio.placas}</td> 
                            <td className='celda-r'>{servicio.idCampus}</td>
                            <td className='celda-r'>{servicio.descripcion}</td>
                            <td className='celda-r'>{servicio.fecha_Hora}</td>
                            <td className='celda-r'>{servicio.observaciones}</td>
                            <td className='celda-r'> <Link to={"/EditarServicio/"+servicio.idServicio}><button className="actualizar">Actualizar</button></Link></td> 
                            <td className='celda-r'><button onClick={()  => {
                                 var bool=confirm("¿Seguro que quieres eliminar el registro?");
                                 if(bool){
                                    eliminar(servicio.idServicio);
                                 }else{
                                   alert("Se cancelo el borrado");
                                 }
                              
                            }} className="delete">Borrar</button></td>    
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

export default DatosServicios
