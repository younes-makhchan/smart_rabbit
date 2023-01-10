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
      note: "ملاحظة: استخدم الإنجليزية والفرنسية والعربية والدارجة (نسخة تجريبية)",
    },
    FR: {
      lang: "frensh",
      title: "Votre Lapin Intelligent",
      smart_rabbit_opening: "Salut, avez-vous une question pour moi?",
      placeholder: "Quelle est votre question ?",
      btn_title: "réponse",
      btn_title_change: "Le lapin réfléchit...",
      note: "Remarque: Utilisez l'anglais, le français, l'arabe, darija(beta)",
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
    Darija: {
      lang: "darija",
      smart_rabbit_opening: "salam, 3ndk chi soal?",
      title: "9niytk Dkiya",
      placeholder: "ach nahowa soal dylk?",
      btn_title: "jawbni",
      btn_title_change: "ana kankfr.....",
      note: "mola7da:khdm b darija(beta),anglais,francais,arabic",
    },
    CH: {
      lang: "chinese",
      smart_rabbit_opening: "嘿，你有什么问题要问我吗？",
      title: "你聪明的兔子",
      placeholder: "你的问题是什么？",
      btn_title: "回答",
      btn_title_change: "我在想....",
      note: "注意：使用中文",
    },
  };

  const [loaded, setLoaded] = useState(false);
  setTimeout(() => {
    if(loaded==false){
    setResult(language.smart_rabbit_opening);}
    setLoaded(true);
  },1000);
  const [language, setLanguage] = useState(languages["EN"]);
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState("");
  const [spin, setSpin] = useState(language.btn_title);
  function spinner(source) {
    if (language.lang == "arabic") {
      setSpin("...الأرنب يفكر");
    } else if (language.lang == "frensh") {
      setSpin("Le lapin réfléchit...");
    } else if(language.lang=="darija"){

      setSpin("ana kanfkr.....");
    }else if(language.lang=="CH"){
      setSpin("我在想....");
    }
    else {
      setSpin("Am thinking...");
    }
  }
  function changeLanguage(source) {
    //set the  language here manualy
    let button = source.target;
    button.parentElement.childNodes.forEach((e, i) => {
      // e.textContent.replace("(Beta)","");
      if (e.textContent == button.textContent) {
        e.style =
          " background: #76c836;border: #334425 solid 2px;border-radius: 2px;";
      } else {
        e.style = "";
      }
    });

    let str = button.textContent.replace("(Beta)","");

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
    }else if(str=="CH"){
      setSpin("回答");
      setResult("嘿，你有什么问题要问我吗？");
    }else{
      setSpin("jawab");
      setResult("salam,3ndk chi soal?");
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
    
      if (language.lang == "arabic") {
        setSpin("إجابة");
      } else if (language.lang == "frensh") {
        setSpin("réponse");
        if (index > 0) {
          data.result = data.result.slice(0, index + 1);
        }
      } else if (language.lang == "english") {
        setSpin("Answer");
        if (index > 0) {
          data.result = data.result.slice(0, index + 1);
        }

      }else if (language.lang == "darija") {
        if (index > 0) {
          data.result = data.result.slice(0, index + 1);
        }
        setSpin("jawbni");
      }else{
        
        if (index > 0) {
          data.result = data.result.slice(0, index + 1);
        }
        setSpin("回答");
        
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
        <div className={styles.rabbit}></div>
        <div className={styles.clouds}></div>
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
              <button onClick={changeLanguage} className={styles.CH}  >
                CH
              </button>
              <button onClick={changeLanguage} className={styles.DA}  >
                Darija(Beta)
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
                  delay:15,
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
