export function PageLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">

      {/* Subtle radial glow behind the logo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 45%, hsl(217 91% 40% / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-6">

        {/* Logo + animated ring */}
        <div className="relative flex items-center justify-center">
          {/* Spinning ring */}
          <svg
            className="absolute"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            style={{ animation: "spin 1.8s linear infinite" }}
          >
            <circle
              cx="40"
              cy="40"
              r="34"
              stroke="hsl(217 91% 40% / 0.15)"
              strokeWidth="3"
            />
            <circle
              cx="40"
              cy="40"
              r="34"
              stroke="hsl(217 91% 40%)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="60 154"
              strokeDashoffset="0"
            />
          </svg>

          {/* Logo */}
          <div className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center bg-primary/10">
            <img
              src="/logo.png"
              alt="Pixocraft Tools"
              width="40"
              height="40"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Brand name */}
        <div className="text-center space-y-1">
          <p className="text-base font-semibold text-foreground tracking-wide">
            Pixocraft Tools
          </p>
          <p className="text-xs text-muted-foreground">Loading your tool…</p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-1.5 items-center">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-1.5 h-1.5 rounded-full bg-primary"
              style={{
                animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { opacity: 0.25; transform: scale(0.85); }
          40% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
