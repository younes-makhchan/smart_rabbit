
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
               <label htmlFor={name} style={{ display: "flex" }}> 
              <img
                src="search.svg"
                alt="search icon"
                className={styles.search_icon}
              />
            </label>
            <input
              type="text"
              id={name}
              ref={input}
              name={name}
              className={styles["input_prompt"]}
             onClick={()=>setBlur(false)}
              onChange={onChange}
            />
        
        </>
    )
}

export default InputPrompt;