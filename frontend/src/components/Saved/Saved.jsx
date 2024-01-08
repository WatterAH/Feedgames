import React, { useEffect, useState } from "react";
import { Preview } from "../Preview/Preview";
import { useUser } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { LoadingPage } from "../LoadingPage";
import { getMySaved } from "../../Api/actions";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../Api/auth";

export const Saved = () => {
  const nav = useNavigate();
  const { user, login } = useUser();
  const [savedList, setSavedList] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const fetchSaved = async () => {
    try {
      setLoading(true);
      const savedFetched = await getMySaved(user.id);
      setSavedList(savedFetched);
    } catch (error) {
      const { message } = error;
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchSaved();
    }
  }, [user.id]);

  return (
    <div className="flex flex-col h-screen lg:ml-64 gap-y-4 right-0 duration-500 mb-40 lg:mb-0 w-full">
      <header className="flex justify-center lg:justify-normal w-full border-b">
        <h1 className="text-xl sm:text-2xl p-5 md:text-3xl font-montserrat">
          Todas las publicaciones
        </h1>
      </header>
      {loading ? (
        <LoadingPage />
      ) : savedList.length > 0 ? (
        <section className="flex gap-2 px-4 flex-wrap w-full justify-center lg:justify-normal">
          {savedList.map((saved, index) => (
            <Preview key={index} post={saved} savedButton={true} />
          ))}
        </section>
      ) : (
        <p className="text-gray-700 font-montserrat px-5 mx-auto lg:mx-0">
          Parece que aún no has guardado nada.
        </p>
      )}
      <ToastContainer />
    </div>
  );
};
