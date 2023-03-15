import { useEffect, useRef, useState } from "react";
import useInstallPWA from "../../util/useInstallPWA";


import style from "./installPWA.module.css";

export default function InstallPWA({onChangedisplayInstallPWA,displayInstallPWA}) {
  const { installPWA, supportPWA } = useInstallPWA();
   const installBtn= useRef();
  useEffect(() => {
    if(!supportPWA)return;
    console.log("support PWA :"+supportPWA);
    installBtn.current.addEventListener("click",()=>{
      installPWA.prompt();
      console.log("install");
      onChangedisplayInstallPWA(true);
    });
  }, [supportPWA]);
  
  

      return (
        
        <div className={style["content-wrapper"]} style={{display:(displayInstallPWA)?"block":"none"}}>
          <div className={style["overlay"]}></div>
          <div className={style["content"]}>
            <img src="icon-192x192.png"  className={style.icon}/>
            <h3 className={style["description"]}>
              Smart Rabbit Available in <span  style={{color:"#fb942d"}}>Android</span> and <span style={{color:"#fb942d"}}>IOS</span> 
            </h3>
            <button type="button" className={style["install"]} ref={installBtn}>Install</button>
            <button type="button" className={style["not-now"]} onClick={()=>onChangedisplayInstallPWA(false)}>Not now</button>
          </div>
        </div>
      );
  
}
