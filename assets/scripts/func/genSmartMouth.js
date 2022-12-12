const smartMouthArray = ["you're doing great!",
"keep up the ::meh:: work", "why?", "i'm not upset, just dissapointed",
"you are out of the will!", "Fantastic!", "its just kind of sad now"
];

function genRndNum(length) {
    const rndNum = Math.floor(Math.random()*(length-1));
    return rndNum;
}

function genSmartMouth(outputElement){
    const smArrayIndex = genRndNum(smartMouthArray.length);
    const smText = document.getElementById(outputElement).innerText = smartMouthArray[smArrayIndex];
    return smText;
}