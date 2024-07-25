import React, { useEffect, useState } from 'react';
import { classNames } from '../utils/class-names/index';
import { useParams, Link, useNavigate, Routes, Route } from 'react-router-dom';
import { createCard, readDeck } from '../utils/api/index';
import AddEditCards from './AddEditCards';


function AddCard() {
    const { deckId } = useParams();
    const [deckName, setDeckName] = useState("");
    const [frontCardText, setFrontCardText] = useState("");
    const [backCardText, setbackCardText] = useState("");
    const abortController = new AbortController();
    const navigate = useNavigate();

    useEffect(() => {    
        async function getDeck() {
           try { 
            const selectedDeck = await readDeck(deckId, abortController.signal);
            setDeckName(selectedDeck.name);
          } catch (error) {
            console.log(error);
            }
        } getDeck();
          return () => abortController.abort();
      }, []);
    
    const handleChange = ({ target }) => {
        if (target.name === "AddCard-front-card") setFrontCardText(target.value);
        else if (target.name === "AddCard-back-card") setbackCardText(target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        createCard(deckId, {front: frontCardText, back: backCardText}, abortController.signal);
        setFrontCardText("");
        setbackCardText("");

    }

    return (
        <div>
            <div className='nav-bar'><Link to="/" className='home-link' >
                <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/000000/home.png" alt="home" className='home-icon'/>Home </Link> / <Link to={`/decks/${deckId}`}> {deckName}</Link> / Add Card</div>
        <h2 className='AddCard-deck-name-h2'> {deckName}: </h2><h2 className='AddCard-add-card-h2'> Add Card</h2>
                <Routes>
                    <Route path="/cards/new/" element={<AddEditCards />} />
                </Routes>
            </div>
    );
}

export default AddCard;