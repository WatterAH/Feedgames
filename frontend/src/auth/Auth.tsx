import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { Link } from "./Link";
import { useLocation } from "react-router-dom";

export const Auth = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [content, setContent] = useState("Login");
  const renderContent = () => {
    switch (content) {
      case "Login":
        return (
          <LoginForm setContent={setContent} searchParams={searchParams} />
        );
      case "Register":
        return <RegisterForm setContent={setContent} />;
      default:
        return "";
    }
  };
  return (
    <div className="flex flex-1 min-h-full flex-col justify-center h-screen px-6 py-12 sm:bg-gray-100">
      <div
        className={`flex flex-col items-center shadow-transparent justify-center bg-white sm:shadow-xl rounded-xl sm:mx-auto ${
          content == "Login" ? "sm:max-w-sm" : "sm:max-w-md"
        } sm:w-full`}
      >
        {renderContent()}
        <footer className="w-full flex mt-5 sm:mt-0 mb-4 justify-center items-center gap-x-4">
          <Link text={"Terminos de servicio"} content={"TermsOfService"} />
          <Link text={"Aviso de privacidad"} content={"Privacy"} />
        </footer>
      </div>
    </div>
  );
};
