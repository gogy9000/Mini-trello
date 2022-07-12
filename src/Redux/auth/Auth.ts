import {AppDispatchType, AppThunk, InferActionsType, InferThunksType, UnionThunkType} from "../ReduxStore";
import {ApiAuth, AuthDataType, Data, LoginPayloadType} from "../../DAL/TodoAPI";
import {handleClientsError, handlerNetworkError} from "../../utils/HadleErrorUtils";
import {AxiosResponse} from "axios";

enum EnumAuth {
    setAuthData = 'SET-AUTH-DATA',
    setIsAuthorized = 'SET-IS-AUTHORIZED'
}

export const initState = {
    email: '',
    id: '',
    login: '',
    isAuthorized: false,
}
type stateAuthType = typeof initState
type ActionsAuthType = InferActionsType<typeof actionsAuth>
export const authReducer = (state: stateAuthType = initState, action: ActionsAuthType): stateAuthType => {
    switch (action.type) {
        case EnumAuth.setAuthData:
            return {...state, ...action.authData}
        case EnumAuth.setIsAuthorized:
            return {...state, isAuthorized: action.isAuthorized}
        default:
            return state

    }
}
type AuthDataTypeWithIsAuthorized = AuthDataType & {
    isAuthorized: boolean
}
export const actionsAuth = {
    setAuthData: (authData: AuthDataTypeWithIsAuthorized) => ({type: EnumAuth.setAuthData, authData} as const),
    setIsAuthorized: (isAuthorized: boolean) => ({type: EnumAuth.setIsAuthorized, isAuthorized} as const)
}


export const thunkAuth = {
    authMe: (): AppThunk<Promise<AxiosResponse<Data<AuthDataType>> | undefined>> => async (dispatch: AppDispatchType) => {
        try {
            const response = await ApiAuth.authMe()
            if (response.data.resultCode === 0) {
                console.log(response)
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
            console.log(response)
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
