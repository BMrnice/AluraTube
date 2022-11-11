import { StyledRegisterVideo } from "./styles";
import React from "react";
import { createClient } from '@supabase/supabase-js'

// Custom hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);
    
    return {
        values,
        handleChange: (evento) =>{ 
            //## console.log(evento.target)
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

const PROJECT_URL = "https://pdoijezyyhbgodotsdqv.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkb2lqZXp5eWhiZ29kb3RzZHF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNzk5MTgsImV4cCI6MTk4Mzc1NTkxOH0.UxoD3MVGe5UtOpEnNBNkAFYuCX4xGqjm3hbU0QYwaS8"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

// get youtube thumbnail from video url
function getThumbnail(url){
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}

export default function RegisterVideo() {

    
    const formCadastro = useForm({
        initialValues: {titulo: "Frost punk", url:"https://www.youtube.com/watch?v=O8jtAyPuhNg"}
    });
    const [formVisivel, setFormVisivel] = React.useState(false);
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
                        //## console.log(formCadastro.values);

                        supabase.from("video").insert({
                            title:formCadastro.values.titulo,
                            url:formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist:"",
                        })
                        .then((oqueveio) => {
                            console.log(oqueveio)
                        })
                        .catch((err) => {
                            console.log(err)
                        })

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