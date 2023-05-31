import { useRef } from 'react';
import "../../../../styles/styles2.css"
import { NavLink,Link } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { Global } from '../../../../Helpers/Global';
import Peticiones from '../../../../Helpers/Peticiones';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ColoredLine = ({color}) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 3
        }}
    />
  );

const PrestamoEntrada = () => {
    const [entradas, setEntradas] = useState([]);
    useEffect(() =>{
        ConseguirEntradas();
    },[])

    const [cargando, setCargando] = useState(true);

    const ConseguirEntradas = async() =>{
        const {datos} = await Peticiones(Global.url+"prestamoVehicularRegreso", "GET");
        setEntradas(datos)
        setCargando(false) 
    }

    const ConseguirVerificaciones1 = async(placas) =>{
       const {datos} = await Peticiones(Global.url+"prestamoVehicularRegreso/"+placas, "GET");
       setEntradas(datos);
        setCargando(false); 

    }

    const eliminar = async(id) =>{
        let {datos} = await Peticiones(Global.url+"prestamoVehicularRegreso/"+id, "DELETE");
        console.log(datos);
        if(datos.ok === true){
            let vehiculosActualizados = entradas.filter(entrada => entrada.id !== id);
            setEntradas(vehiculosActualizados);
            alert("El registro de entrada se elimino correctamente");
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

        doc.save('regresos.pdf')
    }

  return (
    <div>
          <div className="title-datos-vehiculos">
        <h1 className="title1">Datos de entrada de vehiculos</h1>
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
                    ConseguirEntradas();
                    Click();
            }}> Actualizar tabla</button>
        <NavLink to="/nuevaEntrada"><button className="boton-agregar" type="button">Agregar entrada</button></NavLink>

        <button className='update-table' onClick={()  => {
                    download();
            }}>Descargar PDF</button>
    </div>
    
    <div className="table-vehiculos">
    <table className="tabla-datos" id="tabla">
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
                entradas.length >= 1 ?
                (
                    entradas.map(entrada => {
                        return(
                            <tr className='cabezera'key={entrada.id}> 
                            <td className='celda-r'>{entrada.id}</td> 
                            <td className='celda-r'>{entrada.marca}</td> 
                            <td className='celda-r'>{entrada.modelo}</td> 
                            <td className='celda-r'>{entrada.placas}</td> 
                            <td className='celda-r'>{entrada.idSupervisor}</td>
                            <td className='celda-r'>{entrada.idUsuario}</td>
                            <td className='celda-r'>{entrada.kilometraje}</td>
                            <td className='celda-r'>{entrada.descripcionDanos}</td>
                            <td className='celda-r'>{entrada.tapetes}</td>
                            <td className='celda-r'>{entrada.llantasDeRefaccion}</td>
                            <td className='celda-r'>{entrada.gatoHidraulico}</td>
                            <td className='celda-r'>{entrada.extras}</td>
                            <td className='celda-r'>{entrada.nivelDeCombustible}</td>
                            <td className='celda-r'>{entrada.fechaHora}</td>
                            <td className='celda-r'>{entrada.foto}</td>
                            <td className='celda-r'> <Link to={"/editarEntrada/"+entrada.placas}><button className="actualizar">Actualizar</button></Link></td> 
                            <td className='celda-r'><button onClick={()  => {
                                     var bool=confirm("¿Seguro que quieres eliminar el registro?");
                                     if(bool){
                                        eliminar(entrada.id);
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

export default PrestamoEntrada
