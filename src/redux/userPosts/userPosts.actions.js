import {UserActionTypes} from "./userPosts.types";
export const setCurrentUserPosts=(userPosts)=>({
    type:UserActionTypes.SET_CURRENT_USER_POSTS,
    payload:userPosts
})