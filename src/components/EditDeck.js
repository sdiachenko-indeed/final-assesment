import React from 'react';
import { Link } from 'react-router-dom';
import { updateDeck } from '../utils/api';
import DisplayBreadcrumbs from './Breadcrumbs';

function EditDeck({ deck }) {
    const [name, setName] = React.useState(deck.name);
    const [description, setDescription] = React.useState(deck.description);

    async function onSubmit() {
        deck.name = name;
        deck.description = description;
        await updateDeck(deck); //export async function updateDeck(updatedDeck, signal) {
    }

    return (
        <div>
            <DisplayBreadcrumbs>
                <Link to={`/decks/${deck.id}`}>{deck.name}</Link>&nbsp;/ Edit Card
            </DisplayBreadcrumbs>

            <h1>Edit Deck</h1>
            <label htmlFor="deck-name">Name</label>
            <br />
            <textarea onChange={ev => setName(ev.target.value)} className="form-control" name="deck-name" type="text" placeholder="Deck Name">
                {name}
            </textarea>
            <label htmlFor="deck-description">Description</label>
            <br />

            <textarea onChange={ev => setDescription(ev.target.value)} className="form-control" rows="5" name="deck-description" type="text" placeholder="Brief description of the deck" >
                {description}
            </textarea>
            <br />

            <Link to="/" button type="cancel" className="btn btn-secondary">Cancel</Link>
            {" "}
            <button type="submit" className="btn btn-primary" onClick={onSubmit}>Submit</button>
        </div>
    );
}

export default EditDeck;

