import History from "../history/history";
import InstallPWA from "../installPWA/InstallPWA";
import Language from "../language/language";
import styles from "./header.module.css"

const  Header=()=>{
    return (
        <header className={styles.section}>
        <History  /> 
        <div className={styles.about_btn_wrapper} >
        <a href="#about" className={styles.about_a}>{"About"}</a>
      </div>
        <InstallPWA   />
        <Language   />
       
        </header>
    )
}
export default Header;