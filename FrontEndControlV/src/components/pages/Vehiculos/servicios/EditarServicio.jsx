import "../../../../styles/stylesNuevo.css"
import {useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useForm} from '../../../../hooks/useForm'
import {Peticiones} from '../../../../Helpers/Peticiones'
import {Global} from '../../../../Helpers/Global'
import {useParams} from 'react-router-dom';

const EditarServicio = () => {
    const{formulario ,cambiado} = useForm({});
    const params = useParams();
    const [servicio, setServicio] = useState([]);

    useEffect(() =>{
        ConseguirRefrendo();
    },[])

    const ConseguirRefrendo = async() =>{
        const {datos} = await Peticiones(Global.url+"servicios/"+params.id, "GET");
        setServicio(datos);
      }

    const editar = async(e) => {
        e.preventDefault();
    
          let nuevo = formulario;  
          /*console.log(nuevo)*/
          const {datos} = await Peticiones(Global.url+"servicios", "PUT", nuevo);
    
          if(datos.ok === true){
            alert("Actualizado con exito");
          }
    
          if(datos.message.status  === 500){
            alert("Error en el servidor");
          }
    
          if(datos.message.status === 401){
            alert("Datos con formato incorrecto");
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
<h1 className='tittle'>Editar servicio</h1>

<pre>{JSON.stringify(formulario)}</pre>

  <form action="" onSubmit={editar}>    

  <div className="inputs">
        <p className='parrafo'>
          <label className='label' htmlFor="idVehiculo" >Id vehiculo</label>
          <input className='input' type="number" name="idVehiculo" id="idVehiculo" required="obligatorio" placeholder="Id vehiculo" onChange={cambiado} defaultValue={servicio[0]?.idVehiculo}/>
        </p>  
        <p className='parrafo'>
          <label className='label' htmlFor="idServicio" >Id servicio</label>
          <input className='input' type="number" name="idServicio" id="idServicio" required="obligatorio" placeholder="Id vehiculo" onChange={cambiado} defaultValue={servicio[0]?.idServicio}/>
        </p>  
        <p className='parrafo'>
          <label className='label' htmlFor="descripcion" >Descripcion</label>
          <input className='input' type="text" name="descripcion" id="descripcion" required="obligatorio" placeholder="Ej. cambio de llantas" onChange={cambiado} defaultValue={servicio[0]?.descripcion}/>
        </p>
      </div>

      <div className="inputs">
        <p className='parrafo'>
            <label className='label' htmlFor="fecha_Hora" >Fecha y Hora</label>
            <input className='input' type="text"  min="2024-01-01T00:00" name="fecha_Hora" id="fecha_Hora" required="obligatorio" placeholder="2024-01-01T00:00" onChange={cambiado} defaultValue={servicio[0]?.fecha_Hora}/>
          </p>    
          <p className='parrafo'>
            <label className='label' htmlFor="observaciones" >Observaciones</label>
            <input className='input' type="text" name="observaciones" id="observaciones" required="obligatorio" placeholder="Ej. llanta ponchada" onChange={cambiado} defaultValue={servicio[0]?.observaciones}/>
          </p> 
      </div>
   
        <div className="botones">
            <button className="boton-eliminar" type="reset" name="cancelar" id="cancelar"> <NavLink to="/DatosServicios"><p> Cancelar</p></NavLink></button>
            <button className="boton-guardar" type="submit" name="enviar_formulario" id="enviar" value="Guardar"><p>Actualizar</p></button>           
        </div>
  </form>
</div>  
</div>
  
      
    </div>
  )
}

export default EditarServicio
