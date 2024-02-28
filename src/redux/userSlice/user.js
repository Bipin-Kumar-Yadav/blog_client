import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser : null,
    loading : false,
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        signin : (state,action) =>{
            state.currentUser = action.payload;
        },
        singout : (state) =>{
            state.currentUser = null;
        },
        setLoading : (state,action) => {
            state.loading = action.payload;
        }
    }
})

export const {signin,singout,setLoading} = userSlice.actions;
export default userSlice.reducer;