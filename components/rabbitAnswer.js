import Typewriter from "typewriter-effect";
import { createElement, useEffect, useRef, useState } from "react";
import styles from "../pages/index.module.css";
// import sdk from "microsoft-cognitiveservices-speech-sdk";

function RabbitAnswer({ answer, language,setAlreadyPlayed,alreadyPlayed }) {
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
    console.log(count)
    setCount(count+1);
  },[answer])
  
  function loadVoice(){
    let audio=document.querySelector("audio")
    let smml = `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
    <voice name="${language.voice}">
    <prosody rate="15%" pitch="44%">${answer}</prosody>
    </voice>
    </speak>`;

  var speechConfig;
  speechConfig = sdk.SpeechConfig.fromSubscription("7b1ff9228c8a40a389ff89dd1eef41aa", "francecentral");
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
    console.log(url);
    audio.src=url;
    console.log(audio);
 audio.addEventListener("ended",(event)=>{console.log("ended");setSpeaking(false)})
    };
    synthesizer.speakSsmlAsync(smml);
  }

  function play(source) {
    let audio=document.querySelector("audio")
    if(!speaking){
      // if(!alreadyPlayed){
      //   console.log("played first time")

/*       
      let smml = `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
                <voice name="${language.voice}">
                <prosody rate="15%" pitch="44%">${answer}</prosody>
                </voice>
                </speak>`;
  
              var speechConfig;
              speechConfig = sdk.SpeechConfig.fromSubscription("7b1ff9228c8a40a389ff89dd1eef41aa", "francecentral");
              speechConfig.speechSynthesisVoiceName = "Microsoft Server Speech Text to Speech Voice (en-US, JennyNeural)";
              speechConfig.speechSynthesisOutputFormat = "Audio24Khz160KBitRateMonoMp3";
      
              let synthesizer = new sdk.SpeechSynthesizer(speechConfig, null);
              synthesizer.synthesisStarted=function (s,e){
                setSpeaking(true);
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
                console.log(url);
                audio.src=url;
                console.log(audio);
                  audio.play();
                  audio.addEventListener("ended",(event)=>{setSpeaking(false)})
                  setAlreadyPlayed(true);
                };
                synthesizer.speakSsmlAsync(smml); */
            // }else if(alreadyPlayed){

            //   console.log("already played");
            //   audio.play();
            //   setSpeaking(true);
            // }
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
          <img
            className={styles.img}
            src="/rabbit_answer_orange_green-min.png"
          ></img>
          
        </div>
      </div>
      <div>
        <audio src="" style={{"display":"none"}}></audio>
      </div>
    </>
  );
}
export default RabbitAnswer;
