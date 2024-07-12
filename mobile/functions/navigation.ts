import { router } from "expo-router";

export const goToPost = (
  pathName: string,
  params: { id: string; username: string }
) => {
  switch (pathName) {
    case "/home":
    case "/home/profile":
    case "/home/search":
      return router.push({ pathname: "/home/post", params });
    case "/profile":
    case "/profile/saves":
    case "/profile/likes":
    case "/profile/exploreProfile":
      return router.push({ pathname: "/profile/post", params });
    case "/notifications/profile":
      return router.push({ pathname: "/notifications/post", params });
    default:
      break;
  }
};

export const goToProfile = (pathName: string, params: { id: string }) => {
  switch (pathName) {
    case "/home":
    case "/home/post":
    case "/home/search":
      return router.push({ pathname: "/home/profile", params });
    case "/profile/post":
      return router.push({ pathname: "/profile/exploreProfile", params });
    case "/notifications/post":
      return router.push({ pathname: "/notifications/profile", params });
    default:
      break;
  }
};

export const gotToComment = (
  pathName: string,
  params: { id: string; username: string }
) => {
  switch (pathName) {
    case "/home/post":
    case "/home/comment":
    case "/home/search":
      return router.push({ pathname: "/home/comment", params });
    case "/profile/post":
    case "/profile/likes":
    case "/profile/saves":
    case "/profile/comment":
      return router.push({ pathname: "/profile/comment", params });
    case "/notifications/post":
    case "/notifications/comment":
      return router.push({ pathname: "/notifications/comment", params });
    default:
      break;
  }
};
