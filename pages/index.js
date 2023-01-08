import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Typewriter from 'typewriter-effect';

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState("");
  const [spin, setSpin] = useState("Answer Me");


  function spinner(source){
    setSpin("Reading Ur BoyFriend mind...");
  }
  async function onSubmit(event) {
   

    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      setSpin("Answer Me");
      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
  

  return (
    <div className="top">
      <Head>
        <title>Ask Your Boyfriend</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Ask me baby </h3>
        
        <form onSubmit={onSubmit}>
          <label className={styles.label}>
          
          <input
            type="text"
            name="animal"
            placeholder="What is your Question?"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          </label>
          <button type="submit"  onClick={spinner}>{spin}</button>
        </form>
        <div>
    <div className={styles.wrapper}>

          <img className={styles.img} src="/younes.jpg"></img>
        <div className={styles.result}>
          <Typewriter
            options={{
              strings: [result],
              autoStart: true,
              pauseFor:3600000,
              
            }}
        />
        
          </div>
    </div>
        </div>
      </main>
    </div>
  );
}
