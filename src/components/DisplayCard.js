import React from 'react';
import { Link } from "react-router-dom";
import { deleteCard, readDeck } from "../utils/api";

function Displaycard({ card, deck }) {
    async function handleDeleteCard() {
        const shouldDelete = window.confirm("Delete this card? You will not be able to recover it.");
        if (shouldDelete) {
            // use: export async function deleteCard(cardId, signal) {
            await deleteCard(card.id);
            deck.cards.splice(deck.cards.indexOf(card), 1);
            window.location.reload();
        }
        else {
            return;
        }
    }

    return (
        <>
            <div className="card">
                <div className="card-body" >
                    <div className="row">
                        <div className="col">
                            <p className="card-title">{card.front} </p>
                        </div>
                        <div className="col">
                            <p className="card-text">{card.back}</p>
                            <div style={{ textAlign: "right" }}>
                                <Link to={`/decks/${card.deckId}/cards/${card.id}/edit`}>
                                    <button className="btn btn-secondary"><i className="oi oi-pencil"></i> Edit</button>
                                </Link>
                                {" "}
                                <button className="btn btn-danger" onClick={handleDeleteCard}> <i className="oi oi-trash"></i> </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}
export default Displaycard;


