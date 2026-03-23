import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('ServiceWorker registered:', registration);
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}

console.log(
  "%cWelcome, developer 👀\n%cEverything here runs client-side.\nYour data never leaves your device.",
  "font-size: 18px; font-weight: bold;",
  "font-size: 13px;"
);

createRoot(document.getElementById("root")!).render(<App />);
