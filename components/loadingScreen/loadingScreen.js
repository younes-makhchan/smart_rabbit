import styles from "./index.module.css";
import { useState, useEffect } from "react";


function LoadingScreen({time}){
    const [loaded, setLoaded] = useState(false);

    useEffect(()=>{
        setTimeout(() => {
            setLoaded(true);
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