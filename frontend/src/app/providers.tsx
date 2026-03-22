"use client";
import React from "react";
import store from "@/store/store";
import { AppProgressProvider } from "@bprogress/next";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { UserProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import { SocketProvider } from "@/context/SocketContext";
import { CookiesProvider } from "react-cookie";
import { ScrollRestoration } from "@/context/ScrollRestoration";
import { AuthReminderProvider } from "@/context/AuthReminderProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <CookiesProvider>
          <Provider store={store}>
            <SocketProvider>
              <ScrollRestoration />
              <AuthReminderProvider>
                <AppProgressProvider
                  height="4px"
                  options={{ showSpinner: false }}
                  shallowRouting
                  color="var(--placeholder)"
                >
                  {children}
                </AppProgressProvider>
              </AuthReminderProvider>
              <Toaster richColors position="top-center" />
            </SocketProvider>
          </Provider>
        </CookiesProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
