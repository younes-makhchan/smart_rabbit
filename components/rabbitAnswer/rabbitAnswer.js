import Typewriter from "typewriter-effect";
import Voice from "../voice/voice";
import {  useEffect, useRef } from "react";
import styles from "./index.module.css";
import GeneratedAnswer from "../generatedAnswer/generatedAnswer";
import GeneratedImage from "../generatedImage/GeneratedImage";



 function RabbitAnswer({ answerType,answer,rabbitAnimation,onChangeRabbitAnimation }) {
  const resultBox = useRef();

  
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
           {answerType=="text" && <GeneratedAnswer answer={answer} onChangeRabbitAnimation={onChangeRabbitAnimation}/>}
           {answerType=="image" && <GeneratedImage answer={answer}/>}
            
          </div>
          {rabbitAnimation=="idle"&&<img alt={"smart rabbit idle"} className={styles["idle"]} src={"idle.gif" } />}
          {rabbitAnimation=="searching"&&<img alt={"smart rabbit searching"} className={styles["searching"]} src={"searching.gif" } />}
          {rabbitAnimation=="question"&&<img alt={"smart rabbit question"} className={styles["question"]} src={"question.gif" } />}
          {rabbitAnimation=="speaking"&&<img alt={"smart rabbit speaking"} className={styles["speaking"]} src={"speaking.gif" } />}
         

        </div>
      </div>
      <div>
      </div>
    </>
  );
}
export default RabbitAnswer;
