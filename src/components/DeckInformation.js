import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeckInromation({ deck, enableEditing, decks }) {
    async function handleDeleteDeck() {

        const shouldDelete = window.confirm("Delete this deck? You will not be able to recover it.");
        if (shouldDelete) {
            //using: export async function deleteDeck(deckId, signal) {
            await deleteDeck(deck.id);
            decks.splice(decks.indexOf(deck), 1);
            //refresh the current page - TODO: replace with setdDecks in its 2 locations
            window.location.reload();
        } else {
            return;
        }
    }

    return (
        <div className="card">
            <div className="card-body" >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {/*Header and counter*/}
                    <h5 className="card-title">{deck.name} </h5>
                    <p>{deck.cards?.length ?? 0} cards</p>
                </div>

                <p className="card-text">{deck.description}</p>

                {enableEditing ?
                    <div>
                        {/*Edit button*/}
                        <Link to={`/decks/${deck.id}/edit`}>
                            <button className="btn btn-secondary" style={{ margin: "4px" }}> <i className="oi oi-pencil"></i>
                                {" "}Edit
                            </button>
                        </Link>
                    </div> :
                    <Link to={`/decks/${deck.id}`}>
                        <button className="btn btn-secondary" style={{ margin: "4px" }}> <i className="oi oi-eye"></i>
                            View
                        </button>
                    </Link>
                }

                {/*Study button*/}
                <Link to={`/decks/${deck.id}/study`}>
                    <button className="btn btn-primary" style={{ margin: "4px" }}><i className="oi oi-book"></i> Study</button>
                </Link>

                {/*Add Cards button - TODO: build the screen "Add Card"*/}
                {enableEditing ?
                    <div>
                        <Link className="btn btn-primary" style={{ margin: "4px" }} to={`/decks/${deck.id}/cards/new`} >
                            <i className="oi oi-plus"></i>
                            {' '}
                            Add Cards
                        </Link>
                    </div>
                    : <div></div>
                }

                {/*Delete button*/}
                <button className="btn btn-danger" style={{ float: "right" }} onClick={handleDeleteDeck}> <i className="oi oi-trash"></i> </button>
            </div>
            <i className="bi bi-arrow-clockwise"></i>
        </div>
    );
}


export default DeckInromation;