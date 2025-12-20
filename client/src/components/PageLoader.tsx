export function PageLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-black z-50">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-muted border-t-primary dark:border-t-blue-400 rounded-full animate-spin mb-4" />
      
      {/* Loading text */}
      <p className="text-sm text-muted-foreground dark:text-gray-400 mb-8">Loading...</p>
      
      {/* Progress bar */}
      <div className="w-48 h-1 bg-muted dark:bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-primary dark:bg-blue-400 rounded-full animate-pulse" style={{
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
      </div>
    </div>
  );
}
