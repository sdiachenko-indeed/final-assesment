import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
 import { readCard, updateCard, createCard, readDeck } from '../utils/api/index';

 function AddEditCards() {
    const {deckId, cardId} = useParams();
    const [card, setCard] = useState([]);
    const [frontCardText, setFrontCardText] = useState("");
    const [backCardText, setBackCardText] = useState("");
    const navigate = useNavigate();
    const [waitToAddCard, setWaitToAddCard] = useState(false);
    const abortController = new AbortController();
    const [updateEditCardText, setUpdateEditCardText] = useState(false);
    const [deckName, setDeckName] = useState("");
   
 
  const [waitForCardToUpdate, setWaitForCardToUpdate] = useState(false); 
  useEffect(() => { 
    if (cardId) {  
    async function displayEditCardText() {
       try { 
             setUpdateEditCardText(true)
            } catch (error) { 
               console.error(error); 
           } 
       } displayEditCardText();
       return () => abortController.abort();
    } else return;
   }, [deckId]);

   useEffect(() => { 
    if (cardId) {   
        async function getCard() { 
           try { 
              const currentCard = await readCard(cardId, abortController.signal);
               setCard(currentCard); 
               setFrontCardText(currentCard.front);
               setBackCardText(currentCard.back);
              } catch (error) { 
                  console.error(error); 
              } 
          } getCard(); 
            return () => abortController.abort();
        } else return;
      }, [updateEditCardText]);

       useEffect(() => {  
        if (waitToAddCard && !cardId) { 
           async function createCardData() { 
               try { 
                   await createCard(deckId, {front: frontCardText, back: backCardText}, abortController.signal);
                   setFrontCardText("");
                   setBackCardText("");
                } catch (error) { 
                       console.error(error); 
                  }
              } createCardData(); 
            }  return () => abortController.abort();
      }, [waitToAddCard]);

       useEffect(() => { 
        if (waitForCardToUpdate && cardId) {             
           async function updateCardData() { 
               try { 
                   await updateCard(card, abortController.signal);
                     setWaitForCardToUpdate(false);
                     setFrontCardText("");
                     setBackCardText("");
                     navigate(`/decks/${deckId}`);
                    } catch (error) { 
                       console.error(error); 
                   }
                } updateCardData(); 
               } return () => abortController.abort();
           }, [waitForCardToUpdate, navigate, card, deckId]);


       const handleChange = ({ target }) => {
          if(cardId) {
            if (target.name === "EditCard-front-text") setFrontCardText(target.value);
            else if (target.name === "EditCard-back-text") setBackCardText(target.value);
         } else {
            if (target.name === "AddCard-front-text") setFrontCardText(target.value);
            else if (target.name === "AddCard-back-text") setBackCardText(target.value);
          }
        }

       const handleSubmit = event => { 
        event.preventDefault();
          if (cardId) {
            setCard({ id: Number(card.id), front: frontCardText, back: backCardText, 
            deckId: Number(card.deckId), 
        }); 
        setWaitForCardToUpdate(true);
      } else setWaitToAddCard(true); 
    };
    
       return (
                <form onSubmit={handleSubmit}>
                <label htmlFor={cardId ? "EditCard-front-text" : 'AddCard-front-text'} className={cardId ? 'EditCard-front-text-label' : ""} >
                    Front
                    <textarea id={cardId ? "EditCard-front-text" : "AddCard-front-text"} 
                    name={cardId ? "EditCard-front-text" : "AddCard-front-text" }
                     placeholder={cardId ? card.front : 'Front side of card'}
                      onChange={handleChange} value={frontCardText} required ></textarea>
                </label>
                <label htmlFor={cardId ? "EditCard-back-text" : 'AddCard-back-text'} >Back
                    <textarea id={cardId ? "EditCard-back-text" : "AddCard-back-text"} name={cardId ? "EditCard-back-text" : "AddCard-back-text"}
                     placeholder={cardId ? card.front : 'Back side of card'} 
                     onChange={handleChange} value={backCardText} required />
                </label>
                <button type="button" className={cardId ? "EditCard-cancel-btn btn btn-secondary" : 'AddCard-done-btn btn btn-secondary' } onClick={() => navigate(`/decks/${deckId}`)} >Cancel</button>
                <button type="submit" className={cardId ? "EditCard-submit-btn btn btn-primary" : 'AddCard-submit-btn btn btn-primary'} >Submit</button>
            </form>
        )
 }

 export default AddEditCards;