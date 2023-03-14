
import styles from "./InputPrompt.module.css"



const  InputPrompt=({promptChangeHandler,prompt})=>{
    return (
        <>
               <label htmlFor="question" style={{ display: "flex" }}> 
              <img
                src="search.svg"
                alt="search icon"
                className={styles.search_icon}
              />
            </label>
            <input
              type="text"
              id="question"
              name="question"
              className={styles["input_prompt"]}
              // placeholder={language["placeholder"]}
              placeholder=""
              value={prompt}
              onChange={promptChangeHandler}
            />
        
        </>
    )
}

export default InputPrompt;