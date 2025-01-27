"use client";
import React from "react";
import store from "@/store/store";
import ProgressBar from "next-nprogress-bar";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { UserProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import { CookiesProvider } from "react-cookie";
import { AuthReminderProvider } from "@/context/AuthReminderProvider";
import { ScrollRestoration } from "@/context/ScrollRestoration";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <CookiesProvider>
          <Provider store={store}>
            <ScrollRestoration />
            <AuthReminderProvider>
              {children}
              <ProgressBar
                height="4px"
                options={{ showSpinner: false }}
                delay={100}
                shallowRouting
                appDirectory
              />
            </AuthReminderProvider>
            <Toaster richColors position="top-center" />
          </Provider>
        </CookiesProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
