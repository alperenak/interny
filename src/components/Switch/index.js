import React, { useEffect, useState } from "react";
import "./switch.scss";

export default function Switch({ onChange, checked }) {
  const [switchTrue, setSwitchedTrue] = useState(false);
  useEffect(() => setSwitchedTrue(checked), [checked]);
  return (
    <div className="App">
      <div
        className={`switch ${switchTrue && "switchActive"}`}
        onClick={(e) => {}}
      >
        <div
          className="switch-left-side"
          onClick={() => {
            setSwitchedTrue(false);
            onChange(false);
          }}
        />
        <div
          className="switch-right-side"
          onClick={() => {
            setSwitchedTrue(true);
            onChange(true);
          }}
        />
        <div
          className={`switchCircle ${switchTrue && "switchCircleActive"}`}
        ></div>
      </div>
    </div>
  );
}
