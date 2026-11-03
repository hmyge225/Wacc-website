"use client";

import { Toaster } from "react-hot-toast";

export function NotificationToaster() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--surface)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
        },
      }}
    />
  );
}
