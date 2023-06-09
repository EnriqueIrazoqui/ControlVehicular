import "../../../../styles/stylesNuevo.css"
import {useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useForm} from '../../../../hooks/useForm'
import {Peticiones} from '../../../../Helpers/Peticiones'
import {Global} from '../../../../Helpers/Global'
import {useParams} from 'react-router-dom';


const EditarSalida = () => {
    const{formulario ,cambiado} = useForm({});
    const [resultado] = useState("no_enviado");
    const params = useParams();
    const [salida, setSalida] = useState([]);

    useEffect(() =>{
        ConseguirSalida();
    },[])

    const ConseguirSalida = async() =>{
        const {datos} = await Peticiones(Global.url+"prestamoVehicularSalida/"+params.id, "GET");
        setSalida(datos);
      }

    const editar = async(e) => {
        e.preventDefault();
    
          let nuevo = formulario;  
          console.log(nuevo)
    
    
          const {datos} = await Peticiones(Global.url+"prestamoVehicularSalida", "PUT", nuevo);
    
          if(datos.ok === true){
            /*setResultado("guardado");*/
            alert("Actualizado con exito");
          }
    
          if (typeof datos.message !== 'undefined') {
            // Definido
          }
          
    
          if(datos.message.status  === 500){
           /* setResultado("error");*/
            alert("Error en el servidor");
          }
    
          if(datos.message.status === 401){
            /*setResultado("campus");*/
            alert("Datos con formato incorrecto");
          }
    
          if(datos.message.status === 406){
            /*setResultado("folio");*/
            alert("Revise que el vehiculo, usuario y supervisor existan");
          }
    
          //setResultado(true);
          console.log(datos);
        }
    

  return (
    <div>
    <div className="contact_form">

<div className="formulario">      
  <h1 className='tittle'>Editar salida</h1>

  {/** 
  <strong>{resultado == "guardado"? "Folio guardado": ""}</strong>   
  <strong>{resultado == "error"? "Error en el servidor": ""}</strong>
  <strong>{resultado == "campus"? "Datos con formato incorrecto": ""}</strong>
  <strong>{resultado == "folio"? "El folio ya existe o el ID del automovil no existe": ""}</strong>        
*/}
    <pre>{JSON.stringify(formulario)}</pre>


      <form action="" onSubmit={editar}>    


      <div className="inputs">
      <p className='parrafo'>
                <label className='label' htmlFor="id" >Id Salida</label>
                <input className='input' type="text" name="id" id="id" required="obligatorio" placeholder="Ej: 1" onChange={cambiado} defaultValue={salida[0]?.id}/>
              </p>  
            <p className='parrafo'>
                <label className='label' htmlFor="idSupervisor" >Id Supervisor</label>
                <input className='input' type="text" name="idSupervisor" id="idSupervisor" required="obligatorio" placeholder="Ej: ACC00200" onChange={cambiado} defaultValue={salida[0]?.idSupervisor}/>
              </p>  
            <p className='parrafo'>
              <label className='label' htmlFor="idUsuario" >Id Usuario</label>
              <input className='input' type="text" name="idUsuario" id="idUsuario" required="obligatorio" placeholder="Ej: ZAD0500" onChange={cambiado} defaultValue={salida[0]?.idUsuario}/>
            </p>  
            <p className='parrafo'>
              <label className='label' htmlFor="idVehiculo" >Id Vehiculo</label>
              <input className='input' type="number" name="idVehiculo" id="idVehiculo" required="obligatorio" placeholder="Ej: 2" onChange={cambiado} defaultValue={salida[0]?.idVehiculo}/>
            </p>  
          </div>


          <div className="inputs">
            <p className='parrafo'>
              <label className='label' htmlFor="kilometraje">Kilometraje</label>
              <input className='input' type="text" name="kilometraje" id="kilometraje" required="obligatorio" placeholder="Ej: 1000 km" onChange={cambiado} defaultValue={salida[0]?.kilometraje}/>
            </p>
            <p className='parrafo'>
                <label className='label' htmlFor="descripcionDanos" >Descripcion de Daños</label>
                <input className='input' type="text" name="descripcionDanos" id="descripcionDanos" required="obligatorio" placeholder="Ej: ninguno" onChange={cambiado} defaultValue={salida[0]?.descripcionDanos}/>
              </p>    
          </div>

          <div className="inputs">
            <p className='parrafo'>
              <label className='label' htmlFor="tapetes">Numero de tapetes</label>
              <input className='input' type="number" name="tapetes" id="tapetes" required="obligatorio" placeholder="Ej: 4" onChange={cambiado} defaultValue={salida[0]?.tapetes}/>
            </p>
            <p className='parrafo'>
                <label className='label' htmlFor="llantasDeRefaccion" >Llantas de refaccion</label>
                <input className='input' type="number" name="llantasDeRefaccion" id="llantasDeRefaccion" required="obligatorio" placeholder="Ej: 1" onChange={cambiado} defaultValue={salida[0]?.llantasDeRefaccion}/>
              </p>
              <p className='parrafo'>
                <label className='label' htmlFor="gatoHidraulico" >Gato Hidraulico</label>
                <input className='input' type="number" name="gatoHidraulico" id="gatoHidraulico" required="obligatorio" placeholder="Ej: 1" onChange={cambiado} defaultValue={salida[0]?.gatoHidraulico}/>
              </p>       
          </div>

          <div className="inputs">
            <p className='parrafo'>
              <label className='label' htmlFor="extras">Extras</label>
              <input className='input' type="text" name="extras" id="extras" required="obligatorio" placeholder="Ej: vehiculo sucio" onChange={cambiado} defaultValue={salida[0]?.extras}/>
            </p>
            <p className='parrafo'>
                <label className='label' htmlFor="nivelDeCombustible" >Nivel de combustible</label>
                <input className='input' type="text" name="nivelDeCombustible" id="nivelDeCombustible" required="obligatorio" placeholder="Ej: lleno" onChange={cambiado} defaultValue={salida[0]?.nivelDeCombustible}/>
              </p>
              <p className='parrafo'>
                <label className='label' htmlFor="fechaHora" >Fecha y Hora</label>
                <input className='input' type="text" name="fechaHora" id="fechaHora" required="obligatorio" placeholder="Ej: 1" onChange={cambiado} defaultValue={salida[0]?.fechaHora}/>
              </p>       
          </div>

          <div>
          <p className='parrafo'>
              <label className='label' htmlFor="foto">Fotografia</label>
              <input className='input' type="text" name="foto" id="foto" required="obligatorio" placeholder="" onChange={cambiado} defaultValue={salida[0]?.foto}/>
            </p>
          </div>

          
            <div className="botones">
                <button className="boton-eliminar" type="reset" name="cancelar" id="cancelar"> <NavLink to="/prestamoSalida"><p> Cancelar</p></NavLink></button>
                <button className="boton-guardar" type="submit" name="enviar_formulario" id="enviar" value="Guardar"><p>Guardar</p></button>           
            </div>
      </form>
</div>  
</div>
      
    </div>
  )
}

export default EditarSalida
