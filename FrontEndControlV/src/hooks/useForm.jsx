import { useState } from "react";


export const useForm  = (objetoInicial = {}) =>{

    const[formulario, setFormulario] = useState(objetoInicial);

    const serializarFormulario = (formulario) =>{

        const formData = new formData(formulario);

        const objetoCompleto = {};

        for(let[name,value] of FormData){
            objetoCompleto[name] = value;
        }

        return objetoCompleto

    }


    const enviado = (e) => {
        e.preventDefault();

        let curso = serializarFormulario(e.target);

        setFormulario(curso);

        document.querySelector(".codigo").classList.add("enviado");
    }

    const cambiado = ({target}) =>{
        const{name,value} = target;

        setFormulario({
            ...formulario,
            [name]: value
        });
    }

    return{
        formulario,
        enviado,
        cambiado
    }

}


export default useForm;