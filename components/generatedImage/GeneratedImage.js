import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import styles from "./GeneratedImage.module.css";
const GeneratedImage = ({ answer }) => {
  const [displayImage, setDisplayImage] = useState(false);
 
  
  return (
    <div>
    <div className={styles["options"]} >
     <img src="full-screen.svg" className={styles["full-screen"]} onClick={() => setDisplayImage(true)}/>
     {/* <img src="image-download.svg" className={styles["image-download"]} onClick={downloadImage}/> */}
      
    </div>
      <Typewriter
        options={{
          strings: ["Generating Picture..."],
          autoStart: true,
          delay: 15,
          pauseFor: 3600000,
        }}
      />
      <div className={styles["image_wrapper"]}>
       
      <img
        src={answer}
        className={styles.image}
        onClick={() => setDisplayImage(true)}
      />
      </div>
      {displayImage && (
        <div>
          <div className={styles.black} onClick={()=>setDisplayImage(false)}></div>
          <div className={styles.lens}>
            <div className={styles.lens_close_wrapper}>
              <button type="button" onClick={()=>setDisplayImage(false)}>
                <img src="close.svg" alt="close extracting picture tab" />
              </button>
            </div>
            <img src={answer}  className={styles.floatingImage}/>
          </div>
        </div>
      )}
    </div>
  );
};
export default GeneratedImage;
