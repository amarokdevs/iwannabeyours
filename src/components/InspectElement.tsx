"use client";

import { useEffect } from "react";

export function InspectElement() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const handleContextMenu = (event: MouseEvent) => {
        if (event.shiftKey) {
          event.preventDefault();
          const target = event.target as HTMLElement;
          const source = target.getAttribute("data-source");
          if (source) {
            window.open(`vscode://file/${source}`);
          } else {
            console.log(
              "Source not found. Make sure you're using the custom babel plugin."
            );
          }
        }
      };

      document.addEventListener("contextmenu", handleContextMenu);
      return () => {
        document.removeEventListener("contextmenu", handleContextMenu);
      };
    }
  }, []);

  return null;
}
