import styles from "../pages/index.module.css";

const border={
  borderBottom: "0.5px solid rgb(195 195 195 / 58%)"
}
function Language({ languages, selected_language, setLanguage }) {
  
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
      <div className={styles.languages_wrapper}>
        <div className={styles.lang_menu}>
          <div className={styles.selected_lang} onClick={showMenu}>
            <img
              src={"/s_" + selected_language.slug + ".png"}
              className={styles.flag}
            ></img>
            <span>{selected_language.slug}</span>
            <img src="/arrow dropdown.png" className={styles.dropdown}></img>
          </div>

          <ul className={styles.unselected_languages}>
            {Object.keys(languages).map((e, i,arr) => {
              if (e != selected_language.slug)
                return (
                  <li
                    key={e}
                    onClick={() => setLanguage(languages[e])}
                    style={(i!=arr.length-1) ?border:{}}
                  >
                    <img src={"s_" + e + ".png"} className={styles.flag}></img>
                    <span>{languages[e].lang}</span>
                  </li>
                );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
export default Language;
