import Typewriter from "typewriter-effect";
import Styles from "./GeneratedImage.module.css"
const GeneratedImage=({answer})=>{



return (
    <>
  
  <Typewriter
        options={{
          strings: ["Generating Picture..."],
          autoStart: true,
          delay: 15,
          pauseFor: 3600000,
        }}/>
    <img src={answer} className={Styles.image}/>
          
    </>
     
)
}
export default GeneratedImage;