import {InferActionsType} from "./ToDoReducer";

export enum EnumAppType {
    changeHandleNetworkError = 'CHANGE-HANDLE-NETWORK-ERROR',
    changeHandleClientsError = 'CHANGE-HANDLE-CLIENTS-ERROR',
    addWaitingList = 'ADD-WAITING-LIST',
    removeWaitingList = 'REMOVE-WAITING-LIST'
}

let initState = {
    networkError: '',
    clientsError: [] as string[],
    waitingList: {} as { [key: string]: boolean },
}
type  StateAppType = typeof initState
type AppActionsType = InferActionsType<typeof actionsApp>

export const appReducer = (state: StateAppType = initState, action: AppActionsType): StateAppType => {
    switch (action.type) {
        case EnumAppType.changeHandleNetworkError:
            return {...state, networkError: action.networkError}

        case EnumAppType.changeHandleClientsError:
            console.log(action.clientsError)
            return {...state, clientsError: action.clientsError}

        case EnumAppType.addWaitingList:
            return {...state, waitingList: {...state.waitingList, [action.id]: true}}
        case EnumAppType.removeWaitingList:
            let copyState = {...state}
            delete copyState.waitingList[action.id]
            return copyState

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
    removeWaitingList: (id: string) => ({type: EnumAppType.removeWaitingList, id} as const)
}