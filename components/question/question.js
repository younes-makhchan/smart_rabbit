import styles from "./index.module.css";
import BarLoader from "react-spinners/BarLoader";
import { useState, useRef, useEffect, useContext } from "react";
import Record from "../record/record.";
import RabbitLens from "../rabbitLens/rabbitLens";
import InputPrompt from "../inputPrompt/InputPrompt";
import InstallPWA from "../installPWA/InstallPWA";
import saveHistory from "../../util/saveHistory";
import saveToDatabase from "../../util/saveToDatabase";
import useFetch from "../../util/useFetch";
import { PromptContext } from "../../context/prompt-context";
  //fetching url

let count=0;
const Question = ({
  language
  }) => {
 
  const {onGenerate,loading,onChangeQuestion,question}=useContext(PromptContext);
  const  [blur,setBlur]=useState(false);


  const input=useRef();
  useEffect(()=>{
    if(blur){input.current.blur();
    
  }
  },[blur]);

  function onChangeQuestionHandler({target}){
    onChangeQuestion(target.value);
  }

  function onSubmit(e){
    e.preventDefault();
    
    if(question==""){
           return;
    }

    if(!loading)onGenerate(language);
    setBlur(true);
    onChangeQuestion("")

  }


  
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div>
        <div className={styles.inputwrapper}>
        <label htmlFor={"question"} style={{ display: "flex" }}> 
              <img
                src="search.svg"
                alt="search icon"
                className={styles.search_icon}
              />
            </label>
            <input
              type="text"
              id={"question"}
              ref={input}
              name={"question"}
              value={question}
              className={styles["input_prompt"]}
             onClick={()=>setBlur(false)}
              onChange={onChangeQuestionHandler}
            />
        
          <Record onChangeQuestion={onChangeQuestion} question={question}   language={language}
      />

          <RabbitLens
        onChangeQuestion={onChangeQuestion}
        language={language}
      />
        </div>
        <i>{language.note}</i>
      </div>
      <label htmlFor="answer" style={{ display:"none" }}>
        submit your question
      </label>
      <div>
        <button id="answer" type="submit">
          {loading ? (
            <BarLoader color="#fff" size={15} speedMultiplier={0.5} />
          ) : (
            language.btn_title
          )}
        </button>
      </div>
    </form>
  );

};


export default Question;
