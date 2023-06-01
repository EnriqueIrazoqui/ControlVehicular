import "../../../../styles/stylesNuevo.css"
import {NavLink} from 'react-router-dom';
import {useForm} from '../../../../hooks/useForm'
import {Peticiones} from '../../../../Helpers/Peticiones'
import {Global} from '../../../../Helpers/Global'


const NuevaEntrada = () => {
    const{formulario ,cambiado} = useForm({});

  const guardar = async(e) => {
    e.preventDefault();

      let nuevo = formulario;  
      console.log(nuevo)


      const {datos} = await Peticiones(Global.url+"prestamoVehicularRegreso", "POST", nuevo);

      if(datos.ok === true){
        alert("Guardado con exito");
      }

      if (typeof datos.message !== 'undefined') {
        // Ahora sabemos que foo está definido.
      }
      

      if(datos.message.status  === 500){
        alert("Error en el servidor");
      }

      if(datos.message.status === 401){
        alert("Datos con formato incorrecto");
      }

      if(datos.message.status === 406){
        alert("Revise que los ID de vehiculo, usuario, salida y supervisor existan");
      }

      //setResultado(true);
      /*console.log(datos);*/
    }


  return (
    <div className="contact_form">

    <div className="formulario">      
      <h1 className='tittle'>Nueva entrada</h1>

        <pre>{JSON.stringify(formulario)}</pre>


          <form action="" onSubmit={guardar}>    


          <div className="inputs">
                <p className='parrafo'>
                    <label className='label' htmlFor="idSalida" >Id Salida</label>
                    <input className='input' type="number" name="idSalida" id="idSalida" required="obligatorio" placeholder="Ej: 1" onChange={cambiado}/>
                  </p>  
                <p className='parrafo'>
                  <label className='label' htmlFor="idSupervisor" >Id Supervisor</label>
                  <input className='input' type="text" name="idSupervisor" id="idSupervisor" required="obligatorio" placeholder="Ej: ACC00200" onChange={cambiado} />
                </p>  
                <p className='parrafo'>
                  <label className='label' htmlFor="idUsuario" >Id Usuario</label>
                  <input className='input' type="text" name="idUsuario" id="idUsuario" required="obligatorio" placeholder="Ej: ZAD0500" onChange={cambiado} />
                </p>
                <p className='parrafo'>
                  <label className='label' htmlFor="idVehiculo" >Id Vehiculo</label>
                  <input className='input' type="number" name="idVehiculo" id="idVehiculo" required="obligatorio" placeholder="Ej: 2" onChange={cambiado} />
                </p>    
              </div>


              <div className="inputs">
                <p className='parrafo'>
                  <label className='label' htmlFor="kilometraje">Kilometraje</label>
                  <input className='input' type="text" name="kilometraje" id="kilometraje" required="obligatorio" placeholder="Ej: 1000 km" onChange={cambiado} />
                </p>
                <p className='parrafo'>
                    <label className='label' htmlFor="descripcionDanos" >Descripcion de Daños</label>
                    <input className='input' type="text" name="descripcionDanos" id="descripcionDanos" required="obligatorio" placeholder="Ej: ninguno" onChange={cambiado}/>
                  </p>    
              </div>

              <div className="inputs">
                <p className='parrafo'>
                  <label className='label' htmlFor="tapetes">Numero de tapetes</label>
                  <input className='input' type="number" name="tapetes" id="tapetes" required="obligatorio" placeholder="Ej: 4" onChange={cambiado} />
                </p>
                <p className='parrafo'>
                    <label className='label' htmlFor="llantasDeRefaccion" >Llantas de refaccion</label>
                    <input className='input' type="number" name="llantasDeRefaccion" id="llantasDeRefaccion" required="obligatorio" placeholder="Ej: 1" onChange={cambiado}/>
                  </p>
                  <p className='parrafo'>
                    <label className='label' htmlFor="gatoHidraulico" >Gato Hidraulico</label>
                    <input className='input' type="number" name="gatoHidraulico" id="gatoHidraulico" required="obligatorio" placeholder="Ej: 1" onChange={cambiado}/>
                  </p>       
              </div>

              <div className="inputs">
                <p className='parrafo'>
                  <label className='label' htmlFor="extras">Extras</label>
                  <input className='input' type="text" name="extras" id="extras" placeholder="Ej: vehiculo sucio" onChange={cambiado} />
                </p>
                <p className='parrafo'>
                    <label className='label' htmlFor="nivelDeCombustible" >Nivel de combustible</label>
                    <input className='input' type="text" name="nivelDeCombustible" id="nivelDeCombustible" required="obligatorio" placeholder="Ej: lleno" onChange={cambiado}/>
                  </p>
                  <p className='parrafo'>
                    <label className='label' htmlFor="fechaHora" >Fecha y Hora</label>
                    <input className='input' type="datetime-local" name="fechaHora" id="fechaHora" required="obligatorio" placeholder="Ej: 1" onChange={cambiado}/>
                  </p>       
              </div>

              <div>
              <p className='parrafo'>
                  <label className='label' htmlFor="foto">Fotografia</label>
                  <input className='input' type="text" name="foto" id="foto" required="obligatorio" onChange={cambiado}/>
                </p>
              </div>

              
                <div className="botones">
                    <button className="boton-eliminar" type="reset" name="cancelar" id="cancelar"> <NavLink to="/prestamoEntrada"><p> Cancelar</p></NavLink></button>
                    <button className="boton-guardar" type="submit" name="enviar_formulario" id="enviar" value="Guardar"><p>Guardar</p></button>           
                </div>
          </form>
    </div>  
  </div>
  )
}

export default NuevaEntrada
