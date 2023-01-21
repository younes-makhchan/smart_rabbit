import styles from "../pages/index.module.css";
import Image from "next/image"
import { useState, useEffect } from "react";
import RabbitAnswer from "./rabbitAnswer";
import Question from "./question";


function Content({ language,setAnswers }) {



  //for the result&answer
  const [result, setResult] = useState(language.smart_rabbit_opening);
  //for the sound
  const [alreadyPlayed,setAlreadyPlayed]=useState(false)
  //three options :idle,question,searching
  let [rabbiteMode,setRabbitMode]=useState("idle")

  
  useEffect(() => {
    setResult(language.smart_rabbit_opening);
  }, [language]);




  return (
    <>
      
    
      <div>
        <h3>
          {language.title}
          <Image src="/carrot-min.png" alt="carrot" className={styles.carrot} width="75" height="75"/>
        </h3>
      </div>
      
       <Question language={language} setAnswers={setAnswers} setResult={setResult} setAlreadyPlayed={setAlreadyPlayed} setRabbitMode={setRabbitMode} ></Question>
      <RabbitAnswer answer={result} language={language} setAlreadyPlayed={setAlreadyPlayed} alreadyPlayed={alreadyPlayed} rabbiteMode={rabbiteMode} />
    </>
  );
}
export default Content;
