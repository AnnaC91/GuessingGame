function generateWinningNumber(){
    var n = Math.floor(Math.random()*100+1)
    return n
}

function shuffle(array){
    var remain = array.length;
    var holder, rand;
    while (remain){
        rand = Math.floor(Math.random()*remain--);
        holder = array[remain]
        array[remain] = array[rand]
        array[rand] = holder
    }    
    return array
}

function Game(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber()
}

Game.prototype.difference = function(){
    return Math.abs(this.playersGuess-this.winningNumber)
}

Game.prototype.isLower = function(){
    var diff = this.winningNumber-this.playersGuess
    if (diff>0){
        return true
    } else {
        return false
    }
}

Game.prototype.playersGuessSubmission = function(n){
    if (n>100 || n<1 || typeof n !== "number"){
        throw "That is an invalid guess."
    } else {
        this.playersGuess = n
    }
    return this.checkGuess()
}

Game.prototype.checkGuess = function(){
    var message = "";
    if (this.playersGuess===this.winningNumber) {
        message += "You Win!"
    } else if (this.pastGuesses.includes(this.playersGuess)){
        message += "You have already guessed that number."
    } else if (this.pastGuesses.indexOf(this.playersGuess)===-1){
        this.pastGuesses.push(this.playersGuess)
        if (this.pastGuesses.length===5){
            message += "You Lose."
        } else {
            var diff = this.difference();
            if (diff<10){
                message += 'You\'re burning up!'
            } else if (diff<25){
                message += 'You\'re lukewarm.'
            } else if (diff<50){
                message += 'You\'re a bit chilly.'
            } else if (diff<100){
                message += 'You\'re ice cold!'
            }
        }
    } 
    return message
}

Game.prototype.provideHint = function(){
    var hintarray = [];
    var dumm1 = generateWinningNumber();
    var dumm2 = generateWinningNumber();
    hintarray.push(this.winningNumber);
    hintarray.push(dumm1);
    hintarray.push(dumm2);
    return shuffle(hintarray)
}

newGame = function(){
    return new Game()
}

