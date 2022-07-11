import {AppDispatchType, AppThunk, InferActionsType} from "../ReduxStore";

enum EnumAuth {
    setAuthData = 'SET-AUTH-DATA',
    setIsAuthorized = 'SET-IS-AUTHORIZED'
}

export const state = {
    email: '',
    id: '',
    login: '',
    isAuthorized: false,
}
type stateAuthType = typeof state
type ActionsAuthType = InferActionsType<typeof actionsAuth>
export const Auth = (state: stateAuthType, action: ActionsAuthType): stateAuthType => {
    switch (action.type) {
        case EnumAuth.setAuthData:
            return {...state, ...action.authData}
        case EnumAuth.setIsAuthorized:
            return {...state, isAuthorized: action.isAuthorized}
        default:
            return state

    }
}
export type AuthDataType = {
    email: string
    id: string
    login: string
}
const actionsAuth = {
    setAuthData: (authData: AuthDataType) => ({type: EnumAuth.setAuthData, authData} as const),
    setIsAuthorized: (isAuthorized: boolean) => ({type: EnumAuth.setIsAuthorized, isAuthorized} as const)
}

export const thunkAuth={
    authMe:():AppThunk=>(dispatch:AppDispatchType)=>{

    }
}
