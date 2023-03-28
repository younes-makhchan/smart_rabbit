import Typewriter from "typewriter-effect";
import Voice from "../voice/voice";
import {  useContext, useEffect, useRef } from "react";
import styles from "./index.module.css";
import GeneratedAnswer from "../generatedAnswer/generatedAnswer";
import GeneratedImage from "../generatedImage/GeneratedImage";
import { PromptContext } from "../../context/prompt-context";



 function RabbitAnswer() {
  const resultBox = useRef();
  const {result,rabbitAnimation,rabbitAnimationHandler}=useContext(PromptContext);
  
  const {result:answer,type:answerType}=result;
  useEffect(() => {
    resultBox.current.style =
      "max-height:" +
      (window.innerHeight - resultBox.current.getBoundingClientRect().y - 10) +
      "px";
  }, []);
  

  
  return (
    <>
      <div>
        <div className={styles.wrapper}>
          <label htmlFor="rabbitAnswer" style={{display:"none"}}  >Rabbit Answer</label>
          <div alt="Rabbit Answer" id="rabbitAnswer" className={styles.result} ref={resultBox}>
           {answerType=="text" && <GeneratedAnswer answer={answer} rabbitAnimationHandler={rabbitAnimationHandler}/>}
           {answerType=="image" && <GeneratedImage answer={answer}/>}
            
          </div>
          <img alt={"Smart Rabbit idle"}  className={`${styles["idle"]} ${rabbitAnimation!="idle"&&styles["hide"]}`} src={"idle.gif" } />
          <img alt={"Smart Rabbit searching"} className={`${styles["searching"]} ${rabbitAnimation!="searching"&&styles["hide"]}`} src={"searching.gif" } />
          <img alt={"Smart Rabbit question"} className={`${styles["question"]} ${rabbitAnimation!="question"&&styles["hide"]}`} src={"question.gif" } />
          <img alt={"Smart Rabbit speaking"} className={`${styles["speaking"]} ${rabbitAnimation!="speaking"&&styles["hide"]}`} src={"speaking.gif" } />
         

        </div>
      </div>
      <div>
      </div>
    </>
  );
}
export default RabbitAnswer;
