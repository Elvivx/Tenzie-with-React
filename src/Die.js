import React from "react";

function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "blue" : "white"
  };
  return (
    <>
      <div onClick={props.holdDice} className="die-face" style={styles}>
        <h1 className="die-num">{props.value}</h1>
      </div>
    </>
  );
}
export default Die;
