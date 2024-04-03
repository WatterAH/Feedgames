import React, { useEffect, useState } from "react";
import { useUser } from "../../Context/AuthContext";
import { LoadingPage } from "../LoadingPage";
import { getMySaved } from "../../api/actions";
import { SavedTitle } from "./SavedTitle";
import { NotSaved } from "./NotSaved";
import { MapSaved } from "./MapSaved";
import { PostInterface } from "../../interfaces/Post";
import { ErrorPage } from "../ErrorPage";

export const Saved = () => {
  const { user } = useUser();
  const [savedList, setSavedList] = useState<PostInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchSaved = async () => {
    try {
      setLoading(true);
      const savedFetched = await getMySaved(user.id);
      setSavedList(savedFetched);
    } catch (error: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchSaved();
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [user.id]);

  return (
    <div
      className={`flex flex-col h-screen lg:ml-64 gap-y-4 right-0 duration-500 w-full ${
        savedList.length >= 3 ? "mb-10" : "mb-0"
      }`}
    >
      <SavedTitle />
      {loading ? (
        <LoadingPage />
      ) : error ? (
        <ErrorPage />
      ) : savedList.length > 0 ? (
        <MapSaved savedList={savedList} />
      ) : (
        <NotSaved />
      )}
    </div>
  );
};
