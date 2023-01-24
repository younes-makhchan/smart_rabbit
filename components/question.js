import styles from "../pages/index.module.css";
import { BarLoader } from "react-spinners";
import { useState, useRef, useEffect } from "react";
import Record  from "./record.";

function Question({
  language,
  setResult,
  setAlreadyPlayed,
  setAnswers,
  setRabbitMode,
}) {
  //for the spinner
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [SelectedImage, setSelectedImage] = useState();
  //for the result&answer
  //form input
  const [animalInput, setAnimalInput] = useState("");
  const input = useRef();
  const file = useRef();
  useEffect(() => {
    setResult(language.smart_rabbit_opening);
  }, [language]);
  useEffect(() => {
    if (animalInput !== "") setRabbitMode("question");
    else setRabbitMode("idle");
  }, [animalInput]);



  // function dataURItoBlob(dataURI) {
  //   // convert base64 to raw binary data held in a string
  //   // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  //   var byteString = atob(dataURI.split(",")[1]);

  //   // separate out the mime component
  //   var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  //   // write the bytes of the string to an ArrayBuffer
  //   var ab = new ArrayBuffer(byteString.length);

  //   // create a view into the buffer
  //   var ia = new Uint8Array(ab);

  //   // set the bytes of the buffer to the correct values
  //   for (var i = 0; i < byteString.length; i++) {
  //     ia[i] = byteString.charCodeAt(i);
  //   }

  //   // write the ArrayBuffer to a blob, and you're done
  //   var blob = new Blob([ab], { type: mimeString });
  //   return blob;
  // }

  // async function createImage({ target }) {
  //   let imageFile = target;

  //   if (!imageFile.files) {
  //     return null;
  //   }
  //   //our  image
  //   const file = imageFile.files[0];
  //   //display image to the client
  //   const fileReader = new FileReader();
  //   fileReader.onload = async function () {
  //     var blob = dataURItoBlob(fileReader.result);
  //     console.log(blob);
  //     const response = await axios.post(
  //       "https://francecentral.api.cognitive.microsoft.com/vision/v3.2/ocr?language=unk&detectOrientation=true&model-version=latest",
  //       blob,
  //       {
  //         headers: {
  //           "Ocp-Apim-Subscription-Key": "7cb8a95d91ae4eccaade90e96de1b12b",
  //           "Content-Type": "application/octet-stream",
  //         },
  //       }
  //     );
  //     const data=response.data;
  //     console.log(data)
  //   };
  //    fileReader.readAsDataURL(file);
  
  
  
  
  
  
  
  
  //   }

  async function onSubmit(event) {
    if (!event.detail || event.detail == 1) {
      //activate on first click only to avoid hiding again on multiple clicks
      // code here. // It will execute only once on multiple clicks
      event.preventDefault();
      if (animalInput == "") {
        alert(language.err);
        return;
      }
      try {
        const response = await fetch(
          "https://smart-rabbit.netlify.app/api/generate",
          {
            method: "POST",
            mode:"cors",
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
        // const index = data.result.lastIndexOf(".");

        // if (index > 0 &&  ) {

        //   data.result = data.result.slice(0, index + 1);
        // }
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
        alert("something is wrong, please contact the Developer younessmakhchane@gmail.com");
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
           <Record setAnimalInput={setAnimalInput} animalInput={animalInput} language={language}></Record>
            {/* <button
              type="button"
              className={styles.camera}
              onClick={() => file.current.click()}
            >
              <img src={"camera.svg"} />
              <input
                type="file"
                ref={file}
                onChange={createImage}
                style={{ display: "none" }}
              />
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
