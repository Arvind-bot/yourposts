import {UserActionTypes} from "./dataTableRows.types";

export const setPostsTableRows=(rows)=>({
    type:UserActionTypes.SET_POSTS_TABLE_ROWS,
    payload:rows
})