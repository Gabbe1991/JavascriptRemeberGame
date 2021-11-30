  import React from "react";
  import cardBack from "./BacksideofCards.jpg";
  import "./kort.css";
  
  export default function Card(props) {
    return (
      <img
        className="card-img"
        src={props.targeted ? props.image : cardBack}
        alt=""
        onClick={props.onClick}
      />
    );
  } 