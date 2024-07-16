import { router } from "expo-router";

export const goToPost = (path: string, params: any) => {
  router.push({
    pathname: `/${path}/post`,
    params,
  });
};

export const goToProfile = (path: string, params: any) => {
  router.push({
    pathname: `/${path}/profile`,
    params,
  });
};

export const gotToComment = (path: string, params: any) => {
  router.push({
    pathname: `/${path}/comment`,
    params,
  });
};
