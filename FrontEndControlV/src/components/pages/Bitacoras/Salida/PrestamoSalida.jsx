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

const PrestamoSalida = () => {
    const [salidas, setSalidas] = useState([]);
    useEffect(() =>{
        ConseguirSalidas();
    },[])


    const [cargando, setCargando] = useState(true);

    const ConseguirSalidas = async() =>{
        const {datos} = await Peticiones(Global.url+"prestamoVehicularSalida", "GET");
        setSalidas(datos)
        setCargando(false) 
    }

    const ConseguirVerificaciones1 = async(placas) =>{
       const {datos} = await Peticiones(Global.url+"prestamoVehicularSalida/"+placas, "GET");
       setSalidas(datos);
        setCargando(false); 

    }

    const eliminar = async(id) =>{
        let {datos} = await Peticiones(Global.url+"prestamoVehicularSalida/"+id, "DELETE");
        console.log(datos);
        if(datos.ok === true){
            let vehiculosActualizados = salidas.filter(salida => salida.id !== id);
            setSalidas(vehiculosActualizados);
            alert("El registro de la salida se elimino correctamente");
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

        doc.save('salidas.pdf')
    }

  return (
    <div>
           <div className="title-datos-vehiculos">
        <h1 className="title1">Datos de salida de vehiculos</h1>
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
                    ConseguirSalidas();
                    Click();
            }}> Actualizar tabla</button>
        <NavLink to="/nuevaSalida"><button className="boton-agregar" type="button">Agregar salida</button></NavLink>

        <button className='update-table' onClick={()  => {
                    download();
            }}>Descargar PDF</button>
        
    </div>
    
    <div className="table-vehiculos">
    <table className="tabla-datos" id='tabla'>
            <thead className='hilo'>
                <tr className='cabezera'> 
                    <th className='celda'>Id</th> 
                    <th className='celda'>Marca</th>
                    <th className='celda'>Modelo</th>
                    <th className='celda'>Placas</th>
                    <th className='celda'>Id Supervisor</th>
                    <th className='celda'>Id Usuario</th>
                    <th className='celda'>Kilometraje</th>
                    <th className='celda'>Daños</th>
                    <th className='celda'>Tapetes</th>
                    <th className='celda'>Llantas de refaccion</th>
                    <th className='celda'>Gato hidraulico</th>
                    <th className='celda'>Extras</th>
                    <th className='celda'>Nivel de combustible</th>
                    <th className='celda'>Fecha y hora</th>
                    <th className='celda'>Fotografia</th>
                </tr>
            </thead>

        <tbody className='tabla-body'> 

            {cargando ? "Cargando registros....": 
            (
                salidas.length >= 1 ?
                (
                    salidas.map(salida => {
                        return(
                            <tr className='cabezera'key={salida.id}> 
                            <td className='celda-r'>{salida.id}</td> 
                            <td className='celda-r'>{salida.marca}</td> 
                            <td className='celda-r'>{salida.modelo}</td> 
                            <td className='celda-r'>{salida.placas}</td> 
                            <td className='celda-r'>{salida.idSupervisor}</td>
                            <td className='celda-r'>{salida.idUsuario}</td>
                            <td className='celda-r'>{salida.kilometraje}</td>
                            <td className='celda-r'>{salida.descripcionDanos}</td>
                            <td className='celda-r'>{salida.tapetes}</td>
                            <td className='celda-r'>{salida.llantasDeRefaccion}</td>
                            <td className='celda-r'>{salida.gatoHidraulico}</td>
                            <td className='celda-r'>{salida.extras}</td>
                            <td className='celda-r'>{salida.nivelDeCombustible}</td>
                            <td className='celda-r'>{salida.fechaHora}</td>
                            <td className='celda-r'>{salida.foto}</td>
                            <td className='celda-r'> <Link to={"/editarSalida/"+salida.placas}><button className="actualizar">Actualizar</button></Link></td> 
                            <td className='celda-r'><button onClick={()  => {
                                     var bool=confirm("¿Seguro que quieres eliminar el registro?");
                                     if(bool){
                                        eliminar(salida.id);
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

export default PrestamoSalida
