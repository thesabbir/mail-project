import React from "react";
import ReactDOM from "react-dom";
import "typeface-open-sans";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

if (module.hot) {
  module.hot.accept("./App", async () => {
    const NewApp = require("./App").default;
    ReactDOM.render(
      <React.StrictMode>
        <NewApp />
      </React.StrictMode>,
      rootElement
    );
  });
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
