import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import App component
import App from "./App.jsx";

// Import Fonts
import "@fontsource-variable/red-hat-display";
import "@fontsource-variable/lexend";
import "@fontsource-variable/red-hat-mono";
import "@fontsource-variable/fira-code";

// Import styles
import "tippy.js/dist/tippy.css";
import "rc-slider/assets/index.css";
import "./App.scss";

// Component to render app in strict mode
const StrictModeApp = () => {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
};

// Create Root and render the app in strict mode
createRoot(document.getElementById("root")).render(<StrictModeApp />);
