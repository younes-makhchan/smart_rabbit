import axios from "axios";
import { useEffect, useState } from "react"


const useFetch=(url,{prompt,language})=>{
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
              description: prompt,
              language: language.lang,
            }),
          }).then(response=>response.json)
          .then(data=>setData(data))
          .catch(err=>setError(err))
          .finally(()=>setLoading(false))
         
    },[]);

  async function fetchData(url,{question,language}) {
      try{
        setLoading(true);
      const resp=await  axios.post(url + "/api/generate",{description:question,language:language},{
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
     })
     setData(resp.data);
      }catch(err){
        console.log("catching Error");
        setError(err.message)
      }finally{
        console.log("false loading");
        setLoading(false)

      }
   
       
   }

    return {data,loading,error,fetchData}
}
export default useFetch;