import { UserActionTypes } from "./dataTableHeader.types";

const INITIAL_STATE = {
  headers:[]
};

export const dataTableHeaderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_POSTS_TABLE_HEADER:
      return {
        ...state,
        headers: action.payload,
      };
    default:
      return state;
  }
};