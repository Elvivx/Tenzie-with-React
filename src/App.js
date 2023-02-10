import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Die from "./Die";
import "./styles.css";
import Confetti from "react-confetti";

export default function Apps() {
  //make a new randomized die array
  function generateDice() {
    return {
      value: Math.ceil(Math.random() * 7),
      isHeld: false,
      id: nanoid()
    };
  }
  const [tenzies, setTenzies] = useState(false);
  const [dice, setDice] = useState(allNewDice());
  const diceElement = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  //check if the die is being held
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  //to creat a new die array
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDice());
    }
    return newDice;
  }

  //to roll the dies
  function roll() {
    if (!tenzies) {
      setDice((prevState) =>
        prevState.map((die) => {
          return die.isHeld ? die : generateDice();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }
  //to hold the selected die not to roll
  function holdDice(id) {
    setDice((prevState) =>
      prevState.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  /*function won(){
   if(tenzies){
    <Confetti /> 

   }else{
        "ROLL"
   }
}*/
  //for text to be on the button
  const flip = tenzies ? "NEW GAME" : "ROLL";

  return (
    <>
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="info">
          Keep rolling the dice until all 10 dice are the same.Click on a die to
          hold it's number in place betwwen rolls....
        </p>
        <div className="dice-container">{diceElement}</div>
        <button onClick={roll} className="btn">
          {flip}
        </button>
      </main>
    </>
  );
}
