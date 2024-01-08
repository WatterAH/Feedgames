import React, { useEffect } from "react";
import { CreateBlog } from "./CreateBlog";
import { useUser } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../Api/auth";

export const Create = () => {
  const { login } = useUser();
  const nav = useNavigate();

  const handleToken = async () => {
    try {
      const data = await checkAuth();
      login(data);
    } catch (error) {
      nav("/auth");
    }
  };

  useEffect(() => {
    handleToken();
  }, []);

  return (
    <div className="w-full flex justify-center ml:0 lg:ml-64 p-4">
      <CreateBlog />
    </div>
  );
};
