import { createContext, useContext, useState } from "react";

interface UIContextType {
  hideFloatingButton: boolean;
  setHideFloatingButton: (hide: boolean) => void;
}

const UIContext = createContext<UIContextType>({
  hideFloatingButton: false,
  setHideFloatingButton: () => {},
});

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [hideFloatingButton, setHideFloatingButton] = useState(false);

  return (
    <UIContext.Provider value={{ hideFloatingButton, setHideFloatingButton }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  return useContext(UIContext);
}
