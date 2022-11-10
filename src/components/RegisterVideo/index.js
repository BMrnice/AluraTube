import { StyledRegisterVideo } from "./styles";
import React from "react";

// Custom hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);
    
    return {
        values,
        handleChange: (evento) =>{ 
            console.log(evento.target)
            const value = evento.target.value;
            const name = evento.target.name;
            //## console.log(evento.target.name)
            setValues({
               ...values,
               [name]: value,
            }); 
           },
           cleanForm(){
            setValues({})
           }
    };
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: {titulo: "magnilson", url:"morenonnon"}
    });
    const [formVisivel, setFormVisivel] = React.useState(true);
    // [x]falta o botao de chamada do register video
    // [x]modal {formulari que add video novo }
    // -> [] controlar o states, so chamar o modal quando o button for clicado
    /*
    ~~ O que precisamos para o form funcionar?
     - pegar os dados, que precisam vir do state
        - titulo
        - URl do video
     -  precisa ter um onSubmit do form que add um novos obj na lista no  Json.
     -  limpar o form para uma nova acao    
    */
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() =>setFormVisivel(true)}>
                +
            </button>
            {/* {no Js se usa muito operadores Ternarios} */}
            {/* {Operadores de curto-circuito} */}
            {formVisivel 
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        console.log(formCadastro.values);
                        setFormVisivel(false);
                        formCadastro.cleanForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() =>setFormVisivel(false)}>
                                X
                            </button>
                            <input placeholder="Titulo do video" 
                            name="titulo"
                            value={formCadastro.values.titulo} 
                            onChange={formCadastro.handleChange}
                            />
                            <input placeholder="URL" 
                            name="url"
                            value={formCadastro.values.url}
                            onChange={formCadastro.handleChange}
                            />
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                )
                :
             false }

            
            
        </StyledRegisterVideo>
    )
}