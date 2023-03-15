
import styles from "./InputPrompt.module.css"



const  InputPrompt=({onChange,name})=>{
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
              name={name}
              className={styles["input_prompt"]}
              // placeholder={language["placeholder"]}
              placeholder=""
              onChange={onChange}
            />
        
        </>
    )
}

export default InputPrompt;