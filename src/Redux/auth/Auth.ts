import {AppDispatchType, AppThunk} from "../ReduxStore";
import {ApiAuth, AuthDataType, Data, LoginPayloadType} from "../../DAL/TodoAPI";
import {handleClientsError, handlerNetworkError} from "../../utils/HadleErrorUtils";
import {AxiosResponse} from "axios";
import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";

export const initState = {
    email: '',
    id: '',
    login: '',
    isAuthorized: false,
}

export const authSlice=createSlice({
    name:'auth',
    initialState:initState,
    reducers:{
        setAuthData:(state:Draft<typeof initState> ,action:PayloadAction<AuthDataTypeWithIsAuthorized>)=>{
            return {...state,...action.payload}
        },
        setIsAuthorized:(state:Draft<typeof initState> ,action:PayloadAction<boolean>)=>{
            return {...state, isAuthorized:action.payload}
        }

    }
})


export const authReducer = authSlice.reducer

type AuthDataTypeWithIsAuthorized = AuthDataType & {
    isAuthorized: boolean
}
export const actionsAuth =authSlice.actions



export const thunkAuth = {
    authMe: (): AppThunk<Promise<AxiosResponse<Data<AuthDataType>> | undefined>> => async (dispatch: AppDispatchType) => {
        try {
            const response = await ApiAuth.authMe()
            if (response.data.resultCode === 0) {
                dispatch(actionsAuth.setAuthData({...response.data.data, isAuthorized: true}))
            } else {
                handleClientsError(dispatch, response.data.messages)

                dispatch(actionsAuth.setAuthData(
                    {
                        email: '',
                        id: '',
                        login: '',
                        isAuthorized: false,
                    }
                ))
            }
            return response
        } catch (e) {
            handlerNetworkError(dispatch, e)
        }

    },
    login: (loginPayload: LoginPayloadType): AppThunk => async (dispatch: AppDispatchType) => {
        try {
            const response = await ApiAuth.login(loginPayload)
            console.log(response)
            if (response.data.resultCode===0){
               dispatch(thunkAuth.authMe())
            }else {
                handleClientsError(dispatch,response.data.messages)
            }
                } catch (e) {
            handlerNetworkError(dispatch, e)
        }

    },
    logout: (): AppThunk => async (dispatch: AppDispatchType) => {
       try {
            const response = await ApiAuth.logout()
            if (response.data.resultCode === 0) {
                dispatch(actionsAuth.setAuthData(
                    {
                        email: '',
                        id: '',
                        login: '',
                        isAuthorized: false,
                    }
                ))
            } else {
                handleClientsError(dispatch, response.data.messages)
            }
        }catch (e) {
           handlerNetworkError(dispatch,e)
       }
    }
}
