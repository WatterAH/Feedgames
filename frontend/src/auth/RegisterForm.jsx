import React from "react";
import { ToastContainer } from "react-toastify";
import { BasicInfo } from "./BasicInfo";
import { Header } from "./Header";

export const RegisterForm = ({ setContent }) => {
  return (
    <section className="sm:mx-auto w-full px-2 sm:px-9 py-8">
      <Header />
      <BasicInfo setContent={setContent} />
      <ToastContainer />
    </section>
  );
};
