import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import LoadingScreen from "../components/loadingScreen/loadingScreen";
import dynamic from "next/dynamic";
import Content from "../components/content/content";
// import Language from "../components/language"
// import History from "../components/history";
const  Language = dynamic(()=> import("../components/language/language"));
const History = dynamic(()=> import("../components/history/history"));


const languages = {
  ar: {
    slug:"ar",
    lang: "arabic",
    smart_rabbit_opening: "مرحبًا ، هل لديك سؤال لي؟",
    title: "الأرنب الذكي",
    placeholder: "ما هو سؤالك؟",
    btn_title: "إجابة",
    btn_title_change: "...الأرنب يفكر",
    note: "",
    mic:"ar-SA",
    voice:"ar-SA-ZariyahNeural",
    err:"إدخال فارغ",
    history:"التاريخ",
    line_selection:"حدد الجمل:",
  },
  fr: {
    slug:"fr",
    lang: "frensh",
    title: "Le lapin Intelligent",
    smart_rabbit_opening: "Salut, avez-vous une question pour moi?",
    placeholder: "Quelle est votre question ?",
    btn_title: "Réponse",
    btn_title_change: "Le lapin réfléchit...",
    note: "",
    mic:"fr-FR",
    voice:"fr-FR-BrigitteNeural",
    err:"Entrée vide",
    history:"Historique",
    line_selection:"Sélectionnez les phrases:",
  },
  en: {
    slug:"en",
    lang: "english",
    smart_rabbit_opening: "Hey, do you have a question for me?",
    title: "The Smart Rabbit",
    placeholder: "what's your question?",
    btn_title: "Answer",
    btn_title_change: "Am thinking...",
    note: "",
    mic:"en-US",
    voice:"en-US-JaneNeural",
    err:"Empty input ",
    history:"History",
    line_selection:"Select sentences:"
  },
  da: {
    slug:"da",
    lang: "darija",
    smart_rabbit_opening: "salam, 3ndk chi soal?",
    title: "9niya Dkiya",
    placeholder: "ach nahowa soal dylk?",
    btn_title: "Jawbni",
    btn_title_change: "ana kankfr.....",
    note: "mola7da:darija ba9i khdam 3liha",
    mic:"ar-MA",
    voice:"ar-MA-MounaNeural",
    err:"ma3mrtich blast soal",
    history:"tarikh",
    line_selection:"khrar ljomal:",
  },
  ch: {
    slug:"ch",
    lang: "chinese",
    smart_rabbit_opening: "嘿，你有什么问题要问我吗？",
    title: "聪明的兔子",
    placeholder: "你的问题是什么？",
    btn_title: "回答",
    btn_title_change: "我在想....",
    note: "注意 ：使用中文",
    mic:"zh-CN",
    voice:"zh-CN-XiaoxiaoNeural",
    history:"历史",
    line_selection:"选择句子："
  },
  kr:{
    slug:"kr",
    lang: "korean",
    smart_rabbit_opening: "이봐, 나에게 질문이 있니?",
    title: "똑똑한 토끼",
    placeholder: "당신의 질문은 무엇입니까?",
    btn_title: "대답",
    btn_title_change: "생각하고 있습니다 ...",
    note: "사용하다 : 한국어",
    mic:"ko-KR",
    voice:"ko-KR-SunHiNeural",
    err:"빈 입력",
    history:"기록",
    line_selection:"문장 선택:"
  },
  jp: {
    slug:"jp",
    lang: "japanese",
    smart_rabbit_opening: "ねえ、私に質問がありますか?",
    title: "スマートラビット",
    placeholder: "あなたの質問は何ですか?",
    btn_title: "答える",
    btn_title_change: "考えています...",
    note: "用途 : 日本語",
    mic:"ja-JP",
    voice:"ja-JP-NanamiNeural",
    err:"空の入力",
    history:"履歴",
    line_selection:"文を選択:"

  }
};




export default function Home() {


  
  //better to user Context
  const [language, setLanguage] = useState(languages["en"]);
  //history
  const [answers,setAnswers]=useState([]);

  return (
    <div className="top">
      <Head>
        {/* <html lang={language.slug} />  */}
        <title>{language.title}</title>
        <link rel="icon" href="/speaking2.gif" />
        <meta name="author" content="Younes makhchan"/>
        <meta name="google-site-verification" content="cxDrYFXhDCAmz5Q8d5oDPB4InJrVVgCxYDnRUZlZJvk" />
      </Head>

      <main className={styles.main}>
        <LoadingScreen time={1000}/>
        {/* <div style={{zIndex:-1,position:"fixed",width:"100vw",height:"100vh"}}>
          <Image  alt="background image" src="/2560x1440.png" fill style={{objectFit:"cover"}} priority ></Image>
        </div> */}

        <div className={styles.section}>

        <History answers={answers} setAnswers={setAnswers} language={language}></History>
        <Language languages={languages} selected_language={language} setLanguage={setLanguage}  />
        </div>
        <div className={styles.content_wrapper}>
        <Content language={language} setAnswers={setAnswers} />
        </div>
        
      </main>
    </div>
  );
}
