import styles from "../pages/index.module.css";
import { ClipLoader } from "react-spinners";

import { useState, useRef, useEffect } from "react";
import RabbitAnswer from "./rabbitAnswer";
import Question from "./question";


function Content({ language,setAnswers }) {
  //you can use question component or try again directley web-speech cognitvie here using next/dynamic 

  const sdk = require("microsoft-cognitiveservices-speech-sdk");


  //for the result&answer
  const [result, setResult] = useState(language.smart_rabbit_opening);
  //for the sound
  const [alreadyPlayed,setAlreadyPlayed]=useState(false)


  useEffect(() => {
    setResult(language.smart_rabbit_opening);
  }, [language]);


  // useEffect(() => {
  //   setAnimalInput(transcript);
  // }, [transcript]);

  
  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://smart-rabbit.netlify.app/api/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
          body: JSON.stringify({
            animal: animalInput,
            language: language.lang,
          }),
        }
      );

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      const index = data.result.lastIndexOf(".");

      if (index > 0 && language.lang == "arabic") {
        data.result = data.result.slice(0, index + 1);
      }

      setLoadingAnswer(false);
      setResult(data.result);
      setAnimalInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

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
