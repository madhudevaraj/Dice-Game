/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gamePlaying;

//'scores' array stores score of player 1 and 2
scores = [0,0];
roundScore = 0;
activePlayer = 0;
// 'gamePlaying' is a state variable. Refer book notes for explanation
gamePlaying = true;

//Set score-0, score-1, current-0, current-1 to 0 when webpage is loaded. getElementById or querySelector can be used.
document.getElementById('score-0').textContent=0;
document.getElementById('score-1').textContent=0;
document.getElementById('current-0').textContent=0;
document.getElementById('current-1').textContent=0;


/*==================================
= BASICS
====================================*/

//Generating random number for dice
//dice = Math.floor( Math.random() * 6 ) +  1;
//console.log("value of dice "+dice);

//Setting current score of player 1 with 'dice' value
//document.querySelector('#current-0').textContent=dice;

//Setting current score of player 1 or 2 with 'dice' value
//document.querySelector('#current-'+activePlayer).textContent=dice;

//To read from the DOM
//var x = document.querySelector('#score-0').textContent;
//console.log("score-0 of player 1 read from DOM "+x);

//To change CSS styles from DOM; To not display the dice image
//document.querySelector('.dice').style.display='none';

//To give Html also as value to DOM
//document.querySelector('#current-0').innerHTML='<em>'+dice+'</em>';

/*==================================
= End of BASICS
====================================*/

// To not display the dice image when webpage is loaded
document.querySelector('.dice').style.display='none';

//Making player 1 panel active when game begins ; active class = red dot and bold text
document.querySelector('.player-0-panel').classList.add('active');


//Setting up eventhandler for "roll dice" button when it is clicked

document.querySelector('.btn-roll').addEventListener('click',function () {
    
    if(gamePlaying)
  
    {
        // 1. Generate random number
    dice = Math.floor( Math.random() * 6 ) +  1;
    console.log(dice);
    
    // 2. Display dice image since display = none when webpage was loaded
    document.querySelector('.dice').style.display='block';

    // 3. Display correct dice image based on 'dice' value'
    document.querySelector('.dice').src = 'dice-'+dice+'.png';
        
    // 4. Update the round score IF the rolled number is NOT a 1
        // !== does not do type coercion. != does type coercion.
    if(dice!==1)
        { 
            //Add score to round score and display it in current score box
            roundScore=roundScore+dice;
            document.querySelector('#current-'+activePlayer).textContent = roundScore;          
        }
    else
        {
            //This function is added to display dice-1 image for 800 milliseconds after the rolled number is 1. ie, to add timeout/sleep for few millisecs
            doStuff();
               
        }
    }
    
    
});

function doStuff()
{
    //Setting gamePlaying=false to disable 'hold' and 'roll dice' button when dice-1 image was shaking since rolled num is 1
    gamePlaying=false;
    
    // Display dice-1 image for 700 milliseconds after the rolled number is 1
    document.querySelector('.dice').src = 'dice-1.png';
    
    
    //Shakes the dice-1 image by calling "shake" function
    setTimeout(shake, 100);
    
    //wait 700 milli seconds before continuing
    setTimeout(continueExecution, 700);
    
}

//
function shake() {
    var i = 0;
    /*
    i -> number of times of shake
    50%,48% -> percentage of movement
    '20' -> speed of shake
    It moves a (".dice") element to the right, until it has reached a left property of 50%
    */
    while (i < 6) {
        
        $(".dice").animate({
            left: "52%",
        }, 20);

        $(".dice").animate({
            left: "48%",
        }, 20);

        $(".dice").animate({
            left: "50%",
        },20);
         i++;   
    }
}

function continueExecution()
{
   //control is passed to next player
     nextPlayer();

}

// Setting event handler for Hold button

document.querySelector('.btn-hold').addEventListener('click',function() {
    
    //"hold" btn will work only if game is playing and winner is not got
    if(gamePlaying)
    
    {
    
    // Add current score in red box to global score of "active" player when hold btn is clicked
    scores[activePlayer]=scores[activePlayer]+roundScore;
    
    // display global score on UI in panel of active player
    document.querySelector('#score-'+activePlayer).textContent= scores[activePlayer];
    
    //Check if player has won the game
    if(scores[activePlayer] >= 20)
        {
            //Displaying "Winner!" in place of active player's name
            document.querySelector('#name-'+activePlayer).textContent="Winner!"
            
             //To not display the dice image when player has won
            document.querySelector('.dice').style.display='none';
            
            // Adding winner class to active player's panel
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            
            //Removing active class from active/winner player's panel
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            
            //Setting state variable to false coz we don't want the game to continue once winner is got
            gamePlaying = false;
            
            //To diplay Game Over when game gets over. Hence display=none is changed to 'block'
            document.querySelector(".gameover").style.display='block';
            
        }
    else
        {
            //Passing control to next player
            nextPlayer();
        }
    
    }
    
});

//Passing control to next player
function nextPlayer ()
{
    //Had made gamePlaying= false to disable 'hold' and 'roll dice' button while dice-1 image was shaking when rolled num is 1
    gamePlaying=true;
    
    // If rolled num is 1, current score in red box should become 0
    document.querySelector('#current-0').textContent=0;
    document.querySelector('#current-1').textContent=0;
            
    //To not display the dice image when rolled num is 1
    document.querySelector('.dice').style.display='none';
    
    if(activePlayer === 0)
                {
                    activePlayer = 1;
                    // Setting roundScore to 0 else 'dice' value gets added to old roundScore for new player
                    roundScore = 0;
                    
                    //Toggle adds class if it not there & removes class if it is already there
                    document.querySelector('.player-0-panel').classList.toggle('active');
                    document.querySelector('.player-1-panel').classList.toggle('active');
                    
                    //Since control is passed to player 2, making player 2 panel active and removing active class for player 1 panel; active class = red dot and bold text
                    //document.querySelector('.player-0-panel').classList.remove('active');
                    //document.querySelector('.player-1-panel').classList.add('active');

                }
            else
                {
                    activePlayer = 0;
                    roundScore = 0; 
                    
                    //Toggle adds class if it not there & removes class if it is already there
                    document.querySelector('.player-1-panel').classList.toggle('active');
                    document.querySelector('.player-0-panel').classList.toggle('active');
                    
                    //Since control is passed to player 1, making player 1 panel active and removing active class for player 2 panel; active class = red dot and bold text
                    //document.querySelector('.player-1-panel').classList.remove('active');
                    //document.querySelector('.player-0-panel').classList.add('active');
                }
}

// Setting up event handler for "new game" button

document.querySelector(".btn-new").addEventListener('click',function() {
    
//'scores' array stores score of player 1 and 2; Re-setting values for new game
scores = [0,0];
roundScore = 0;
activePlayer = 0;
gamePlaying = true;
    
//'Game Over' was displayed before 'new game' btn was clicked. Hence display=block is changed to 'none'
document.querySelector(".gameover").style.display='none';
document.querySelector('.dice').style.display='none';

//Set score-0, score-1, current-0, current-1 to 0 when webpage is loaded. getElementById or querySelector can be used ; Re-setting values for new game
document.getElementById('score-0').textContent=0;
document.getElementById('score-1').textContent=0;
document.getElementById('current-0').textContent=0;
document.getElementById('current-1').textContent=0;

// Re-setting winner player name to original value in place of "winner!" text
document.querySelector('#name-0').textContent="Player 1";
document.querySelector('#name-1').textContent="Player 2";

//Removing winner class from player who won the game
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');

//Removing "active" class from player who won the game; active class = red dot and bold text
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.remove('active');

//Adding "active" class to player 1 since it is new game; active class = red dot and bold text
document.querySelector('.player-0-panel').classList.add('active');

    
});















































