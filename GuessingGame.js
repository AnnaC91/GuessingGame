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
        $('h2').text('Click "Reset" to play again.')
        $('#submit','#hint').attr("disabled", true)
        message += "You Win!"
    } else if (this.pastGuesses.includes(this.playersGuess)){
        $('h2').text('Please guess again.')
        message += "Duplicate Guess."
    } else if (this.pastGuesses.indexOf(this.playersGuess)===-1){
        this.pastGuesses.push(this.playersGuess)
        var ith = this.pastGuesses.length
        $('ul.guesslist li:nth-child('+ith+')').text(this.playersGuess)
        if (this.pastGuesses.length===5){
            $('h2').text('Click "Reset" to play again.')
            $('#submit','#hint').attr("disabled", true)
            message += "You Lose."
        } else {
            var diff = this.difference();
            if (this.isLower()===true){
                $('h2').text('Take a larger guess.')
            } else if (this.isLower()===false){
                $('h2').text('Take a smaller guess.')
            }
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

function attempt(game){
    var guess = $('#playerinput').val();
    $('#playerinput').val("");
    var nguess = Number(guess)
    if (nguess===NaN){
        nguess = guess;
    } 
    $('h1').text(game.playersGuessSubmission(nguess))
}

$(document).ready(function() {
    var game = new Game();

    $('#submit').click(function(){
        attempt(game);
    });

    $('#playerinput').keypress(function(event){
        var key = event.which;
        if (key === 13){//'ENTER' key
            attempt(game);
        }
    })
})
