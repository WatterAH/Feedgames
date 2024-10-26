export const UPDATE_POST_INTERACTION = "UPDATE_POST_INTERACTION";
export const REMOVE_POST = "REMOVE_POST";
export const ADD_POST = "ADD_POST";
export const RESET_ALL = "RESET_ALL";
export const UPDATE_POST = "UPDATE_POST";

type InteractionType = "like" | "save" | "unlike" | "unsave";

export interface UpdatePostInteractionAction {
  type: typeof UPDATE_POST_INTERACTION;
  payload: {
    postId: string;
    type: InteractionType;
  };
}

export const updatePostInteraction = (
  postId: string,
  type: InteractionType
) => ({
  type: UPDATE_POST_INTERACTION,
  payload: { postId, type },
});

export interface RemovePostAction {
  type: typeof REMOVE_POST;
  payload: string;
}

export const deletePost = (postId: string) => ({
  type: REMOVE_POST,
  payload: postId,
});

export const resetAll = () => ({
  type: RESET_ALL,
});

export interface UpdatePostAction {
  type: typeof UPDATE_POST;
  payload: {
    postId: string;
    content: string;
  };
}

export const updatePost = (postId: string, content: string) => ({
  type: UPDATE_POST,
  payload: { postId, content },
});
