import styles from "./index.module.css";
import {  useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Capacitor } from "@capacitor/core/"
import Image from "next/image"

import axios from "axios";
function Voice ({paragraph,voice,rabbitAnimationHandler}){
    let sdk=require("microsoft-cognitiveservices-speech-sdk")
    let [speaking, setSpeaking] = useState(false);
    const [synthesizer, setSynthesizer] = useState(undefined);
    const [laoding,setLaoding]=useState(true)
    useEffect(()=>{
            subscribe();
    },[])
    useEffect(()=>{
        setLaoding(true);
       if(synthesizer){
        // console.log(synthesizer);
        
            loadVoice();
    }
      },[paragraph,synthesizer])

    async function subscribe() {
        let url="";
        let audio=document.querySelector("audio");
        // console.log(audio)
        
        if (Capacitor.isNativePlatform()) {
          url = "https://srm-nine.vercel.app";
        } 
        try {
          const response = await axios.get(`${url}/api/azuretoken`);
          let region = response.data.region;
          let subscriptionKey = response.data.subscriptionKey;
    
          var speechConfig = sdk.SpeechConfig.fromSubscription(
            subscriptionKey,
            region
          );
          speechConfig.speechSynthesisVoiceName = "Microsoft Server Speech Text to Speech Voice (en-US, JennyNeural)";
          speechConfig.speechSynthesisOutputFormat = "Audio24Khz160KBitRateMonoMp3";
          
          let synthesis=new sdk.SpeechSynthesizer(speechConfig, null);
          synthesis.synthesisStarted=function (s,e){
        }

        synthesis.SynthesisCanceled = function (s, e) {
          const cancellationDetails = sdk.CancellationDetails.fromResult(e.result);
          let str = "(cancel) Reason: " + sdk.CancellationReason[cancellationDetails.reason];
          if (cancellationDetails.reason === sdk.CancellationReason.Error) {
            str += ": " + e.result.errorDetails;
          }
          window.console.log(e);
      
        };
      
        synthesis.synthesisCompleted = function (s, e) {
           
          console.log("synthesis completed")
          let url = window.URL.createObjectURL(new window.Blob([e.result.audioData]));
          // console.log(url);
          audio.src=url;
          //   audio.play();
          // console.log("new audio")
          // console.log(audio)
          setLaoding(false);
          audio.addEventListener("ended",(event)=>{
            console.log("ended");setSpeaking(false); 

          });
          audio.addEventListener("timeupdate",(event)=>{
            console.log("audio playing")
            console.log(audio.duration,audio.currentTime)
            if(audio.currentTime>audio.duration-1){
              console.log('cut');
              rabbitAnimationHandler("idle");
            }
          });
          
        
          synthesizer.close();
    
          // console.log(audio);
         
      
      };
          setSynthesizer(synthesis);
         
         
        
        } catch (error) {
          console.error(error);
          alert(error.message);
        }
      }
   
      async function loadVoice(){
        // console.log("the paragraph :"+paragraph);
        let smml = `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
        <voice name="${voice}">
        <prosody rate="15%" pitch="30%">${paragraph}</prosody>
        </voice>
        </speak>`;
        // console.log(smml)

        synthesizer.speakSsmlAsync(smml);
        
      }
      
      async function play(source) {
        if(!laoding){
            let audio=document.querySelector("audio")
            if(!speaking){
                
                    audio.play();
        
                  rabbitAnimationHandler("speaking")
                  setSpeaking(true);
            }else if(speaking){
              rabbitAnimationHandler("idle")
              audio.currentTime=0;
              audio.pause();
              setSpeaking(false);
            }

        }
     
    
    
      }



    return(
       <>
        <button type="button" aria-label="Smart rabbit Speak" className={styles.speech} onClick={play}>
        <ScaleLoader color="#76c836" loading={laoding} width={2}  height={14} />  
        <Image alt="click for smart rabbit speak "
            style={{display:laoding ?"none":"block"}}
          src={speaking ? "/stop_sound.svg" : "/play_sound.svg"}
          width='24' height='24'
        />
      </button>
       </> 
    )
    
}
export default Voice;