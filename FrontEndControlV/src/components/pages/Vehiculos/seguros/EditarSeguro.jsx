import "../../../../styles/stylesNuevo.css"
import {useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useForm} from '../../../../hooks/useForm'
import {Peticiones} from '../../../../Helpers/Peticiones'
import {Global} from '../../../../Helpers/Global'
import {useParams} from 'react-router-dom';

const EditarSeguro = () => {
  const{formulario ,cambiado} = useForm({});
  const [resultado] = useState("no_enviado");
  const params = useParams();
  const [seguro, setSeguro] = useState([]);

  useEffect(() =>{
    ConseguirSeguro();
},[])

const ConseguirSeguro = async() =>{
  const {datos} = await Peticiones(Global.url+"seguros/"+params.id, "GET");
  setSeguro(datos);
}

  const editar = async(e) => {
    e.preventDefault();

      let nuevo = formulario;  
      console.log(nuevo)


      const {datos} = await Peticiones(Global.url+"seguros", "PUT", nuevo);

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
        alert("El ID del automovil no existe");
      }

      //setResultado(true);
      console.log(datos);
    }

  return (
    <div className="contact_form">

<div className="formulario">      
  <h1 className='tittle'>Editar seguro</h1>
  
  <strong>{resultado == "guardado"? "Verificacion guardada": ""}</strong>   
  <strong>{resultado == "error"? "Error en el servidor": ""}</strong>
  <strong>{resultado == "campus"? "Datos con formato incorrecto": ""}</strong>
  <strong>{resultado == "folio"? "El folio ya existe o el ID del automovil no existe": ""}</strong>        
  
    <pre>{JSON.stringify(formulario)}</pre>
      <form action="" onSubmit={editar}>    
      <div className="inputs">
      <p className='parrafo'>
                <label className='label' htmlFor="idSeguro" >Id Seguro</label>
                <input className='input' type="number" name="idSeguro" id="idSeguro" required="obligatorio" placeholder="ID Vehiculo" onChange={cambiado} defaultValue={seguro[0]?.idSeguro}/>
              </p>  
            <p className='parrafo'>
                <label className='label' htmlFor="idVehiculo" >Id Vehiculo</label>
                <input className='input' type="number" name="idVehiculo" id="idVehiculo" required="obligatorio" placeholder="ID Vehiculo" onChange={cambiado} defaultValue={seguro[0]?.idVehiculo}/>
              </p>  
          </div>


          <div className="inputs">
          <p className='parrafo'>
              <label className='label' htmlFor="numeroSeguro" >Numero de seguro</label>
              <input className='input' type="text" name="numeroSeguro" id="numeroSeguro" required="obligatorio" placeholder="Ej: tyurturtu4r54454hf" onChange={cambiado} defaultValue={seguro[0]?.numeroSeguro}/>
            </p>  
            <p className='parrafo'>
              <label className='label' htmlFor="nombreAseguradora">Nombre del seguro</label>
              <input className='input' type="text" name="nombreAseguradora" id="nombreAseguradora" required="obligatorio" placeholder="Aseguradora" onChange={cambiado} defaultValue={seguro[0]?.nombreAseguradora}/>
            </p>
          </div>

          <div className="inputs">
          <p className='parrafo'>
                <label className='label' htmlFor="fechaInicio" >Inicio</label>
                <input className='input' type="date" name="fechaInicio" id="fechaInicio" required="obligatorio"  onChange={cambiado} defaultValue={seguro[0]?.fechaInicio}/>
              </p>    
            <p className='parrafo'>
              <label className='label' htmlFor="fechaVencimiento" >Vencimiento</label>
              <input className='input' type="date" name="fechaVencimiento" id="fechaVencimiento" required="obligatorio"  onChange={cambiado} defaultValue={seguro[0]?.fechaVencimiento}/>
            </p>  
          </div>

          
            <div className="botones">
                <button className="boton-eliminar" type="reset" name="cancelar" id="cancelar"> <NavLink to="/datosSeguros"><p> Cancelar</p></NavLink></button>
                <button className="boton-guardar" type="submit" name="enviar_formulario" id="enviar" value="Guardar"><p>Guardar</p></button>           
            </div>
      </form>
</div>  
</div>
    
  )
}

export default EditarSeguro
