import styles from "./index.module.css";
import axios from "axios";
import Image  from "next/image"
import { useState, useRef } from "react";
import { Capacitor } from "@capacitor/core";
import dynamic  from "next/dynamic";
const ImageLens =dynamic(()=>import("../imageLens/imageLens"))
function RabbitLens({language,setAnimalInput}) {

  const [imageUrl, setImageUrl] = useState("");
  const [lines, setLines] = useState([]);
  const [selectedLines,setSelectedLines]=useState([])
  const [words,setWords]=useState([])
  const file = useRef();
  const img = useRef();
  function close() {
    setImageUrl("");

    setSelectedLines([]);
    setLines([]);
  }

  function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], { type: mimeString });
    return blob;
  }
  async function getResponse(url) {
    return new Promise((resolve, reject) => {
      let intervalId = setInterval(async () => {
        try {
          let response = await axios.get(url, {
            headers: {
              "Ocp-Apim-Subscription-Key": "7cb8a95d91ae4eccaade90e96de1b12b",
            },
          });
          // console.log(response);
          if (response.data.status == "succeeded") {
            clearInterval(intervalId);
            resolve(response);
          }
        } catch (err) {
          reject(err);
        }
      }, 1000);
    });
  }
  async function createImage({ target }) {
    let imageFile = target;

    if (!imageFile.files) {
      return null;
    }

    const file = imageFile.files[0];
    try {
      //our  image
        // console.log(file);
      if(file.type.indexOf("image")<0) throw new Error("File format not supported")
      if(file.type.indexOf("image/gif")>-1) throw new Error("File format not supported")
      
      
    } catch (error) {
      alert("File format not supported(it's not a picture)")
      close();
      return;
    }
    // console.log(file);
    //display image to the client
    const fileReader = new FileReader();
    fileReader.onload = async function () {
      var blob = dataURItoBlob(fileReader.result);
      // console.log(blob);
      setImageUrl(URL.createObjectURL(blob));
      // try{
        
      //   const response = await axios.post(
      //      "https://francecentral.api.cognitive.microsoft.com/vision/v3.2/ocr?language=unk&detectOrientation=true&model-version=latest",
      //      blob,
      //      {
      //        headers: {
      //          "Ocp-Apim-Subscription-Key": "",
      //          "Content-Type": "application/octet-stream",
      //        },
      //      }
      //    );
      //  console.log("data:  ")
      //    console.log(response.data.regions)
      //    let lines=response.data.regions.reduce((v,e,i)=>{
      //       return  v.concat(e.lines)
      //    },[])
      //   let words=  lines.reduce((v,e,i)=>{
      //        return v.concat(e.words)
      //     },[])
      //     words=words.map((e,i)=>{
      //       e.boundingBox=e.boundingBox.split(",")
      //       return e;
      //   })
      //    console.log(words)

      //     setWords(words);

      // } catch(err){
      //   console.log(err)
      // }
      try{ 
     
        let url=""
        if (Capacitor.isNativePlatform()) {
          url = "https://srm-nine.vercel.app";
        } 
        //verify first if the type is supported
        let response=await axios.get(url+"/api/image");
        let subscriptionKey=response.data.subscriptionKey;
         response = await axios.post(
          "https://francecentral.api.cognitive.microsoft.com/vision/v3.2/read/analyze?model-version=2022-04-30",
          blob,
          {
            headers: {
              "Ocp-Apim-Subscription-Key": subscriptionKey,
              "Content-Type": "application/octet-stream",
            },
          }
        );
        // console.log(response);
        let operation_location = response.headers["operation-location"];
        // console.log(operation_location);
  
        
          response = await getResponse(operation_location);
        
  
        setLines(response.data.analyzeResult.readResults[0].lines);
      }catch(Err){
        close();
        alert("File Format not allowed (it's not a picture)");
      }

      //first  get the data
      //second  get  an object  of lines (cleaning)
      //then display it
    };
    fileReader.readAsDataURL(file);
    target.value="";
  }



  function send(){
    
    setAnimalInput(selectedLines.join(" "));
    close();

  }
  return (
    <>
      <button label="picture here"
        type="button"
        className={styles.camera}
        onClick={() => file.current.click()}
      >
        <Image src={"camera.svg"}  alt="load picture to extract text" width="24" height="24" />
      </button>
        <input
          title="picture here"
          placeholder="picture here"
          type="file"
          ref={file}
          
          onChange={(e)=>{    //console.log("loading image");
          createImage(e);}}
          style={{ display: "none" }}
        />
     
      {imageUrl==""?"":
       <div  >   
         <div className={styles.black}></div>
       <div className={styles.lens} style={{display:imageUrl==""?"none":"block"}}>
         <div className={styles.lens_close_wrapper} >
         <div>
           <h2 className={styles.selection}>
              {language.line_selection}
           </h2>
         </div>
           <button type="button" onClick={close}>
             <img src="close.svg" alt="close extracting picture tab" />
           </button>
         </div>
          <ImageLens imageUrl={imageUrl} setLines={setLines} lines={lines} setSelectedLines={setSelectedLines} selectedLines={selectedLines} ></ImageLens>
         <div className={styles.btn_wrapper}>
           <button type="button" onClick={send}>Submit</button>
         </div>
       </div>
     </div>
     }
     
    </>
  );
}
export default RabbitLens;
