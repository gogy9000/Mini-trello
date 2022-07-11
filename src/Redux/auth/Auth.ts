import {AppDispatchType, AppThunk, InferActionsType} from "../ReduxStore";
import {ApiAuth, AuthDataType} from "../../DAL/TodoAPI";
import {handleClientsError, handlerNetworkError} from "../../utils/HadleErrorUtils";

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
export const authReducer = (state: stateAuthType=initState, action: ActionsAuthType): stateAuthType => {
    switch (action.type) {
        case EnumAuth.setAuthData:
            return {...state, ...action.authData}
        case EnumAuth.setIsAuthorized:
            return {...state, isAuthorized: action.isAuthorized}
        default:
            return state

    }
}
type AuthDataTypeWithIsAuthorized=AuthDataType&{
    isAuthorized:boolean
}
export const actionsAuth = {
    setAuthData: (authData: AuthDataTypeWithIsAuthorized) => ({type: EnumAuth.setAuthData, authData} as const),
    setIsAuthorized: (isAuthorized: boolean) => ({type: EnumAuth.setIsAuthorized, isAuthorized} as const)
}

export const thunkAuth={
    authMe:():AppThunk=>async (dispatch:AppDispatchType)=>{
        try{
            const response=await ApiAuth.authMe()
            if(response.data.resultCode===0){
                console.log(response)
                dispatch(actionsAuth.setAuthData({...response.data.data,isAuthorized:true}))
            }else {
                handleClientsError(dispatch,response.data.messages)
            }
        }catch (e) {
            handlerNetworkError(dispatch,e)
        }
    }
}
