"use client";
import { authOptions } from "@/lib/auth/authOptions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getSession, SessionProvider } from "next-auth/react";
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

export function QueryProvider({ children, session }: { children: React.ReactNode, session: any }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
      <RecoilRoot>
      {children}
      </RecoilRoot>
      </SessionProvider>
    </QueryClientProvider>
  );
}
