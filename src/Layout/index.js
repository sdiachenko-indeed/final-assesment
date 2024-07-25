import { React, useEffect, useState } from "react";
import Header from "./Header";
import DeckList from "../components/DeckList";
import { Route, Routes } from "react-router-dom";
import CreateDeck from "../components/CreateDeck";
import DisplayDeck from "../components/DisplayDeck";
import { listDecks } from "../utils/api";

function Layout() {
  const [decks, setDecks] = useState([]);
  useEffect(() => {

    async function loadDecks() {
      const response = await listDecks();
      setDecks(response);
    }
    loadDecks();
  }, []);


  return (
    <div>
      <Header />
      <div className="container">

        <Routes>
          <Route path="decks/new" element={<CreateDeck decks={decks} />} />
          <Route path="decks/:deckId/*" element={<DisplayDeck decks={decks} />} />
          <Route path="*" element={<DeckList decks={decks} />} />
        </Routes>


      </div>
    </div>
  );
}



export default Layout;
