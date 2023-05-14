import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService"

type AuthProps = {
    email: string,
    password: string
}

export const loginAction = createAsyncThunk("auth/loginAction", async ({email, password} : AuthProps, thunkAPI) => {
    try {
        const res = await authService.login(email, password);
    } catch (err: any) {
        if (err instanceof Error) {
            console.log(err);

            const message = err.message;
    
            return thunkAPI.rejectWithValue(message);
          }
          else {
            return thunkAPI.rejectWithValue(`Unexpected Error: ${err}`)
          }
    }
})

export const logoutAction = createAsyncThunk("auth/logoutAction", async (_, thunkAPI) => {
    try {
        const res = await authService.logout();

        /*
        if(res.status === 205) {
            
        }
        */

        setTimeout(() => {
            window.location.reload();
          }, 500);
    } catch(err: any) {
        console.log(err);

        const message = err.response.data?.err || err.message;

        return thunkAPI.rejectWithValue(message);
    }
})
