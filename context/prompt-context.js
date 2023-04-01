import { Capacitor } from "@capacitor/core";
import React, { createContext, useContext, useEffect, useState } from "react";
import saveHistory from "../util/saveHistory";
import saveToDatabase from "../util/saveToDatabase";
import useFetch from "../util/useFetch";
import LanguageContext from "./language-context";

export const  PromptContext=createContext({
    result:null,
    onChangeResult:()=>{},
    onGenerate:()=>{},
    onChangeQuestion:()=>{},
    loading:false
});

const fetchUrl = Capacitor.isNativePlatform()
? "https://srm-nine.vercel.app"
: "";


const PromptContextProvider=({children})=>{
    const {data,loading,error,fetchData}=useFetch(null,{prompt:null,language:null});

    const [question,setQuestion]=useState(null);
    const [result,setResult]=useState({result:null,type:"text"});
    let [rabbitAnimation,setRabbitAnimation]=useState("idle")

    function onGenerate(language){
             fetchData(fetchUrl,{question, language} ) ;

    }
    
    function onChangeQuestion(value){
        if(value==""&& loading==false){
            setRabbitAnimation("idle");
          }else if(rabbitAnimation!="question"){
            setRabbitAnimation("question");
          }
        setQuestion(value);
    }
    function rabbitAnimationHandler(state){
        setRabbitAnimation(state);
    }
   

      useEffect(() => {
        if (!data) return;
        setResult(data);
        //don't save image in history
        if (data.type != "image") {
          saveHistory(data.question, data.result, data.type);
        }
        saveToDatabase(
          data.question,
          data.result,
          data.type,
          fetchUrl
        ).then(() =>{
          console.log("done ")
        }).catch(()=>{
          console.log("problem")
        });
      }, [data]);
    
      useEffect(() => {
        setRabbitAnimation(loading ? "searching" : "idle");
      }, [loading]);
    
      useEffect(()=>{
    
         if(error){ alert("Try different input!");console.log(error);setRabbitAnimation("idle")}
      },[error])



    return (
            <PromptContext.Provider value={{result,onGenerate,loading,question,onChangeQuestion,rabbitAnimationHandler,rabbitAnimation}}>
                {children}
            </PromptContext.Provider>
    )
}

export default PromptContextProvider;
