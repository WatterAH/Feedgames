export const UPDATE_POST_INTERACTION = "UPDATE_POST_INTERACTION";
export const REMOVE_POST = "REMOVE_POST";
export const ADD_POST = "ADD_POST";
export const RESET_ALL = "RESET_ALL";

type InteractionType = "like" | "save" | "unlike" | "unsave";

export interface UpdatePostInteractionAction {
  type: typeof UPDATE_POST_INTERACTION;
  payload: {
    postId: string;
    type: InteractionType;
  };
}

export interface RemovePostAction {
  type: typeof REMOVE_POST;
  payload: string;
}

export const updatePostInteraction = (
  postId: string,
  type: InteractionType
) => ({
  type: UPDATE_POST_INTERACTION,
  payload: { postId, type },
});

export const deletePost = (postId: string) => ({
  type: REMOVE_POST,
  payload: postId,
});

export const resetAll = () => ({
  type: RESET_ALL,
});
