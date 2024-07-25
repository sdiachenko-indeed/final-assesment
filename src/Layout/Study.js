import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index.js";
import CardList from "./CardList";

function Study() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  useEffect(() => {
    const findDeck = async () => {
      const currDeck = await readDeck(deckId);
      setDeck(() => currDeck);
    };
    findDeck();
  }, [deckId]);

  if (Object.keys(deck).length) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb flex">
            <li className="breadcrumb-item">
              <Link to="/" className="text-blue-500 hover:text-blue-700">
                <i className="fa fa-home" aria-hidden="true"></i> Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link
                to={`/decks/${deckId}`}
                className="text-blue-500 hover:text-blue-700"
              >
                {deck.name}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <div className="mb-4">
          <h1 className="text-3xl font-bold">{deck.name}: Study</h1>
        </div>
        <CardList cards={deck.cards} />
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border text-blue-500" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

export default Study;
