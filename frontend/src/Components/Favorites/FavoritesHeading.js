// Author: Viren Babubhai Malavia (B00895669)

import React from "react";

function FavoritesHeading(props) {
  return (
    <div
      className="favorites-heading"
      style={{ width: "85%", margin: "3rem auto" }}
    >
      <h1>{props.heading}</h1>
      <hr />
    </div>
  );
}

export default FavoritesHeading;
