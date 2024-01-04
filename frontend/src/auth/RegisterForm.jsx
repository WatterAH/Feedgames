import React from "react";
import { ToastContainer } from "react-toastify";
import { BasicInfo } from "./BasicInfo";

export const RegisterForm = ({ setContent }) => {
  return (
    <section className="sm:mx-auto w-full px-9 py-8">
      <h1 className="text-3xl font-bold mb-10">Registrate</h1>
      <BasicInfo setContent={setContent} />
      <ToastContainer />
    </section>
  );
};
