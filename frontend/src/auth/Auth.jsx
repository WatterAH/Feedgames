import React, { useState } from "react";

import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { Modal } from "./Modal";

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
    <div className="flex flex-1 min-h-full flex-col justify-center h-screen px-6 py-12">
      <div className="mx-auto mb-5 flex justify-between gap-x-2">
        <h1 className="font-kalnia text-4xl font-bold">CraftFeed</h1>
        <Modal />
      </div>
      <div
        className={`flex items-center justify-center bg-white shadow-xl rounded-xl  sm:mx-auto ${
          content == "Login" ? "sm:max-w-sm" : "sm:max-w-md"
        } sm:w-full`}
      >
        {renderContent()}
      </div>
    </div>
  );
};
