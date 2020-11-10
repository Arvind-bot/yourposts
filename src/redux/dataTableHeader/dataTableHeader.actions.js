import {UserActionTypes} from "./dataTableHeader.types"
export const setPostsTableHeader=(header)=>({
    type:UserActionTypes.SET_POSTS_TABLE_HEADER,
    payload:header
})