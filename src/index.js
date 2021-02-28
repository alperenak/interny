import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../public/interny-logo.ico";
import "../public/manifest.json";
import App from "./App";
import "./i18n";
import AlertBoxContexProvider from "./context/alertboxContext";
ReactDOM.render(
  <AlertBoxContexProvider>
    <App />
  </AlertBoxContexProvider>,
  document.getElementById("root")
);
