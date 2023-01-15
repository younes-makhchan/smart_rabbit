import Typewriter from "typewriter-effect";
import { useEffect,useRef } from "react";
import styles from "../pages/index.module.css";

function RabbitAnswer({answer}){

    const resultBox=useRef();
    useEffect(()=>{
      resultBox.current.style="max-height:"+(window.innerHeight-resultBox.current.getBoundingClientRect().y-70)+"px"
    },[])

    return(
        <>
        <div>
        <div className={styles.wrapper}>
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