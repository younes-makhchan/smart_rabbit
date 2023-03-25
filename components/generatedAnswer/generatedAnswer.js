import { useContext } from "react";
import Typewriter from "typewriter-effect";
import LanguageContext from "../../context/language-context";
import Voice from "../voice/voice";


const GeneratedAnswer=({answer,rabbitAnimationHandler})=>{
  const {language}=useContext(LanguageContext)
  const paragraph=answer||language.smart_rabbit_opening;
return (
    <>
    <Voice paragraph={paragraph} voice={language.voice} rabbitAnimationHandler={rabbitAnimationHandler}/>    
    <Typewriter
        options={{
          strings: [paragraph],
          autoStart: true,
          delay: 15,
          pauseFor: 3600000,
        }}/>

<audio src="" style={{"display":"none"}}></audio>

    </>
     
)
}
export default GeneratedAnswer;