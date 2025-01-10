import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router";

import { App } from "./App";

const container = document.getElementById("root");
if (container !== null) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>,
  );
}
