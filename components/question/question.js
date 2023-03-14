import styles from "./index.module.css";
import BarLoader from "react-spinners/BarLoader";
import { useState, useRef, useEffect } from "react";
import Record from "../record/record.";
import axios from "axios";
import RabbitLens from "../rabbitLens/rabbitLens";
import InputPrompt from "../inputPrompt/InputPrompt";
import InstallPWA from "../installPWA/InstallPWA";

async function fetchData(prompt, language, fetchUrl) {
  const response = await fetch(fetchUrl + "/api/generate", {
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
  });

  const data = await response.json();
  if (+response.status > 200) {
    throw (
      data.error || new Error(`Request failed with status ${response.status}`)
    );
  }

  return data;
}

async function saveToDatabase(prompt, answer, type, fetchUrl) {
  let response = await axios.post(
    fetchUrl + "/api/answer",
    { question: prompt, answer, type },
    { headers: { "Content-Type": "application/json" } }
  );
  console.log("saved to database");
  return response;
}

function saveHistory(prompt, answer, type) {
  const newAnswer = {
    answer: answer,
    type: type,
    question: prompt,
    date: new Date(),
  };

  if (localStorage.getItem("answers") == null) {
    localStorage.setItem("answers", JSON.stringify([newAnswer]));
  } else {
    let answers = JSON.parse(localStorage.getItem("answers"));
    
    localStorage.setItem("answers", JSON.stringify([...answers, newAnswer]));
  }
}

const  Question=({
  language,
  onChangeResult,
  rabbitAnimation,
  onChangeRabbitAnimation,
})=>{
  


  //fetching url
  let fetchUrl = Capacitor.isNativePlatform()
    ? "https://srm-nine.vercel.app"
    : "";

  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [generateData,setGeneratedData]=useState(null);
  const [displayInstallPWA,setDisplayInstallPWA]=useState(false);
  useEffect(() => {
    if (prompt !== ""&& rabbitAnimation!="question") onChangeRabbitAnimation("question");
    let id=setTimeout(()=>{
      if(prompt=="") onChangeRabbitAnimation("idle")
      
    },200)
    return ()=>{
      clearTimeout(id);
    }
  }, [prompt]);

  function onpromptChangeHandler(event) {
    const { value: prompt } = event.target;
    setPrompt(prompt);
  }
useEffect(()=>{
  if(!generateData)return;
  onChangeResult({ result: generateData.result, type: generateData.type });
  //don't save image in history
  if(generateData.type!="image"){
    saveHistory(prompt, generateData.result, generateData.type);
    
  }
  saveToDatabase(prompt, generateData.result, generateData.type, fetchUrl);
},[generateData])


useEffect(()=>{
  onChangeRabbitAnimation(loadingAnswer?"searching":"idle");
},[loadingAnswer])



 function onSubmit(event) {
    event.preventDefault();

      if(loadingAnswer||prompt=="")return;
      
      setLoadingAnswer(true);
      
      setDisplayInstallPWA(true);
      setTimeout(()=>{setDisplayInstallPWA(false);},5000)
        if(prompt=="generate image of the must cute,pretty and beautifull girl!"){
          setTimeout(()=>{
            setGeneratedData({type:"image",result:"person.jpg"});
            setLoadingAnswer(false);
            setPrompt("");

          },1000);
          return;
        }
      fetchData(prompt, language, fetchUrl)
      .then((data)=>{
          setGeneratedData(data);
          setLoadingAnswer(false);
          setPrompt("");
        
        })
      .catch( (error)=> {
        console.error(error);
        setLoadingAnswer(false);
        alert("something is wrong, please contact the Developer younessmakhchane@gmail.com");
      })
     
  }

  const onChangedisplayInstallPWA=(state)=>{
      setDisplayInstallPWA(state)
  }
  return (
    <>
      {  displayInstallPWA &&  <InstallPWA onChangedisplayInstallPWA={onChangedisplayInstallPWA}/>}
      <form onSubmit={onSubmit} className={styles.form}>
        <div>
          <div className={styles.inputwrapper}>
            <InputPrompt
              promptChangeHandler={onpromptChangeHandler}
              prompt={prompt}
            />
            {/* <Record setAnimalInput={setPrompt} animalInput={prompt}   language={language}
            /> */}

            {/* <RabbitLens
              setAnimalInput={setPrompt}
              language={language}
            /> */}
          </div>
          <i>{language.note}</i>
        </div>
        <label htmlFor="answer" style={{ visibility: "hidden" }}>
          submit your question
        </label>
        <div>

        <button
          id="answer"
          type="submit"
        
        >
          {loadingAnswer ? (
            <BarLoader color="#fff" size={15} speedMultiplier={0.5} />
          ) : (
            language.btn_title
          )}
        </button>
        <button
          id="answer"
          type="submit"
        
        >
          {loadingAnswer ? (
            <BarLoader color="#fff" size={15} speedMultiplier={0.5} />
          ) : (
            language.btn_title
          )}
        </button>
        </div>
      </form>
    </>
  );
}
export default Question;
