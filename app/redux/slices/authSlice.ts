import { createSlice } from "@reduxjs/toolkit";
import { loginAction, logoutAction } from "../actions/authActions";
import Cookies from "js-cookie"

type AuthState = {
    loggedIn: boolean,
    user: any
}

const jsonUser: string | undefined = Cookies.get("user")

let user = jsonUser !== undefined ? JSON.parse(jsonUser) : null;

const initialState: AuthState = user ? {
    loggedIn: true,
    user
} : {
    loggedIn: false,
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginAction.fulfilled, (state: AuthState, action) => {
            console.log("fulfilled");
            state.loggedIn = true;
            state.user = action.payload;
        }).addCase(loginAction.rejected, (state: AuthState) => {
            console.log("fulfilled");
            state.loggedIn = false;
            state.user = null
        }).addCase(logoutAction.fulfilled, (state: AuthState) => {
            state.loggedIn = false;
            state.user = null;
        })
    }
})

export default authSlice.reducer;