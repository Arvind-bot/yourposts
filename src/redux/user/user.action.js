import {UserActionTypes} from "./user.types"

export const setCurrentUser=(user)=>({
    type:UserActionTypes.SET_CURRENT_USER,
    payload:user
})

export const setCurrentUserPosts=(userPosts)=>({
    type:UserActionTypes.SET_CURRENT_USER_POSTS,
    payload:userPosts
})

export const setPostsTableHeader=(header)=>({
    type:UserActionTypes.SET_POSTS_TABLE_HEADER,
    payload:header
})

export const setPostsTableRows=(rows)=>({
    type:UserActionTypes.SET_POSTS_TABLE_ROWS,
    payload:rows
})

