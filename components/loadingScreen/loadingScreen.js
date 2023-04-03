import styles from "./index.module.css";
import { useState, useEffect } from "react";


function LoadingScreen({time}){
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
      document.body.style.overflow="hidden";
      setTimeout(() => {
        setLoaded(true);
        document.body.style.overflow="";
        }, time);
      },[])
  
    return(
        <>
   <div className={loaded ? styles.remove : styles.loader_wrapper}>
          <div className={styles.rabbit}></div>
          <div className={styles.clouds}></div>          
        </div>

      </>
    )
}
export default LoadingScreen