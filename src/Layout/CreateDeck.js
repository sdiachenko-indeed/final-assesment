import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index.js";

function CreateDeck({ updateDecks }) {
  const [newDeck, setNewDeck] = useState({ name: "", description: "" });
  const history = useHistory();

  const formChange = ({ target }) => {
    setNewDeck({ ...newDeck, [target.name]: target.value });
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    const response = await createDeck(newDeck);
    history.push(`/decks/${response.id}`);
    updateDecks(1);
  };

  return (
    <div className="CreateDeck max-w-2xl mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Create Deck</h1>
      <form onSubmit={formSubmit}>
        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={newDeck.name}
            onChange={formChange}
            placeholder="Deck Name"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="form-group mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={newDeck.description}
            onChange={formChange}
            placeholder="Brief description of the deck."
            rows={5}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <Link
            to="/"
            className="btn btn-secondary mr-4 px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="btn btn-primary px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateDeck;
