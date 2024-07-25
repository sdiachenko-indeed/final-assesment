import React from 'react';
import { createCard } from '../utils/api';
import CardComponent from './CardComponent';

function AddCard({ deck }) {
    const deckId = deck.id;

    async function handleSave(front, back) {
        const card = {
            //id: cardId,
            front: front,
            back: back,
            deckIid: deckId
        }
        const serverCreatedcard = await createCard(deckId, card);
        deck.cards.push(serverCreatedcard);
        //export async function createCard(deckId, card, signal) {
    }

    return <CardComponent deck={deck} handleSave={handleSave} isNewCard={true} />
    
}

export default AddCard;