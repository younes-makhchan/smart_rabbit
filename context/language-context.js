
import React, { useContext, useState } from 'react';

const LanguageContext=React.createContext({
    language:{},
    languages:{
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
          smart_rabbit_opening: "Hey, What i can help you with ?",
          title: "Smart Rabbit",
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
      },
      selectLanguageHandler:(langauge)=>{}
})



export const LanguageContextProvider=(props)=>{
    
    const {languages}=useContext(LanguageContext)
  const [language,setLanguage]=useState(languages["en"]);

    function selectLanguageHandler(language){
            setLanguage(languages[language]);
    }
    return(
        <LanguageContext.Provider  value={{language,selectLanguageHandler,languages}} >
            {props.children}
        </LanguageContext.Provider>
    )
}

export default LanguageContext;