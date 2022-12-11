const smartMouthArray = ["you're doing great!",
"keep up the ::meh:: work", "why?", "i'm not upset, just dissapointed",
"you are out of the will!", "Fantastic!", "its just kind of sad now"
];

function genRndNum(length) {
    const rndNum = Math.floor(Math.random()*(length-1));
}

function smartMouth(){
    const smText = smartMouthArray[genRndNum(smartMouthArray.length)];
    return smText;
}