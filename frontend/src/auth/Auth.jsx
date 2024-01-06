import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { Link } from "./Link";

export const Auth = () => {
  const [content, setContent] = useState("Login");
  const renderContent = () => {
    switch (content) {
      case "Login":
        return <LoginForm setContent={setContent} />;
      case "Register":
        return <RegisterForm setContent={setContent} />;
      default:
        break;
    }
  };
  return (
    <div className="flex flex-1 min-h-full flex-col justify-center h-screen px-6 py-12 sm:bg-gray-100 relative">
      <div
        className={`flex items-center shadow-transparent justify-center bg-white sm:shadow-xl rounded-xl sm:mx-auto ${
          content == "Login" ? "sm:max-w-sm" : "sm:max-w-md"
        } sm:w-full`}
      >
        {renderContent()}
      </div>
      <footer className="absolute bottom-5 left-0 w-full flex justify-center items-center gap-x-4">
        <Link text={"Acerca de Feedgames"} content={"About"} />
        <Link text={"Aviso para los usuarios de iOS"} content={"Issues"} />
      </footer>
    </div>
  );
};
