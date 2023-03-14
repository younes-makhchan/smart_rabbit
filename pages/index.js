import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import LoadingScreen from "../components/loadingScreen/loadingScreen";
import dynamic from "next/dynamic";
import Content from "../components/content/content";
import {LanguageContextProvider} from "../context/language-context";
// import Language from "../components/language"
// import History from "../components/history";
const  Language = dynamic(()=> import("../components/language/language"));
const History = dynamic(()=> import("../components/history/history"));




export default function Home() {


  return (
    <div className="top">
      <Head>
        {/* <html lang={language.slug} />  */}
        <title>{"Smart Rabbit"}</title>
        <link rel="icon" href="/speaking2.gif" />
        <meta name="author" content="Younes makhchan"/>
        <meta name="google-site-verification" content="cxDrYFXhDCAmz5Q8d5oDPB4InJrVVgCxYDnRUZlZJvk" />
      </Head>

      <main className={styles.main}>
        <LoadingScreen time={1000}/>
        {/* <div style={{zIndex:-1,position:"fixed",width:"100vw",height:"100vh"}}>
          <Image  alt="background image" src="/2560x1440.png" fill style={{objectFit:"cover"}} priority ></Image>
        </div> */}

        <LanguageContextProvider>
        <div className={styles.section}>
        <History  />
        <Language   />
        </div>
        <div className={styles.content_wrapper}>
        <Content   />
        </div>

        </LanguageContextProvider>
        
      </main>
    </div>
  );
}
