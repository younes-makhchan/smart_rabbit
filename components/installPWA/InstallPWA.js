import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import useInstallPWA from "../../util/useInstallPWA";
import style from "./installPWA.module.css";

const InstallPWA=()=> {
  const { installPWA, supportPWA } = useInstallPWA();

const [displayInstallPWA,setDisplayInstallPWA]=useState(true);



   
    
    
    

    return (
      <>
      <div className={style.install_wrapper} style={{display: supportPWA?"":"none"}} onClick={()=>{installPWA.prompt()}}  >
      <button type="button" className={`${style.installbtn} `}  >
        <img src="google-play-sm.png"  />
      </button>
      </div>
      <div className={style["content-wrapper"]} style={{display:(displayInstallPWA&&supportPWA)?"block":"none"}}>
        <div className={style["overlay"]}></div>
        <div className={style["content"]}>
          <img src="icon-192x192.png"  className={style.icon}/>
          <h3 className={style["description"]}>
            <span style={{color:"#76c836"}}>Download</span> Smart Rabbit 
          </h3>
          <div className={style.btn__wrapper} >
          <button type="button"   className={style.install} onClick={()=>installPWA.prompt()}><img src="app-store.png" /></button>
          <button type="button"  className={style.install} onClick={()=>installPWA.prompt()}><img src="play-store.png" /></button>
          </div>
          <div>
          <button type="button" className={style["not_now"]} onClick={()=>setDisplayInstallPWA(false)}>Not Now</button>
          </div>
        </div>
      </div>
      </>
    )
   

 
  
}


export default InstallPWA;