import "../../../../styles/stylesNuevo.css"
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import {useForm} from '../../../../hooks/useForm'
import {Peticiones} from '../../../../Helpers/Peticiones'
import {Global} from '../../../../Helpers/Global'

const NuevoVehiculo = () => {


    const{formulario,enviado, cambiado} = useForm({});
    const [resultado, setResultado] = useState("no_enviado");


  const guardarVehiculo = async(e) => {
    e.preventDefault();

      let nuevoVehiculo = formulario;  
      console.log(nuevoVehiculo)


      const {datos,cargando} = await Peticiones(Global.url+"automovil", "POST", nuevoVehiculo);

      if(datos.ok === true){
        setResultado("guardado");
      }

      if(datos.ok  === false){
        setResultado("error");
      }

      if(datos.message.status === 406){
        setResultado("campus");
      }

      //setResultado(true);
      console.log(datos);
    }


  return (
    <div className="contact_form">

    <div className="formulario">      
      <h1 className='tittle'>Nuevo vehiculo</h1>
      <strong>{resultado == "guardado"? "Vehiculo guardado": ""}</strong>   
      <strong>{resultado == "error"? "Error en el servidor": ""}</strong>
      <strong>{resultado == "campus"? "El campus no existe, reviselo": ""}</strong>      

        {/*<pre>{JSON.stringify(formulario)}</pre>*/}


          <form action="" onSubmit={guardarVehiculo}>    


          <div className="inputs">
                <p className='parrafo'>
                    <label className='label' htmlFor="idCampus" >Campus</label>
                    <input className='input' type="text" name="idCampus" id="idCampus" required="obligatorio" placeholder="Campus" onChange={cambiado}/>
                  </p>  
                <p className='parrafo'>
                  <label className='label' htmlFor="marca" >Marca</label>
                  <input className='input' type="text" name="marca" id="marca" required="obligatorio" placeholder="Nombre de la marca" onChange={cambiado} />
                </p>  
              </div>


              <div className="inputs">
                <p className='parrafo'>
                  <label className='label' htmlFor="modelo" >Modelo</label>
                  <input className='input' type="number" name="modelo" id="modelo" required="obligatorio" placeholder="ej. 2006" onChange={cambiado} />
                </p>
                <p className='parrafo'>
                    <label className='label' htmlFor="placas" >Placas</label>
                    <input className='input' type="text" name="placas" id="placas" required="obligatorio" placeholder="Serie de placas" onChange={cambiado}/>
                  </p>    
              </div>

              <div className="inputs">
              <p className='parrafo'>
                    <label className='label' htmlFor="color" >Color</label>
                    <input className='input' type="text" name="color" id="color" required="obligatorio" placeholder="Color del vehiculo" onChange={cambiado}/>
                  </p>  

                <p className='parrafo'>
                  <label className='label' htmlFor="serie" >No. de serie</label>
                  <input className='input' type="text" name="serie" id="serie" required="obligatorio" placeholder="No. de serie del vehiculo" onChange={cambiado}/>
                </p>    
              </div>

              <div className="inputs">
              <p className='parrafo'>
                    <label className='label' htmlFor="tipoCombustible">Tipo de combustible</label>
                    <input className='input' type="text" name="tipoCombustible" id="tipoCombustible" required="obligatorio" placeholder="ej. gasolina o diesel" onChange={cambiado} />
                  </p>    
              </div>

              
                <div className="botones">
                    <button className="boton-eliminar" type="reset" name="cancelar" id="cancelar"> <NavLink to="/DatosVehiculo"><p> Cancelar</p></NavLink></button>
                    <button className="boton-guardar" type="submit" name="enviar_formulario" id="enviar" value="Guardar"><p>Guardar</p></button>           
                </div>
          </form>
    </div>  
  </div>
  )
}

export default NuevoVehiculo
