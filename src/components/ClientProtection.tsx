"use client";
import { useEffect } from "react";

export default function ClientProtection() {
  useEffect(() => {
    const prevent = (e: Event) => e.preventDefault();

    // Block right click
    document.addEventListener("contextmenu", prevent);

    // Block drag
    document.addEventListener("dragstart", prevent);

    // Block text selection
    document.addEventListener("selectstart", prevent);

    // Block copy
    document.addEventListener("copy", prevent);

    // Block DevTools shortcuts
    const keyHandler = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", keyHandler);

    return () => {
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("dragstart", prevent);
      document.removeEventListener("selectstart", prevent);
      document.removeEventListener("copy", prevent);
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  return null;
}
