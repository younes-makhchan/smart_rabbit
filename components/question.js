import styles from "../pages/index.module.css";
import { BarLoader } from "react-spinners";
import { useState,useRef, useEffect } from "react";
import { Capacitor } from '@capacitor/core';
import axios from "axios";

function Question({
  language,
  setResult,
  setAlreadyPlayed,
  setAnswers,
  setRabbitMode,
}) {
  //for mic
  const [listening, setListening] = useState(false);
  //for the spinner
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [recognizer, setRecognizer] = useState({});

  //for the result&answer
  //form input
  const [animalInput, setAnimalInput] = useState("");
  const sdk = require("microsoft-cognitiveservices-speech-sdk");
  const input=useRef();
  useEffect(() => {
    setResult(language.smart_rabbit_opening);
  }, [language]);
  useEffect(() => {
    if (animalInput !== "") setRabbitMode("question");
    else setRabbitMode("idle");
  }, [animalInput]);
  let region, subscriptionKey;
  useEffect(() => {
    subscribe();
  }, []);
  async function subscribe() {
    let url;
    if(Capacitor.isNativePlatform()){
      url="srm-nine.vercel.app";
    }else{
      url=window.location.href.indexOf("netlify")>-1? "smart-rabbit.netlify.app":"srm-nine.vercel.app";
    }
    try {
      const response = await axios.get(
        `https://${url}/api/azuretoken`
      );
      region = response.data.region;
      subscriptionKey = response.data.subscriptionKey;

      var speechConfig = sdk.SpeechConfig.fromSubscription(
        subscriptionKey,
        region
      );
      speechConfig.speechRecognitionLanguage = language.mic;
      var audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
      setRecognizer(new sdk.SpeechRecognizer(speechConfig, audioConfig));
   
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }
  function append(text){
      // it's working very nice
    // eies nice it's working it's working
 
    


  }
  async function record(source) {
    if (!listening) {
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
      //     console.log(`RECOGNIZED: Text=${e.result.text},animalInput `+animalInput);
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
      //   setAnimalInput(input.current.value)
      //   setListening(false);
      //   recognizer.stopContinuousRecognitionAsync();
      // };
 

      recognizer.recognizing = (s, e) => {
        console.log(e.result)
        setAnimalInput(animalInput+e.result.text)
    
      };
      recognizer.recognized = (s, e) => {
        if (e.result.reason == sdk.ResultReason.RecognizedSpeech) {
          console.log(e.result)
          console.log(`RECOGNIZED: Text=${e.result.text},animalInput `+animalInput);
          setAnimalInput(animalInput+e.result.text)
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
  function camera(){
    
  }
  async function onSubmit(event) {
    if (!event.detail || event.detail == 1) {
      //activate on first click only to avoid hiding again on multiple clicks
      // code here. // It will execute only once on multiple clicks
      event.preventDefault();
      if (animalInput == "") {
        alert("invalid input");
        return;
      }
      try {
        const response = await fetch(
          "https://smart-rabbit.netlify.app/api/generate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Methods": "POST",
              "Access-Control-Allow-Headers": "Content-Type",
            },
            body: JSON.stringify({
              animal: animalInput,
              language: language.lang,
            }),
          }
        );

        const data = await response.json();
        if (response.status !== 200) {
          throw (
            data.error ||
            new Error(`Request failed with status ${response.status}`)
          );
        }
        const index = data.result.lastIndexOf(".");

        if (index > 0 && language.lang == "arabic") {
          data.result = data.result.slice(0, index + 1);
        }
        //answer succes

        if (localStorage.getItem("answers") == null) {
          localStorage.setItem(
            "answers",
            JSON.stringify([
              { answer: data.result, question: animalInput, date: new Date() },
            ])
          );
        } else {
          let answers = JSON.parse(localStorage.getItem("answers"));
          setAnswers(
            answers.concat([
              { answer: data.result, question: animalInput, date: new Date() },
            ])
          );
          localStorage.setItem(
            "answers",
            JSON.stringify(
              answers.concat([
                {
                  answer: data.result,
                  question: animalInput,
                  date: new Date(),
                },
              ])
            )
          );
        }

        setAlreadyPlayed(false);
        setLoadingAnswer(false);
        setRabbitMode("idle");
        setResult(data.result);
        setAnimalInput("");
      } catch (error) {
        // Consider implementing your own error handling logic here
        console.error(error);
        alert(error.message);
      }
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          {/* <img src="/rabbit_header_orange-min.png" className={styles.label} /> */}
          <div className={styles.inputwrapper}>
            <img src="search.svg" className={styles.search_icon} />
            <input
              type="text"
              name="animal"
              // placeholder={language["placeholder"]}
              placeholder=""
              ref={input}
              value={animalInput}
              onChange={(e) => {
                setAnimalInput(e.target.value);
              }}
            />
            <button type="button" className={styles.mic} onClick={record}>
              <img src={listening ? "stop_circle.svg" : "mic_off.svg"} />
            </button>
            {/* <button type="button" className={styles.camera} onClick={camera}>
              <img src={"camera.svg"} />
            </button> */}
          </div>
          <i>{language.note}</i>
        </div>

        <button
          type="submit"
          onClick={() => {
            if (animalInput != "") {
              setLoadingAnswer(true);
              setRabbitMode("searching");
            }
          }}
        >
          {loadingAnswer ? (
            <BarLoader color="#fff" size={15} speedMultiplier={0.5} />
          ) : (
            language.btn_title
          )}
        </button>
      </form>
    </>
  );
}
export default Question;
