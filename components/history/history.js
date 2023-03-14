import {  useContext, useEffect, useReducer, useState } from "react";
import styles from "./history.module.css";
import Image from "next/image"
import LanguageContext from "../../context/language-context";

function displayReducer(prevstate,action){

    
    return !prevstate;
}


function History() {
  const [answers,setAnswers]=useState([]);
  const {language}=useContext(LanguageContext);

  const [display,setDisplay]=useState(false);

    useEffect(()=>{
      setAnswers(JSON.parse(localStorage.getItem("answers"))?JSON.parse(localStorage.getItem("answers")):[])

    },[display]);
 

  return (
    <div className={styles.history_wrapper}>
      <div className={styles.history_btn_wrapper} onClick={()=>setDisplay(prevstate=>!prevstate)}>
        <Image  alt="history icon" src="/history.svg" width="22" height="22" />
        <button type="button">{language.history}</button>
      </div>
      <div className={styles.history} style={{display:display?"block":"none"}}>
        <div className={styles.card}>
          <ul className={styles.timeline} style={{display:answers.length>0?"block":"none"}}>
        {  answers.length>0?
            answers.slice().reverse().map((answer,i)=>{
                    return (
                        <li key={i} className={styles.timeline__item}>
              <div className={styles.timeline__step}>
                <div className={i%2 ?styles.timeline__step__marker_orange:styles.timeline__step__marker_green}></div>
              </div>
              <div className={styles.timeline__content}>
              {/* <div className={styles.timeline__time}></div> */}
                <div className={styles.timeline__title} style={{paddingTop:5+"px",paddingBottom:5+"px"}}>
                  {answer.question}</div>
                <ul className={styles.timeline__points}>
                  <li>{answer.type=="text"?answer.answer:<img src={answer.answer} className={styles.image}/>}</li>
                </ul>
              </div>
            </li>
                    )
                }):""
            }
            
          </ul>
            <div className={styles.timeline__empty}  style={{display:answers.length>0?"none":"block"}}>Empty History</div>
        </div>
      </div>
    </div>
  );
}

export default History;
