import React from "react";
import { useState } from "react";

function ModalTF({ teamArray }) {
  const count = {};

  for (const team of teamArray) {
    if (count[team]) {
      count[team] += 1;
    } else {
      count[team] = 1;
    }
  }
  return <>{Object.keys(count).map((key) => {})}</>;
}

export default ModalTF;
