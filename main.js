// GLOBAL VARIABLES

// all card contents
var cards = document.querySelectorAll(".cell");

// variable to check if first card get clicked
var firstCardClicked = false;

// variable to check if second card get clicked
var secondCardClicked = false;

// temporary place folders to hold two cards that clicked
var firstCard, secondCard;

// adding event listner to all cards so that users can click card and flip
for(let k of cards){
    k.addEventListener("click", flipped);
}

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
        firstCard.removeEventListener('click', flipped);
        secondCard.removeEventListener('click', flipped);
        resetBoard();
        console.log("hello")
    }
    
    // resetting cards clicking state every 2 cards got clicked
    function resetBoard(){
        [firstCardClicked, secondCardClicked] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
        
        