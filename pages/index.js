import Head from "next/head";
import { useEffect } from "react";
import styles from "./index.module.css";
import LoadingScreen from "../components/loadingScreen/loadingScreen";
// import dynamic from "next/dynamic";
import Content from "../components/content/content";
import {LanguageContextProvider} from "../context/language-context";

import Header from "../components/Header/Header";
import About from "../components/About/About";
import Shutdown from "../components/shutdown/Shutdown";

// import Language from "../components/language"
// import History from "../components/history";
// const  Language = dynamic(()=> import("../components/language/language"));
// const History = dynamic(()=> import("../components/history/history"));




export default function Home() {



  return (
    <div className="top">
      <Head>
       
        {/* <html lang={language.slug} />  */}
        <title>{"Smart Rabbit Answers Children Questions And Funny"}</title>
        <link rel="icon" href="/icon-192x192.png" />
        <meta name="author" content="Younes makhchan"/>
        <meta name="title" content="Smart Rabbit Answers Children Questions And Funny"/>
        <meta name="google-site-verification" content="cxDrYFXhDCAmz5Q8d5oDPB4InJrVVgCxYDnRUZlZJvk" />
      </Head>

      <main className={styles.main}>
       
       
        <LoadingScreen time={1000}/>
        <LanguageContextProvider>
       
    {/* <Header/> */}
      
        {/* <section className={styles.content_wrapper}>
        <Content   />
        </section> */}
       
       
        {/* <About/> */}
       <Shutdown/>

        </LanguageContextProvider>
        
      </main>
    </div>
  );
}
