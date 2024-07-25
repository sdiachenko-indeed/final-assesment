import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard, readDeck, deleteDeck } from "../utils/api/index.js";

function Deck({ updateDecks }) {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { id, name, description, cards } = deck;

  useEffect(() => {
    const abortController = new AbortController();
    const deckInfo = async () => {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(() => response);
    };
    deckInfo();
    return () => abortController.abort();
  }, [deckId]);

  const deleteHandler = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this deck? You will not be able to recover it."
      )
    ) {
      await deleteDeck(id);
      updateDecks(-1);
      history.push("/");
    } else {
      history.go(0);
    }
  };

  if (!deck || !cards) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  } else {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}>
                <i className="fa fa-home" aria-hidden="true"></i> Home
              </Link>
            </li>
            <li className="breadcrumb-item">{name}</li>
          </ol>
        </nav>
        <div className="card mb-4 shadow-lg p-6">
          <div className="card-body">
            <div className="row px-3">
              <h5 className="card-title text-2xl font-bold">{name}</h5>
            </div>
            <p className="card-text text-gray-700">{description}</p>
            <div className="row px-3">
              <Link to={`/decks/${id}/edit`} className="btn btn-secondary">
                <i className="fa fa-edit" aria-hidden="true"></i> Edit
              </Link>
              <Link to={`/decks/${id}/study`} className="btn btn-primary ml-3">
                <i className="fa fa-bookmark" aria-hidden="true"></i> Study
              </Link>
              <Link
                to={`/decks/${id}/cards/new`}
                className="btn btn-primary ml-3"
              >
                <i className="fa fa-plus" aria-hidden="true"></i> Add Cards
              </Link>
              <button
                onClick={deleteHandler}
                name="delete"
                value={id}
                className="btn btn-danger ml-auto"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="row pl-3 pb-2">
          <h1 className="text-3xl font-bold">Cards</h1>
        </div>
        {cards.map((card, index) => (
          <div className="row mb-4" key={index}>
            <div className="col">
              <div className="card shadow-md p-4">
                <div className="row card-body">
                  <p className="col-6 card-text">{card.front}</p>
                  <p className="col-6 card-text">{card.back}</p>
                </div>
                <div className="d-flex justify-content-end p-4">
                  <Link
                    to={`${url}/cards/${card.id}/edit`}
                    className="btn btn-secondary"
                  >
                    <i className="fa fa-edit" aria-hidden="true"></i> Edit
                  </Link>
                  <button
                    onClick={async () => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this card? You will not be able to recover it."
                        )
                      ) {
                        await deleteCard(card.id);
                        updateDecks(-1);
                        history.go(0);
                      } else {
                        history.go(0);
                      }
                    }}
                    name="deleteCard"
                    value={card.id}
                    className="btn btn-danger ml-3"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Deck;
