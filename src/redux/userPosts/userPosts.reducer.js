import { UserActionTypes } from "./userPosts.types";

const INITIAL_STATE = {
  userPosts: []
};

export const userPostsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case UserActionTypes.SET_CURRENT_USER_POSTS:
        return {
          ...state,
          userPosts: action.payload,
        };
      default:
        return state;
    }
  };