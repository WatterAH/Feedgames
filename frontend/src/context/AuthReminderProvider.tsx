import React, { createContext, useContext, useState } from "react";
import { alerts } from "@/constants/alerts";
import AuthReminder from "@/layout/Pages/AuthReminder";

type AuthReminderType = keyof typeof alerts;

type AuthReminderContextType = {
  triggerAlert: (type: AuthReminderType) => void;
};

const defaultContext: AuthReminderContextType = {
  triggerAlert: () => {
    throw new Error("triggerAlert debe ser usado dentro de un AlertProvider");
  },
};

const AuthReminderContext =
  createContext<AuthReminderContextType>(defaultContext);

export const AuthReminderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [reminderData, setReminderData] = useState(alerts.cantLike);

  const triggerAlert = (type: AuthReminderType) => {
    setReminderData(alerts[type]);
    setOpen(true);
  };

  return (
    <AuthReminderContext.Provider value={{ triggerAlert }}>
      {children}
      <AuthReminder open={open} setOpen={setOpen} {...reminderData} />
    </AuthReminderContext.Provider>
  );
};

export const useAuthReminder = () => {
  return useContext(AuthReminderContext);
};
