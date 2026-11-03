import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60_000 },
    },
  });
}

let browserQueryClient;

export function getQueryClient() {
  if (typeof window === "undefined") return makeQueryClient();

  // Conserver le cache navigateur, y compris si un enfant suspend au montage.
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
