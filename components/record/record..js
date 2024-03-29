import styles from "./index.module.css";
import {  useEffect, useState,useRef } from "react";
import { Capacitor } from "@capacitor/core";
import axios from "axios";
import Image from "next/image"

function Record ({onChangeQuestion,question,language}){
    let sdk=require("microsoft-cognitiveservices-speech-sdk")
    const [listening, setListening] = useState(false);
    const [recognizer, setRecognizer] = useState({});

    let region, subscriptionKey;
    let img=useRef();
    useEffect(()=>{
        img.current.style.opacity=0.3;
        subscribe();
},[language])

    async function subscribe() {
        let url;
        if (Capacitor.isNativePlatform()) {
          url = "https://srm-nine.vercel.app";
        } else {
          url =""
        }
        try {
          const response = await axios.get(`${url}/api/azuretoken`);
          region = response.data.region;
          subscriptionKey = response.data.subscriptionKey;
    
          var speechConfig = sdk.SpeechConfig.fromSubscription(
            subscriptionKey,
            region
          );
          speechConfig.speechRecognitionLanguage = language.mic;
          var audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
          setRecognizer(new sdk.SpeechRecognizer(speechConfig, audioConfig));
          img.current.style.opacity=1;

        } catch (error) {
          console.error(error);
          alert(error.message);
        }
      }


   
   
      async function record(source) {
        if (!listening&& img.current.style.opacity==1) {
            //we need input=useRef() for this one 
          //no pause just keep talkin
          // let a=input.current.value
          // recognizer.recognizing = (s, e) => {
          //   console.log(e.result)
          //   input.current.value=a+e.result.text;
          //   setRabbitMode("question")
          // };
          // recognizer.recognized = (s, e) => {
          //   if (e.result.reason == sdk.ResultReason.RecognizedSpeech) {
          //     console.log(e.result)
          //     console.log(`RECOGNIZED: Text=${e.result.text},question `+question);
          //     // input.current.value+=e.result.text;
          //     a=input.current.value;
    
          //     // setListening(false);
          //     // recognizer.stopContinuousRecognitionAsync();
          //   }
          // };
    
          // recognizer.canceled = (s, e) => {
          //   console.log(`CANCELED: Reason=${e.reason}`);
    
          //   if (e.reason == sdk.CancellationReason.Error) {
          //     console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
          //     console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
          //     console.log(
          //       "CANCELED: Did you set the speech resource key and region values?"
          //     );
          //   }
    
          //   recognizer.stopContinuousRecognitionAsync();
          // };
    
          // recognizer.sessionStopped = (s, e) => {
          //   console.log("\n    Session stopped event.");
          //   onChangeQuestion(input.current.value)
          //   setListening(false);
          //   recognizer.stopContinuousRecognitionAsync();
          // };
    
          recognizer.recognizing = (s, e) => {
            console.log(e.result);
            onChangeQuestion(question + e.result.text);
          };
          recognizer.recognized = (s, e) => {
            if (e.result.reason == sdk.ResultReason.RecognizedSpeech) {
              console.log(e.result);
              console.log(
                `RECOGNIZED: Text=${e.result.text},question ` + question
              );
              onChangeQuestion(question + e.result.text);
              setListening(false);
              recognizer.stopContinuousRecognitionAsync();
            }
          };
    
          recognizer.canceled = (s, e) => {
            console.log(`CANCELED: Reason=${e.reason}`);
    
            if (e.reason == sdk.CancellationReason.Error) {
              console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
              console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
              console.log(
                "CANCELED: Did you set the speech resource key and region values?"
              );
            }
    
            recognizer.stopContinuousRecognitionAsync();
          };
    
          recognizer.sessionStopped = (s, e) => {
            console.log("\n    Session stopped event.");
            setListening(false);
            recognizer.stopContinuousRecognitionAsync();
          };
    
          console.log("started");
          recognizer.startContinuousRecognitionAsync();
          setListening(true);
        } else if (listening) {
          console.log("stop");
          recognizer.stopContinuousRecognitionAsync();
        }
      }
      




    return(
       <>
       <button type="button" id="mic" className={styles.mic} onClick={record}>
              <Image ref={img} alt=" start recording" src={listening ? "stop_circle.svg" : "mic_off.svg"} width="24" height="24" />
        </button>
       </> 
    )
    
}
export default Record;