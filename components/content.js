import styles from "../pages/index.module.css";
import { ClipLoader  } from "react-spinners";
import Image from 'next/image'
import { useState,useRef, useEffect } from "react";
import RabbitAnswer from "./rabbitAnswer";

function Content({language}){



    //for the spinner
    const [loadingAnswer, setLoadingAnswer] = useState(false);
    //for the result&answer
    const [result, setResult] = useState("");
    //form input
    const [animalInput, setAnimalInput] = useState("");
  //on mount  (excute one time when page is ready)
  

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
            
            
          setLoadingAnswer(false)
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

        <form onSubmit={onSubmit}>
          <div>
            <img src="/rabbit_header_orange-min.png" className={styles.label} />
            <input
              type="text"
              name="animal"
              placeholder={language["placeholder"]}
              value={animalInput}
              onChange={(e) => setAnimalInput(e.target.value)}
            />
            <i>{language.note}</i>
          </div>

          <button type="submit" onClick={()=>setLoadingAnswer(true)}>
         { loadingAnswer ?  <ClipLoader  color="#fff" size={15} speedMultiplier={0.5} /> : language.btn_title} 
          </button>
        </form>
        <RabbitAnswer answer={result? result: language.smart_rabbit_opening}/>
        </>
    )
}
export default Content