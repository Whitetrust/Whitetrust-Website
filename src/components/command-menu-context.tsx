"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Ctx = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const CommandCtx = createContext<Ctx | null>(null);

export function CommandMenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <CommandCtx.Provider value={{ isOpen, open, close }}>{children}</CommandCtx.Provider>
  );
}

export function useCommandMenu() {
  const v = useContext(CommandCtx);
  if (!v) throw new Error("useCommandMenu outside provider");
  return v;
}
