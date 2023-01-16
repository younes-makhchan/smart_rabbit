import Typewriter from "typewriter-effect";
import { useEffect,useRef, useState } from "react";
import styles from "../pages/index.module.css";
import { resolve } from "styled-jsx/css";
function RabbitAnswer({answer,language}){

    const resultBox=useRef();
    let [speaking,setSpeaking]=useState(false);
    useEffect(()=>{
      resultBox.current.style="max-height:"+(window.innerHeight-resultBox.current.getBoundingClientRect().y-70)+"px"
      ;
   
    },[])
    
    function isspeaking(){
      return new Promise((resolve,reject)=>{
        let id=setInterval(()=>{
          if(!speechSynthesis.speaking){
            clearInterval(id)
             resolve(false);
          }
        },300)
      })
    }


    async function play(source){
      let sound=new SpeechSynthesisUtterance(answer);
      sound.lang=language.mic;
      speechSynthesis.speak(sound);
     setSpeaking(true);
      let speakingend =await isspeaking();
      setSpeaking(false);

    }
    return(
        <>
        <div>
        <div className={styles.wrapper}>
            <button type="button" className={styles.speech} onClick={play} >
            <img src={ (speaking) ? "/stop_sound.png":"/play_sound.png"  }width={"26px"} />
            </button>
          <div className={styles.result} ref={resultBox}>
            <Typewriter
              options={{
                strings: [answer],
                autoStart: true,
                delay: 15,
                pauseFor:3600000,
              }}
            />
          </div>
          <img
            className={styles.img}
            src="/rabbit_answer_orange_green-min.png"
          ></img>
        </div>
      </div>
        </>
    )
}
export default RabbitAnswer