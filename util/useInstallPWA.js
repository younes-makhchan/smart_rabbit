import { useEffect, useState } from "react"




const  useInstallPWA=()=>{
    const [installPWA,setInstallPWA]=useState(null);
    const [supportPWA,setSupportPWA]=useState(false);

    useEffect(()=>{
      const  handle=(e)=>{
        e.preventDefault();
          setInstallPWA(e);
          setSupportPWA(true);
      }
        window.addEventListener('beforeinstallprompt',handle)
  
        return ()=>window.removeEventListener('beforeinstallprompt',handle)
    },[])

    return {installPWA,supportPWA};
}




export default useInstallPWA;








