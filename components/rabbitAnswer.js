import Typewriter from "typewriter-effect";
import { createElement, useEffect, useRef, useState } from "react";
import styles from "../pages/index.module.css";
import axios from "axios";
// import sdk from "microsoft-cognitiveservices-speech-sdk";



function RabbitAnswer({ answer, language,setAlreadyPlayed,alreadyPlayed,rabbiteMode }) {
  const sdk = require("microsoft-cognitiveservices-speech-sdk");
  const resultBox = useRef();
  let [speaking, setSpeaking] = useState(false);
  let [count,setCount]=useState(1);

  useEffect(() => {
    resultBox.current.style =
      "max-height:" +
      (window.innerHeight - resultBox.current.getBoundingClientRect().y - 100) +
      "px";
     
  }, []);
  useEffect(()=>{
   loadVoice(); 
  },[answer])
  
  async function loadVoice(){
    let region,subscriptionKey;
    let audio=document.querySelector("audio")
    let smml = `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
    <voice name="${language.voice}">
    <prosody rate="5%" pitch="20%">${answer}</prosody>
    </voice>
    </speak>`;
   
    try{
      let response=await axios.post("https://smart-rabbit.netlify.app/api/azuretoken");
      subscriptionKey=response.data.subscriptionKey;
      region=response.data.region;
    }catch(error){
      console.log(error)
    }
  var speechConfig;
  speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey,region);
  speechConfig.speechSynthesisVoiceName = "Microsoft Server Speech Text to Speech Voice (en-US, JennyNeural)";
  speechConfig.speechSynthesisOutputFormat = "Audio24Khz160KBitRateMonoMp3";

  let synthesizer = new sdk.SpeechSynthesizer(speechConfig, null);
  synthesizer.synthesisStarted=function (s,e){
   
  }
  synthesizer.SynthesisCanceled = function (s, e) {
    const cancellationDetails = sdk.CancellationDetails.fromResult(e.result);
    let str = "(cancel) Reason: " + sdk.CancellationReason[cancellationDetails.reason];
    if (cancellationDetails.reason === sdk.CancellationReason.Error) {
      str += ": " + e.result.errorDetails;
    }
    window.console.log(e);

  };

  synthesizer.synthesisCompleted = function (s, e) {
     
    console.log("synthesis")
    synthesizer.close();
    
    let url = window.URL.createObjectURL(new window.Blob([e.result.audioData]));
    // console.log(url);
    audio.src=url;
    // console.log(audio);
 audio.addEventListener("ended",(event)=>{console.log("ended");setSpeaking(false)})
    };
    synthesizer.speakSsmlAsync(smml);
  }
  
  function play(source) {
    let audio=document.querySelector("audio")
    if(!speaking){
            audio.play();
            setSpeaking(true);
        
    }else if(speaking){
      audio.currentTime=0;
      audio.pause();
      setSpeaking(false);
    }
 


  }

  return (
    <>
      <div>
        <div className={styles.wrapper}>
          <div className="launchAudio" onMouseEnter={()=>console.log("work")}></div>
          <button type="button" className={styles.speech} onClick={play}>
            <img
              src={speaking ? "/stop_sound.svg" : "/play_sound.svg"}
              width={"26px"}
            />
          </button>
          <div className={styles.result} ref={resultBox}>
            <Typewriter
              options={{
                strings: [answer],
                autoStart: true,
                delay: 15,
                pauseFor: 3600000,
              }}
            />
          </div>
          <img  className={styles.idle} src="idle.gif"  style={{display:rabbiteMode=="idle"?"block":"none"}}/>
          <img  className={styles.question} src="question.gif"  style={{display:rabbiteMode=="question"?"block":"none"}} />
          <img className={styles.searching} src="searching.gif"   style={{display:rabbiteMode=="searching"?"block":"none"}}/>
          
     
          
        </div>
      </div>
      <div>
        <audio src="" style={{"display":"none"}}></audio>
      </div>
    </>
  );
}
export default RabbitAnswer;
