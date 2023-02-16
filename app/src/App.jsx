import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function ButtonGame(props){
  return (
    <button className={"Button Button"+props.index+" "+(props.toggle ? "ButtonToggle" : "ButtonUntoggle")} onClick={props.onClick}></button>
  );

}



function App() {
  const [sequenceColorIndex,setSequenceColorIndex] = useState(null)
  const [currentSequence,setCurrentSequence] = useState([])
  const [playerColorIndex,setPlayerColorIndex] = useState(null)
  
  const [recognition,setRecognition] = useState(null)
  


  console.log("log", { sequenceColorIndex, playerColorIndex, currentSequence})



  const appendSequence = ()=>{
    console.log("append sequence")
    setCurrentSequence([...currentSequence,Math.floor(Math.random() * 4)+1]);
  };
  useEffect(()=>{
    console.log("effect sequence index")
    if(sequenceColorIndex != null){
      setTimeout(()=>{
        if(currentSequence.length - 1 > sequenceColorIndex)
          setSequenceColorIndex(sequenceColorIndex+1);
        else{
          //recognition.start();
          setSequenceColorIndex(null);
          setPlayerColorIndex(0);          
        }
      },1000);
    }
    
  },[sequenceColorIndex]);

  useEffect(()=>{    
    console.log("effect current sequence")
    if(currentSequence.length > 0){
      new Audio('./bip.wav').play().then(()=>{setSequenceColorIndex(0);});        
    }
  },[currentSequence]);

  
  useEffect(()=>{
    console.log("effect player index")
    if(playerColorIndex != null){
      if(playerColorIndex >= currentSequence.length){
        setPlayerColorIndex(null)
        appendSequence()
      }      
    }
  },[playerColorIndex]);



  const handlerClick = (color)=>{
    console.log("log handler click", {color, sequenceColorIndex, playerColorIndex, currentSequence})
    if(sequenceColorIndex == null && currentSequence.length > 0){
      window.navigator?.vibrate?.(200);      
      if(color == currentSequence[playerColorIndex]){
        setPlayerColorIndex(playerColorIndex + 1);
      }else{
        Notification.requestPermission((permission)=>{
          if(permission === "granted"){
            new Notification("Perdu !",{body:"Votre score "+currentSequence.length});
          }
        })
        setCurrentSequence([])
        setPlayerColorIndex(null)
        setSequenceColorIndex(null)
      }
    }
  };
  // useEffect(()=>{
  //   const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
  //   const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
  //   const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
  //   const colors = ["rouge","bleu","vert","jaune"];
  //   const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(' | ')};`
  //   const recognition = new SpeechRecognition();
  //   const speechRecognitionList = new SpeechGrammarList();
  //   speechRecognitionList.addFromString(grammar, 1);
  //   recognition.grammars = speechRecognitionList;
  //   recognition.continuous = false;
  //   recognition.lang = 'fr-FR';
  //   recognition.interimResults = false;
  //   recognition.maxAlternatives = 1;
    

  //   recognition.onresult = (event)=>{
  //     const color = event.results[0][0].transcript;
  //     console.log("say color",color);
  //     if(color === "rouge") {
  //       handlerClick(1);
  //     }
  //     else if(color === "bleu"){ 
  //       handlerClick(2);
  //     }
  //     else if(color === "jaune"){
  //       handlerClick(3);
  //     }
  //     else if(color === "vert"){ 
  //       handlerClick(4);
  //     }
  //   };

  //   setRecognition(recognition)
  // },[currentSequence,playerColorIndex,sequenceColorIndex])


  
  var colorIndex = playerColorIndex != null && playerColorIndex > 0? currentSequence[playerColorIndex-1] : sequenceColorIndex != null ? currentSequence[sequenceColorIndex] : null;

  return (
    <><div className='wrapper'>
      <ButtonGame index="1" toggle={colorIndex == 1} onClick={() => {handlerClick(1) } } />
      <ButtonGame index="2" toggle={colorIndex == 2} onClick={() => {handlerClick(2) } } />
      <ButtonGame index="3" toggle={colorIndex == 3} onClick={() => {handlerClick(3) } } />
      <ButtonGame index="4" toggle={colorIndex == 4} onClick={() => {handlerClick(4) } } />
    </div>
    <button disabled={currentSequence.length > 0} onClick={() => {
      appendSequence();
    } }>
      Start
      </button>
      <div>{currentSequence.length}</div>
      </>
  )
}

export default App
