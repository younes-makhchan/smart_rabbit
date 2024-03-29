import styles from "./index.module.css";
import Image from "next/image"
import { useState, useEffect, useContext } from "react";
import RabbitAnswer from "../rabbitAnswer/rabbitAnswer";
import Question from "../question/question";
import LanguageContext from "../../context/language-context";
import PromptContextProvider from "../../context/prompt-context";


function Content() {

  const {language}=useContext(LanguageContext);

  //for the result&answer
  const [result, setResult] = useState({result:language.smart_rabbit_opening,type:"text"});
  //for the sound
  
  function onChangeResult(result){
      setResult(result);
  }
  

  let [rabbitAnimation,setRabbitAnimation]=useState("idle")

 

  useEffect(() => {
    setResult({result:language.smart_rabbit_opening,type:"text"});
  }, [language]);




  return (
    <>
      
    
      <div>
        <h1 className={styles.title}>
          {language.title}
          <Image src="/carrot-min.png" alt="carrot" className={styles.carrot} width="75" height="75"/>
        </h1>
      </div>
      <PromptContextProvider>
       <Question language={language}   />
       <RabbitAnswer    />

      </PromptContextProvider>

    </>
  );
}
export default Content;
