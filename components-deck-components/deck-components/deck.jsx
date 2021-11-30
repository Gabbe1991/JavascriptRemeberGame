import React from "react";
import { useState, useEffect } from "react";
import Card from "../card-component/Card";

export default function Deck() {
  const [deck, setDeck] = useState([]);
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState([]);
  const [matchedValue, setMatchedValues] = useState([]);

  useEffect(() => {
    getDeck(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?cards=2S,2S,2D,2D,2H,2H,2C,2C,3S,3S,3D,3D,3H,3H,3C,3C,4S,4S,4D,4D,4H,4H,4C,4C,5D,5D,5C,5C,5H,5H,5S,5S,6D,6D,6C,6C,6H,6H,6S,6S,7D,7D,7C,7C,7H,7H,7S,7S"
    );
  }, []);

  async function getDeck(url) {
    setLoading(true); 
    const res = await fetch(url);
    const data = await res.json();
    const res2 = await fetch(
      `https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=48`
    );
    const data2 = await res2.json();

    setDeck(data2.cards);
    setLoading(false);
  }

  useEffect(() => {
    if (target.length > 2) {
      setTarget([]);
    } else if (target.length > 1 && target[0] === target[1]) {
      target.length = 0;
    }
  }, [target]);

  useEffect(() => {
    if (target.length > 1) {
      if (deck[target[0]].code === deck[target[1]].code) {
        matchedValue.push(deck[target[0]].code, deck[target[1]].code);
      }
    }
  }, [target, deck]);

  const targetedCard = (index) => {
    setTarget(() => [...target, index]);
  };

  if (loading) return <h1>Please wait..</h1>;

  return (
    <div>
      {deck &&
        deck.map((card, index) => (
          <Card
            image={card.image}
            key={index}
            alt={"Find a match!"}
            onClick={() => targetedCard(index)}
            targeted={
              target.includes(index) || matchedValue.includes(card.code)
            }
          />
        ))}
    </div>
  );
}