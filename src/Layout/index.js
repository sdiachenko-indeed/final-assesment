import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { classNames } from '../utils/class-names/index';
import CreateDeck from '../decks/CreateDeck';
import './style.css';
import Deck from '../decks/Deck';
import AddCard from '../cards/AddCard';
import EditDeck from '../decks/EditDeck';
import EditCard from '../cards/EditCard';
import Study from '../cards/Study';
import { listDecks, deleteDeck } from '../utils/api/index';
import AddEditCards from '../cards/AddEditCards';

function Layout() {
  const [decksList, setDecksList] = useState([]);
  const navigate = useNavigate();
  let decks;

  let createDeckBtn;
  const abortController = new AbortController();
  const location = useLocation();

  useEffect(() => {
    async function getDecks() {
      const listOfDecks = await listDecks(abortController.signal);
      setDecksList(listOfDecks);
    } getDecks();
  }, [navigate] );

  function handleDeleteDeck(deckId) {
    const confirm = window.confirm("Delete this deck?\n You will not be able to recover it.");
    if (confirm === true)  {
      async function deleteAndUpdateDecks() {
      deleteDeck(deckId, abortController.signal);
      const newListOfDecks = await listDecks(abortController.signal);
      setDecksList(newListOfDecks);
  } deleteAndUpdateDecks();
}
  }

if (location.pathname === "/") {
  createDeckBtn = <button type="button"  className="create-deck-btn btn btn-secondary" onClick={() => navigate("/decks/new")} >
    <img width="25" height="25" src="https://img.icons8.com/ios-filled/50/000000/plus-math.png" alt="plus-math"/>
    Create Deck</button>
  decks = decksList.map((deck, index) => (
    <div className="Layout-index-deck-div" key={index} >
      <div className="Layout-index-header-card-count-div">
        <h2 className="Layout-index-deck-title">{deck.name}</h2>
        <h5 className="Layout-index-card-count-div">{deck.cards.length} cards</h5>
      </div>
      <p className="Layout-index-deck-description">{deck.description}</p>
    <div className="Layout-index-btns-div">
      <button type="button" className="Layout-index-view-deck-btn btn btn-secondary" onClick={() => navigate(`/decks/${deck.id}/*`)} >
        <img width="20" height="20" src="https://img.icons8.com/external-creatype-glyph-colourcreatype/64/000000/external-app-web-application-v1-creatype-glyph-colourcreatype-52.png" alt="external-app-web-application-v1-creatype-glyph-colourcreatype-52" className="eye-img" />
          View</button> 
        <button type="button" className="Layout-index-study-deck-btn btn btn-primary" onClick={() => navigate(`/decks/${deck.id}/study`)} >
            <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/000000/bookmark.png" className="book-img" alt="bookmark"/>
              Study</button>
          <button type="button" className="Layout-index-delete-deck-btn btn btn-danger" value={index} onClick={ () => handleDeleteDeck(deck.id)}>
            <img width="18" height="18" src="https://img.icons8.com/material-rounded/24/000000/trash.png" className="trashcan-img" alt="trash"/>
          </button>     
  </div>
</div>
));
} else {
  createDeckBtn = null;
  decks = null;
}

  return (
    <div>
      <Header />
      <div className="container">
    {createDeckBtn}
    {decks}
          <Routes>
            <Route path="/" element={Layout} />
            <Route path="/decks/new" element={<CreateDeck />} />
            <Route path="/decks/:deckId/*" element={<Deck />} />
            <Route path="/decks/:deckId/study/*" element={<Study />} />
            <Route path="/decks/:deckId/edit/*" element={<EditDeck />} />
            <Route path="/decks/:deckId/cards/new/*" element={<><AddCard /><AddEditCards /></>} />
            <Route path="/decks/:deckId/cards/:cardId/edit/*" element={<><EditCard /><AddEditCards /></>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </div>      
    </div>
  );
}

export default Layout;
