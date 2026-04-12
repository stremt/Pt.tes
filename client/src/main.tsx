import { createRoot } from "react-dom/client";
import { Component, ReactNode } from "react";
import App from "./App";
import "./index.css";

class RootErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("[RootErrorBoundary] Caught error:", error);
    console.error("[RootErrorBoundary] Component stack:", info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: "20px", fontFamily: "monospace", background: "#fff", color: "#333" }}>
          <h1 style={{ color: "#c00" }}>Something went wrong</h1>
          <pre style={{ background: "#f5f5f5", padding: "12px", borderRadius: "4px", overflow: "auto" }}>
            {this.state.error.message}
            {"\n\n"}
            {this.state.error.stack}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: "12px", padding: "8px 16px", cursor: "pointer" }}>
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

if (typeof window !== "undefined") {
  window.onerror = function (msg, url, line, col, error) {
    console.error("[GLOBAL ERROR]", msg, "at", url, line, col, error);
    return false;
  };

  window.addEventListener("unhandledrejection", function (event) {
    console.error("[UNHANDLED PROMISE REJECTION]", event.reason);
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('ServiceWorker registered:', registration);

        navigator.serviceWorker.addEventListener('controllerchange', () => {
          console.log('ServiceWorker updated — reloading for fresh assets');
          window.location.reload();
        });
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

createRoot(document.getElementById("root")!).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>
);
