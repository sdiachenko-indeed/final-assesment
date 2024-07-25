import React, { useState } from 'react';
import DeckInromation from './DeckInformation';
import { Link, Route, Routes, useParams } from "react-router-dom";
import DisplayCard from './DisplayCard';
import EditCard from './EditCard';
import StudyDeck from './StudyDeck';
import EditDeck from './EditDeck';
import AddCard from './AddCard';
import DisplayBreadcrumbs from './Breadcrumbs';
import { readDeck } from "../utils/api";

function DisplayDeck({ decks }) {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(loadDeck);

  async function loadDeck() {
    const deck = await readDeck(deckId);
    setDeck(deck);
    return deck;
  }

  if (!deck?.id) {
    return <p>Deck not found</p>;
  }

  return (
    <>
      <Routes>
        {/* "decks/:deckId/*" */}
        <Route path="study" element={<StudyDeck decks={decks} deck={deck} />} />
        <Route path="cards/:cardId/edit" element={<EditCard deck={deck} />} />
        <Route path="edit" element={<EditDeck deck={deck} />} />
        <Route path="cards/new" element={<AddCard deck={deck} />} />
        <Route path="" element={
          <>
            <DisplayBreadcrumbs>
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </DisplayBreadcrumbs>

            <DeckInromation deck={deck} enableEditing={true} decks={decks} />
            <br />
            <h3>Cards</h3>
            <div style={{ display: "flex" }} />
            {deck.cards?.map(card => (
              <DisplayCard card={card} deck={deck} />
            ))}
          </>
        }
        />
      </Routes>
    </>
  );
}

export default DisplayDeck;
