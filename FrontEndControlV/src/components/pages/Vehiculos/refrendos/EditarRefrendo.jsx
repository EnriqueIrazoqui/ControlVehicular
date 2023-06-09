import "../../../../styles/stylesNuevo.css"
import {useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useForm} from '../../../../hooks/useForm'
import {Peticiones} from '../../../../Helpers/Peticiones'
import {Global} from '../../../../Helpers/Global'
import {useParams} from 'react-router-dom';

const EditarRefrendo = () => {
    const{formulario ,cambiado} = useForm({});
    const params = useParams();
    const [seguro, setSeguro] = useState([]);

    useEffect(() =>{
        ConseguirRefrendo();
    },[])

    const ConseguirRefrendo = async() =>{
        const {datos} = await Peticiones(Global.url+"refrendos/"+params.id, "GET");
        setSeguro(datos);
      }

    const editar = async(e) => {
        e.preventDefault();
    
          let nuevo = formulario;  
          /*console.log(nuevo)*/
          const {datos} = await Peticiones(Global.url+"refrendos", "PUT", nuevo);
    
          if(datos.ok === true){
            alert("Actualizado con exito");
          }
    
          datos.message = null;
    
          if(datos.message.status  === 500){
            alert("Error en el servidor");
          }
    
          if(datos.message.status === 401){
            alert("Datos con formato incorrecto");
          }
    
          if(datos.message.status === 406){
            alert("El ID del automovil no existe");
          }
    
          //setResultado(true);
          /*console.log(datos);*/
        }

  return (
    <div>
          <div className="contact_form">

<div className="formulario">      
  <h1 className='tittle'>Editar refrendo</h1>


      <form action="" onSubmit={editar}>    


      <div className="inputs">
      <p className='parrafo'>
                <label className='label' htmlFor="idRefrendo" >Id Refrendo</label>
                <input className='input' type="number" name="idRefrendo" id="idRefrendo" required="obligatorio" placeholder="ID Vehiculo" onChange={cambiado} defaultValue={seguro[0]?.idRefrendo}/>
              </p>  
            <p className='parrafo'>
                <label className='label' htmlFor="idVehiculo" >Id Vehiculo</label>
                <input className='input' type="number" name="idVehiculo" id="idVehiculo" required="obligatorio" placeholder="ID Vehiculo" onChange={cambiado} defaultValue={seguro[0]?.idVehiculo}/>
              </p>  
            <p className='parrafo'>
              <label className='label' htmlFor="monto" >Monto</label>
              <input className='input' type="number" name="monto" id="monto" required="obligatorio" placeholder="Ej: 2000" onChange={cambiado} defaultValue={seguro[0]?.monto}/>
            </p>  
          </div>

          <div className="inputs">
            <p className='parrafo'>
              <label className='label' htmlFor="fechaInicio">Contratacion</label>
              <input className='input' type="text" name="fechaInicio" id="fechaInicio" required="obligatorio" placeholder="Aseguradora" onChange={cambiado} defaultValue={seguro[0]?.fechaInicio}/>
            </p>
            <p className='parrafo'>
                <label className='label' htmlFor="fechaVencimiento" >Vencimiento</label>
                <input className='input' type="text" name="fechaVencimiento" id="fechaVencimiento" required="obligatorio" placeholder="Fecha de inicio" onChange={cambiado} defaultValue={seguro[0]?.fechaVencimiento}/>
              </p>    
          </div>

            <div className="botones">
                <button className="boton-eliminar" type="reset" name="cancelar" id="cancelar"> <NavLink to="/datosRefrendos"><p> Cancelar</p></NavLink></button>
                <button className="boton-guardar" type="submit" name="enviar_formulario" id="enviar" value="Guardar"><p>Actualizar</p></button>           
            </div>
      </form>
</div>  
</div>
      
    </div>
  )
}

export default EditarRefrendo
