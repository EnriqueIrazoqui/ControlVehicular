import "../../../../styles/stylesNuevo.css"
import {useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useForm} from '../../../../hooks/useForm'
import {Peticiones} from '../../../../Helpers/Peticiones'
import {Global} from '../../../../Helpers/Global'
import {useParams} from 'react-router-dom';

const EditarVerificacion = () => {
  const{formulario ,cambiado} = useForm({});
  const params = useParams();
  const [verificacion, setVerificacion] = useState([]);

  useEffect(() =>{
    ConseguirVerificacion();
},[])

const [setCargando] = useState(true);

const ConseguirVerificacion = async() =>{
  const {datos} = await Peticiones(Global.url+"verificaciones/"+params.id, "GET");
  setVerificacion(datos);
  setCargando(false);
}

const editar = async(e) => {
  e.preventDefault();

    let nuevo = formulario;  
    /*console.log(nuevo)*/


    const {datos} = await Peticiones(Global.url+"verificaciones", "PUT", nuevo);

    if(datos.ok === true){
      alert("Actualizado con exito");
    }

    if(datos.message.status  === 500){
      alert("Error en el servidor");
    }

    if(datos.message.status === 401){
      alert("Datos con formato incorrecto");
    }

    /*console.log(datos);*/
  }

  return (
      <div className="contact_form">

    <div className="formulario">      
      <h1 className='tittle'>Editar verificacion</h1>
   
          <form action="" onSubmit={editar}>    

          <div className="inputs">
                  <p className='parrafo'>
                    <label className='label' htmlFor="idVerificacion" >Id Verificacion</label>
                    <input className='input' type="number" name="idVerificacion" id="idVerificacion" required="obligatorio" placeholder="ID Verificacion" onChange={cambiado} defaultValue={verificacion[0]?.idVerificacion}/>
                  </p>  
                <p className='parrafo'>
                    <label className='label' htmlFor="idVehiculo" >Id Vehiculo</label>
                    <input className='input' type="number" name="idVehiculo" id="idVehiculo" required="obligatorio" placeholder="ID Vehiculo" onChange={cambiado} defaultValue={verificacion[0]?.idVehiculo}/>
                  </p>  
                <p className='parrafo'>
                  <label className='label' htmlFor="fechaPago" >Fecha de pago</label>
                  <input className='input' type="text" name="fechaPago" id="fechaPago" required="obligatorio" placeholder="Ej: 2023-07-23 15:30:00" onChange={cambiado} defaultValue={verificacion[0]?.fechaPago}/>
                </p>  
              </div>

              <div className="inputs">
                <p className='parrafo'>
                  <label className='label' htmlFor="monto" >Monto</label>
                  <input className='input' type="text" name="monto" id="monto" required="obligatorio" placeholder="Ej. 2500.00" onChange={cambiado} defaultValue={verificacion[0]?.monto}/>
                </p>
                <p className='parrafo'>
                    <label className='label' htmlFor="folio" >Folio</label>
                    <input className='input' type="text" name="folio" id="folio" required="obligatorio" placeholder="Folio completo" onChange={cambiado} defaultValue={verificacion[0]?.folio}/>
                  </p>    
              </div>

                <div className="botones">
                    <button className="boton-eliminar" type="reset" name="cancelar" id="cancelar"> <NavLink to="/datosVerificaciones"><p> Cancelar</p></NavLink></button>
                    <button className="boton-guardar" type="submit" name="enviar_formulario" id="enviar" value="Guardar"><p>Actualizar</p></button>           
                </div>
          </form>
    </div>  
  </div>
  )
}

export default EditarVerificacion
