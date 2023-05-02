import React from "react";
import ReactDOM from "react-dom/client";
import { HomePage } from "./pages/HomePage";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import "./scss/bs.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);

serviceWorkerRegistration.unregister();

reportWebVitals();
