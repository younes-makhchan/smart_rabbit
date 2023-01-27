import styles from "./index.module.css";
import Image from "next/image"
import { useState, useEffect } from "react";
import RabbitAnswer from "../rabbitAnswer/rabbitAnswer";
import Question from "../question/question";


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
        <h1 className={styles.title}>
          {language.title}
          <Image src="/carrot-min.png" alt="carrot" className={styles.carrot} width="75" height="75"/>
        </h1>
      </div>
       <Question language={language} setAnswers={setAnswers} setResult={setResult} setAlreadyPlayed={setAlreadyPlayed} setRabbitMode={setRabbitMode} ></Question>
      <RabbitAnswer answer={result} language={language} setAlreadyPlayed={setAlreadyPlayed} alreadyPlayed={alreadyPlayed} rabbiteMode={rabbiteMode} setRabbitMode={setRabbitMode} />
    </>
  );
}
export default Content;
