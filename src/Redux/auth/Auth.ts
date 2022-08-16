import {ApiAuth,LoginPayloadType} from "../../DAL/TodoAPI";
import {handleClientsError, handlerNetworkError} from "../../utils/HadleErrorUtils";
import {createAsyncThunk, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";


export type InitialStateAuthType = {
    email: string
    id: string
    login: string
    isAuthorized: boolean,
}
export const initialState:InitialStateAuthType = {
    email: '',
    id: '',
    login: '',
    isAuthorized: false,
}


export const thunkAuth = {
    authMe: createAsyncThunk("auth/authMe", async (params, {dispatch}) => {
        try {
            const response = await ApiAuth.authMe()
            if (response.data.resultCode === 0) {
                return {...response.data.data, isAuthorized: true}
            } else {
                handleClientsError(dispatch, response.data.messages)
            }
        } catch (e) {
            handlerNetworkError(dispatch, e)
        }

    }),
   login: createAsyncThunk("auth/login", async (loginPayload: LoginPayloadType, {dispatch}) => {
        try {
            const response = await ApiAuth.login(loginPayload)
            if (response.data.resultCode === 0) {
                dispatch(thunkAuth.authMe())
            } else {
                handleClientsError(dispatch, response.data.messages)
            }
        } catch (e) {
            handlerNetworkError(dispatch, e)
        }
    }),
   logout :createAsyncThunk("auth/logout", async (params, {dispatch}) => {
       try {
            const response = await ApiAuth.logout()
            if (response.data.resultCode === 0) {
                return {}
            } else {
                handleClientsError(dispatch, response.data.messages)
            }
        } catch (e) {
            handlerNetworkError(dispatch, e)
        }
    })
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        const setAuthData = (state: Draft<InitialStateAuthType>, action: PayloadAction<InitialStateAuthType | {} | undefined>) => {
            if (!action.payload) {
                return
            }
            if (Object.keys(action.payload).length === 0) {
                return {email: '', id: '', login: '', isAuthorized: false}
            } else {
                return {...state, ...action.payload}
            }
        }
        builder
            .addCase(thunkAuth.authMe.fulfilled, setAuthData)
            .addCase(thunkAuth.logout.fulfilled, setAuthData)
    }
})


export const authReducer = authSlice.reducer
export const actionsAuth = authSlice.actions




