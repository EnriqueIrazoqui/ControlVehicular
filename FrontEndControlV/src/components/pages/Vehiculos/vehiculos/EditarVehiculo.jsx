import "../../../../styles/stylesNuevo.css"
import {useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useForm} from '../../../../hooks/useForm'
import {Peticiones} from '../../../../Helpers/Peticiones'
import {Global} from '../../../../Helpers/Global'
import {useParams} from 'react-router-dom';

const EditarVehiculo = () => {
    const{formulario, cambiado} = useForm({});
    const params = useParams();
    const [vehiculo, setVehiculo] = useState([]);

    useEffect(() =>{
        ConseguirVehiculos();
    },[])

    const [setCargando] = useState(true);

    const ConseguirVehiculos = async() =>{
       const {datos} = await Peticiones(Global.url+"automovil/"+params.id, "GET");
       setVehiculo(datos);
       setCargando(false); 

    }

  const editar = async(e) => {
       e.preventDefault();

      let nuevoVehiculo = formulario;  

      const {datos} = await Peticiones(Global.url+"automovil", "PUT", nuevoVehiculo);

      if(datos.ok === true){
        alert("Actualizar con exito");
      }

      if(datos.message.status  === 500){
         alert("Error en el servidor");
       }
 
       if(datos.message.status === 401){
         alert("Datos con formato incorrecto");
       }
 
       if(datos.message.status === 406){
         alert("La unidad no existe o el vehiculo no existe");
       }
    }



  return (
    <div className="contact_form">
    <div className="formulario">    

      <h1 className='tittle'>Editar vehiculo</h1>

      <pre>{JSON.stringify(formulario)}</pre>

          <form action="" onSubmit={editar}>    
          <div className="inputs">
                 <p className='parrafo'>
                    <label className='label' htmlFor="idVehiculo" >Id vehiculo</label>
                    <input  className='input' type="number" name="idVehiculo" id="idVehiculo" required="obligatorio"   onChange={cambiado} defaultValue={vehiculo[0]?.idVehiculo}/>
                  </p>  

                <p className='parrafo'>
                    <label className='label' htmlFor="idCampus" >Campus</label>
                    <input className='input' type="text" name="idCampus" id="idCampus" required="obligatorio"   onChange={cambiado}  defaultValue={vehiculo[0]?.idCampus}/>
                  </p>  
                <p className='parrafo'>
                  <label className="label" htmlFor="marca" >Marca</label>
                  <input className="input" type="text" name="marca" id="marca" required="obligatorio"  onChange={cambiado} defaultValue={vehiculo[0]?.marca}/>
                </p>  
              </div>

              <div className="inputs">
                <p className='parrafo'>
                  <label className='label' htmlFor="modelo" >Modelo</label>
                  <input className='input' type="text" name="modelo" id="modelo" required="obligatorio"  onChange={cambiado} defaultValue={vehiculo[0]?.modelo}/>
                </p>
                <p className='parrafo'>
                    <label className='label' htmlFor="placas" >Placas</label>
                    <input className='input' type="text" name="placas" id="placas" required="obligatorio"  onChange={cambiado} defaultValue={vehiculo[0]?.placas}/>
                  </p>    
              </div>

              <div className="inputs">
              <p className='parrafo'>
                    <label className='label' htmlFor="color" >Color</label>
                    <input className='input' type="text" name="color" id="color" required="obligatorio"  defaultValue={vehiculo[0]?.color} onChange={cambiado}  />
                  </p>  

                <p className='parrafo'>
                  <label className='label' htmlFor="serie" >No. de serie</label>
                  <input className='input' type="text" name="serie" id="serie" required="obligatorio" defaultValue={vehiculo[0]?.serie} onChange={cambiado} />
                </p>    
              </div>

              <div className="inputs">
              <p className='parrafo'>
                    <label className='label' htmlFor="tipoCombustible">Tipo de combustible</label>
                    <input className='input' type="text" name="tipoCombustible" id="tipoCombustible" required="obligatorio" onChange={cambiado} defaultValue={vehiculo[0]?.tipoCombustible}/>
                  </p>    
              </div>

              
                <div className="botones">
                    <button className="boton-eliminar" type="reset" name="cancelar" id="cancelar"> <NavLink to="/DatosVehiculo"><p> Cancelar</p></NavLink></button>
                    <button className="boton-guardar" type="submit" name="enviar_formulario" id="enviar" value="Guardar"><p>Actualizar</p></button>           
                </div>
          </form>
    </div>  
  </div>
  )
}

export default EditarVehiculo
