import React from "react";
import { ThemeProvider } from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import ColorModeProvider, { ColorModeContext } from "../src/components/Menu/componentes/ColorMode";

const theme = {
    light: {
        backgroundBase: "#f9f9f9",
        backgroundLevel1: "#fffffff",
        backgroundLevel2: "#f0f0f0",
        borderBase: "#e5e5e5",
        textColorBase: "#222222",
    },
    dark: {
        backgroundBase: "#181818",
        backgroundLevel1: "#202022",
        backgroundLevel2: "#313131",
        borderBase: "#383838",
        textColorBase: "#FFFF99", //texto amarelo 
                 
    }
};

// _app.js -> Definições globais do NextJS
// ThemeProvider -> Prover o tema para a app toda
// ColorModeProvider -> Prove o state de light ou dark mode para todo mundo
function ProviderWrapper(props) {
    return (
        <ColorModeProvider initialMode={"light"}>
            {props.children}
        </ColorModeProvider>

    )
}
function Myapp({Component, pageProps}){
    const contexto = React.useContext(ColorModeContext);
    console.log(contexto.mode, 'to saindo do app nao esquece de me apagar')

    function toggleMode(){
        
    }

    return (
        
            <ThemeProvider theme={theme[contexto.mode]}>
                <Component {...pageProps}/>
                <CSSReset/>
            </ThemeProvider >
    )
}

export default function _App(props){
    return (
        <ProviderWrapper>
            <Myapp {...props}/>
        </ProviderWrapper>
    )
};