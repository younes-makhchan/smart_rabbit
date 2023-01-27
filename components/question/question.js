import styles from "./index.module.css";
import BarLoader  from "react-spinners/BarLoader";
import { useState, useRef, useEffect } from "react";
import Record from "../record/record.";
import axios from "axios";
import RabbitLens from "../rabbitLens/rabbitLens";

function Question({
  language,
  setResult,
  setAlreadyPlayed,
  setAnswers,
  setRabbitMode,
}) {
  //for the spinner
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  // const [selectedFile, setSelectedFile] = useState();
  // const [SelectedImage, setSelectedImage] = useState();

  //for the result&answer
  //form input
  const [animalInput, setAnimalInput] = useState("");
  const input = useRef();

  useEffect(() => {
    setResult(language.smart_rabbit_opening);
  }, [language]);
  useEffect(() => {
    if (animalInput !== "") setRabbitMode("question");
    else setRabbitMode("idle");
  }, [animalInput]);

  async function onSubmit(event) {
    if (!event.detail || event.detail == 1) {
      //activate on first click only to avoid hiding again on multiple clicks
      // code here. // It will execute only once on multiple clicks
      event.preventDefault();
      if (animalInput == "") {
        alert(language.err);
        return;
      }
      console.log("animal input: " + animalInput);
      try {
        let url = "";
        if (Capacitor.isNativePlatform()) {
          url = "https://srm-nine.vercel.app";
        }
        const response = await fetch(url + "/api/generate", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
          body: JSON.stringify({
            animal: animalInput,
            language: language.lang,
          }),
        });

        const data = await response.json();
        if (response.status !== 200) {
          throw (
            data.error ||
            new Error(`Request failed with status ${response.status}`)
          );
        }
        // const index = data.result.lastIndexOf(".");

        // if (index > 0 &&  ) {

        //   data.result = data.result.slice(0, index + 1);
        // }
        //answer succes

        if (localStorage.getItem("answers") == null) {
          localStorage.setItem(
            "answers",
            JSON.stringify([
              {  answer: data.result, question: animalInput, date: new Date() },
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
        try {
          let response = await axios.post(
            url + "/api/answer",
            { question: animalInput, answer: data.result },
            { headers: { "Content-Type": "application/json" } }
          );
        } catch (err) {
          console.log(err);
        }
        setAnimalInput("");
      } catch (error) {
        // Consider implementing your own error handling logic here
        console.error(error);
        setRabbitMode("idle");
        setLoadingAnswer(false);
        alert(
          "something is wrong, please contact the Developer younessmakhchane@gmail.com"
        );
      }
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className={styles.form}>
        <div>
          <div className={styles.inputwrapper}>
          
             <label htmlFor="question" style={{display:"flex"}}>  <img src="search.svg"alt="search icon" className={styles.search_icon} /></label>
               <input
              type="text"
              id="question"
              name="question"
              // placeholder={language["placeholder"]}
              placeholder=""
              ref={input}
              value={animalInput}
              onChange={(e) => {
                setAnimalInput(e.target.value);
              }}
            />
             
            <Record
              setAnimalInput={setAnimalInput}
              animalInput={animalInput}
              language={language}
            ></Record>

            <RabbitLens
              setAnimalInput={setAnimalInput}
              language={language}
            ></RabbitLens>
          </div>
          <i>{language.note}</i>
        </div>
        <label htmlFor="answer" style={{visibility:"hidden"}}>submit your question</label>
        <button
          id="answer"
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
