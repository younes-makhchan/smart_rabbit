import { useEffect, useRef, useState } from "react";
import {MoonLoader} from "react-spinners"
import styles from "../pages/index.module.css";

function Image({imageUrl,lines,setSelectedLines,selectedLines}){

    const [imageOptions,setImageOptions]=useState({});
    const [filtredLines,setFiltredLines]=useState([])
    useEffect(()=>{
        if(setImageOptions!={} && lines.length!=0){
            let target=document.querySelector("#lens_img");
            let wpercent=target.width/target.naturalWidth
            let hpercent=target.height/target.naturalHeight
            let nLines=lines.map((e)=>{
                e.boundingBox= e.boundingBox.map((b,i)=>
                     i%2==0?b*wpercent
                     :b*hpercent
                     
                 )
                 return e;
             })
             setFiltredLines(nLines)
        }else if(lines.length==0){
            setFiltredLines([]);
        }
    },[setImageOptions,lines])

    function loaded({target}){
        // console.log("image loaded")
       
        setImageOptions({width:target.width,height:target.height});
       
    
    }
    function rectSelect(source){
        if(source.target.dataset.active=="true"){
          delete selectedLines[selectedLines.indexOf(source.target.dataset.text)];
          setSelectedLines(selectedLines);
          source.target.style.stroke="#d9d8d8"
          source.target.setAttribute("data-active","false")
        }else if(source.target.dataset.active=="false"){
    
          source.target.style.stroke="#fb942d"
         
          selectedLines.push(source.target.dataset.text);
          source.target.setAttribute("data-active","true")
          setSelectedLines(selectedLines);
    
        }
        // console.log(source.target);
      }
    return (
    <>
          <div className={styles.image_wrapper} style={{height:imageOptions.height+"px"}}>
           
            <img src={imageUrl} alt="image to translate" onLoad={loaded} id="lens_img" style={{pointerEvents:"none",filter:filtredLines.length==0?"blur(3px)":"blur(0px)"}} />
            {/* <div className={styles.black}></div> */}
            { filtredLines.length!=0 ?
                <svg style={{width:imageOptions.width+"px",height:imageOptions.height+"px",position:"absolute",left:0,top:0}} >
                <defs>
                <mask id="text_mode_mask">
                    <rect x="0" y="0" style={{width:imageOptions.width+"px",height:imageOptions.height+"px",fill:"#fff"}}  ></rect>
                    <g viewBox="0 0 100 100">
                        {filtredLines.map((e, i) => {
                            let x = (e.boundingBox[0])+"px";
                            let y = e.boundingBox[1]+"px";
                            let pwidth = (e.boundingBox[2]-e.boundingBox[0])+"px";
                            let pheight = (e.boundingBox[5]-e.boundingBox[1])+"px";
                            return (
                            <rect key={i} x={x} y={y} style={{ width:pwidth,height:pheight,fill:"#000" }}>
                                
                            </rect>
                            );
                        })}

                    </g>
                </mask>
                </defs>
                {/* excuting the mask */}
                <rect x="0" y="0"  style={{width:imageOptions.width+"px",height:imageOptions.height+"px",fill:"rgb(118 200 54)",opacity:.2}} mask="url(#text_mode_mask)" ></rect>
                <g viewBox="0 0 100 100">
                
                        {filtredLines.map((e, i) => {
                            let x = (e.boundingBox[0])+"px";
                            let y = e.boundingBox[1]+"px";
                            let pwidth = (e.boundingBox[2]-e.boundingBox[0])+"px";
                            let pheight = (e.boundingBox[5]-e.boundingBox[1])+"px";
                            return (
                            <rect data-text={e.text} data-active="false" key={i} x={x} y={y} style={{width:pwidth,height:pheight,strokeWidth:2+"px",stroke:"#d9d8d8",fill:"transparent",cursor:"pointer" }} onClick={rectSelect}>
                                
                            </rect>
                            );
                        })}

                    
                </g>

                </svg>:<div style={{ position: "absolute",top: "50%",left: "50%",transform: "translate(-50%, -50%)",}}>
                <MoonLoader color="#76c836"   speedMultiplier={0.5} />

                </div>
            }
           
 {/*          
            {words.map((e, i) => {
              let x = (e.boundingBox[0])+"px";
              let y = e.boundingBox[1]+"px";
              let pwidth = (e.boundingBox[2])+"px";
              let pheight = (e.boundingBox[3])+"px";
              return (
                <p key={i} style={{  top: y, left: x,width:pwidth,height:pheight }}>
                  {e.text}
                </p>
              );
            })} */}
          </div>
    </>
    
    )
}

export default Image