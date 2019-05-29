
// variable to check if first card get clicked
var firstCardClicked = false;

// variable to check if second card get clicked
var secondCardClicked = false;

// temporary place folders to hold two cards that clicked
var firstCard, secondCard;

// setting permanent place holder for cards
const GAMEAREA = document.querySelector(".game-area")

// score holder
var score = document.querySelector(".current-score")

// starting score
 var startScore = 0;

// score object and set localdata for score
var scoreData = {};
localStorage.setItem("scoreData", JSON.stringify(scoreData));

//  labelling localdata
 var scoreLabel = 0;


// adding start functionality to start button
var startButton = document.querySelector(".start-button")
startButton.addEventListener('click', startGame)

//main function 
    function flipped(){
    //    check if second card is clicked to prevent user click 3rd card
        if(!secondCardClicked){
            // check if  newly clicked second card is not same card  as first card
            if(this !== firstCard){
                // adding flipping css to the card
                countScore();
                this.classList.add("flip");
                
                // labeling the card 
                    if(!firstCardClicked){
                        firstCardClicked= true;
                        firstCard = this;
                    }else{
                        // labeling card
                        secondCard = this;
                        // checking if the two card id matched and execute action accordingly
                        isMatched();
                    }
            }
        }
    }
      
    
    
    
    


// helper methods-----start
    // creat card's back
    function creatBack (num){
        var newImgBack = document.createElement('img');
        newImgBack.setAttribute('src', `images/${num}.gif`);
        newImgBack.classList.add('back');
        return newImgBack;
    }

    // create card's front
    function creatFront(){
        var newImgFront = document.createElement('img');
        newImgFront.setAttribute('src', 'images/front.jpg');
        newImgFront.classList.add('front')
        return newImgFront;
    }

    // create individual card 
       function createCard(k){
        var individualCard = document.createElement('div');
        var front = creatFront();
        var back = creatBack(k);  
        individualCard.classList.add('cell');
        individualCard.dataset.number = `card${k}`
        individualCard.dataset.state = 'undone'
        individualCard.appendChild(back);
        individualCard.appendChild(front);
        return individualCard;
    }
    
    // shuffle single array element
    function shuffle(arr){
        for (let k = arr.length-1; k>=0; k-- ) {
            var randomIndex = Math.floor(Math.random()*(k+1)); 
            var itemAtIndex = arr[randomIndex]; 
            arr[randomIndex] = arr[k]; 
            arr[k] = itemAtIndex;
        }
        return arr;
     }

     // shuffling card's numbers
    function shuffleCardNumber(){
        var arrayCardsNumber =[] 
        for(let i=1;i<=8;i++){arrayCardsNumber.push(i)}
        var arr1 = shuffle(arrayCardsNumber);
        var arr2 = shuffle(arrayCardsNumber);
        var doubleArrMix = shuffle(arr1.concat(arr2));
        return doubleArrMix;
        
        }

    // adding individual card
    function addCard (num){
        var ACARD = createCard(num)
        GAMEAREA.appendChild(ACARD);
        
    }
    
    // count each click and update count
    function countScore(){
        
        startScore++;
        score.innerText = startScore;
        
    }

    
    // staring game
    function startGame(){
    var greet = document.querySelector(".greeting")
    greet.classList.toggle('greeting-off')
    score.innerText = startScore;
    var cardNumbers = shuffleCardNumber()
    for(let k of cardNumbers){
        addCard(k);
     }
     var cards = document.querySelectorAll(".cell");
     addAction(cards)
     startButton.removeEventListener('click', startGame)
    }


    // adding event listner to all cards so that users can click card and flip
    function addAction(arr){
        for(let k of arr){
             k.addEventListener("click", flipped);
           
         }
      }

// helper methods---during
    // checking if the two cards are match by comparing their uniqe data  
    function isMatched(){
        if(firstCard.dataset.number === secondCard.dataset.number){
        //    matched then the cards are stay flipped
            noMoreFlip();
            var unflippedCards = document.querySelectorAll("[data-state]")
            if(unflippedCards.length===2){
            flipAllCards(unflippedCards);
            }
        }else{
            //  not matched then unflip card
            unflipCards();
        }
    }
        
    // when the two cards are not match 
    function unflipCards() {
        // setting current state as "two cards clicked" state
        secondCardClicked = true;
        // unflip the two card by removing flipped style
        //  setting time　to make sure user can click second card. 
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1000);
    }

    // removing listner and lable the card as done
    function doneCard(card){
        card.removeEventListener('click', flipped);
        card.removeEventListener('click', countScore);
        card.removeAttribute('data-state')
    }

    // to make matched card flipped
    function noMoreFlip(){
        doneCard(firstCard);
        doneCard(secondCard)
        resetBoard();
    }
    
    function flipAllCards(arr){
        var exixtingCard = document.querySelectorAll('.cell')
                // flip remaining 2cards
            setTimeout(flipRemaining,500, arr);
                // resetting game
            
        setTimeout(flipAllBack, 2000, exixtingCard );
        setTimeout(reCreateCards, 3000, exixtingCard); 
    }
   
    // resetting cards clicking state every 2 cards got clicked
    function resetBoard(){
        [firstCardClicked, secondCardClicked] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function flipAllBack(arr){
        // flip back all cards
        for(let k of arr){
            k.classList.remove("flip")
        }
    }

    // flip remain two cards I may be able to get rid of it later...
    function flipRemaining(arr){
        for(let k of arr){
            k.classList.add("flip")
        }
    }
    
    function reCreateCards(arr){
        for(let k of arr){
            GAMEAREA.removeChild(k)
        }
        var greet = document.querySelector(".greeting")
        greet.classList.toggle('greeting-off')
        
        saveScore(startScore);
        displayScore();

        startScore = 0
        startButton.addEventListener('click', startGame)
    }

    // saving current score and saving in local storage
    function saveScore(num){
        scoreLabel++
        dataList = JSON.parse(localStorage.getItem("scoreData"));
        
        dataList[`score${scoreLabel}`]=num;
        localStorage.setItem("scoreData", JSON.stringify(dataList));
    }

    // get lowest score in current session and update best score
    function displayScore(){
     var scoresObj = JSON.parse(localStorage.getItem("scoreData"));
    var scores = Object.values(scoresObj)
    var bestScore = scores.reduce((a,b)=>a<b?a:b)
    var updateScore = document.querySelector(".bestscore")
    updateScore.innerText=bestScore;
     
    }
    
    
    
        
 