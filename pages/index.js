import Head from "next/head";
import { useState,useRef, useEffect } from "react";
import styles from "./index.module.css";
import Language from "../components/language"
import LoadingScreen from "../components/loadingScreen";
import Content from "../components/content";



const languages = {
  ar: {
    slug:"ar",
    lang: "arabic",
    smart_rabbit_opening: "مرحبًا ، هل لديك سؤال لي؟",
    title: "ارنبك ذكي",
    placeholder: "ما هو سؤالك؟",
    btn_title: "إجابة",
    btn_title_change: "...الأرنب يفكر",
    note: "",
  },
  fr: {
    slug:"fr",
    lang: "frensh",
    title: "Votre Lapin Intelligent",
    smart_rabbit_opening: "Salut, avez-vous une question pour moi?",
    placeholder: "Quelle est votre question ?",
    btn_title: "Réponse",
    btn_title_change: "Le lapin réfléchit...",
    note: "",
  },
  en: {
    slug:"en",
    lang: "english",
    smart_rabbit_opening: "Hey, do you have a question for me?",
    title: "Your Smart Rabbit",
    placeholder: "what's your question?",
    btn_title: "Answer",
    btn_title_change: "Am thinking...",
    note: "",
  },
  da: {
    slug:"da",
    lang: "darija",
    smart_rabbit_opening: "salam, 3ndk chi soal?",
    title: "9niytk Dkiya",
    placeholder: "ach nahowa soal dylk?",
    btn_title: "Jawbni",
    btn_title_change: "ana kankfr.....",
    note: "mola7da:darija ba9i khdam 3liha",
  },
  ch: {
    slug:"ch",
    lang: "chinese",
    smart_rabbit_opening: "嘿，你有什么问题要问我吗？",
    title: "你聪明的兔子",
    placeholder: "你的问题是什么？",
    btn_title: "回答",
    btn_title_change: "我在想....",
    note: "注意：使用中文",
  },
};
export default function Home() {


  
  //better to user Context
  const [language, setLanguage] = useState(languages["en"]);
  
  return (
    <div className="top">
      <Head>
        <title>{language.title}</title>
        <link rel="icon" href="/rabbit_header_orange-min.png" />
      </Head>

      <main className={styles.main}>
        <LoadingScreen time={1000}/>
        <Language languages={languages} selected_language={language} setLanguage={setLanguage} />
        <Content language={language}/>
        
      </main>
    </div>
  );
}
