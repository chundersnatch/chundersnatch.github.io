function scoreHS(currentScoreElement, highScoreElement, LocalStorageName){
    const highScoreFromStorage = localStorage.getItem(`${LocalStorageName}`);
    if (highScoreFromStorage !== undefined && highScoreFromStorage !== null){
        document.getElementById(`${highScoreElement}`).innerText = highScoreFromStorage.toString();
    };
    
    let score = parseInt(document.getElementById(`${currentScoreElement}`).textContent);
    const displayedHS = parseInt(document.getElementById(`${highScoreElement}`).textContent);
    
    if (displayedHS <= score){
        let hscore = document.getElementById(`${highScoreElement}`).textContent;
        let hscoreInt = parseInt(hscore).toFixed(0);
        hscoreInt++;
        hscore = hscoreInt.toString();
        document.getElementById(`${highScoreElement}`).textContent = hscore;
        localStorage.setItem(`${LocalStorageName}`, hscore);
    };
    
    let scoreInt = parseInt(score).toFixed(0);
    scoreInt++;
    score = scoreInt.toString();
    document.getElementById(`${currentScoreElement}`).textContent = score;
}