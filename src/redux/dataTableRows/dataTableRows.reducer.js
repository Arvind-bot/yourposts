import { UserActionTypes } from "./dataTableRows.types";

const INITIAL_STATE = {
  rows:[]
};

export const dataTableRowsReducer= (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_POSTS_TABLE_ROWS:
      return {
        ...state,
        rows: action.payload,
      };

    default:
      return state;
  }
};