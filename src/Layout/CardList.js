import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

function CardList({ cards }) {
  const [currentCard, setCurrentCard] = useState(0);
  const [frontSide, setFrontSide] = useState(true);
  const { deckId } = useParams();
  const history = useHistory();

  const nextHandler = () => {
    if (currentCard === cards.length - 1) {
      window.confirm(
        "Click OK to restart the deck, or CANCEL to return to the homepage."
      )
        ? setCurrentCard(() => 0)
        : history.push("/");
    } else {
      setCurrentCard((currentCard) => currentCard + 1);
      setFrontSide(() => !frontSide);
    }
  };

  const flipHandler = () => {
    setFrontSide(() => !frontSide);
  };

  if (cards.length > 2) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <h5 className="text-2xl font-bold mb-2">
            Card {currentCard + 1} of {cards.length}
          </h5>
          <p className="text-gray-700">
            {frontSide ? cards[currentCard].front : cards[currentCard].back}
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={flipHandler}
            className="btn btn-secondary px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
          >
            Flip
          </button>
          {!frontSide && (
            <button
              onClick={nextHandler}
              className="btn btn-primary px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <h5 className="text-2xl font-bold mb-2">Not enough cards.</h5>
          <p className="text-gray-700">
            You need at least 3 cards to study. There are {cards.length} cards
            in this deck.
          </p>
        </div>
        <Link
          to={`/decks/${deckId}/cards/new`}
          className="btn btn-primary px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          <i className="fa fa-plus" aria-hidden="true"></i> Add Cards
        </Link>
      </div>
    );
  }
}

export default CardList;
