import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, Routes, Route } from 'react-router-dom';
import { readDeck, updateCard, readCard } from '../utils/api/index';
import { classNames } from '../utils/class-names/index';
import AddEditCards from './AddEditCards';

function EditCard() {
  const { deckId, cardId } = useParams();
  const [frontCardText, setFrontCardText] = useState("");
  const [backCardText, setBackCardText] = useState("");
  const navigate = useNavigate();
  const [deck, setDeck] = useState({});
  const [deckName, setDeckName] = useState("");
  const [card, setCard] = useState({});
  const [waitForCardToUpdate, setWaitForCardToUpdate] = useState(false); 
  const abortController = new AbortController();
  const [displayDeckName, setDisplayDeckName] = useState(false);
         
    useEffect(() => {
        try {
            setDisplayDeckName(true);
        } catch (error) {
            console.log(error)
        }
    }, [deckId])
         
  
    useEffect(() => {
        async function getDeck() {
            try {
                const currentDeck = await readDeck(deckId, abortController.signal);
                setDeck(currentDeck);
                setDeckName(currentDeck.name);  
            } catch (error) {
                console.log(error);
            }
        } getDeck();
          return () => abortController.abort();
    }, [displayDeckName]);

    useEffect(() => {
        async function getCardNameAndDescription() {
           try { const currentCard = await readCard(cardId, abortController.signal);
            setCard(currentCard);
            setFrontCardText(currentCard.front);
            setBackCardText(currentCard.back);
        } catch (error) {
            console.log(error)
          }
      }
        getCardNameAndDescription();
        return () => abortController.abort();
    }, [])

    useEffect(() => {   
        if (card != {} && waitForCardToUpdate) {
           try {
            updateCard(card, abortController.signal);
            setWaitForCardToUpdate(false);
            setFrontCardText("");
            setBackCardText("");
            navigate(`/decks/${deckId}`);
        } catch (error) {
            console.log(error)
        }
        return () => abortController.abort();
        }else return;
    }, [waitForCardToUpdate]);

    const handleChange = ({ target }) => {
        if (target.name === "EditCard-front-text") setFrontCardText(target.value);
        else if (target.name === "EditCard-back-text") setBackCardText(target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        setCard({
            id: Number(card.id),
            front: frontCardText,
            back: backCardText,
            deckId: Number(card.deckId)
        });
        setWaitForCardToUpdate(true);           
    }

    return (
        <div>   
            <div className='nav-bar'><Link to="/" className='home-link' >
                <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/000000/home.png" alt="home" className='home-icon'/>
                Home</Link> / <Link to={`/decks/${deckId}`}>Deck {deckName}</Link> / Edit Card {card.id}</div>
                <h1>Edit Card</h1>
        
            <Routes>
                    <Route path="/:cardId/edit/" element={<AddEditCards />} />
                </Routes>
        </div>
    );
}

export default EditCard;