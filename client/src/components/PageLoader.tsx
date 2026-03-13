export function PageLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50 overflow-hidden">

      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute" style={{ width: "600px", height: "600px", top: "50%", left: "50%", transform: "translate(-50%, -60%)" }}>
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(217 91% 40% / 0.10) 0%, transparent 70%)",
              animation: "orbPulse 4s ease-in-out infinite",
            }}
          />
        </div>
        <div className="absolute" style={{ width: "400px", height: "400px", top: "60%", left: "40%", transform: "translate(-50%, -50%)" }}>
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(262 83% 52% / 0.06) 0%, transparent 70%)",
              animation: "orbPulse 5.5s ease-in-out 1s infinite",
            }}
          />
        </div>
        <div className="absolute" style={{ width: "350px", height: "350px", top: "40%", left: "65%", transform: "translate(-50%, -50%)" }}>
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(217 91% 40% / 0.07) 0%, transparent 70%)",
              animation: "orbPulse 6s ease-in-out 2s infinite",
            }}
          />
        </div>
      </div>

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(217 91% 40%) 1px, transparent 1px), linear-gradient(90deg, hsl(217 91% 40%) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Main content */}
      <div
        className="relative flex flex-col items-center gap-8"
        style={{ animation: "fadeSlideUp 0.5s ease-out forwards" }}
      >

        {/* Logo + rings */}
        <div className="relative flex items-center justify-center">

          {/* Outer slow ring */}
          <svg
            className="absolute"
            width="110"
            height="110"
            viewBox="0 0 110 110"
            fill="none"
            style={{ animation: "spinCCW 8s linear infinite" }}
          >
            <circle
              cx="55"
              cy="55"
              r="48"
              stroke="hsl(217 91% 40% / 0.12)"
              strokeWidth="1.5"
              strokeDasharray="6 12"
              strokeLinecap="round"
            />
          </svg>

          {/* Inner fast ring */}
          <svg
            className="absolute"
            width="90"
            height="90"
            viewBox="0 0 90 90"
            fill="none"
            style={{ animation: "spinCW 2s linear infinite" }}
          >
            <circle
              cx="45"
              cy="45"
              r="38"
              stroke="hsl(217 91% 40% / 0.12)"
              strokeWidth="2"
            />
            <circle
              cx="45"
              cy="45"
              r="38"
              stroke="hsl(217 91% 40%)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="55 184"
              strokeDashoffset="0"
            />
          </svg>

          {/* Logo container with glow */}
          <div
            className="relative w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center"
            style={{
              background: "hsl(217 91% 40% / 0.08)",
              border: "1px solid hsl(217 91% 40% / 0.2)",
              boxShadow: "0 0 24px hsl(217 91% 40% / 0.18), inset 0 1px 0 hsl(0 0% 100% / 0.08)",
              animation: "logoPulse 3s ease-in-out infinite",
            }}
          >
            <img
              src="/logo.png"
              alt="Pixocraft Tools"
              width="44"
              height="44"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Text */}
        <div className="text-center space-y-1.5">
          <p className="text-sm font-semibold text-foreground tracking-widest uppercase">
            Pixocraft Tools
          </p>
          <p className="text-xs text-muted-foreground tracking-wide">
            Loading your tool
          </p>
        </div>

        {/* Progress bar */}
        <div
          className="rounded-full overflow-hidden"
          style={{
            width: "160px",
            height: "3px",
            background: "hsl(217 91% 40% / 0.12)",
          }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, hsl(217 91% 40%), hsl(262 83% 60%))",
              animation: "progressFill 2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
              boxShadow: "0 0 8px hsl(217 91% 40% / 0.6)",
            }}
          />
        </div>

      </div>

      <style>{`
        @keyframes spinCW {
          to { transform: rotate(360deg); }
        }
        @keyframes spinCCW {
          to { transform: rotate(-360deg); }
        }
        @keyframes logoPulse {
          0%, 100% { box-shadow: 0 0 24px hsl(217 91% 40% / 0.18), inset 0 1px 0 hsl(0 0% 100% / 0.08); }
          50% { box-shadow: 0 0 36px hsl(217 91% 40% / 0.32), inset 0 1px 0 hsl(0 0% 100% / 0.08); }
        }
        @keyframes orbPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.15); }
        }
        @keyframes progressFill {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 60%; margin-left: 20%; }
          100% { width: 0%; margin-left: 100%; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
