import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        accessToken: "",
        refreshToken: "",
    },
    reducers: {
        signinUser: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            
            return state;
        },
        signoutUser: (state) => {
            state.accessToken = "";
            state.refreshToken = "";
            
            return state;
        },
    },
});

export const { signinUser, signoutUser } = userSlice.actions;
export default userSlice.reducer;