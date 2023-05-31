import { useRef } from 'react';
import "../../../../styles/styles2.css"
import { NavLink,Link } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { Global } from '../../../../Helpers/Global';
import Peticiones from '../../../../Helpers/Peticiones';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 3
        }}
    />
  );


const DatosSeguros = () => {
    const [seguros, setSeguros] = useState([]);
    useEffect(() =>{
        ConseguirSeguros();
    },[])

    const [cargando, setCargando] = useState(true);

    const ConseguirSeguros = async() =>{
        const {datos} = await Peticiones(Global.url+"seguros", "GET");
            setSeguros(datos)
            setCargando(false) 
    }

    const ConseguirVerificaciones1 = async(placas) =>{
       const {datos} = await Peticiones(Global.url+"seguros/"+placas, "GET");
            setSeguros(datos);
            setCargando(false); 

    }

    const eliminar = async(id) =>{
        let {datos} = await Peticiones(Global.url+"seguros/"+id, "DELETE");
        console.log(datos);
        if(datos.ok === true){
            let vehiculosActualizados = seguros.filter(seguro => seguro.idSeguro !== id);
            setSeguros(vehiculosActualizados);
            alert("El seguro se elimino correctamente");
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

        doc.save('seguros.pdf')
    }
        


  return (
    <div>
        <div className="title-datos-vehiculos">
        <h1 className="title1">Datos de los seguros</h1>
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
                    ConseguirSeguros();
                    Click();
            }}> Actualizar tabla</button>
        <NavLink to="/seguroNuevo"><button className="boton-agregar" type="button"> Agregar seguro</button></NavLink>

        <button className='update-table' onClick={()  => {
                    download();
            }}>Descargar PDF</button>

    </div>
    
    <div className="table-vehiculos">
    <table className="tabla-datos" id="tabla">
            <thead className='hilo'>
                <tr className='cabezera'> 
                    <th className='celda'>Id seguro</th> 
                    <th className='celda'>Id vehiculo</th> 
                    <th className='celda'>Marca</th>
                    <th className='celda'>Modelo</th>
                    <th className='celda'>Placas</th>
                    <th className='celda'>ID Campus</th>
                    <th className='celda'>Numero de seguro</th>
                    <th className='celda'>Nombre de aseguradora</th>
                    <th className='celda'>Fecha de contratacion</th>
                    <th className='celda'>Fecha de vencimiento</th>
                </tr>
            </thead>

        <tbody className='tabla-body'> 

            {cargando ? "Cargando registros....": 
            (
                seguros.length >= 1 ?
                (
                    seguros.map(seguro => {
                        return(
                            <tr className='cabezera'key={seguro.idSeguro}> 
                            <td className='celda-r'>{seguro.idSeguro}</td> 
                            <td className='celda-r'>{seguro.idVehiculo}</td> 
                            <td className='celda-r'>{seguro.marca}</td> 
                            <td className='celda-r'>{seguro.modelo}</td> 
                            <td className='celda-r'>{seguro.placas}</td> 
                            <td className='celda-r'>{seguro.idCampus}</td>
                            <td className='celda-r'>{seguro.numeroSeguro}</td>
                            <td className='celda-r'>{seguro.nombreAseguradora}</td>
                            <td className='celda-r'>{seguro.fechaInicio}</td>
                            <td className='celda-r'>{seguro.fechaVencimiento}</td>
                            <td className='celda-r'> <Link to={"/editarSeguro/"+seguro.placas}><button className="actualizar">Actualizar</button></Link></td> 
                            <td className='celda-r'><button onClick={()  => {
                                      var bool=confirm("¿Seguro que quieres eliminar el registro?");
                                      if(bool){
                                         eliminar(seguro.idSeguro);
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

export default DatosSeguros
