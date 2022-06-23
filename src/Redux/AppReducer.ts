import {InferActionsType} from "./ToDoReducer";

export enum EnumAppType {
    changeHandleNetworkError = 'CHANGE-HANDLE-NETWORK-ERROR',
    changeHandleClientsError = 'CHANGE-HANDLE-CLIENTS-ERROR'
}

let initState = {
    networkError: '',
    clientsError: [] as string[]
}
type  StateAppType = typeof initState
type AppActionsType = InferActionsType<typeof actionsApp>

export const appReducer = (state: StateAppType = initState, action: AppActionsType): StateAppType => {
    switch (action.type) {
        case EnumAppType.changeHandleNetworkError:
            return {...state, networkError: action.networkError}

        case EnumAppType.changeHandleClientsError:
            return {...state, clientsError: action.clientsError}
        default:
            return state
    }


}


export let actionsApp = {
    changeHandleNetworkError: (networkError: string) => ({
        type: EnumAppType.changeHandleNetworkError,
        networkError
    } as const),
    changeHandleClientsError: (clientsError: string[]) => ({
        type: EnumAppType.changeHandleClientsError,
        clientsError
    } as const)
}