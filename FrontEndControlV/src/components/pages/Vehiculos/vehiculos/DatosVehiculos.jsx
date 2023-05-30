import { useRef } from 'react';
import "../../../../styles/styles2.css"
import { NavLink,Link } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { Global } from '../../../../Helpers/Global';
import Peticiones from '../../../../Helpers/Peticiones';


const ColoredLine = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 3
      }}
  />
);


const DatosVehiculos = () => {

    const [vehiculos, setVehiculos] = useState([]);
    useEffect(() =>{
        ConseguirVehiculos();
    },[])

    const [buscar,setBuscar] = useState("");

    /*
    const busqueda = (e) => {
        e.preventDefault();
        console.log(e.target.search.value);
    }*/

    const [cargando, setCargando] = useState(true);

    const ConseguirVehiculos = async() =>{
    const {datos} = await Peticiones(Global.url+"automovil", "GET");
    console.log(datos);
    setVehiculos(datos)
    setCargando(false) 
    }

    const ConseguirVehiculos1 = async(placas) =>{
       const {datos} = await Peticiones(Global.url+"automovil/"+placas, "GET");
            setVehiculos(datos);
            setCargando(false); 
    }

    const eliminar = async(id) =>{
        //alert(id);
        let {datos} = await Peticiones(Global.url+"automovil/"+id, "DELETE");
        console.log(datos);
        if(datos.ok === true){
            let vehiculosActualizados = vehiculos.filter(vehiculo => vehiculo.idVehiculo !== id);
            setVehiculos(vehiculosActualizados);
            alert("El vehiculo se elimino correctamente");
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
        

  return (
    <div>
    <div className="title-datos-vehiculos">
        <h1 className="title1">Datos de los vehiculos</h1>
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
                    ConseguirVehiculos();
                    Click();
            }}> Actualizar tabla</button>
        <NavLink to="/NuevoVehiculo"><button className="boton-agregar" type="button"> Agregar vehiculo</button></NavLink>
    </div>
    
    <div className="table-vehiculos">
    <table className="tabla-datos">
            <thead className='hilo'>
                <tr className='cabezera'> 
                    <th className='celda'>Id vehiculo</th> 
                    <th className='celda'>Campus</th> 
                    <th className='celda'>Marca</th>
                    <th className='celda'>Modelo</th>
                    <th className='celda'>Placas</th>
                    <th className='celda'>Color</th>
                    <th className='celda'>No. Serie</th>
                    <th className='celda'>Tipo de Combustible</th>
                    <th className='celda'>Actualizar</th>
                    <th className='celda'>Borrar</th> 
                </tr>
            </thead>

        <tbody className='tabla-body'> 

            {cargando ? "Cargando registros....": 
            (
                vehiculos.length >= 1 ?
                (
                    vehiculos.map(vehiculo => {
                        return(
                            <tr className='cabezera'key={vehiculo.idVehiculo}> 
                            <td className='celda-r'>{vehiculo.idVehiculo}</td> 
                            <td className='celda-r'>{vehiculo.idCampus}</td> 
                            <td className='celda-r'>{vehiculo.marca}</td> 
                            <td className='celda-r'>{vehiculo.modelo}</td> 
                            <td className='celda-r'>{vehiculo.placas}</td> 
                            <td className='celda-r'>{vehiculo.color}</td>
                            <td className='celda-r'>{vehiculo.serie}</td>
                            <td className='celda-r'>{vehiculo.tipoCombustible}</td>
                            <td className='celda-r'> <Link to={"/EditarVehiculo/"+vehiculo.placas}><button className="actualizar"></button></Link></td> 
                            <td className='celda-r'><button onClick={()  => {
                                 var bool=confirm("¿Seguro que quieres eliminar el registro?");
                                 if(bool){
                                    eliminar(vehiculo.idVehiculo);
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


export default DatosVehiculos
