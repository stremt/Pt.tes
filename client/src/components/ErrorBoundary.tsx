import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("[ErrorBoundary] Caught error:", error);
    console.error("[ErrorBoundary] Component stack:", info.componentStack);
    try {
      if (typeof window !== "undefined" && (window as any).__logError) {
        (window as any).__logError(error, info);
      }
    } catch (_) {}
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div
          style={{
            padding: "40px 24px",
            maxWidth: "600px",
            margin: "40px auto",
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
          <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>
            This tool ran into a problem
          </h2>
          <p style={{ color: "#666", marginBottom: "20px", fontSize: "14px" }}>
            The rest of the app is still working. You can try reloading this tool or go back to the homepage.
          </p>
          {this.state.error && (
            <details
              style={{
                marginBottom: "20px",
                textAlign: "left",
                background: "#f5f5f5",
                padding: "12px",
                borderRadius: "6px",
                fontSize: "12px",
                wordBreak: "break-word",
              }}
            >
              <summary style={{ cursor: "pointer", fontWeight: "600", marginBottom: "8px" }}>
                Error details
              </summary>
              <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
                {this.state.error.toString()}
                {"\n\n"}
                {this.state.error.stack}
              </pre>
            </details>
          )}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button
              onClick={this.handleReset}
              style={{
                padding: "8px 20px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Try Again
            </button>
            <button
              onClick={() => {
                if (typeof window !== "undefined") window.location.href = "/";
              }}
              style={{
                padding: "8px 20px",
                background: "#e5e7eb",
                color: "#111",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Go Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
