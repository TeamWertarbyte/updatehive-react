import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {ChangelogContainer} from "../lib";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div>UpdateHive - React Client Component</div>
    <ChangelogContainer/>
  </React.StrictMode>,
);
