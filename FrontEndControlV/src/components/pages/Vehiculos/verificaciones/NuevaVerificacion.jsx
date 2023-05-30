import "../../../../styles/stylesNuevo.css"
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import {useForm} from '../../../../hooks/useForm'
import {Peticiones} from '../../../../Helpers/Peticiones'
import {Global} from '../../../../Helpers/Global'

const NuevaVerificacion = () => {
    const{formulario ,cambiado} = useForm({});
    const [resultado] = useState("no_enviado");


  const guardar = async(e) => {
    e.preventDefault();

      let nuevo = formulario;  
      console.log(nuevo)


      const {datos} = await Peticiones(Global.url+"verificaciones", "POST", nuevo);

      if(datos.ok === true){
        /*setResultado("guardado");*/
        alert("Guardado con exito");
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
        alert("El folio ya existe o el ID del automovil no existe");
      }

      //setResultado(true);
      console.log(datos);
    }


  return (
    <div className="contact_form">

    <div className="formulario">      
      <h1 className='tittle'>Nueva verificacion</h1>
      {/*
      <strong>{resultado == "guardado"? "Verificacion guardada": ""}</strong>   
      <strong>{resultado == "error"? "Error en el servidor": ""}</strong>
      <strong>{resultado == "campus"? "Datos con formato incorrecto": ""}</strong>
      <strong>{resultado == "folio"? "El folio ya existe o el ID del automovil no existe": ""}</strong>     
      */}   

        <pre>{JSON.stringify(formulario)}</pre>


          <form action="" onSubmit={guardar}>    


          <div className="inputs">
                <p className='parrafo'>
                    <label className='label' htmlFor="idVehiculo" >Id Vehiculo</label>
                    <input className='input' type="number" name="idVehiculo" id="idVehiculo" required="obligatorio" placeholder="ID Vehiculo" onChange={cambiado}/>
                  </p>  
                <p className='parrafo'>
                  <label className='label' htmlFor="fechaPago" >Fecha de pago</label>
                  <input className='input' type="date" name="fechaPago" id="fechaPago" required="obligatorio" placeholder="Ej: 2023-07-23" onChange={cambiado} />
                </p>  
              </div>


              <div className="inputs">
                <p className='parrafo'>
                  <label className='label' htmlFor="monto" >Monto</label>
                  <input className='input' type="text" name="monto" id="monto" required="obligatorio" placeholder="Ej. 2500.00" onChange={cambiado} />
                </p>
                <p className='parrafo'>
                    <label className='label' htmlFor="folio" >Folio</label>
                    <input className='input' type="text" name="folio" id="folio" required="obligatorio" placeholder="Folio completo" onChange={cambiado}/>
                  </p>    
              </div>

              
                <div className="botones">
                    <button className="boton-eliminar" type="reset" name="cancelar" id="cancelar"> <NavLink to="/datosVerificaciones"><p> Cancelar</p></NavLink></button>
                    <button className="boton-guardar" type="submit" name="enviar_formulario" id="enviar" value="Guardar"><p>Guardar</p></button>           
                </div>
          </form>
    </div>  
  </div>
  )
}

export default NuevaVerificacion
