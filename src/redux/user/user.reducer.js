import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  userPosts: [],
  headers:[],
  rows:[]
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.SET_CURRENT_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload,
      };
    case UserActionTypes.SET_POSTS_TABLE_HEADER:
      return {
        ...state,
        headers: action.payload,
      };
    case UserActionTypes.SET_POSTS_TABLE_ROWS:
      return {
        ...state,
        rows: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
