import emojiDecimalArray from '../datawerk/decimal.js';

window.onload = function() {
    getNewEmoji("rndEmoji");
};

function getNewEmoji(elID){
    const rndMax = emojiDecimalArray.length;
    const genRndNum = Math.floor(Math.random() * (rndMax) - 1);
    document.getElementById(elID).innerHTML="&#" + emojiDecimalArray[genRndNum] + ";";
};