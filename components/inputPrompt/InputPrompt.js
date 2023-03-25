
import { useContext, useEffect, useRef } from "react";
import LanguageContext from "../../context/language-context";
import styles from "./InputPrompt.module.css"



const  InputPrompt=({onChange,name,blur,setBlur})=>{
  const {language}=useContext(LanguageContext);
  const input=useRef();

  useEffect(()=>{
    if(blur){input.current.blur();
    console.log("blurring input")
    
  }
  },[blur]);
    return (
        <>
            
        </>
    )
}

export default InputPrompt;