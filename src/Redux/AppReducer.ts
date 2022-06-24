import {InferActionsType} from "./ToDoReducer";

export enum EnumAppType {
    changeHandleNetworkError = 'CHANGE-HANDLE-NETWORK-ERROR',
    changeHandleClientsError = 'CHANGE-HANDLE-CLIENTS-ERROR',
    addWaitingList = 'ADD-WAITING-LIST',
    removeWaitingList = 'REMOVE-WAITING-LIST',
    toggleIsWaitingApp='TOGGLE-IS-WAITING-APP'

}

let initState = {
    networkError: '',
    clientsError: [] as string[],
    waitingList: {} as { [key: string]: boolean },
    isWaitingApp:false
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
            return {...state,isWaitingApp: action.isWaitingApp}

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
    toggleIsWaitingApp:(isWaitingApp:boolean)=>({type:EnumAppType.toggleIsWaitingApp,isWaitingApp}as const)
}