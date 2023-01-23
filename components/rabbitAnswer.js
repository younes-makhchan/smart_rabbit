import Typewriter from "typewriter-effect";
import Voice from "./voice";

import { createElement, useEffect, useRef, useState } from "react";
import styles from "../pages/index.module.css";



 function RabbitAnswer({ answer, language,setAlreadyPlayed,alreadyPlayed,rabbiteMode,setRabbitMode }) {
  const resultBox = useRef();

  
  useEffect(() => {
    resultBox.current.style =
      "max-height:" +
      (window.innerHeight - resultBox.current.getBoundingClientRect().y - 95) +
      "px";
  }, []);
  

  

  return (
    <>
      <div>
        <div className={styles.wrapper}>
         <Voice answer={answer} voice={language.voice} setRabbitMode={setRabbitMode}></Voice>
          <div className={styles.result} ref={resultBox}>
            <Typewriter
              options={{
                strings: [answer],
                autoStart: true,
                delay: 15,
                pauseFor: 3600000,
              }}
            />
          </div>
          <img  className={styles.idle} src="idle.gif"  style={{display:rabbiteMode=="idle"?"block":"none"}}/>
          <img  className={styles.question} src="question.gif"  style={{display:rabbiteMode=="question"?"block":"none"}} />
          <img className={styles.searching} src="searching.gif"   style={{display:rabbiteMode=="searching"?"block":"none"}}/>
          <img className={styles.speaking} src="speaking.gif"   style={{display:rabbiteMode=="speaking"?"block":"none"}}/>
          
     
          
        </div>
      </div>
      <div>
        <audio src="" style={{"display":"none"}}></audio>
      </div>
    </>
  );
}
export default RabbitAnswer;
