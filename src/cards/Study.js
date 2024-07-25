import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate  } from 'react-router-dom';
import { classNames } from '../utils/class-names/index';
import { readDeck } from '../utils/api/index';

function Study() {
    const { deckId } = useParams();
    const [deckName, setDeckName] = useState("");
    const [deckCards, setDeckCards] = useState([]);
    const [currentCardNumber, setCurrentCardNumber] = useState(1);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [currentCardText, setCurrentCardText] = useState("");
    const [isCardFlipped, setIsCardFlipped] = useState(false);
    const [firstFlip, setFirstFlip] = useState(false);
    const [sameCard, setSameCard] = useState(false);

    let buttonsToDisplay;
    const navigate = useNavigate();
   
    useEffect(() => {
        const abortController = new AbortController();
        async function getDeck() {
            const selectedDeck = await readDeck(deckId, abortController.signal);
            setDeckName(selectedDeck.name);
            setDeckCards(selectedDeck.cards);              
        }
         getDeck();
    }, []);


    useEffect(() => {
        if (deckCards.length === 0) return;
       else if(deckCards.length > 0 && currentCardIndex === 0) {
            setCurrentCardText(deckCards[0].front);
        }
        
    }, [deckCards, currentCardIndex]);

    
    const handleCardFlip = (dontFlipCard = false) => {
       if (currentCardIndex -1 === deckCards.length -1 && dontFlipCard === false) {
        const confirm = window.confirm("Restart cards? \n Click 'cancel' to return to the home page.");
       if (confirm == true) {   
         setCurrentCardIndex((currentIndex) => currentIndex = 0);
         setCurrentCardNumber((currentCardNumber) => currentCardNumber = 1);
         setIsCardFlipped(false);
         return;
        }    
        else if (confirm == false) { 
            navigate("/");
            return;
        }
     } 

    
    if (isCardFlipped === false && dontFlipCard === false || isCardFlipped === true
        && dontFlipCard === true) {
        setIsCardFlipped(true);
        setSameCard(true);
        if (dontFlipCard === false) { 
            setCurrentCardText(deckCards[currentCardIndex].back);
            setCurrentCardIndex((index) => index + 1);
        }
        else if (dontFlipCard === true) {
            setCurrentCardText(deckCards[currentCardIndex -1].front);
            setIsCardFlipped(false);
        }
        } else if (isCardFlipped === true && dontFlipCard === false) {
            setCurrentCardText(deckCards[currentCardIndex].front);
            setIsCardFlipped(false);
        } else if (isCardFlipped === false && dontFlipCard === true) {
            setCurrentCardText(deckCards[currentCardIndex -1].back);
            setIsCardFlipped(true);
        }
    }

    if (isCardFlipped === true) {
        buttonsToDisplay = <div>
            <button className='Study-flip-btn btn btn-secondary' 
        onClick={() => {
            handleCardFlip(true)
        }
    }>Flip</button> <button
         className='Study-next-btn btn btn-primary' onClick={() => {            
            if (firstFlip === false) setFirstFlip(true);
            setCurrentCardNumber((cardNumber) => cardNumber + 1); 
            setSameCard(false);         
            handleCardFlip();
        }
    }>Next</button></div>
    }
    
    else if (isCardFlipped === false) { 
        buttonsToDisplay = <button className='Study-flip-btn btn btn-secondary' 
        onClick={() => {
       if (sameCard === true) {
        handleCardFlip(true);
        return;
       }
       else handleCardFlip();
    }
}>Flip</button>
}


    return (
        <div>
            <div className='nav-bar'><Link to="/" className='home-link' >
                <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/000000/home.png" className='home-icon' alt="home"/>
                Home</Link> / <Link to={`/decks/${deckId}`}>{deckName}</Link> / Study</div>
            <h1>Study: {deckName}</h1>
           { deckCards.length >= 3 ?
              <div>
                <h3>Card {currentCardNumber} of {deckCards.length}</h3>
                <p> {currentCardText} </p>
                    {buttonsToDisplay}
              </div>
          : <div>
                <h2>Not enough cards.</h2>
                <p>You need at least 3 cards to study. There are {deckCards.length} in this deck.</p>
                 <button className='Study-add-cards-to-deck btn btn-primary'
                 onClick={() => navigate(`/decks/${deckId}/cards/new`)} > 
                    <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/000000/plus-math.png" alt="plus-math"/>Add Cards</button>
            </div>
            }
        </div>
    );
}

export default Study;