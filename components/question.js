import styles from "../pages/index.module.css";
import { BarLoader } from "react-spinners";
import { useState, useEffect } from "react";
import axios from "axios"

function Question({ language,setResult,setAlreadyPlayed,setAnswers,setRabbitMode}) {
 
  //for mic
  const[listening,setListening]=useState(false);
  //for the spinner
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  //for the result&answer
  //form input
  const [animalInput, setAnimalInput] = useState("");
  const sdk = require("microsoft-cognitiveservices-speech-sdk");

  useEffect(() => {
    setResult(language.smart_rabbit_opening);
  }, [language]);

  async function record(source){
   

    
    if(!listening){
      
      let region,subscriptionKey;
      
      try{
           const response=await axios.get(`https://smart-rabbit.netlify.app/api/azuretoken`)
             region=response.data.region;
             subscriptionKey=response.data.subscriptionKey;
        
         }catch(error){
           console.error(error);
           alert(error.message);
         }
      setListening(true)

      var speechConfig = sdk.SpeechConfig.fromSubscription(
       subscriptionKey,
       region
      );

      speechConfig.speechRecognitionLanguage = language.mic;
      var audioConfig  = sdk.AudioConfig.fromDefaultMicrophoneInput();
      let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    
        //on the end  setSpeaking(false)
      recognizer.recognizeOnceAsync(
        function (result) {
          // startRecognizeOnceAsyncButton.disabled = false;
          // phraseDiv.innerHTML += result.text;
          setListening(false)
          console.log(result);
          setAnimalInput(result.text)
          
          recognizer.close();
          recognizer = undefined;
        },
        function (err) {
          setListening(false) 
          // startRecognizeOnceAsyncButton.disabled = false;
          // phraseDiv.innerHTML += err;
          console.log(err);
  
          recognizer.close();
          recognizer = undefined;
        });

    }
  }


 
  async function onSubmit(event) {
    event.preventDefault();
    if(animalInput==''){
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
      
      if(localStorage.getItem("answers")==null){
        localStorage.setItem("answers",JSON.stringify([{"answer":data.result,"question":animalInput,"date":new Date()}]))
      }else{
        let answers= JSON.parse(localStorage.getItem("answers"));
        setAnswers(answers.concat([{"answer":data.result,"question":animalInput,"date":new Date()}]));
        localStorage.setItem("answers",JSON.stringify(answers.concat([{"answer":data.result,"question":animalInput,"date":new Date()}])));
      };

      setAlreadyPlayed(false)
      setLoadingAnswer(false);
      setRabbitMode("idle")
      setResult(data.result);
      setAnimalInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
      
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          {/* <img src="/rabbit_header_orange-min.png" className={styles.label} /> */}
          <div className={styles.inputwrapper}>
            <img src="search.svg" className={styles.search_icon}/>
            <input
              type="text"
              name="animal"
              // placeholder={language["placeholder"]}
              placeholder=""
              value={animalInput}
              
              onChange={(e) => {setAnimalInput(e.target.value);if(e.target.value!=='')setRabbitMode("question");else setRabbitMode("idle")}}
            />
            <button
              type="button"
              className={styles.mic}
              onClick={record}
            >
              <img src={ listening?"mic_on.svg":"mic_off.svg"} />
            </button>
          </div>
          <i>{language.note}</i>
        </div>

        <button type="submit" onClick={() => {if(animalInput!=''){setLoadingAnswer(true);setRabbitMode("searching")}}}>
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
