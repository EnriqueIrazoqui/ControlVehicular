import "../../../../styles/stylesNuevo.css"
import { NavLink } from 'react-router-dom';
import {useForm} from '../../../../hooks/useForm'
import {Peticiones} from '../../../../Helpers/Peticiones'
import {Global} from '../../../../Helpers/Global'

const NuevoServicio = () => {

  const{formulario, cambiado} = useForm({});

  const guardarVehiculo = async(e) => {
    e.preventDefault();

      let nuevoVehiculo = formulario;  
      /*console.log(nuevoVehiculo)*/


      const {datos} = await Peticiones(Global.url+"servicios", "POST", nuevoVehiculo);

      if(datos.ok === true){
        alert("Guardado con exito");
      }

      if(datos.ok  === false){
        alert("Error en el servidor");
      }

      if(datos.message.status === 406){
        alert("El ID vehiculo no existe");
      }

      /*setResultado(true);*/
      /*console.log(datos);*/
    }

  return (
<div>
 <div className="contact_form">

    <div className="formulario">      
    <h1 className='tittle'>Nuevo servicio</h1>

      <form action="" onSubmit={guardarVehiculo}>    

      <div className="inputs">
            <p className='parrafo'>
              <label className='label' htmlFor="idVehiculo" >id vehiculo</label>
              <input className='input' type="number" name="idVehiculo" id="idVehiculo" required="obligatorio" placeholder="Id vehiculo" onChange={cambiado} />
            </p>  
            <p className='parrafo'>
              <label className='label' htmlFor="descripcion" >Descripcion</label>
              <input className='input' type="text" name="descripcion" id="descripcion" required="obligatorio" placeholder="Ej. cambio de llantas" onChange={cambiado} />
            </p>
          </div>

          <div className="inputs">
            <p className='parrafo'>
                <label className='label' htmlFor="fecha_Hora" >Fecha y Hora</label>
                <input className='input' type="datetime-local"  name="fecha_Hora" id="fecha_Hora" required="obligatorio" onChange={cambiado}/>
              </p>    
              <p className='parrafo'>
                <label className='label' htmlFor="observaciones" >Observaciones</label>
                <input className='input' type="text" name="observaciones" id="observaciones" required="obligatorio" placeholder="Ej. llanta ponchada" onChange={cambiado}/>
              </p> 
          </div>
       
            <div className="botones">
                <button className="boton-eliminar" type="reset" name="cancelar" id="cancelar"> <NavLink to="/DatosServicios"><p> Cancelar</p></NavLink></button>
                <button className="boton-guardar" type="submit" name="enviar_formulario" id="enviar" value="Guardar"><p>Guardar</p></button>           
            </div>
      </form>
</div>  
</div>
      
    </div>
  )
}

export default NuevoServicio
