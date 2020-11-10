import {combineReducers} from "redux";
import {userReducer} from "./user/user.reducer";
import {userPostsReducer} from "./userPosts/userPosts.reducer";
import {dataTableHeaderReducer} from "./dataTableHeader/dataTableHeader.reducer";
import {dataTableRowsReducer} from "./dataTableRows/dataTableRows.reducer";
export default combineReducers({
    user:userReducer,
    userPosts:userPostsReducer,
    dataTableHeader:dataTableHeaderReducer,
    dataTableRows:dataTableRowsReducer
});