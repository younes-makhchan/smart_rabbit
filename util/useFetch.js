import { useEffect, useState } from "react"


const useFetch=(url,options)=>{
    const [loading,setLoading]=useState(false);
    const [data,setData]=useState(null);
    const [error,setError]=useState(null);







    
    useEffect(()=>{
      if(!url)return;
        setLoading(true);
         fetch(url + "/api/generate", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Methods": "POST",
              "Access-Control-Allow-Headers": "Content-Type",
            },
            body: JSON.stringify({
              description: options.prompt,
              language: options.language.lang,
            }),
          }).then(response=>response.json)
          .then(data=>setData(data))
          .catch(err=>setError(err))
          .finally(()=>setLoading(true))
        
       
        
    },[]);

    return {data,loading,error}
}
export default useFetch;