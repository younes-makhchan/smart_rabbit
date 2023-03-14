import { useContext } from "react";
import Typewriter from "typewriter-effect";
import LanguageContext from "../../context/language-context";
import Voice from "../voice/voice";


const GeneratedAnswer=({answer,onChangeRabbitAnimation})=>{
  const {language}=useContext(LanguageContext)
  console.log("answer is :"+answer);

return (
    <>
    {/* <Voice answer={answer} voice={language.voice} onChangeRabbitAnimation={onChangeRabbitAnimation}/>     */}
    <Typewriter
        options={{
          strings: [answer],
          autoStart: true,
          delay: 15,
          pauseFor: 3600000,
        }}/>

<audio src="" style={{"display":"none"}}></audio>

    </>
     
)
}
export default GeneratedAnswer;