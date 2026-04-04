"use client";

import { useEffect } from "react";
import Title from "./Title";
import Card from "./Card";
import { useUser } from "@/context/AuthContext";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchParties, setHasUnread } from "@/store/inboxSlice";
import New from "../Party/New";
import Search from "../Party/Search";
import Party from "../Party/Party";
import InfiniteScroll from "react-infinite-scroll-component";
import Empty from "./Empty";
import { PartiesLoader } from "./Loaders";

export default function InboxPage() {
  const { user } = useUser();
  const dispatch: AppDispatch = useDispatch();
  const { parties, hasMore, loading } = useSelector(
    (state: RootState) => state.inbox,
  );

  useEffect(() => {
    if (user.id && parties.length < 10) {
      dispatch(fetchParties(user.id, 10));
    }
  }, [dispatch, user.id, parties.length]);

  const getMore = () => {
    if (hasMore && !loading && user?.id) {
      dispatch(fetchParties(user.id, 10));
    }
  };

  useEffect(() => {
    dispatch(setHasUnread(false));
  }, [dispatch]);

  return (
    <>
      <Title title="Mensajes" />
      <Card />
      <div className="w-full max-w-2xl pt-20 pb-14 md:pt-3 md:mt-[11vh] lg:pb-0 z-10">
        <header className="flex w-full items-center gap-3 px-3">
          <div className="flex-1">
            <Search />
          </div>
          <div className="flex-none">
            <New />
          </div>
        </header>
        {loading ? (
          <PartiesLoader />
        ) : (
          <InfiniteScroll
            className="mt-3"
            dataLength={parties.length}
            hasMore={hasMore}
            next={getMore}
            loader={<PartiesLoader />}
          >
            {parties.length > 0 ? (
              parties.map((party) => <Party key={party.id} {...party} />)
            ) : (
              <Empty text="Esto está muy vacío..." />
            )}
          </InfiniteScroll>
        )}
      </div>
    </>
  );
}
