import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Typewriter from "typewriter-effect";

export default function Home() {
  const languages = {
    AR: {
      lang: "arabic",
      smart_rabbit_opening: "مرحبًا ، هل لديك سؤال لي؟",
      title: "ارنبك ذكي",
      placeholder: "ما هو سؤالك؟",
      btn_title: "إجابة",
      btn_title_change: "...الأرنب يفكر",
      note: "تنويه : استخدم العربية،الانجليزية او الفرنسية",
    },
    FR: {
      lang: "frensh",
      title: "Votre Lapin Intelligent",
      smart_rabbit_opening: "Salut, avez-vous une question pour moi?",
      placeholder: "Quelle est votre question ?",
      btn_title: "réponse",
      btn_title_change: "Le lapin réfléchit...",
      note: "Remarque: Utilisez l'anglais, le français ou l'arabe",
    },
    EN: {
      lang: "english",
      smart_rabbit_opening: "Hey, do you have a question for me?",
      title: "Your Smart Rabbit",
      placeholder: "what's your question?",
      btn_title: "Answer",
      btn_title_change: "Am thinking...",
      note: "Note: Use English, French or Arabic",
    },
  };

  const [loaded, setLoaded] = useState(false);
  setTimeout(() => {
    console.log("loaded");
    setLoaded(true);
  }, 750);
  const [language, setLanguage] = useState(languages["EN"]);
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState(language.smart_rabbit_opening);
  const [spin, setSpin] = useState(language.btn_title);
  function spinner(source) {
    if (language.lang == "arabic") {
      setSpin("...الأرنب يفكر");
    } else if (language.lang == "frensh") {
      setSpin("Le lapin réfléchit...");
    } else {
      setSpin("Am thinking...");
    }
  }
  function changeLanguage(source) {
    //set the  language here manualy
    let button = source.target;
    button.parentElement.childNodes.forEach((e, i) => {
      if (e.textContent == button.textContent) {
        e.style =
          " background: #76c836;border: #334425 solid 2px;border-radius: 2px;";
      } else {
        e.style = "";
      }
    });

    let str = button.textContent;
    let str1 = language.smart_rabbit_opening;

    setAnimalInput("");
    setLanguage(languages[str]);
    if (str == "AR") {
      setSpin("إجابة");
      setResult("مرحبًا ، هل لديك سؤال لي؟");
    } else if (str == "FR") {
      setSpin("réponse");
      setResult("Salut, avez-vous une question pour moi?");
    } else if (str == "EN") {
      setSpin("Answer");
      setResult("Hey, do you have a question for me?");
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput, language: language.lang }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      const index = data.result.lastIndexOf(".");
      if (index > 0) {
        data.result = data.result.slice(0, index + 1);
      }
      if (language.lang == "arabic") {
        setSpin("إجابة");
      } else if (language.lang == "frensh") {
        setSpin("réponse");
      } else if (language.lang == "english") {
        setSpin("Answer");
      }

      setResult(data.result);
      // setAnimalInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="top">
      <Head>
        <title>{language.title}</title>
        <link rel="icon" href="/rabbit_header_orange-min.png" />
      </Head>

      <main className={styles.main}>
        <div className={loaded ? styles.remove : styles.loader_wrapper}>
          <div className={styles.loader} id="loader"></div>
        </div>
        <div className={styles.languages_wrapper}>
          <div className={styles.languages}>
            <p>
              Language:
              <button onClick={changeLanguage} className={styles.AR}>
                AR
              </button>
              <button onClick={changeLanguage} className={styles.FR}>
                FR
              </button>
              <button onClick={changeLanguage} className={styles.EN}style={{background: "#76c836",border:"#334425 solid 2px",borderRadius: "2px"}}  >
                EN
              </button>
            </p>
          </div>
        </div>
        <div>
          <h3>
            {language.title}
            <img src="carrot-min.png" className={styles.img}></img>
          </h3>
        </div>

        <form onSubmit={onSubmit}>
          <div>
            <img src="/rabbit_header_orange-min.png" className={styles.label} />
            <input
              type="text"
              name="animal"
              placeholder={language["placeholder"]}
              value={animalInput}
              onChange={(e) => setAnimalInput(e.target.value)}
            />
            <i>{language.note}</i>
          </div>

          <button type="submit" onClick={spinner}>
            {spin}
          </button>
        </form>
        <div>
          <div className={styles.wrapper}>
            <div className={styles.result}>
              <Typewriter
                options={{
                  strings: [result],
                  autoStart: true,
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
      </main>
    </div>
  );
}
