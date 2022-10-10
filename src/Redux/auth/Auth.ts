import {ApiAuth, Data, LoginPayloadType} from "../../DAL/TodoAPI";
import {errorsInterceptor, handleClientsError, handlerNetworkError} from "../../utils/HadleErrorUtils";
import {createAsyncThunk, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";


export type InitialStateAuthType = {
    authData:{
        email: string
        id: string
        login: string
    }
    isAuthorized: boolean,
    isFetching:boolean
}
export const initialState: InitialStateAuthType = {
    authData:{
        email: '',
        id: '',
        login: '',
    },
    isAuthorized: false,
    isFetching:false
}


export const thunkAuth = {
    authMe: createAsyncThunk("auth/authMe", async (params, {dispatch}) => {

        const promise =  ApiAuth.authMe().then((response) => {

            if (response.data.resultCode === 0) {
                dispatch(actionsAuth.setAuthData({...response.data.data, isAuthorized: true}))
            }
            return response
        })
        console.log(promise)
        errorsInterceptor(dispatch, [promise])
    }),
    login: createAsyncThunk("auth/login", async (loginPayload: LoginPayloadType, {dispatch}) => {

        const promise =  ApiAuth.login(loginPayload)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(thunkAuth.authMe())
                }
                return response
            })
        errorsInterceptor(dispatch, [promise])
    }),
    logout: createAsyncThunk("auth/logout",  async (params, {dispatch}) => {
        const promise = ApiAuth.logout().then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(actionsAuth.setAuthData({}))
            }
            return response
        })
        errorsInterceptor(dispatch, [promise])
    })
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state: Draft<InitialStateAuthType>, action: PayloadAction<InitialStateAuthType | {}>) => {
            if (Object.keys(action.payload).length === 0) {
                state.authData={email: '', id: '', login: ''}
                state.isAuthorized=false
            } else {
                state.authData= {...state.authData,...action.payload}
                state.isAuthorized=true
            }
        }
    },
    extraReducers: builder => {
        const onAuthPreloader = (state: Draft<InitialStateAuthType>) => {
            state.isFetching=true
        }
        const offAuthPreloader=(state: Draft<InitialStateAuthType>) => {
            state.isFetching=false
        }

        builder
            .addCase(thunkAuth.login.pending,onAuthPreloader)
            .addCase(thunkAuth.authMe.fulfilled,offAuthPreloader)
            .addCase(thunkAuth.logout.pending,onAuthPreloader)
            .addCase(thunkAuth.logout.fulfilled, offAuthPreloader)
    }
})


export const authReducer = authSlice.reducer
export const actionsAuth = authSlice.actions




