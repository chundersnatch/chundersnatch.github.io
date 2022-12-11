function sayPhrase(txtElement, dropdownElement, pitchElement, rateElement){
    if (synth.speaking) {
        synth.pause();
        return;
    }

    if (synth.paused) {
      synth.resume();
      return;
    }

    if (txtElement.textContent !== '') {
        let phraseToSay = new SpeechSynthesisUtterance(txtElement.textContent);
        phraseToSay.onend = function (event) {
            console.log('SpeechSynthesisUtterance.onend');
        }
        phraseToSay.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror', event.error());
    }
    
    dropdownElement = voiceSelect.selectedOptions[0].getAttribute('data-name');
    
    for(i = 0; i < voices.length; i++) {
      if(voices[i].name === dropdownElement) {
        phraseToSay.voice = voices[i];
        break;
      }
    }
    
    phraseToSay.pitch = pitchElement.value;
    phraseToSay.rate = rateElement.value;
    synth.speak(phraseToSay);
  }
}

// GLOBALS //
pitchValue.oninput = function () {
  pitchTxt.innerText = "Pitch: " + pitchValue.value;
}

rateValue.oninput = function () {
  rateTxt.innerText = "Rate: " + rateValue.value;
}

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
};