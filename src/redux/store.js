import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice/user'

const store = configureStore({
    reducer : {
        user : userReducer
    }
})

export default store;