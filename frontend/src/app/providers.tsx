"use client";
import React from "react";
import store from "@/store/store";
import ProgressBar from "next-nprogress-bar";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { UserProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import { SocketProvider } from "@/context/SocketContext";
import { CookiesProvider } from "react-cookie";
import { ScrollRestoration } from "@/context/ScrollRestoration";
import { AuthReminderProvider } from "@/context/AuthReminderProvider";
import { PostVisualizerProvider } from "@/context/PostVisualizerContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <CookiesProvider>
          <Provider store={store}>
            <SocketProvider>
              <PostVisualizerProvider>
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
              </PostVisualizerProvider>
              <Toaster richColors position="top-center" />
            </SocketProvider>
          </Provider>
        </CookiesProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
