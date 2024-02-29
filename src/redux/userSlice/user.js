import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signin: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        signout: (state) => {
            state.currentUser = null;
            localStorage.removeItem('user');
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

export const { signin, signout, setLoading } = userSlice.actions;
export default userSlice.reducer;
