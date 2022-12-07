import { emojiJSONArray } from "../datawerk/emojis.js";
import { smartMouthArray } from "../datawerk/smartmouth.js";

const synth = window.speechSynthesis;
const inputTxt = document.querySelector('.wordsList');
const voiceSelect = document.querySelector('select');

let pitchValue = document.getElementById('pitchValue');
let pitchTxt = document.getElementById('pitchTxt');

let rateValue = document.getElementById('rateValue');
let rateTxt = document.getElementById('rateTxt');

pitchValue.oninput = function () {
  pitchTxt.innerText = "Pitch: " + pitchValue.value;
}

rateValue.oninput = function () {
  rateTxt.innerText = "Rate: " + rateValue.value;
}

let voices = [];

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) { 
    const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
    if ( aname < bname ) return -1;
    else if ( aname == bname ) return 0;
    else return +1;
  });
  let selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '';
  for(i = 0; i < voices.length ; i++) { 
    let option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    if(voices[i].default) {
      option.textContent += ' (default)';
    }
    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

window.onload = function() {
  const rndMax = emojiJSONArray.length;
  const rndNum = Math.floor(Math.random()*(rndMax-1));
  
  const newEmoji = emojiJSONArray[rndNum];
  const htmlEmoji = newEmoji.html;
  
  const emojiCanvasObj = document.getElementById("emojiCanvasOut");
  
  let emojiDraw = emojiCanvasObj.getContext("2d");
  emojiCanvasObj.height= 200;
  emojiCanvasObj.width = window.innerWidth / 1.2;
  emojiDraw.font = "64pt MiriamLibre-Regular";
  emojiDraw.textAlign = "left";
  emojiDraw.fillText(newEmoji.emoji, 80, 80);
  emojiDraw.save();

  document.getElementById("rndEmoji").innerHTML = htmlEmoji;
  document.getElementById("clickerBtn").innerText = "Click Me!";
  
  const highScoreFromStorage = localStorage.getItem('clickerHS');
  
  if (highScoreFromStorage !== undefined && highScoreFromStorage !== null){ 
    document.getElementById("hsText").innerText = highScoreFromStorage.toString();
  };
  
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  };
};

function saveClickerList() {
  let emojiCanvasObj = document.getElementById("emojiCanvasOut");
  let clickerListObj = document.getElementById("clickerList");
    
  let emojiDraw = emojiCanvasObj.getContext("2d");
  emojiCanvasObj.height= 80;
  emojiCanvasObj.width = window.innerWidth / 1.2;
  emojiDraw.font = "10pt";
  emojiDraw.textAlign = "left";
  emojiDraw.fillText(clickerListObj, 25, 40);
}

function rndNumfromArray(arrayObj){ 
    const rndMax = arrayObj.length;
    const PSuRndNum = Math.floor(Math.random()*(rndMax-1));
    return PSuRndNum;
}

function smartMouth(SMoutElID){
    const rnd = rndNumfromArray(smartMouthArray);
    const smOut = `${smartMouthArray[rnd]}`;
    const smText = document.getElementById(SMoutElID).innerText=`${smOut}`;
    return smText;
}

function sayPhrase(){
    if (synth.speaking) {
        synth.pause();
        return;
    }

    if (synth.paused) {
      synth.resume();
      return;
    }

    if (inputTxt.textContent !== '') {
    
      let phraseToSay = new SpeechSynthesisUtterance(inputTxt.textContent);
    
    phraseToSay.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    
    phraseToSay.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror', event.error());
    }
    
    let selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        phraseToSay.voice = voices[i];
        break;
      }
    }
    
    phraseToSay.pitch = pitchValue.value;
    phraseToSay.rate = rateValue.value;
    synth.speak(phraseToSay);
    //console.log(`pitch: ${pitchValue.value}\nrate: ${rateValue.value}`);
  }
}

function ORIGINALclickeR(){
  const rndMax = emojiJSONArray.length; //get number of items in array (the length)
  const rndNum = Math.floor(Math.random()*(rndMax-1)); //gen a rnd number based on the number of items in array (length)    
  const newEmoji = emojiJSONArray[rndNum]; //from the emojiJSONarray, pick an item at position [rndNum]
  const htmlEmoji = newEmoji.html; //wrap the rndNum for HTML use.    
  const clickerHTMLfrnt = `<span id="clickerList(${rndNum})">`; //HTML wrap
  const clickerHTMLrear = `<br /></span>`; // HTML wrap
  const clickerHTML2ins = `${clickerHTMLfrnt}${htmlEmoji}${clickerHTMLrear}`; //built HTML string for insertion
  const wordsFromArrayObj = emojiJSONArray.find(e => e.html === htmlEmoji); // find the html notation, using htmlEmoji var
  const wordsFromArray = wordsFromArrayObj.name + " "; // add a whitespace to the end, for readability
  document.getElementById("rndEmoji").innerHTML = htmlEmoji; //insert new main emoji
  document.getElementById("clickerList").insertAdjacentHTML("afterbegin", clickerHTML2ins); //insert cilcker emoji into list
  document.getElementById("wordsList").insertAdjacentText("beforeend", wordsFromArray); //insert the emoji name from the emojiJSONArray
  
  smartMouth("smOut");
  let score = parseInt(document.getElementById("curScoreText").textContent);
  const displayedHS = parseInt(document.getElementById("hsText").textContent);   
  if (displayedHS <= score){
    let hscore = document.getElementById("hsText").textContent;
    let hscoreInt = parseInt(hscore).toFixed(0);
    hscoreInt++;
    hscore = hscoreInt.toString();
    document.getElementById("hsText").textContent = hscore;
    localStorage.setItem('clickerHS', hscore);
  };
  let scoreInt = parseInt(score).toFixed(0);
  scoreInt++;
  score = scoreInt.toString();
  document.getElementById("curScoreText").textContent = score;
}

function clickeR(){
  const rndMax = emojiJSONArray.length; //get number of items in array (the length)
  const rndNum = Math.floor(Math.random()*(rndMax-1)); //gen a rnd number based on the number of items in array (length)    
  
  const newEmoji = emojiJSONArray[rndNum]; //from the emojiJSONarray, pick an item at position [rndNum]
  const htmlEmoji = newEmoji.html; //wrap the rndNum for HTML use.    
  const emojiEmoji = newEmoji.emoji; //wrap the rndNum for HTML use.    
  //const unicodeEmoji = newEmoji.unicode; //wrap the rndNum for HTML use.    
  
  const clickerHTMLfrnt = `<span id="clickerList(${rndNum})">`; //HTML wrap
  const clickerHTMLrear = `<br /></span>`; // HTML wrap
  const clickerHTML2ins = `${clickerHTMLfrnt}${htmlEmoji}${clickerHTMLrear}`; //built HTML string for insertion
  
  const wordsFromArrayObj = emojiJSONArray.find(e => e.html === htmlEmoji); // find the html notation, using htmlEmoji var
  const emojiFromArrayObj = emojiJSONArray.find(e => e.emoji === emojiEmoji); // find the emoji, using emoji var
  //const unicodeFromArrayObj = emojiJSONArray.find(e => e.unicode === unicodeEmoji); // find the html notation, using htmlEmoji var
  
  const wordsFromArray = wordsFromArrayObj.name + " "; // add a whitespace to the end, for readability
  const emojiFromArray = emojiFromArrayObj.emoji + " "; // " " " " " " " "
  //const unicodeFromArray = "U+"+ unicodeFromArrayObj.unicode + " "; // " " " " " " " "
    
  document.getElementById("rndEmoji").innerHTML = htmlEmoji; //insert new main emoji
  document.getElementById("clickerList").insertAdjacentHTML("afterbegin", clickerHTML2ins); //insert cilcker emoji into list
  document.getElementById("wordsList").insertAdjacentText("beforeend", wordsFromArray); //insert the emoji name from the emojiJSONArray
  //document.getElementById("emojiCanvasOut").innerText(emojiFromArray);
  
  smartMouth("smOut");
  
  let score = parseInt(document.getElementById("curScoreText").textContent);
  
  const displayedHS = parseInt(document.getElementById("hsText").textContent);   
  
  if (displayedHS <= score){
    let hscore = document.getElementById("hsText").textContent;
    let hscoreInt = parseInt(hscore).toFixed(0);
    hscoreInt++;
    hscore = hscoreInt.toString();
    document.getElementById("hsText").textContent = hscore;
    localStorage.setItem('clickerHS', hscore);
  };
  let scoreInt = parseInt(score).toFixed(0);
  scoreInt++;
  score = scoreInt.toString();
  document.getElementById("curScoreText").textContent = score;

  let canvasDraw = document.getElementById("emojiCanvasOut").getContext("2d");
  canvasDraw.restore();
  canvasDraw.font = "64pt MiriamLibre-Regular";
  if (score<=10) {
    canvasDraw.fillText(emojiFromArray, score+80, 80);  
  }else if (score>=11) {
    canvasDraw.height=400;
    canvasDraw.fillText(emojiFromArray, 80, score+80);
  }
  canvasDraw.save();
}

function toggleVoiceOpts() {
  let voiceOptsEl = document.getElementById("voiceOptions");
  if (voiceOptsEl.style.display !== "flex") {
    voiceOptsEl.style.display = "flex";
  } else {
    voiceOptsEl.style.display = "none";
  }
}

function toggleClickerDisplay() {
  const clickerListEl = document.getElementById("clickerContainer");
  if (clickerListEl.style.display !== "flex") {
    clickerListEl.style.display = "flex";
  } else {
    clickerListEl.style.display = "none";
  };
}

function toggleWordsDisplay() {
  const wordsListEl = document.getElementById("wordsContainer");
  if (wordsListEl.style.display !== "flex") {
    wordsListEl.style.display = "flex";
  } else {
    wordsListEl.style.display = "none";
  };
}