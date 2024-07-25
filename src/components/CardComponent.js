import React from "react";
import DisplayBreadcrumbs from './Breadcrumbs';
import { Link } from "react-router-dom";

function CardComponent({ deck, handleSave, isNewCard, card}) {
    let headerText = isNewCard ? "Add Card" : "Edit Card";
    const [front, setFront] = React.useState(card?.front ?? '');
    const [back, setBack] = React.useState(card?.back ?? '');

    return (
        <div>
            <DisplayBreadcrumbs>
                <Link to={`/decks/${deck.id}`}>{deck.name}</Link>&nbsp;/ {headerText}
            </DisplayBreadcrumbs>

            <h1>{headerText}</h1>
            <label htmlFor="card-front">Front</label>
            <br />
            <textarea className="form-control" rows="3" name="card-front" type="text"
                placeholder="Front side of card" onChange={(ev) => setFront(ev.target.value)} value={front}>
            </textarea>

            <br />
            <label htmlFor="card-back">Back</label>
            <br />
            <textarea className="form-control" rows="3" name="card-back" type="text"
                placeholder="Back side of card" onChange={(ev) => setBack(ev.target.value)} value={back}>
            </textarea>

            <br />
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary">Cancel</Link>
            {" "}
            <button type="submit" className="btn btn-primary" onClick={() => {
                handleSave(front, back);
                if (isNewCard) {
                    setFront('');
                    setBack('');
                }
            }}>Save</button>

        </div>
    )
}

export default CardComponent;
