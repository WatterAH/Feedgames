import React, { useEffect, useState } from "react";
import { useUser } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { LoadingPage } from "../LoadingPage";
import { getMySaved } from "../../Api/actions";
import { SavedTitle } from "./SavedTitle";
import { NotSaved } from "./NotSaved";
import { MapSaved } from "./MapSaved";

export const Saved = () => {
  const { user } = useUser();
  const [savedList, setSavedList] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <SavedTitle />
      {loading ? (
        <LoadingPage />
      ) : savedList.length > 0 ? (
        <MapSaved savedList={savedList} />
      ) : (
        <NotSaved />
      )}
      <ToastContainer />
    </div>
  );
};
