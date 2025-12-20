export function PageLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-black z-50">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/5 dark:bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Logo container with rotation animation */}
      <div className="relative z-10 mb-8">
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Outer spinning ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-primary border-r-primary/30 dark:border-t-blue-400 dark:border-r-blue-400/30 rounded-full animate-spin" />
          
          {/* Middle pulsing ring */}
          <div className="absolute inset-3 border-2 border-primary/20 dark:border-blue-400/20 rounded-full animate-pulse" />
          
          {/* Logo image */}
          <div className="relative z-20 w-24 h-24 rounded-lg overflow-hidden shadow-lg animate-bounce" style={{ animationDuration: '2s' }}>
            <img 
              src="/logo.png" 
              alt="Pixocraft Tools" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Text section */}
      <div className="relative z-10 text-center space-y-3">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Pixocraft Tools</h2>
        <p className="text-sm text-muted-foreground dark:text-gray-400">Loading amazing tools for you...</p>
        
        {/* Animated dots */}
        <div className="flex items-center justify-center gap-1 pt-2">
          <span className="w-2 h-2 bg-primary dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <span className="w-2 h-2 bg-primary dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <span className="w-2 h-2 bg-primary dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
}
