"use client";

import { Suspense, useState } from "react";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "motion/react";
import { NotificationToaster } from "@/shared/components/feedback/NotificationToaster";
import { makeStore } from "@/app/store";
import { getQueryClient } from "./query-client";

export function AppProviders({ children }) {
  // Une instance par montage, jamais de store partagé entre requêtes serveur.
  const [store] = useState(makeStore);

  return (
    <Provider store={store}>
      <QueryClientProvider client={getQueryClient()}>
        <MotionConfig reducedMotion="user">
          {children}
          <Suspense fallback={null}>
            <NotificationToaster />
          </Suspense>
        </MotionConfig>
      </QueryClientProvider>
    </Provider>
  );
}
