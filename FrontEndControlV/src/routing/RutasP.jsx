import {Routes,Route, BrowserRouter, Navigate} from "react-router-dom"
import Inicio from "../components/pages/Inicio";
import IndexVehiculos from "../components/pages/IndexVehiculos";
import IndexReportes from "../components/pages/IndexReportes";
import HeaderNav from "../components/layout/HeaderNav";
import DatosVerificaciones from "../components/pages/Vehiculos/verificaciones/DatosVerificaciones";
import DatosSeguros from "../components/pages/Vehiculos/seguros/DatosSeguros";
import DatosRefrendos from "../components/pages/Vehiculos/refrendos/DatosRefrendos";
import PrestamoSalida from "../components/pages/Bitacoras/Salida/PrestamoSalida";
import PrestamoEntrada from "../components/pages/Bitacoras/Entrada/PrestamoEntrada";
import NuevaVerificacion from "../components/pages/Vehiculos/verificaciones/NuevaVerificacion";
import SegurosNuevo from "../components/pages/Vehiculos/seguros/SegurosNuevo";
import NuevoRefrendo from "../components/pages/Vehiculos/refrendos/NuevoRefrendo";
import NuevaSalida from "../components/pages/Bitacoras/Salida/NuevaSalida";
import NuevaEntrada from "../components/pages/Bitacoras/Entrada/NuevaEntrada";
import DatosVehiculos from "../components/pages/Vehiculos/vehiculos/DatosVehiculos";
import NuevoVehiculo from "../components/pages/Vehiculos/vehiculos/NuevoVehiculo";
import EditarVehiculo from "../components/pages/Vehiculos/vehiculos/EditarVehiculo";
import EditarVerificacion from "../components/pages/Vehiculos/verificaciones/EditarVerificacion";
import EditarSeguro from "../components/pages/Vehiculos/seguros/EditarSeguro";
import EditarRefrendo from "../components/pages/Vehiculos/refrendos/EditarRefrendo";
import EditarSalida from "../components/pages/Bitacoras/Salida/EditarSalida";
import EditarEntrada from "../components/pages/Bitacoras/Entrada/EditarEntrada";
import DatosServicios from "../components/pages/Vehiculos/servicios/DatosServicios";
import NuevoServicio from "../components/pages/Vehiculos/servicios/NuevoServicio";
import EditarServicio from "../components/pages/Vehiculos/servicios/EditarServicio";


export const RutasP = () => {
    return (
      <BrowserRouter>
          <HeaderNav/>
          <section id="content" className="content">
          <Routes>
          <Route path="/" element={<Navigate to="/inicio" />}/>
            <Route path="/inicio" element={<Inicio/>}/>
            <Route path="/indexVehiculos" element={<IndexVehiculos/>}/>
            <Route path="/indexReportes" element={<IndexReportes/>}/>
            <Route path="/datosVehiculo" element={<DatosVehiculos/>}/>
            <Route path="/nuevoVehiculo" element={<NuevoVehiculo/>}/>
            <Route path="/editarVehiculo/:id" element={<EditarVehiculo/>}/>
            <Route path="/datosVerificaciones" element={<DatosVerificaciones/>}/>
            <Route path="/nuevaVerificacion" element={<NuevaVerificacion/>}/>
            <Route path="/editarVerificacion/:id" element={<EditarVerificacion/>}/>
            <Route path="/datosSeguros" element={<DatosSeguros/>}/>
            <Route path="/seguroNuevo" element={<SegurosNuevo/>}/>
            <Route path="/editarSeguro/:id" element={<EditarSeguro/>}/>
            <Route path="/datosRefrendos" element={<DatosRefrendos/>}/>
            <Route path="/nuevoRefrendo" element={<NuevoRefrendo/>}/>
            <Route path="/editarRefrendo/:id" element={<EditarRefrendo/>}/>
            <Route path="/datosServicios" element={<DatosServicios/>}/>
            <Route path="/nuevoServicio" element={<NuevoServicio/>}/>
            <Route path="/editarServicio/:id" element={<EditarServicio/>}/>
            <Route path="/prestamoSalida" element={<PrestamoSalida/>}/>
            <Route path="/nuevaSalida" element={<NuevaSalida/>}/>
            <Route path="/editarSalida/:id" element={<EditarSalida/>}/>
            <Route path="/prestamoEntrada" element={<PrestamoEntrada/>}/>
            <Route path="/nuevaEntrada" element={<NuevaEntrada/>}/>
            <Route path="/editarEntrada/:id" element={<EditarEntrada/>}/>
            <Route path='*' element={
            <div>
               <h1>Error 404</h1>
            </div>
            }/>
          </Routes>
          </section>
      </BrowserRouter>
    )
  }