import { useEffect, useState } from "react";
import styles from "../pages/index.module.css";

function History({answers,setAnswers}) {



    const [display,setDisplay]=useState(false)

    // function modifydate(answer,i){
    //     function dateDiffInDays(a, b) {
    //         const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    //         // Discard the time and time-zone information.
    //         const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    //         const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
          
    //         return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    //       }
    //     date=answer.date;
    //     let nowDate=new Date();
       
    //     diffDays=dateDiffInDays(date,nowDate);
    //     if(diffDays==0)answer.date="Today";
    //     if(diffDays==1)answer.date="Yesterday";
    //     if(diffDays>1&&diffDays<7)answer.date=diffDays+"Day Ago ";
    //     if(diffDays>7)answer.date=diffDays+"A long time...";
    //     return answer;
    // }
    function getHistory(){
        if(!display){

            setAnswers(JSON.parse(localStorage.getItem("answers"))?JSON.parse(localStorage.getItem("answers")):[])

            // answers.forEach(element => {
            //     modifydate(element);
            // });
            
            console.log(answers);
            console.log("made History");
            setDisplay(true);
        }else if(display){
            setDisplay(false)
        }

        
    }









  return (
    <div className={styles.history_wrapper}>
      <div className={styles.history_btn_wrapper} onClick={getHistory}>
        <img src="/history.svg"  />
        <button type="input">History</button>
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
                <div className={styles.timeline__title} style={{paddingTop:5+"px",paddingBottom:5+"px"}}>{answer.question}</div>
                <ul className={styles.timeline__points}>
                  <li>{answer.answer}</li>
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
