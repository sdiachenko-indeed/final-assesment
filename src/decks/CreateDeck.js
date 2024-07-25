import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { classNames } from '../utils/class-names/index';
import { createDeck } from '../utils/api/index';

function CreateDeck() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleChange = ({ target }) => {
        if (target.name === "CreateDeck-name") setName(target.value);
        else if (target.name === "CreateDeck-description") setDescription(target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
       const abortController = new AbortController();
       const newDeck = {name: name, description: description};
       createDeck(newDeck, abortController.signal);
        setName("");
        setDescription("");
    }
    
    
    return (
        <div>
            <div className='nav-bar'><Link to="/" className='home-link' >
                <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/000000/home.png" alt="home" className='home-icon'/>
                Home</Link> / Create Deck</div>
            <h1 className='CreateDeck-create-deck-h1'>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='CreateDeck-name'>
                    Name
                    <input type='text' name="CreateDeck-name" id="CreateDeck-name" placeholder='Deck Name' onChange={handleChange} value={name} required />
                </label>
                <label htmlFor='CreateDeck-description'>
                    Description<textarea id="CreateDeck-description" name="CreateDeck-description" placeholder='Brief description of the deck' onChange={handleChange} value={description} required ></textarea>
                </label>
                <button type='button' className='CreateDeck-cancel-btn btn btn-secondary' onClick={() => navigate("/")}>Cancel</button>
                <button type='submit' className='CreateDeck-submit-btn btn btn-primary' >Submit</button>
            </form>
        </div>
    );
}

export default CreateDeck;