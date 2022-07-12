import {AppDispatchType, AppThunk, InferActionsType, UnionThunkType} from "./ReduxStore";
import {thunkAuth} from "./auth/Auth";
import {thunks} from "./ToDoReducer";


export enum EnumAppType {
    changeHandleNetworkError = 'CHANGE-HANDLE-NETWORK-ERROR',
    changeHandleClientsError = 'CHANGE-HANDLE-CLIENTS-ERROR',
    addWaitingList = 'ADD-WAITING-LIST',
    removeWaitingList = 'REMOVE-WAITING-LIST',
    toggleIsWaitingApp = 'TOGGLE-IS-WAITING-APP',
    setIsInitialization = 'SET-IS-INITIALIZATION'

}

let initState = {
    networkError: '',
    clientsError: [] as string[],
    waitingList: {} as { [key: string]: boolean },
    isWaitingApp: false,
    isInitialization: false
}

type  StateAppType = typeof initState
type AppActionsType = InferActionsType<typeof actionsApp>

export const appReducer = (state: StateAppType = initState, action: AppActionsType): StateAppType => {
    switch (action.type) {
        case EnumAppType.changeHandleNetworkError:
            return {...state, networkError: action.networkError}

        case EnumAppType.changeHandleClientsError:
            return {...state, clientsError: action.clientsError}

        case EnumAppType.addWaitingList:
            return {...state, waitingList: {...state.waitingList, [action.id]: true}}

        case EnumAppType.removeWaitingList:
            let copyState = {...state}
            delete copyState.waitingList[action.id]
            return copyState

        case EnumAppType.toggleIsWaitingApp:
            return {...state, isWaitingApp: action.isWaitingApp}

        case EnumAppType.setIsInitialization:
            return {...state, isInitialization: action.isInitialization}


        default:
            return state
    }


}


export let actionsApp = {
    changeHandleNetworkError: (networkError: string) => ({
        type: EnumAppType.changeHandleNetworkError, networkError
    } as const),
    changeHandleClientsError: (clientsError: string[]) => ({
        type: EnumAppType.changeHandleClientsError, clientsError
    } as const),
    addWaitingList: (id: string) => ({type: EnumAppType.addWaitingList, id} as const),
    removeWaitingList: (id: string) => ({type: EnumAppType.removeWaitingList, id} as const),
    toggleIsWaitingApp: (isWaitingApp: boolean) => ({type: EnumAppType.toggleIsWaitingApp, isWaitingApp} as const),
    setIsInitialization: (isInitialization: boolean) => ({
        type: EnumAppType.setIsInitialization,
        isInitialization
    } as const)
}

export const thunkApp = {
    initializeApp: (): AppThunk => async (dispatch: AppDispatchType) => {

        dispatch(actionsApp.setIsInitialization(true))
        const response1 = await dispatch(thunkAuth.authMe())
        const response2 = await dispatch(thunks.getTodolistAndTasks())
        Promise.allSettled([response1, response2]).then((res) => {
            console.log(res)
            dispatch(actionsApp.setIsInitialization(false))
        })
    }
}