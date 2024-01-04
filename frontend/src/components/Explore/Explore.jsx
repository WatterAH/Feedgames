import React from "react";
import { Profile } from "../Profile/Profile";
import { ExplorePost } from "../Post/ExplorePost";
import { Home } from "../../home/Home";
import { ExploreComment } from "../Comment/ExploreComment";

export const Explore = ({ contentType, id }) => {
  const renderContent = () => {
    switch (contentType) {
      case "Profile":
        return <Profile id={id} />;
      case "Post":
        return <ExplorePost postId={id} />;
      case "Comment":
        return <ExploreComment commentId={id} />;
      default:
        return <Home />;
    }
  };
  return <div className="lg:ml-64 w-full px-3">{renderContent()}</div>;
};
