import React from "react";



export const ColorModeContext = React.createContext({
    mode: "",
    setMode: ()=> {alert('me configura primeira chapa')},
    toggleMode: ()=> {alert('me configura primeira chapa')},
});

export default function ColorModeProvider(props) {
const [mode, setMode] = React.useState(props.initialMode);

    function toggleMode(){
        if (mode === "light") setMode("dark");
        if (mode === "dark")  setMode("light");
    }

    return(
        //? por que ele ta ignorando esse valor 
        <ColorModeContext.Provider value={{mode: mode, setMode: setMode, toggleMode: toggleMode}}>
            {props.children}
        </ColorModeContext.Provider>
    )
}