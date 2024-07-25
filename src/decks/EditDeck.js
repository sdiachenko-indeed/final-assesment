import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api/index';
import { classNames } from '../utils/class-names/index';

function EditDeck() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [deckName, setDeckName] = useState("");
    const [deckDescription, setDeckDescription] = useState("");
    const [waitForDeckToUpdate, setWaitForDeckToUpdate] = useState(false);
    const navigate = useNavigate();
    const abortController = new AbortController();
 
    useEffect(() => { 
        async function getDeck() {
            const currentDeck = await readDeck(deckId, abortController.signal);
            setDeck(currentDeck);
            setDeckName(currentDeck.name);
            setDeckDescription(currentDeck.description);
        }
        getDeck();
    }, [updateDeck]);

    useEffect(() => {
        if (!waitForDeckToUpdate) return;
        else if (waitForDeckToUpdate === true && deck != {}) { 
            updateDeck(deck, abortController.signal);
            setWaitForDeckToUpdate(false);
        }
    }, [waitForDeckToUpdate]); 

    const handleChange = ({ target }) => {
        if (target.name === "EditDeck-deck-name") setDeckName(target.value);
        else if (target.name === "EditDeck-deck-description") setDeckDescription(target.value);
    }
   
     function handleSubmit(event) {
        event.preventDefault(); 
        setDeck({
        id: Number(deck.id),    
        name: deckName,
        description: deckDescription
        });
        setWaitForDeckToUpdate(true);    
    }
    
    return (
        <div>
            <div className='nav-bar'><Link to="/" className='home-link' >
               <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/000000/home.png" alt="home" className='home-icon'/>
                Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> / Edit Deck</div>
            <h1>Edit Deck</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="EditDeck-deck-name" >Name
                    <input type="text" id="EditDeck-deck-name" name="EditDeck-deck-name" 
                    placeholder={deck.name} 
                    onChange={handleChange} required value={deckName} ></input>
                </label>
                <label htmlFor="EditDeck-deck-description" >Description
                    <textarea id="EditDeck-deck-description" name="EditDeck-deck-description"
                    placeholder={deck.description} 
                    onChange={handleChange} required value={deckDescription} ></textarea>
                 <button type="button" 
                    className="EditDeck-cancel-btn btn btn-secondary" onClick={()=> navigate(`/decks/${deckId}`)} >
                        Cancel
                 </button>
                 <button type="submit" variant="primary" 
                 className="EditDeck-submit-btn btn btn-primary" >Submit</button>
                </label>
            </form>
        </div>
    );
}

export default EditDeck;