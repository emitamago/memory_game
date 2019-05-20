// GLOBAL VARIABLES

// all card contents


// cards that not flipped


// variable to check if first card get clicked
var firstCardClicked = false;

// variable to check if second card get clicked
var secondCardClicked = false;

// temporary place folders to hold two cards that clicked
var firstCard, secondCard;



// start game




//main function 
    function flipped(){
    //    check if second card is clicked to prevent user click 3rd card
        if(!secondCardClicked){
            // check if  newly clicked second card is not same card  as first card
            if(this !== firstCard){
                // adding flipping css to the card
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
      
    
    // checking if the two cards are match by comparing their uniqe data  
    function isMatched(){
        if(firstCard.dataset.number === secondCard.dataset.number){
        //    matched then the cards are stay flipped
            noMoreFlip();
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

    // to make matched card flipped
    function noMoreFlip(){
        doneCard(firstCard);
        doneCard(secondCard)
        resetBoard();
        // tracking how many cards remain unflipped
        var unflippedCards = document.querySelectorAll("[data-state]")
        // when remaining card === 2
        if(unflippedCards.length===2){
            // flip remaining 2cards
            setTimeout(flipRemaining,500, unflippedCards);
            // resetting game
            setTimeout(resetGame, 3000, cards);
        }
         
    }
    
    // resetting cards clicking state every 2 cards got clicked
    function resetBoard(){
        [firstCardClicked, secondCardClicked] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
    
    // adding event listner to all cards so that users can click card and flip
    function startGame(){
       for(let k of cards){
            k.addEventListener("click", flipped);
        }
     }

    function resetGame(arr){
        // flip back all cards
        for(let k of arr){
            k.classList.remove("flip")
        }
        // resetting state of cards
        resetBoard();
        // adding lisner so user can restart again
        startGame();
    }
    
    // removing listner and lable the card as done
    function doneCard(card){
        card.removeEventListener('click', flipped);
        card.removeAttribute('data-state')
    }
    
    // flip remain two cards I may be able to get rid of it later...
    function flipRemaining(arr){
        for(let k of arr){
            k.classList.add("flip")
        }
    }



    const GAMEAREA = document.querySelector(".game-area")
    var arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
    for(let k of arr){
        addCard(k);
     }
     var cards = document.querySelectorAll(".cell");
     startGame()
// adding individual card
    function addCard (num){
        var ACARD = createCard(num)
        GAMEAREA.appendChild(ACARD);
        
    }

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
    
    