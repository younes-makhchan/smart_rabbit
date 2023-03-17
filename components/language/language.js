import Image from "next/image";
import { useContext, useEffect,useRef } from "react";
import LanguageContext from "../../context/language-context";
import styles from "./language.module.css";

const border={
  borderBottom: "0.5px solid rgb(195 195 195 / 58%)"
}
function Language() {
    const {languages,language,selectLanguageHandler}=useContext(LanguageContext);
  const img=useRef(null)
  useEffect(()=>{
    document.querySelector("#ul").style.display="none"
    img.current.style.transform="rotate(0deg)"
  },[language])
  function showMenu(source) {
    const hiddenOptions = source.target.parentElement.childNodes[1];
    if (
      hiddenOptions.style.display == "none" ||
      hiddenOptions.style.display == ""
    ) {
      source.target.childNodes[2].style.transform = "rotate(180deg)";
      hiddenOptions.style = "display:block;";
    } else {
      source.target.childNodes[2].style.transform = "rotate(0deg)";
      hiddenOptions.style = "display:none;";
    }
  }

  return (
    <>
      <div className={styles.lang_menu}>
          <div className={styles.selected_lang} onClick={showMenu}>
            <img  alt={"flag of "+language.slug}
              src={"/s_" + language.slug + ".png"}
              className={styles.flag} 
            />
            <span style={{display:"none"}}>{language.slug}</span>
            <Image alt="drop down language" src="/arrow_drop_down.svg" className={styles.dropdown} width="32" height="32" ref={img}/>
          </div>
          <ul className={styles.unselected_languages} id="ul">
            {Object.keys(languages).map((e, i,arr) => {
              if (e != language.slug)
                return (
                  <li
                    key={e}
                    onClick={() => selectLanguageHandler(e)}
                    style={(i!=arr.length-1) ?border:{}}
                  >
                    <img alt={"flag of "+e} src={"/s_" + e + ".png"} className={styles.flag} />
                    <span>{languages[e].lang}</span>
                  </li>
                );
            })}
          </ul>
      </div>
    </>
  );
}
export default Language;
