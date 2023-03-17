import styles from "./index.module.css";
import BarLoader from "react-spinners/BarLoader";
import { useState, useRef, useEffect } from "react";
import Record from "../record/record.";
import RabbitLens from "../rabbitLens/rabbitLens";
import InputPrompt from "../inputPrompt/InputPrompt";
import InstallPWA from "../installPWA/InstallPWA";
import saveHistory from "../../util/saveHistory";
import saveToDatabase from "../../util/saveToDatabase";
import useFetch from "../../util/useFetch";
  //fetching url
let fetchUrl = Capacitor.isNativePlatform()
? "https://srm-nine.vercel.app"
: "";

let count=0;
const Question = ({
  language,
  onChangeResult,
  rabbitAnimation,
  onChangeRabbitAnimation,
}) => {
 

  const {data,loading,error,fetchData}=useFetch(null,{});
  const installPWA=useRef();
  const [question,setQuestion]=useState(null);

  useEffect(()=>{
    if(!loading)  fetchData(fetchUrl,{question, language} );
  },[question])
  useEffect(() => {
    if (!data) return;
    onChangeResult(data);
    //don't save image in history
    if (data.type != "image") {
      saveHistory(prompt, data.result, data.type);
    }
    saveToDatabase(
      prompt,
      data.result,
      data.type,
      fetchUrl
    ).then(() => console.log("saved to database"));

  }, [data]);

  useEffect(() => {
    onChangeRabbitAnimation(loading ? "searching" : "idle");
  }, [loading]);

  useEffect(()=>{
     if(error) alert("Not allowed!")
  },[error])


 async function onPromptSubmit(prompt) {
 
      setQuestion(prompt);
     
    
  }

  return (
    <>

      <QuestionForm onPromptSubmit={onPromptSubmit} language={language} loadingAnswer={loading} onChangeRabbitAnimation={onChangeRabbitAnimation} rabbitAnimation={rabbitAnimation}/>
    </>
  );
};

const QuestionForm = ({onPromptSubmit,onChangeRabbitAnimation,rabbitAnimation,language,loadingAnswer}) => {
  const  [question,setQuestion]=useState("");


  useEffect(()=>{
      if(question==""&& loadingAnswer==false){
        onChangeRabbitAnimation("idle");
      }else if(rabbitAnimation!="question"){
        onChangeRabbitAnimation("question");
      }
  },[question])

  const onChangeQuestion=({target})=>{
    const {value}=target;
    setQuestion(value);
  }

  function onSubmit(e){
    e.preventDefault();
    onPromptSubmit(question)
    setQuestion("");
  }


  
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div>
        <div className={styles.inputwrapper}>
          <InputPrompt
          name="question"
          onChange={onChangeQuestion}
          />
          <Record onChangeQuestion={onChangeQuestion} question={question}   language={language}
      />

          <RabbitLens
        onChangeQuestion={onChangeQuestion}
        language={language}
      />
        </div>
        <i>{language.note}</i>
      </div>
      <label htmlFor="answer" style={{ display:"none" }}>
        submit your question
      </label>
      <div>
        <button id="answer" type="submit">
          {loadingAnswer ? (
            <BarLoader color="#fff" size={15} speedMultiplier={0.5} />
          ) : (
            language.btn_title
          )}
        </button>
      </div>
    </form>
  );
};
export default Question;
