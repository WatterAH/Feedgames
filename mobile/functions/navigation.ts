import { router } from "expo-router";

export const goToPost = (path: string, params: any) => {
  router.navigate({
    pathname: `/${path}/post`,
    params,
  });
};

export const goToProfile = (path: string, params: any) => {
  const pathname =
    path === "profile" ? `/${path}/exploreProfile` : `/${path}/profile`;
  router.navigate({
    pathname,
    params,
  });
};

export const gotToComment = (path: string, params: any) => {
  router.navigate({
    pathname: `/${path}/comment`,
    params,
  });
};
