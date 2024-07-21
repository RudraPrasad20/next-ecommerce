"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

let browserQueryClient: QueryClient | undefined = undefined;

function makeQueryClient() {
  return new QueryClient();
}

function getQueryClient() {
  // if we are on server
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    // if on client
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }

    return browserQueryClient;
  }
}
const queryClient = getQueryClient();

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
      {children}
      </RecoilRoot>
    </QueryClientProvider>
  );
}
