import React from "react";
import { useParams } from "react-router-dom";
import { updateCard } from "../utils/api";
import { useNavigate } from "react-router-dom";
import CardComponent from "./CardComponent";


function EditCard({ deck }) {
    const { cardId } = useParams();
    let card = deck.cards.find(card => card.id == cardId);

    const navigate = useNavigate();

    async function handleSubmit(front, back) {
        card.front = front;
        card.back = back;
        await updateCard(card);
        navigate(`/decks/${deck.id}`);
    }

    if (!card) {
        return <p>Card not found</p>;
    }

    return <CardComponent deck={deck} handleSave={handleSubmit} isNewCard={false} card={card} />

}

export default EditCard;