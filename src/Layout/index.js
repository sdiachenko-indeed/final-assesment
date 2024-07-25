import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import Study from "./Study";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";


function Layout() {
  const [ deckLength, setDeckLength ] = useState(0)
  const updateDecks = (newDecks) => {
    setDeckLength(() => deckLength + newDecks)
  }
  
  return (
    <div>
      <Header />
      <div className="container mb-4">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home updateDecks={updateDecks} deckLength={deckLength} />
          </Route>
          <Route path ="/decks/new">
            <CreateDeck updateDecks={updateDecks} deckLength={deckLength} />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck updateDecks={updateDecks} />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck updateDecks={updateDecks} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard updateDecks={updateDecks} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard updateDecks={updateDecks} />
          </Route>
          <Route>
          <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
