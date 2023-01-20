import styles from "../pages/index.module.css";
import { useState, useEffect } from "react";
import RabbitAnswer from "./rabbitAnswer";
import Question from "./question";


function Content({ language,setAnswers }) {



  //for the result&answer
  const [result, setResult] = useState(language.smart_rabbit_opening);
  //for the sound
  const [alreadyPlayed,setAlreadyPlayed]=useState(false)


  useEffect(() => {
    setResult(language.smart_rabbit_opening);
  }, [language]);




  return (
    <>
      
    
      <div>
        <h3>
          {language.title}
          <img src="carrot-min.png" className={styles.img}></img>
        </h3>
      </div>
      
       <Question language={language} setAnswers={setAnswers} setResult={setResult} setAlreadyPlayed={setAlreadyPlayed} ></Question>
      <RabbitAnswer answer={result} language={language} setAlreadyPlayed={setAlreadyPlayed} alreadyPlayed={alreadyPlayed} />
    </>
  );
}
export default Content;
