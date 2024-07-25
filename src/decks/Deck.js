import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link } from 'react-router-dom';
import { classNames } from '../utils/class-names/index';
import { readDeck, deleteCard, deleteDeck } from '../utils/api/index';

function Deck() {
    const { deckId } = useParams();
    const [ deckCards, setDeckCards ] = useState([]);
    const [ updateCardList, setUpdateCardList ] = useState(false);
    const [ deck, setDeck ] = useState({});
    const navigate = useNavigate();
    const abortController = new AbortController();

    useEffect(() => {
        async function getDeck() {
            const selectedDeck = await readDeck(deckId, abortController.signal);
            setDeck(selectedDeck);
            setDeckCards(selectedDeck.cards);
            if(updateCardList) setUpdateCardList(false);
        } getDeck();
    }, [deckId, updateCardList]);

    
      async function handleDeleteCard(cardId) {
        const confirm = window.confirm("Delete this card? \n You will not be able to recover it.");
        if (confirm === true) {
            await deleteCard(cardId, abortController.signal);   
            setUpdateCardList(true);
        }
    }

    async function handleDeleteDeck(deckId) {
        const confirm = window.confirm("Delete this deck? \n You will not be able to recover it.");
        if (confirm === true) {
            await deleteDeck(deckId, abortController.signal); 
            navigate("/");
        }
    }

    return (
        <div>
            <div className='nav-bar'><Link to="/" className='home-link' >
                <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/000000/home.png" alt="home" className='home-icon'/>
                Home</Link> / {deck.name}
                </div>
            <div className="Deck-select-deck-div">
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                <div className="Deck-select-deck-btns-div">
                    <button type="button" className="Deck-edit-deck-btn btn btn-secondary" onClick={()=> navigate(`/decks/${deckId}/edit`)} >
                        <img width="16" height="16" src="https://img.icons8.com/material-sharp/24/000000/edit--v1.png" alt="edit--v1"/>
                        Edit
                    </button>
                    <button type="button" className="Deck-study-deck-btn btn btn-primary" onClick={()=> navigate(`/decks/${deckId}/study`)} >
                        <img width="17" height="17" src="https://img.icons8.com/material-rounded/24/000000/bookmark.png" alt="bookmark" className="book-img " />
                        Study
                    </button>
                    <button type="button" className="Deck-add-cards-to-deck-btn btn btn-primary" onClick={()=> navigate(`/decks/${deckId}/cards/new`)} >
                        <img width="21" height="21" src="https://img.icons8.com/ios-filled/50/000000/plus-math.png" alt="plus-math"/>
                            Add Cards
                    </button>
                    <button type="button" className="Deck-delete-deck-btn btn btn-danger" onClick={() => handleDeleteDeck(deckId)} >
                        <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/000000/trash.png" className="trashcan-img" alt="trash"/>
                    </button>
                </div>
           </div>
           <h2>Cards</h2>
        {deckCards ? deckCards.map((card, index) => (
                <div className="Deck-card-div" key={index} >
                    <div className="Deck-card-div-front-div" >
                      <p className="Deck-card-div-front-p" >{card.front}</p>
                </div>
                <div className="Deck-card-div-back-div" >
                    <p className="Deck-card-div-back-p" >{card.back}</p>
                    <div className="Deck-card-div-btns-div" >
                        <button type="button" className="Deck-edit-card-btn btn btn-secondary" onClick={()=> navigate(`/decks/${deckId}/cards/${card.id}/edit`)} >
                            <img width="16" height="16" src="https://img.icons8.com/material-sharp/24/000000/edit--v1.png" alt="edit--v1"/>
                            Edit
                        </button>
                        <button type="button" className="Deck-delete-card-btn btn btn-danger" onClick={() => {handleDeleteCard(card.id)}} >
                            <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/000000/trash.png" alt="trash" className="trashcan-img" />
                        </button>
                    </div>
                </div>
                </div>
            )) : <div></div>}
        </div>
    );
}

export default Deck;